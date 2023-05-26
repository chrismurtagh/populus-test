# Populus

[![CI](https://github.com/populusadmin/populus/actions/workflows/ci.yml/badge.svg)](https://github.com/populusadmin/populus/actions/workflows/ci.yml)

## T3 Turbo with Clerk Authentication Stack

### Clerk Dashboard - Auth

<https://clerk.com>

### PlanetScale - DB

<https://planetscale.com>

### Vercel - Web

<https://vercel.com>

### Expo - Mobile

<https://expo.dev>

- Google
- Apple

### Upstash - Redis

<https://upstash.com>

### Axiom - Logs

<https://axiom.co>

It uses [Turborepo](https://turborepo.org/) and contains:

## Code Layout

```diff
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ mobile <- expo
  ├─ web
  |   ├─ Next.js 13
  |   ├─ React 18
  |   └─ E2E Typesafe API Server & Client
  └─ corp_site
      ├─ Next.js 13
      ├─ React 18
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 └─ db
     └─ typesafe db-calls using Prisma
```

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```bash
# Install dependencies
pnpm i


# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to the database
pnpm db-push
```

### Configure Expo app

Expo doesn't use the .env for the publishable key, so you will need to go to `apps/expo/app.config.ts` and add it there.

```bash
const CLERK_PUBLISHABLE_KEY = "your-clerk-publishable-key";

```

### Configure Expo `dev`-script

> **Note:** If you want to use a physical phone with Expo Go, just run `pnpm dev` and scan the QR-code.

#### Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed [as shown on expo docs](https://docs.expo.dev/workflow/ios-simulator/).
2. Change the `dev` script at `apps/expo/package.json` to open the iOS simulator.

   ```diff
   +  "dev": "expo start --ios",
   ```

3. Run `pnpm dev` at the project root folder.

#### For Android

1. Install Android Studio tools [as shown on expo docs](https://docs.expo.dev/workflow/android-studio-emulator/).
2. Change the `dev` script at `apps/expo/package.json` to open the Android emulator.

   ```diff
   +  "dev": "expo start --android",
   ```

3. Run `pnpm dev` at the project root folder.

## Deployment

### Next.js

#### Prerequisites

_We do not recommend deploying a SQLite database on serverless environments since the data wouldn't be persisted. I provisioned a quick Mysql database on [PlanetScale](https://planetscale.com), but you can of course use any other database provider. Make sure the prisma schema is updated to use the correct database._

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:

   ![Vercel deployment settings](https://user-images.githubusercontent.com/11340449/201974887-b6403a32-5570-4ce6-b146-c486c0dbd244.png 'Vercel deployment settings')

   > The install command filters out the expo package and saves a few second (and cache size) of dependency installation. The build command makes us build the application using Turbo.

2. Add the `DATABASE_URL`,`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` environment variable.

3. Done! The app should successfully deploy. Assign the domain and use that instead of `localhost` for the `url` in the Expo app so that the Expo app can communicate with the backend when you are not in development.

### Expo

Deploying the Expo application works slightly differently compared to Next.js on the web. Instead of "deploying" the app online, you need to submit production builds of the app to the app stores, like [Apple App Store](https://www.apple.com/app-store/) and [Google Play](https://play.google.com/store/apps). You can read the full [Distributing your app](https://docs.expo.dev/distribution/introduction/), including best practices, in the Expo docs.

1. Let's start by setting up [EAS Build](https://docs.expo.dev/build/introduction/), which is short for Expo Application Services. The build service helps you create builds of your app, without requiring a full native development setup. The commands below are a summary of [Creating your first build](https://docs.expo.dev/build/setup/).

   ```bash
   // Install the EAS CLI
   $ pnpm add -g eas-cli

   // Log in with your Expo account
   $ eas login

   // Configure the Expo app
   $ cd apps/expo
   $ eas build:configure
   ```

2. After the initial setup, you can create your first build. You can build for Android and iOS platforms and use different [**eas.json** build profiles](https://docs.expo.dev/build-reference/eas-json/) to create production builds or development, or test builds. Let's make a production build for iOS.

   ```bash
   eas build --platform ios --profile production
   ```

   > If you don't specify the `--profile` flag, EAS uses the `production` profile by default.

3. Now that you have the first production build, you can submit this to the stores. [EAS Submit](https://docs.expo.dev/submit/introduction/) can help you send the build to the stores.

   ```bash
   eas submit --platform ios --latest
   ```

   > You can also combine build and submit in a single command, using `eas build ... --auto-submit`.

4. Before you can get the app in the hands of our users, you'll have to provide additional information to the app stores. This includes screenshots, app information, privacy policies, etc. _While still in preview_, [EAS Metadata](https://docs.expo.dev/eas/metadata/) can help you with most of this information.

5. If you're using OAuth social providers with Clerk, for instance Google, Apple, Facebook, etc..., you must whitelist your own OAuth redirect URL for the Expo application in the Clerk Dashboard.

   In `apps/expo/app.config.ts`, add a `scheme` that will be used to identify the standalone app.

   ```ts
   import { ExpoConfig, ConfigContext } from '@expo/config'

   const CLERK_PUBLISHABLE_KEY = 'your-clerk-publishable-key'

   const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
   	name: 'expo',
   	slug: 'expo',
   	scheme: 'your-app-scheme'
   	// ...
   })
   ```

   Then, in the [Clerk Dashboard](https://dashboard.clerk.dev/), go to **User & Authentication > Social Connections > Settings** and add the app's scheme and redirect URL to the **Redirect URLs** field:

   ```txt
   your-app-scheme://oauth-native-callback
   ```

   Here, `your-app-scheme` corresponds to the `scheme` defined in `app.config.ts`, and `oauth-native-callback` corresponds to the redirect URL defined when authenticating with social providers. See [SignInWithOAuth.tsx](/apps/expo/src/components/SignInWithOAuth.tsx) for reference.

   > You can find more information about this in the [Expo documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/#redirecting-to-your-app).

   You should now be able to sign in with your social providers in the TestFlight application build.

6. Once everything is approved, the users can finally install the app. Let's say you spotted a small typo; you'll have to create a new build, submit it to the stores, and wait for approval before you can resolve this issue. In these cases, you can use EAS Update to quickly send a small bugfix to your users without going through this long process. Let's start by setting up EAS Update.

   The steps below summarize the [Getting started with EAS Update](https://docs.expo.dev/eas-update/getting-started/#configure-your-project) guide.

   ```bash
   // Add the `expo-updates` library to the Expo app
   $ cd apps/expo
   $ pnpm expo install expo-updates

   // Configure EAS Update
   $ eas update:configure
   ```

7. Before we can send out updates to the app, you have to create a new build and submit it to the app stores. For every change that includes native APIs, you have to rebuild the app and submit the update to the app stores. See steps 2 and 3.

8. Now that everything is ready for updates, let's create a new update for `production` builds. With the `--auto` flag, EAS Update uses your current git branch name and commit message for this update. See [How EAS Update works](https://docs.expo.dev/eas-update/how-eas-update-works/#publishing-an-update) for more information.

   ```bash
   cd apps/expo
   eas update --auto
   ```

   > The OTA (Over The Air) updates must always follow the app store's rules. You can't change the app's primary functionality without getting app store approval. But this is a fast way to update the app for minor changes and bug fixes.

9. Done!

## References

The stack originates from [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) and [t3-turbo-with-clerk](https://github.com/clerkinc/t3-turbo-and-clerk)

import '../styles/globals.css'
import React from 'react'
import type { AppType, AppProps } from 'next/app'
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn
} from '@clerk/nextjs'
import { trpc } from '../utils/trpc'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'

const publicPages = ['/sign-in/[[...index]]', '/']

const MyApp: AppType = ({
	Component,
	pageProps: { ...pageProps }
}: AppProps) => {
	// Get the pathname
	const { pathname } = useRouter()

	// Check if the current route matches a public page
	const isPublicPage = publicPages.includes(pathname)

	// If the current route is listed as public, render it directly
	// Otherwise, use Clerk to require authentication

	const content = (
		<ClerkProvider {...pageProps}>
			<Head>
				<title>Populus Web App</title>
				<meta name="description" content="Populus Web Application" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{isPublicPage ? (
				<Layout>
					<Component {...pageProps} />
					<Analytics />
				</Layout>
			) : (
				<>
					<SignedIn>
						<Layout>
							<Component {...pageProps} />
							<Analytics />
						</Layout>
					</SignedIn>
					<SignedOut>
						<RedirectToSignIn />
					</SignedOut>
				</>
			)}
		</ClerkProvider>
	)
	return content
}

export default trpc.withTRPC(MyApp)
export { reportWebVitals } from 'next-axiom'

import { ExpoConfig, ConfigContext } from '@expo/config'

const CLERK_PUBLISHABLE_KEY =
	'pk_test_aGVhbHRoeS13ZWV2aWwtMS5jbGVyay5hY2NvdW50cy5kZXYk'

const GOOGLE_PLACES_API_KEY = 'AIzaSyBmxBrC3gC-tGXzEdoTRLTsipwFX9O6Xtw'

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
	name: 'populus',
	slug: 'populus',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'light',
	splash: {
		image: './assets/icon.png',
		resizeMode: 'contain',
		backgroundColor: '#2e026d'
	},
	updates: {
		fallbackToCacheTimeout: 0
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
		bundleIdentifier: 'your.bundle.identifier'
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/icon.png',
			backgroundColor: '#2e026d'
		}
	},
	extra: {
		eas: {
			projectId: 'f29f678f-61b0-499e-ba22-559718a591dd'
		},
		CLERK_PUBLISHABLE_KEY,
		GOOGLE_PLACES_API_KEY
	},
	plugins: ['./expo-plugins/with-modify-gradle.js']
})

export default defineConfig

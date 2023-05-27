import { withClerkMiddleware } from '@clerk/nextjs/server'
import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import { MiddlewareFactory } from './types'

export const withClerkAuth: MiddlewareFactory = (next: NextMiddleware) => {
	return withClerkMiddleware(
		async (request: NextRequest, _next: NextFetchEvent) => {
			return next(request, _next)
		}
	)
}

// Stop Middleware running on static files
export const config = {
	matcher: [
		/*
		 * Match request paths except for the ones starting with:
		 * - _next
		 * - static (static files)
		 * - favicon.ico (favicon file)
		 *
		 * This includes images, and requests from TRPC.
		 */
		'/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)'
		//'/:path*'
	]
}

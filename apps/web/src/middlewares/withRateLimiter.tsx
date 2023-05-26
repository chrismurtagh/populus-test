import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { MiddlewareFactory } from './types'

const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.cachedFixedWindow(30, '10s'),
	ephemeralCache: new Map(),
	analytics: true
})

export const withRateLimiter: MiddlewareFactory = () => {
	return async (
		request: NextRequest,
		_next: NextFetchEvent
	): Promise<Response | undefined> => {
		const ip = request.ip ?? '127.0.0.1'

		const { success, pending, limit, reset, remaining } = await ratelimit.limit(
			`ratelimit_middleware_${ip}`
		)
		_next.waitUntil(pending)

		const res = success
			? NextResponse.next()
			: NextResponse.redirect(new URL('/api/blocked', request.url))

		res.headers.set('X-RateLimit-Limit', limit.toString())
		res.headers.set('X-RateLimit-Remaining', remaining.toString())
		res.headers.set('X-RateLimit-Reset', reset.toString())
		return res
	}
}

export const config = {
	matcher: '/api/:path*'
}

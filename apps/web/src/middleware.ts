import { stackMiddlewares } from './middlewares/stackMiddlewares'
import { withHeaders } from './middlewares/withHeaders'
import { withClerkAuth } from './middlewares/withClerkAuth'
import { withRateLimiter } from './middlewares/withRateLimiter'

const middlewares = [withClerkAuth, withHeaders, withRateLimiter]
export default stackMiddlewares(middlewares)

// import { authMiddleware } from '@clerk/nextjs'

// export default authMiddleware()

// export const config = {
// 	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
// }

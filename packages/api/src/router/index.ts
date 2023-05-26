import { router } from '../trpc'
import { authRouter } from './auth'
import { voterDataRouter } from './voterData'

export const appRouter = router({
	auth: authRouter,
	voterData: voterDataRouter
})

// export type definition of API
export type AppRouter = typeof appRouter

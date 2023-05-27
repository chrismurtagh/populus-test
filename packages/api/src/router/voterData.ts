import { protectedProcedure, publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const voterDataRouter = router({
	getVoterRecordByID: publicProcedure
		.input(z.string())
		.query(({ ctx, input }) => {
			return ctx.prisma.voterData.findFirst({
				where: { id: input }
			})
		}),

	getVoterEmail: protectedProcedure
		.input(z.string())
		.query(({ ctx, input }) => {
			return ctx.prisma.voterData.findFirst({
				where: { voterID: input },
				select: { emailAddress: true }
			})
		}),

	getVoterRecordByFullAddress: publicProcedure
		.input(
			z.object({
				residenceAddress1: z.string(),
				residenceAddress2: z.string(),
				residenceCity: z.string(),
				residenceZipcode: z.string()
			})
		)
		.query(({ ctx, input }) => {
			const {
				residenceAddress1,
				residenceAddress2,
				residenceCity,
				residenceZipcode
			} = input
			return ctx.prisma.voterData.findMany({
				where: {
					residenceAddress1,
					residenceAddress2,
					residenceCity,
					residenceZipcode
				}
			})
		}),

	getVoterRecordByGoogleAddress: publicProcedure
		.input(
			z.object({
				residenceAddress1: z.string(),
				residenceCity: z.string(),
				residenceZipcode: z.string()
			})
		)
		.query(({ ctx, input }) => {
			const { residenceAddress1, residenceCity, residenceZipcode } = input
			return ctx.prisma.voterData.findMany({
				where: {
					residenceAddress1,
					residenceCity,
					residenceZipcode
				}
			})
		})
})

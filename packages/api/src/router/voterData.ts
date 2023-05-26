import { protectedProcedure, router } from '../trpc'
import { z } from 'zod'

export const voterDataRouter = router({
	getVoterRecordByID: protectedProcedure
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

	getVoterRecordByFullAddress: protectedProcedure
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

	getVoterRecordByGoogleAddress: protectedProcedure
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

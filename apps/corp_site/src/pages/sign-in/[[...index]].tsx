import type { NextPage } from 'next'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

const SignInPage: NextPage = () => {
	const content = (
		<main className="flex flex-col items-center text-gray-700">
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex-grow-1 container flex flex-col items-center justify-center gap-12 px-4 py-8">
					<h1 className="text-5xl font-extrabold tracking-tight text-red-600 sm:text-[5rem]">
						POPULUS
					</h1>
					<SignIn
						path="/sign-in"
						routing="path"
						appearance={{
							elements: { footerAction__signIn: { display: 'none' } }
						}}
					/>
					<div>
						<Link href="/">
							<div className="font-bold text-red-600">Back to Home</div>
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
	return content
}
export default SignInPage

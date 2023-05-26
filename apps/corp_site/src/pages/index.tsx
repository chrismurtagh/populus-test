import type { NextPage } from 'next'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

const Home: NextPage = () => {
	const { isSignedIn } = useAuth()

	const content = (
		<main className="flex flex-col items-center text-gray-700">
			<div className="container flex flex-col items-center justify-center gap-48 py-10">
				<h1 className="justify-center text-3xl font-extrabold tracking-tight sm:text-[4rem]">
					Welcome to <span className="text-red-600">POPULUS</span>
				</h1>
				<div className="flex flex-col items-center justify-center gap-4">
					{isSignedIn ? (
						<>
							<div className="flex items-center justify-center gap-6">
								<Link href="/search" className="text-2xl text-gray-600">
									Search
								</Link>
								<Link href="/findme" className="text-2xl text-gray-600">
									Find Me
								</Link>
							</div>
						</>
					) : (
						<div className="flex items-center justify-center pt-52">
							<Link href="/sign-in" className="text-2xl text-red-600">
								Sign In Here
							</Link>
						</div>
					)}
				</div>
			</div>
		</main>
	)
	return content
}

export default Home

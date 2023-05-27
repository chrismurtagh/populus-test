import { UserButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Header = (): JSX.Element => {
	const { isSignedIn } = useAuth()
	const content = (
		<header>
			{isSignedIn ? (
				<>
					<div className="flex items-center justify-between p-4">
						<div className="flex-1 justify-start font-extrabold text-red-600">
							<Link href="/">POPULUS</Link>
						</div>
						<div className="justify-end">
							<UserButton
								appearance={{
									elements: {
										userButtonAvatarBox: {
											width: '2rem',
											height: '2rem'
										}
									}
								}}
							/>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="container flex items-center justify-between p-4">
						<div className="font-extrabold text-red-600">
							<Link href="/">POPULUS</Link>
						</div>
					</div>
				</>
			)}
		</header>
	)
	return content
}

export default Header

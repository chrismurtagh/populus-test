import React from 'react'
import Footer from './Footer'
import Header from './Header'

interface ILayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps): JSX.Element => {
	const content = (
		<div className='h-screen bg-[url("/images/populus-background.png")] bg-cover bg-center bg-no-repeat'>
			<Header />
			{children}
			<Footer />
		</div>
	)
	return content
}

export default Layout

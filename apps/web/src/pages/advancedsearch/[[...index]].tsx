import type { NextPage } from 'next'
import AdvancedSearch from '../../components/Search/AdvancedSearch'

const advSearch: NextPage = () => {
	const content = (
		<main className="flex flex-col items-center text-gray-700">
			<div className="flex flex-col items-center justify-center">
				<div className="container flex flex-col items-center justify-center p-8 px-4">
					<h1 className="mb-12 text-3xl font-extrabold tracking-tight text-red-600 sm:text-[5rem]">
						Advanced Search
					</h1>
				</div>
				<div>
					<AdvancedSearch />
				</div>
			</div>
		</main>
	)
	return content
}

export default advSearch

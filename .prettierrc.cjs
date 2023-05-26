/** @type {import("prettier").Config} */
module.exports = {
	arrowParens: 'avoid',
	bracketSpacing: true,
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	singleAttributePerLine: false,
	bracketSameLine: false,
	jsxSingleQuote: false,
	printWidth: 80,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	requirePragma: false,
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'none',
	useTabs: true,
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	tailwindConfig: './packages/config/tailwind'
}

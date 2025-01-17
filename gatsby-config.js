const postcssCustomMedia = require(`postcss-custom-media`);
const autoprefixer = require(`autoprefixer`);
const cssVariables = require(`postcss-css-variables`);
const colorModFunction = require(`postcss-color-mod-function`);
const cssNano = require(`cssnano`);
const customProperties = require(`postcss-custom-properties`);
const easyImport = require(`postcss-easy-import`);
const path = require(`path`);

require(`dotenv`).config({
	path: `.env.${process.env.NODE_ENV}`,
});

const plugins = [
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			path: path.join(__dirname, `content`),
			name: `markdown-pages`,
		},
	},
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			path: path.join(__dirname, `src`, `images`),
			name: `images`,
		},
	},
	`gatsby-plugin-image`,
	`gatsby-plugin-sharp`,
	`gatsby-transformer-sharp`,
	{
		resolve: `gatsby-transformer-remark`,
		options: {
			plugins: [
				{
					resolve: `gatsby-remark-images`,
					options: {
						sizeByPixelDensity: true,
						withWebp: true,
					},
				},
				`gatsby-remark-prismjs-copy-button`,
				{
					resolve: `gatsby-remark-prismjs`,
					options: {
						classPrefix: "language-",
						showLineNumbers: true,
						aliases: {
							js: "javascript",
							sh: "bash",
							curl: "bash"
						}
					}
				},
				`gatsby-remark-autolink-headers`,
				`gatsby-remark-code-titles`,
				`gatsby-remark-check-links`,
				`gatsby-remark-external-links`,
			],
		},
	},
	`gatsby-transformer-yaml`,
	`gatsby-plugin-catch-links`,
	/**
	 *  Utility Plugins
	 */
	{
		resolve: `gatsby-plugin-manifest`,
		options: {
			name: `Appbase Docs`,
			short_name: `Appbase`,
			start_url: `/`,
			background_color: `#343f44`,
			theme_color: `#343f44`,
			display: `minimal-ui`,
			icon: `static/favicon.png`,
			icons: [
				{
					src: `static/favicon.pngg`,
					sizes: `192x192`,
					type: `image/png`,
					purpose: "any maskable"
				},
				{
					src: `static/favicon.png`,
					sizes: `512x512`,
					type: `image/png`,
				},
			],
		},
	},
	`gatsby-plugin-offline`,
	`gatsby-plugin-react-helmet`,
	`gatsby-plugin-force-trailing-slashes`,
	'gatsby-plugin-dark-mode',
	`gatsby-offline-search-index`,
	{
		resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
		options: {
			disable: true,
		}
	},
	// `gatsby-plugin-perf-budgets`,
	/**
	 *  Display Plugins
	 */
	{
		resolve: `gatsby-plugin-postcss`,
		options: {
			postCssPlugins: [
				autoprefixer({ browsers: [`last 2 versions`] }),
				easyImport(),
				cssVariables(),
				colorModFunction(),
				customProperties({ preserve: false }),
				postcssCustomMedia(),
				cssNano({ zindex: false }),
			],
		},
	},
	{
		resolve: `gatsby-plugin-react-svg`,
		options: {
			rule: {
				include: /icons/,
			},
		},
	},
	{
		resolve: `gatsby-plugin-google-analytics`,
		options: {
			trackingId: `UA-54082612-5`,
		},
	},

	{
		resolve: 'gatsby-plugin-page-progress',
		options: {
			excludePaths: ['/'],
			height: 3,
			prependToBody: false,
			color: `#3eb0ef`,
		},
	},
];

module.exports = {
	siteMetadata: {
		title: `Appbase.io Docs`,
		siteUrl: `https://github.com/appbaseio/Docs`,
		description: `Appbase.io Docs Reference - JavaScript and REST APIs for indexing, querying and streaming data.`,
	},
	plugins,
};

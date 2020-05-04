/**
 * Block: PMPro Login Form
 *
 * Add a login form to any page or post.
 *
 */

/**
 * Block dependencies
 */
import Edit from "./edit";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
/**
 * Register block
 */
export default registerBlockType("pmpro/advanced-levels-shortcode", {
	title: __("Advanced Levels", "paid-memberships-pro"),
	description: __(
		"Displays Advanced Levels for Paid Memberships Pro.",
		"paid-memberships-pro"
	),
	category: "pmpro",
	icon: {
		background: "#2997c8",
		foreground: "#ffffff",
		src: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 0 24 24"
				width="24"
			>
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" />
			</svg>
		),
	},
	keywords: [
		__("pmpro", "paid-memberships-pro"),
		__("paid", "paid-memberships-pro"),
		__("advanced", "paid-memberships-pro"),
		__("level", "paid-memberships-pro"),
	],
	supports: {},
	edit: Edit,
	save() {
		return null;
	},
});

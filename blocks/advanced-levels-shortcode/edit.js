/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, SelectControl, ToggleControl } = wp.components;
const { InspectorControls } = wp.editor;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Edit extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const {
			backLink,
			compare,
			checkoutButton,
			discountCode,
			expiration,
			levels,
			layout,
			price,
			renewButton,
			template,
		} = attributes;
		const inspectorControls = (
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={__(
							"Display a Back Link?",
							"pmpro-advanced-levels-shortcode"
						)}
						help={__(
							"Hide or show the Return to Home or Return to Your Account below the levels layout",
							"pmpro-advanced-levels-shortcode"
						)}
						checked={backLink}
						onChange={(value) => {
							this.props.setAttributes({
								backLink: value,
							});
						}}
					/>
				</PanelBody>
			</InspectorControls>
		);
		return (
			<Fragment>
				{inspectorControls}
				<PanelBody>{__("test", "pmpro-advanced-levels-shortcode")}</PanelBody>
			</Fragment>
		);
	}
}

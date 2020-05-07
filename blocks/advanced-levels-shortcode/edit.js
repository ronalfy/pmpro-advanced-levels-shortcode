import axios from "axios";
var HtmlToReactParser = require("html-to-react").Parser;

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
	PanelBody,
	SelectControl,
	ToggleControl,
	CheckboxControl,
	Button,
	TextControl,
} = wp.components;
const { InspectorControls } = wp.blockEditor;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Edit extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			selectedLevels: this.props.attributes.levels || {},
			validationErrors: false,
			validationMessage: "",
			view: this.props.attributes.view,
			shortcodeOutput: '',
			compare: false,
		};
	}

	onLevelCheckboxChange = (id, value) => {
		let selectedLevels = this.state.selectedLevels;
		selectedLevels[id] = value;
		this.props.attributes.levels = selectedLevels;
		this.setState({
			selectedLevels: selectedLevels,
		});
		this.loadShortcode();
	};

	isChecked = (levelId) => {
		if (this.state.selectedLevels[levelId]) {
			return true;
		}
		return false;
	};

	outputLevelCheckboxes = () => {
		const levelOptions = pmpro.all_level_values_and_labels;
		return levelOptions.map((level) => {
			return (
				<Fragment key={level.value}>
					<CheckboxControl
						checked={this.isChecked(level.value)}
						onChange={(e) => {
							this.onLevelCheckboxChange(level.value, e);
						}}
						label={level.label}
					/>
				</Fragment>
			);
		});
	};
	validateLayout = () => {
		if (this.state.selectedLevels.length <= 0) {
			this.setState({
				validationErrors: true,
				validationMessage: __(
					"You must select a level to continue",
					"pmpro-advanced-levels-shortcode"
				),
			});
		} else {
			const view =
				this.props.attributes.layout != "compare" ? "preview" : "compare";
			this.props.setAttributes({
				view: view,
			});
			this.setState({
				validationErrors: false,
				validationMessage: "",
				view: view,
			});
		}
	};
	/**
	 * Determine if the layout creation button should be disabled or not.
	 */
	isLayoutButtonDisabled = () => {
		if (this.state.selectedLevels.length == 0) {
			return true;
		}
		let noLevelsSelected = true;
		for ( const level in this.state.selectedLevels ) {
			if ( this.state.selectedLevels[level] ) {
				noLevelsSelected = false;
			}
		}
		return noLevelsSelected;
	};

	loadShortcode = () => {
		const {
			accountButton,
			backLink,
			checkoutButton,
			description,
			discountCode,
			expiration,
			levels,
			layout,
			price,
			renewButton,
			moreButton,
			template,
		} = this.props.attributes;
		axios
			.post(pmpro_advanced_levels.rest_url + `pmpro/v2/get_advanced_level_shortcode`, {
				account_button: accountButton,
				backlink: backLink,
				checkout_button: checkoutButton,
				description: description,
				discount_code: discountCode,
				expiration: expiration,
				levels: levels,
				layout: layout,
				price: price,
				renew_button: renewButton,
				template: template,
				more_button: moreButton,
			})
			.then((response) => {
				let htmlToReactParser = new HtmlToReactParser();
				this.setState( {
					shortcodeOutput: htmlToReactParser.parse(response.data),
				})
			});
	};

	componentWillMount = () => {
		if (this.props.attributes.view === "preview") {
			this.loadShortcode();
		}
	};

	render() {
		const { attributes, setAttributes } = this.props;
		const {
			accountButton,
			backLink,
			compare,
			description,
			checkoutButton,
			discountCode,
			expiration,
			levels,
			layout,
			price,
			renewButton,
			template,
			view,
			moreButton,
		} = attributes;
		const templateOptions = [
			{ value: "none", label: __("None", "pmpro-advanced-levels-shortcode") },
			{
				value: "bootstrap",
				label: __("Bootstrap", "pmpro-advanced-levels-shortcode"),
			},
			{
				value: "genesis",
				label: __("Genesis", "pmpro-advanced-levels-shortcode"),
			},
			{
				value: "woo themes",
				label: __("WooThemes", "pmpro-advanced-levels-shortcode"),
			},
			{
				value: "gantry",
				label: __("Gantry", "pmpro-advanced-levels-shortcode"),
			},
			{
				value: "pagelines",
				label: __("Pagelines", "pmpro-advanced-levels-shortcode"),
			},
			{
				value: "foundation",
				label: __("Foundation", "pmpro-advanced-levels-shortcode"),
			},
		];
		const layoutOptions = [
			{ value: "div", label: __("Div", "pmpro-advanced-levels-shortcode") },
			{ value: "table", label: __("Table", "pmpro-advanced-levels-shortcode") },
			{
				value: "2col",
				label: __("2 Columns", "pmpro-advanced-levels-shortcode"),
			},
			{
				value: "3col",
				label: __("3 Columns", "pmpro-advanced-levels-shortcode"),
			},
			{
				value: "4col",
				label: __("4 Columns", "pmpro-advanced-levels-shortcode"),
			},
			{
				value: "compare_table",
				label: __("Compare Table", "pmpro-advanced-levels-shortcode"),
			},
		];
		const priceOptions = [
			{ value: "short", label: __("Short", "pmpro-advanced-levels-shortcode") },
			{ value: "full", label: __("Full", "pmpro-advanced-levels-shortcode") },
			{
				value: "hide",
				label: __("Hide", "pmpro-advanced-levels-shortcode"),
			},
		];

		const inspectorControls = (
			<InspectorControls>
				<PanelBody
					initialOpen={true}
					title={__("Display", "pmpro-advanced-levels-shortcode")}
					icon="admin-appearance"
				>
					<SelectControl
						label={__('Choose a Template', 'pmpro-advanced-levels-shortcode')}
						options={templateOptions}
						value={template}
						onChange={(value) => {
							this.props.attributes.template = value;
							this.props.setAttributes({
								template: value,
							});
							this.loadShortcode();
						}}
					/>
					<SelectControl
						label={__('Choose a Layout', 'pmpro-advanced-levels-shortcode')}
						options={layoutOptions}
						value={layout}
						onChange={(value) => {
							this.props.attributes.layout = value;
							this.props.setAttributes({
								layout: value,
							});
							this.loadShortcode();
						}}
					/>
					<label>
						{__(
							"Select Levels to Display",
							"pmpro-advanced-levels-shortcode"
						)}
					</label>
					<br />
					{this.outputLevelCheckboxes()}
				</PanelBody>
				<PanelBody
					initialOpen={false}
					title={__("Text Display", "pmpro-advanced-levels-shortcode")}
					icon="text"
				>
					<TextControl
						label={__('Account Button', 'pmpro-advanced-levels-shortcode')}
						value={accountButton}
						onChange={(value) => {
							this.props.setAttributes({
								accountButton: value,
							});
							this.props.attributes.accountButton = value;
							// todo - Add timer to load timer on change.
							this.loadShortcode();
						}}
					/>
					<TextControl
						label={__('Checkout Text', 'pmpro-advanced-levels-shortcode')}
						value={checkoutButton}
						onChange={(value) => {
							this.props.setAttributes({
								checkoutButton: value,
							});
							this.props.attributes.checkoutButton = value;
							// todo - Add timer to load timer on change.
							this.loadShortcode();
						}}
					/>
					<TextControl
						label={__('Renew Text', 'pmpro-advanced-levels-shortcode')}
						value={renewButton}
						onChange={(value) => {
							this.props.setAttributes({
								renewButton: value,
							});
							this.props.attributes.renewButton = value;
							// todo - Add timer to load timer on change.
							this.loadShortcode();
						}}
					/>
				</PanelBody>
				<PanelBody
					initialOpen={false}
					title={__("Options", "pmpro-advanced-levels-shortcode")}
					icon="admin-generic"
				>
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
							this.props.attributes.backLink = value;
							this.loadShortcode();
						}}
					/>
					<ToggleControl
						label={__(
							"Display Description?",
							"pmpro-advanced-levels-shortcode"
						)}
						help={__(
							"Hide or show the level description",
							"pmpro-advanced-levels-shortcode"
						)}
						checked={description}
						onChange={(value) => {
							this.props.setAttributes({
								description: value,
							});
							this.props.attributes.description = value;
							this.loadShortcode();
						}}
					/>
					<ToggleControl
						label={__(
							"Display Expiration?",
							"pmpro-advanced-levels-shortcode"
						)}
						help={__(
							"Hide or show the level expiration",
							"pmpro-advanced-levels-shortcode"
						)}
						checked={expiration}
						onChange={(value) => {
							this.props.setAttributes({
								expiration: value,
							});
							this.props.attributes.expiration = value;
							this.loadShortcode();
						}}
					/>
					<ToggleControl
						label={__(
							"Display More button?",
							"pmpro-advanced-levels-shortcode"
						)}
						help={__(
							"Hide or show the more button for the level",
							"pmpro-advanced-levels-shortcode"
						)}
						checked={moreButton}
						onChange={(value) => {
							this.props.setAttributes({
								moreButton: value,
							});
							this.props.attributes.moreButton = value;
							this.loadShortcode();
						}}
					/>
					<SelectControl
						label={__('Price Display', 'pmpro-advanced-levels-shortcode')}
						options={priceOptions}
						value={price}
						onChange={(value) => {
							this.props.attributes.price = value;
							this.props.setAttributes({
								price: value,
							});
							this.loadShortcode();
						}}
					/>
					<TextControl
						label={__('Discount Code', 'pmpro-advanced-levels-shortcode')}
						value={discountCode}
						help={__('Enter a discount code to be applied to the levels', 'pmpro-advanced-levels-shortcode')}
						onChange={(value) => {
							this.props.setAttributes({
								discountCode: value,
							});
							this.props.attributes.discountCode = value;
							// todo - Add timer to load timer on change.
							this.loadShortcode();
						}}
					/>
				</PanelBody>
			</InspectorControls>
		);
		if ( ! this.state.compare ) {
			return (
				<Fragment>
				{inspectorControls}
					<Fragment>
						{this.state.shortcodeOutput}
					</Fragment>
				</Fragment>
			);
		}
		return (
			<div>{__('Compare table', 'pmpro-advanced-levels-shortcode')}</div>
		)
	}
}

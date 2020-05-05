/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, SelectControl, ToggleControl, CheckboxControl, Button } = wp.components;
const { InspectorControls } = wp.blockEditor;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Edit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			selectedLevels: [],
			validationErrors: false,
			validationMessage: '',
		}
	}

	onLevelCheckboxChange = ( id, value ) => {
		let selectedLevels = this.state.selectedLevels;
		selectedLevels[id] = value;
		this.setState( {
			selectedLevels: selectedLevels 
		});
	}

	isChecked = ( levelId ) => {
		if ( this.state.selectedLevels[levelId] ) {
			return true;
		}
		return false;
	}

	outputLevelCheckboxes = () => {
		const levelOptions = pmpro.all_level_values_and_labels;
		return (
			levelOptions.map( ( level ) => {
				return (
					<Fragment key={level.value}>
						<CheckboxControl 
							checked={this.isChecked(level.value)}
							onChange={(e) => { this.onLevelCheckboxChange(level.value, e)}}
							label={level.label}
						/>
					</Fragment>
				)
			})
		)
	}
	validateLayout = () => {
		if ( this.state.selectedLevels.length <= 0 ) {
			this.setState( {
				validationErrors: true,
				validationMessage: __('You must select a level to continue', 'pmpro-advanced-levels-shortcode' ),
			})
		} else {
			this.setState( {
				validationErrors: false,
				validationMessage: '',
			})
		}
	}

	isLayoutButtonDisabled = () => {
		if ( this.state.selectedLevels.length == 0 ) {
			return true;
		}
		let noLevelsSelected = true;
		this.state.selectedLevels.forEach( (level) => {
			if ( level ) {
				noLevelsSelected = false;
			}
		});
		return noLevelsSelected;
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
		const templateOptions = [
			{ value: "none", label: __("None", "pmpro-advanced-levels-shortcode") },
			{ value: "bootstrap", label: __("Bootstrap", "pmpro-advanced-levels-shortcode") },
			{ value: "genesis", label: __("Genesis", "pmpro-advanced-levels-shortcode") },
			{ value: "woo themes", label: __("WooThemes", "pmpro-advanced-levels-shortcode") },
			{ value: "gantry", label: __("Gantry", "pmpro-advanced-levels-shortcode") },
			{ value: "pagelines", label: __("Pagelines", "pmpro-advanced-levels-shortcode") },
			{ value: "foundation", label: __("Foundation", "pmpro-advanced-levels-shortcode") },
		];
		const layoutOptions = [
			{ value: "div", label: __("Div", "pmpro-advanced-levels-shortcode") },
			{ value: "table", label: __("Table", "pmpro-advanced-levels-shortcode") },
			{ value: "2col", label: __("2 Columns", "pmpro-advanced-levels-shortcode") },
			{ value: "3col", label: __("3 Columns", "pmpro-advanced-levels-shortcode") },
			{ value: "4col", label: __("4 Columns", "pmpro-advanced-levels-shortcode") },
			{ value: "compare_table", label: __("Compare Table", "pmpro-advanced-levels-shortcode") },
		];

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
				<PanelBody>
					<h2>{__('Choose a Layout', 'pmpro-advanced-levels-shortcode' )}</h2>
					<div>
						<label>{__('Template', 'pmpro-advanced-levels-shortcode')}</label><br />
						<SelectControl
							options={templateOptions}
							value={template}
							onChange={value => {
								this.props.setAttributes({
									template: value,
								});
							}}
						/>
					</div>
					<div>
						<label>{__('Layout', 'pmpro-advanced-levels-shortcode')}</label><br />
						<SelectControl
							options={layoutOptions}
							value={layout}
							onChange={value => {
								this.props.setAttributes({
									layout: value,
								});
							}}
						/>
					</div>
					<div>
						<label>{__('Select Levels to Display', 'pmpro-advanced-levels-shortcode')}</label><br />
						{this.outputLevelCheckboxes()}
					</div>
					<div>
						<Button
							isPrimary={true}
							isLarge={true}
							onClick={this.validateLayout}
							disabled={this.isLayoutButtonDisabled()}
						>
							{__('Build Layout', 'pmpro-advanced-levels-shortcode')}
						</Button>
					</div>
					{this.state.validationErrors && 
						<Fragment>
							<div className="notice error">
								<strong>
									<p>
										{this.state.validationMessage}
									</p>
								</strong>
							</div>
						</Fragment>
					}
				</PanelBody>
			</Fragment>
		);
	}
}

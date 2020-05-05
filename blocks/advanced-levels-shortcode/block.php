<?php
/**
 * Sets up advanced levels shortcode.
 *
 * @package blocks/advanced-levels-shortcode
 **/

namespace PMPro\blocks\advanced_levels;

defined( 'ABSPATH' ) || die( 'File cannot be accessed directly' );

// Only load if Gutenberg is available.
if ( ! function_exists( 'register_block_type' ) ) {
	return;
}

add_action( 'init', __NAMESPACE__ . '\register_dynamic_block' );
add_action( 'rest_api_init', __NAMESPACE__ . '\register_routes' );

/**
 * Register routes.
 */
function register_routes() {
	register_rest_route(
		'pmpro/v2',
		'/get_advanced_level_shortcode',
		array(
			'methods'  => 'GET',
			'callback' => __NAMESPACE__ . '\get_shortcode_output',
		)
	);
}

/**
 * Get the shortcode output from a REST call.
 *
 * @param REST $request The REST request array.
 *
 * @return string HTML of the shortcode.
 */
function get_shortcode_output( $request ) {
	ob_start();
	echo '<div>' . 'this is a test' . '</div>';
	return ob_get_clean();
}

/**
 * Register the dynamic block.
 *
 * @return void
 */
function register_dynamic_block() {

	// Hook server side rendering into render callback.
	register_block_type(
		'pmpro/advanced-levels-shortcode',
		array(
			'attributes' => array(
				'backLink'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'compare'         => array(
					'type'    => 'array',
					'default' => array( '' ),
					'items'   => array(
						'type' => 'object',
					),
				),
				'checkoutButton'  => array(
					'type'    => 'string',
					'default' => __( 'Select', 'pmpro-advanced-levels-shortcode' ),
				),
				'discountCode'    => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'expiration'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'description'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'levels'          => array(
					'type'    => 'array',
					'default' => array( '' ),
					'items'   => array(
						'type' => 'object',
					),
				),
				'layout'          => array(
					'type'    => 'string',
					'default' => 'div',
				),
				'price'           => array(
					'type'    => 'string',
					'default' => 'short',
				),
				'renewButton'     => array(
					'type'    => 'string',
					'default' => __( 'Renew', 'pmpro-advanced-levels-shortcode' ),
				),
				'template'        => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'view'            => array(
					'type'    => 'string',
					'default' => 'build', /* can be build (initial layout), 'preview', or 'compare' */
				),
				'render_callback' => __NAMESPACE__ . '\render_dynamic_block',
			),
		)
	);
}

/**
 * Server rendering for login block.
 *
 * @param array $attributes contains text, level, and css_class strings.
 * @return string
 **/
function render_dynamic_block( $attributes ) {
	$attributes['display_if_logged_in'] = filter_var( $attributes['display_if_logged_in'], FILTER_VALIDATE_BOOLEAN );
	$attributes['show_menu']            = filter_var( $attributes['show_menu'], FILTER_VALIDATE_BOOLEAN );
	$attributes['show_logout_link']     = filter_var( $attributes['show_logout_link'], FILTER_VALIDATE_BOOLEAN );

	return( pmpro_login_forms_handler( $attributes['show_menu'], $attributes['show_logout_link'], $attributes['display_if_logged_in'], '', false ) );
}

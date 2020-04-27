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
				'levels'          => array(
					'type'    => 'array',
					'default' => array(),
				),
				'layout'          => array(
					'type'    => 'string',
					'default' => 'div',
				),
				'price'           => array(
					'type'    => 'string',
					'default' => 'short',
				),
				'renewButton'    => array(
					'type'    => 'string',
					'default' => __( 'Renew', 'pmpro-advanced-levels-shortcode' ),
				),
				'template'        => array(
					'type'    => 'string',
					'default' => 'none',
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

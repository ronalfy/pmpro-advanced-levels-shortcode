<?php
/**
 * Enqueues blocks in editor and dynamic blocks
 *
 * @package blocks
 */

defined( 'ABSPATH' ) || die( 'File cannot be accessed directly' );

/**
 * Dynamic Block Requires
 */
require_once 'advanced-levels-shortcode/block.php';

/**
 * Enqueue block editor only JavaScript and CSS
 */
function pmpro_advanced_levels_block_editor_scripts() {
	// Enqueue the bundled block JS file.
	wp_enqueue_script(
		'pmpro-advanced-levels-blocks-editor-js',
		plugins_url( 'js/blocks.build.js', PMPRO_ADVANCED_LEVELS_FILE ),
		array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-api', 'wp-editor', 'pmpro_admin' ),
		PMPRO_ADVANCED_LEVELS_VERSION,
		true
	);
	wp_localize_script(
		'pmpro-advanced-levels-blocks-editor-js',
		'pmpro_advanced_levels',
		array(
			'rest_url' => esc_url( rest_url() ),
		)
	);

	// Enqueue optional editor only styles.
	wp_enqueue_style(
		'pmpro-advanced-levels-blocks-editor-css',
		plugins_url( 'css/blocks.editor.css', PMPRO_ADVANCED_LEVELS_FILE ),
		array(),
		PMPRO_ADVANCED_LEVELS_VERSION
	);
	wp_enqueue_style( 'pmpro-advanced-levels-styles', plugins_url( 'css/pmpro-advanced-levels.css', PMPRO_ADVANCED_LEVELS_FILE ) );

	// Adding translation functionality to Gutenberg blocks/JS.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'pmpro-advanced-levels-blocks-editor-js', 'pmpro-advanced-levels-shortcode', PMPRO_ADVANCED_LEVELS_DIR . '/languages/' );
	}
}
add_action( 'enqueue_block_editor_assets', 'pmpro_advanced_levels_block_editor_scripts' );

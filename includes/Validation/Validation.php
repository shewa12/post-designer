<?php
/**
 * Manage validation
 *
 * @since v1.0.0
 * @package PostDesigner\Posts
 * @author <Shewa>
 */

namespace PostDesigner\Validation;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Validation input fields
 */
class Validation {

	/**
	 * Validate array elements
	 *
	 * @since v1.0.0
	 *
	 * @param array $validation_rules associative array for validation
	 * rules. For ex: [id => 'required|number', name => 'alpha_numeric|max:255'].
	 *
	 * @param array $data  key value pair of data. Note array index should
	 * exactly match with validation_rules array index.
	 *
	 * @return object validation response
	 */
	public static function validate( array $validation_rules, array $data ): object {
		$validation_pass   = true;
		$validation_errors = array();

		foreach ( $validation_rules as $key => $validation_rule ) {
			$rules = explode( '|', $validation_rule );
			foreach ( $rules as $rule ) {
				switch ( $rule ) {
					case 'required':
						if ( ! self::has_key( $key, $data ) || self::is_empty( $data[ $key ] ) ) {
							$validation_pass     = false;
							$validation_errors[] = $key . __( ' is required', 'post-designer' );
						}
						break;
					case 'numeric':
						if ( ! self::is_numeric( $data[ $key ] ) ) {
							$validation_pass     = false;
							$validation_errors[] = $key . __( ' is not numeric', 'post-designer' );
						}
						break;
					default:
						// code...
						break;
				}
			}
		}
		$response = array(
			'success' => $validation_pass,
			'errors'  => $validation_errors,
		);
		return (object) $response;
	}

	/**
	 * Check if value is numeric
	 *
	 * @param string $value  value to check.
	 *
	 * @return boolean
	 */
	public static function is_numeric( string $value ): bool {
		return is_numeric( $value );
	}

	/**
	 * Check if value is empty
	 *
	 * @param string $value  value to check.
	 *
	 * @return boolean
	 */
	public static function is_empty( string $value ): bool {
		return empty( $value ) ? true : false;
	}

	/**
	 * Check if array has key
	 *
	 * @param string $key  key to check.
	 * @param array  $array_assoc  array where to check.
	 *
	 * @return boolean
	 */
	public static function has_key( string $key, array $array_assoc ): bool {
		return isset( $array_assoc[ $key ] );
	}
}

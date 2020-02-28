/**
 * Checks if provided value is an Array
 *
 * @param  {*}       value The value to test
 * @return {Boolean}       Truthy when value is an Array
 */
export function isArray(value) {
  return Array.isArray(value)
}

/**
 * Checks if provided value is a function
 *
 * @param  {*}       value The value to test
 * @return {Boolean}       Truthy when value is a function
 */
export function isFunction(value) {
  return typeof value === 'function'
}

/**
 * Checks if provided value is a Boolean
 *
 * @param  {*}       value The value to test
 * @return {Boolean}       Truthy when value is a function
 */
export function isBoolean(value) {
  return typeof value === 'boolean'
}

/**
 * Checks if provided value is a DOM Element
 *
 * @param  {*}       value The value to test
 * @return {Boolean}       Truthy when value is a function
 */
export function isElement(value) {
  return !!(value && value.nodeType === 1)
}

/**
 * Checks if provided value is a Number
 *
 * @param  {*}       value The value to test
 * @return {Boolean}       Truthy when value is a function
 */
export function isNumber(value) {
  return typeof value === 'number'
}

/**
 * Checks if provided value is an Object
 *
 * @param  {*}       value The value to test
 * @return {Boolean}       Truthy when value is a function
 */
export function isObject(value) {
  return typeof value === 'object'
}

/**
 * Checks if provided value is a String
 *
 * @param  {*}       value The value to test
 * @return {Boolean}       Truthy when value is a function
 */
export function isString(value) {
  return typeof value === 'string'
}

/**
 * Checks if provided value is undefined
 *
 * @param  {*}       value The value to test
 * @return {Boolean}       Truthy when value is a function
 */
export function isUndefined(value) {
  return typeof value === 'undefined'
}

interface AwCheckbox extends HTMLElement
{
	inputElement: HTMLInputElement;
	/**
	 * @method error_hide
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * @deprecated
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method clear
	 * 
	 * Checkea el componente
	 */
	check() : void;

	/**
	 * @method clear
	 * 
	 * Quita el check del componente
	 */
	clear() : void;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message: string ) : void;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError() : boolean;
	
	/**
	 * @method	isChecked
	 * 
	 * Indica si el input está checkeado o no
	 * 
	 * @return {boolean}
	 */
	isChecked() : boolean;
}

declare var AwCheckbox: {
	prototype: AwCheckbox,
	new(): AwCheckbox
}

interface AwRadio extends HTMLElement
{
	inputElement: HTMLInputElement;

	/**
	 * @method	checked
	 * 
	 * Indica si el input está checkeado o no
	 * 
	 * @return {boolean}
	 */
	checked() : boolean;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;
}

declare var AwRadio: {
	prototype: AwRadio,
	new(): AwRadio
}

interface AwOnOff extends HTMLElement
{
	inputElement: HTMLInputElement;

	/**
	 * @method	checked
	 * 
	 * Indica si el input está checkeado o no
	 * 
	 * @return {boolean}
	 */
	checked() : boolean;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;
}

declare var AwOnOff: {
	prototype: AwOnOff,
	new(): AwOnOff
}

interface AwRange extends HTMLElement
{
	inputElement: HTMLInputElement;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;
}

declare var AwRange: {
	prototype: AwRange,
	new(): AwRange
}

interface AwRangeDoble extends HTMLElement
{
	inputElement: HTMLInputElement;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input (min-max)
	 * 
	 * @return {string} Ex.: 4-20
	 */
	get_value() : string;
}

declare var AwRangeDoble: {
	prototype: AwRangeDoble,
	new(): AwRangeDoble
}

interface AwSelectable extends HTMLElement
{
	inputElement: HTMLInputElement;

	/**
	 * @method	checked
	 * 
	 * Indica si el input está checkeado o no
	 * 
	 * @return {boolean}
	 */
	checked() : boolean;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;
}

declare var AwSelectable: {
	prototype: AwSelectable,
	new(): AwSelectable
}

interface HTMLElementTagNameMap {
	"aw-checkbox": AwCheckbox;
	"aw-radio": AwRadio;
	"aw-onoff": AwOnOff;
	"aw-range": AwRange;
	"aw-range-double": AwRangeDoble;
	"aw-selectable": AwSelectable;
}
interface AwCheckbox extends HTMLElement
{
	inputElement: HTMLInputElement;
	checked: boolean;
	connectedfunc: Function;
	changefunc: Function;
	clickfunc: Function;

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
	checked: boolean;
	connectedfunc: Function;
	changefunc: Function;
	clickfunc: Function;

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

declare var AwRadio: {
	prototype: AwRadio,
	new(): AwRadio
}

interface AwOnOff extends HTMLElement
{
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;
	clickfunc: Function;

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
	 * @method	checked
	 * 
	 * Indica si el input está checkeado o no
	 * 
	 * @return {boolean}
	 */
	isChecked() : boolean;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue() : string;
}

declare var AwOnOff: {
	prototype: AwOnOff,
	new(): AwOnOff
}

interface AwRange extends HTMLElement
{
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;

	/**
	 * Obtiene el valor del input
	 */
	getValue() : string;
}

declare var AwRange: {
	prototype: AwRange,
	new(): AwRange
}

interface AwRangeDoble extends HTMLElement
{
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input (min-max)
	 * 
	 * @return {string} Ex.: 4-20
	 */
	getValue() : string;
}

declare var AwRangeDoble: {
	prototype: AwRangeDoble,
	new(): AwRangeDoble
}

interface AwSelectable extends HTMLElement
{
	inputElement: HTMLInputElement;
	connectedfunc: Function;
	changefunc: Function;

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
	getValue() : string;
}

declare var AwSelectable: {
	prototype: AwSelectable,
	new(): AwSelectable
}
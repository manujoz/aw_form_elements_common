import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_form_helpers/aw-input-error.js";

/**
 * Componente de checkbox
 * 
 * @attr {Boolean} error
 * @attr {String} errmsg
 * @attr {Boolean} noerrors
 * @attr {String} connectedfunc
 * @attr {String} clickfunc
 * @attr {String} changefunc
 * @cssprop --aw-primary-color
 * @cssprop --aw-primary-text-color
 * @cssprop --aw-error-color
 * @cssprop --aw-checkbox-background-color
 * @cssprop --aw-checkbox-border-color
 * @cssprop --aw-checkbox-checked-border-color
 * @cssprop --aw-checkbox-checked-color
 * @cssprop --aw-checkbox-disabled-color
 * @cssprop --aw-checkbox-icon-color
 * @cssprop --aw-checkbox-label-big-padding
 * @cssprop --aw-checkbox-label-color
 * @cssprop --aw-checkbox-label-font-size
 * @cssprop --aw-checkbox-label-font-style
 * @cssprop --aw-checkbox-label-font-weight
 * @cssprop --aw-checkbox-label-margin
 * @cssprop --aw-checkbox-label-padding
 * @cssprop --aw-checkbox-label-small-padding
 * @cssprop --aw-checkbox-label-text-align
 * @cssprop --aw-checkbox-subtitle-big-padding
 * @cssprop --aw-checkbox-subtitle-border
 * @cssprop --aw-checkbox-subtitle-color
 * @cssprop --aw-checkbox-subtitle-margin
 * @cssprop --aw-checkbox-subtitle-padding
 * @cssprop --aw-checkbox-subtitle-size
 * @cssprop --aw-checkbox-subtitle-small-padding
 * @cssprop --aw-checkbox-subtitle-text-align
 */
class AwRadio extends AwInputErrorMixin( AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement ))) {
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					width: 150px;
					display: inline-block;
					padding-bottom: var(--aw-input-padding-bottom, 12px);
					vertical-align: var(--aw-input-vertical-align, middle);
					cursor: pointer;
					-webkit-user-select: none;
					-moz-user-select: none;
					-khtml-user-select: none;
					-ms-user-select:none;
				}
				:host([unresolved]) {
					display: none;
				}
				:host([fullwidth]) {
					width: 100%;
				}
				
				/* INPUT OCULTO */
				
				#container input {
					display: none;
				}
				
				/* CONTENEDOR FLEX */
				
				.cont_aw_checkbox {
					position: relative;
					display: flex;
					flex-flow: row wrap;
				}
				.cont_aw_checkbox > div:nth-child(1) {
					position: relative;
					flex: 0 0;
					flex-grow: 0;
					flex-basis: 0;
				}
				.cont_aw_checkbox > div:nth-child(2) {
					position: relative;
					flex: 1;
					flex-grow: 1;
				}
				
				#aw_div_checkbox {
					position: relative;
					width: 16px;
					height: 16px;
					border: solid 2px var(--aw-checkbox-border-color,#333333);
					background-color: var(--aw-checkbox-background-color,transparent);
					border-radius: 50%;
					transition: border .2s;
					overflow: hidden;
				}
				#aw_div_checkbox[checked] {
					border: solid 2px var(--aw-checkbox-checked-border-color,var(--aw-checkbox-checked-color,var(--aw-primary-color,#1C7CDD)));
				}
				#aw_div_checkbox[error] {
					border: solid 2px var(--aw-input-error-color,var(--aw-error-color,#b13033));
				}
				#aw_div_checkbox[disabled] {
					border: solid 2px var(--aw-checkbox-disabled-color,var(--aw-input-disabled-color, #BBBBBB));
				}
				
				#aw_div_checkbox > div {
					position: absolute;
					top: 3px;
					left: 3px;
					width: calc(100% - 6px);
					height: calc(100% - 6px);
					border-radius: 50%;
					background-color: var(--aw-checkbox-checked-color,var(--aw-primary-color,#1C7CDD));
					transform: scale(0,0);
					transition: transform .2s;
				}
				#aw_div_checkbox[checked] > div {
					transform: scale(1.2,1.2);
				}
				#aw_div_checkbox[error] > div {
					background-color: var(--aw-input-error-color,var(--aw-error-color,#b13033));
				}
				#aw_div_checkbox[disabled] > div {
					background-color: var(--aw-checkbox-disabled-color,var(--aw-input-disabled-color, #BBBBBB));
				}
				
				/* LABEL Y SUBTITLE */
				
				#label {
					position: relative;
					margin: var(--aw-checkbox-label-margin,0px);
					padding: var(--aw-checkbox-label-padding,2px 0 0 6px);
					color: var(--aw-checkbox-label-color,var(--aw-primary-text-color,#333333));
					font-size: var(--aw-checkbox-label-font-size,var(--aw-font-size,16px));
					font-style: var(--aw-checkbox-label-font-style,normal);
					font-weight: var(--aw-checkbox-label-font-weight,300);
					text-align: var(--aw-checkbox-label-text-align,left);
				}
				#label[size="small"] {
					font-size: 12px;
					padding: var(--aw-checkbox-label-small-padding,4px 0 0 6px);
				}
				#label[size="big"] {
					font-size: 18px;
					padding: var(--aw-checkbox-label-big-padding,0 0 0 6px);
				}
				#label[error] {
					color: var(--aw-input-error-color,var(--aw-error-color,#b13033));
				}
				#label[disabled] {
					color: var(--aw-checkbox-disabled-color,var(--aw-input-disabled-color, #BBBBBB));
				}
				#subtitle {
					position: relative;
					margin: var(--aw-checkbox-subtitle-margin,3px 0 0 0);
					padding: var(--aw-checkbox-subtitle-padding,5px 0 0 6px);
					border-top: var(--aw-checkbox-subtitle-border,solid 1px #DDDDDD);
					font-size: var(--aw-checkbox-subtitle-size,12px);
					color: var(--aw-checkbox-subtitle-color,#888888);
					text-align: var(--aw-checkbox-subtitle-text-align,left);
				}
				#subtitle[size="small"] {
					font-size: 12px;
					padding: var(--aw-checkbox-subtitle-small-padding,4px 0 0 6px);
				}
				#subtitle[size="big"] {
					font-size: 18px;
					padding: var(--aw-checkbox-subtitle-big-padding,0 0 0 6px);
				}
				#subtitle[error] {
					color: var(--aw-input-error-color,var(--aw-error-color,#b13033));
					border-top: solid 1px var(--aw-input-error-color,var(--aw-error-color,#b13033));
				}
				#subtitle[disabled] {
					color: var(--aw-checkbox-disabled-color,var(--aw-input-disabled-color, #BBBBBB));
					border-top: solid 1px var(--aw-checkbox-disabled-color,var(--aw-input-disabled-color, #BBBBBB));
				}

				/* ESTILO OCULTO */

				.hidden, [hidden] {
					display: none;
				}
			</style>
			<div id="container" on-click="_click">
				<label><input type="radio"
					id$="[[id]]"
					name$="[[name]]"
					value$="{{value}}"
					checked$="{{checked}}"
					disabled$="[[disabled]]"
				
					required$="[[required]]"
					/></label>
					
				<div class="cont_aw_checkbox">
					<div>
						<div id="aw_div_checkbox" checked$="{{checked}}">
							<div></div>
						</div>
					</div>
					<div>
						<div id="label" hidden="{{!label}}" size$="[[size]]">{{label}}</div>
						<div id="subtitle" hidden="{{!subtitle}}" size$="[[size]]">{{subtitle}}</div>
					</div>
				</div>
			</div>
			<aw-input-error errmsg="{{errmsg}}">{{errmsg}}</aw-input-error>
		`;
	}

	static get properties() {
		return {
			// Atributos del checkbox
			// ......................
			
			/** Id del componente */
			id: { type: String },
			/** Nombre del componente */
			name: { type: String },
			/** Valor del componente */
			value: { type: String },
			/** Estado del checkbox */
			checked: {type: Boolean },
			/** Desactiva el componente */
			disabled: {type: Boolean },
			/**
			 * Tamaño del input
			 * @type {"big"|"small"}
			 */
			size: { type: String, reflectToAttribute: true },
			/** Pone el botón en ancho completo */
			fullwidth: { type: Boolean, reflectToAttribute: true },

			// Atributos de validación
			// ........................

			/** Indica que este campo es obligatorio */
			required: { type: Boolean },
			/** Nombre del grupo, para determinar los mincheck o maxcheck. El nombre puede ser cualquiera */
			checkgroup: { type: Number },
			/** Mínimo de checkbox que tienen que estar checkados en el grupo */
			mincheck: { type: Number },
			/** Máximo de checkbox que tienen que estar checkados en el grupo */
			maxcheck: { type: String },
			/** Evita la validación del checkbox */
			novalidate: { type: Boolean },

			// Relación con el aw-form
			// .......................

			/** El checkbox no es registrado en el formulario */
			noregister: { type: Boolean }
		}
	}
	
	constructor() {
		super();

		this.id = undefined;
		this.name = undefined;
		this.value = undefined;
		this.checked = false;
		this.disabled = false;
		this.label = false;
		this.subtitle = false;
		this.noregister = false;
		
		/** @type {HTMLInputElement} */
		this.inputElement = null;
		/** @type {HTMLInputElement} */
		this.input = null;
		/** @type {HTMLInputElement} */
		this.checkbox = null;
		/** @type {MutationObserver} */
		this.observerCheck = undefined;
		/** @type {AwForm} */
		this.parentForm = undefined;
	}
	
	/**
	 * @method	connectedCallback
	 * 
	 * Acciones a realizar al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();
		
		// Elementos del componente
		
		this.inputElement = this.$.container.querySelector( "input" );
		this.checkbox = this.$.aw_div_checkbox;

		// Asignamos el input de visibilidad
		
		this.input = this.inputElement;
		
		// Creamos el elemento
		
		this._create();
		
		// Observamos el checked del input
		
		this.observerCheck = new MutationObserver( ev => this._change( ev ));
		this.observerCheck.observe( this.inputElement, { attributes: true, attributeOldValue: true, attributeFilter: ['checked'] });

		// Escuchamos los errores

		this.error_listen();

		// Buscamos si tiene pertenee a un formulario

		this._register_in_form();
			
		// Resolvemos

		this.removeAttribute( "unresolved" );
	}
	
	/**
	 * @method	disconnectedCallback
	 * 
	 * Acciones a realizar al desconectar el componente.
	 */
	disconnectedCallback() {
		super.disconnectedCallback();
		
		// Dejamos de escuchar el checked del input
		
		this.observerCheck.disconnect();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.$.input );
		}
	}

	/**
	 * @method	check
	 * 
	 * Pone el checkbox como checkeado
	 */
	check() {
		if(this.checked) {
			return;
		}

		if( !this.hasAttribute( "checked" )) {
			this.setAttribute( "checked", "" );
		}

		this.checked = true;
	}

	/**
	 * @method	clear
	 * 
	 * Pone el checkbox como checkeado
	 */
	clear() {
		if(!this.checked) {
			return;
		}

		if( this.hasAttribute( "checked" )) {
			this.removeAttribute( "checked" );
		}
		
		this.checked = false;
	}

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide()
	{
		this.errorHide();
	}

	/**
	 * @method errorHide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	errorHide()
	{
		this.inputElement.setAttribute( "errmsg", "" );
	}

	 /**
	  * @method error_show
	  * @deprecated
	  * 
	  * Muestra u oculta un mensaje de error
	  * 
	  * @param {string} message Mensaje de error que se va a mostrar
	  */
	error_show( message ) {
		this.errorShow(message);
	}

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	errorShow( message )
	{
		this.inputElement.setAttribute( "errmsg", message );
	}

	/**
	 * @method get_value
	 * @deprecated
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value()
	{
		return this.getValue();
	}

	/**
	 * @method getValue
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	getValue()
	{
		return this.inputElement.value;
	}

	/**
	 * @method	has_error
	 * @deprecated
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error()
	{
		return this.hasError();
	}

	/**
	 * @method	hasError
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	hasError()
	{
		if( this.inputElement.getAttribute( "errmsg" )) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @method	isChecked
	 * 
	 * Indica si el input está checkeado o no
	 * 
	 * @return {boolean}
	 */
	isChecked()
	{
		if( this.inputElement.hasAttribute( "checked" )) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * @method	_setDisabled
	 * 
	 * Pone el componente como disabled.
	 */
	_setDisabled() {
		if ( this.disabled ) {
			this.$.aw_div_checkbox.setAttribute( "disabled", "" );
			this.$.label && this.$.label.setAttribute( "disabled", "" );
			this.$.subtitle && this.$.subtitle.setAttribute( "disabled", "" );
		} else {
			this.$.aw_div_checkbox.removeAttribute( "disabled" );
			this.$.label && this.$.label.removeAttribute( "disabled" );
			this.$.subtitle && this.$.subtitle.removeAttribute( "disabled" );
		}
	}
	
	/**
	 * @method	_create
	 * 
	 * Crea el checkbox
	 */
	_create() {
		var label = this.querySelector( "label" );
		var subtitle = this.querySelector( "subtitle" );
		
		if( label ) {
			this.label = label.innerHTML;
		}
		
		if( subtitle ) {
			this.subtitle = subtitle.innerHTML;
		}
	}

	/**
	 * @method	_register_in_form
	 * 
	 * Registra el elemento en el formulario.
	 */
	_register_in_form() {
		// Si no debe registrarse

		if( this.noregister ) {
			return false;
		}

		// Registramos el elemento

		this.dispatchEvent(new CustomEvent('aw-form-element-register', { detail: this, bubbles: true, composed: true }));
	}
	
	/**
	 * @method	_change
	 * 
	 * Acciones a realizar cuando cambia el checkbox.
	 */
	_change() {
		if( this.inputElement.hasAttribute( "checked" )) {				
			this.checked = true;
		} else {
			this.checked = false;
		}
		
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}
	}
	
	/**
	 * @method	_click
	 * 
	 * Acciones a realizar cuando se hace click sobre el checkbox.
	 */
	_click() {
		
		// Invocamos la función externa de change change

		if ( typeof this.clickfunc === "function" ) {
			this.clickfunc( this.inputElement );
		}
		
		// Si es disabled detenemos
		
		if( this.disabled ) {
			return false;
		}
		
		if( !this.checked) {
			// Buscamos inputs con el mismo nomnre
			
			var radios = document.querySelectorAll( "aw-radio" );
			for( let i = 0; i < radios.length; i++ ) {
				
				if( radios[ i ].name === this.name ) {
					let input = radios[ i ].shadowRoot.querySelector( "input[type=radio]");
					
					if( input !== this.inputElement ) {
						input.removeAttribute( "checked" );
					}
				}
			}
			
			this.checked = true;
		} else {
			this.checked = false;
		}
		
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}
		
	}
}

window.customElements.define( "aw-radio", AwRadio );
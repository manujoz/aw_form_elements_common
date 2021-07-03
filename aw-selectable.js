import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_form_helpers/aw-input-error.js";

/**
 * Componente selectable
 * 
 * @attr {Boolean} error
 * @attr {String} errmsg
 * @attr {Boolean} noerrors
 * @attr {String} connectedfunc
 * @attr {String} changefunc
 * @cssprop --aw-primary-color
 * @cssprop --aw-error-color
 * @cssprop --aw-selectable-background-color
 * @cssprop --aw-selectable-border
 * @cssprop --aw-selectable-border-radius
 * @cssprop --aw-selectable-box-shadow
 * @cssprop --aw-selectable-duration
 * @cssprop --aw-selectable-effect-background-color
 * @cssprop --aw-selectable-height
 * @cssprop --aw-selectable-mark-background-color
 * @cssprop --aw-selectable-mark-borde
 * @cssprop --aw-selectable-mark-box-shadow
 * @cssprop --aw-selectable-mark-width
 * @cssprop --aw-selectable-off-background-color
 * @cssprop --aw-selectable-off-color
 * @cssprop --aw-selectable-off-effect-intensity
 * @cssprop --aw-selectable-off-font-size
 * @cssprop --aw-selectable-off-font-weight
 * @cssprop --aw-selectable-off-text-align
 * @cssprop --aw-selectable-on-background-color
 * @cssprop --aw-selectable-on-color
 * @cssprop --aw-selectable-on-effect-intensity
 * @cssprop --aw-selectable-on-font-size
 * @cssprop --aw-selectable-on-font-weight
 * @cssprop --aw-selectable-on-text-align
 * @cssprop --aw-selectable-tag-color
 * @cssprop --aw-selectable-tag-font-size
 * @cssprop --aw-selectable-tag-font-weight
 * @cssprop --aw-selectable-tag-padding
 * @cssprop --aw-selectable-tag-text-align
 * @cssprop --aw-selectable-width
 */
class AwSelectable extends AwInputErrorMixin( AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement ))) 
{
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					display: inline-block;
                	font-family: var(--aw-input-font-family, "arial");
					vertical-align: var(--aw-input-vertical-align, middle);
					-webkit-user-select: none;
					-moz-user-select: none;
					-khtml-user-select: none;
					-ms-user-select:none;
				}
				:host([unresolved]) {
					display: none;
				}

				/* #region Generales */

				.hidden, [hidden], [unresolved] {
					display: none;
				}

				/* #region Etiqueta del input */

				#label {
					position: relative;
					color: var(--aw-input-label-color,#888888);
					font-size: var(--aw-input-label-font-size,11px);
					font-weight: var(--aw-input-label-font-weight,normal);
					margin: var(--aw-input-label-margin,0);
					padding: var(--aw-input-label-padding,0);
					text-align: var(--aw-input-label-text-align,left);
					transition: color .2s;
				}
				#label[writted] {
					color: var(--aw-input-label-color-writted,var(--aw-input-label-color,#888888));
				}
				#label[focused] {
					color: var(--aw-input-label-color-focused,var(--aw-primary-color,#1C7CDD));
				}
				#label[error] {
					color: var(--aw-input-label-color-error,var(--aw-error-color,#b13033));
				}
				#label[disabled] {
					color: var(--aw-input-label-color-disabled,var(--aw-input-color-disabled,#BBBBBB));
				}

				/* #region Contenedor */

				.container {
					position: relative;
					display: flex;
					flex-flow: row wrap;
				}

				/* #region Etiqueta lateral */

				#tag {
					position: relative;
					flex-grow: 0;
					flex-basis: 0;
					white-space: nowrap;
					color: var(--aw-selectable-tag-color);
					font-size: var(--aw-selectable-tag-font-size, 14px);
					font-weight: var(--aw-selectable-tag-font-weight);
					padding: var(--aw-selectable-tag-padding,0 7px 0 0);
					text-align: var(--aw-selectable-tag-text-align,left);
					display: flex;
					flex-flow: row wrap;
					align-items: center;
					justify-content: flex-start;
				}
				#tag[size=small] {
					font-size: 12px;
				}
				#tag[size=big] {
					font-size: 18px;
				}
				
				/* #region Selectable */

				.selectable {
					position: relative;
					flex-grow: 1;
					flex-basis: 0;
					min-width: var(--aw-selectable-width, 90px);
					height: var(--aw-selectable-height, 22px);
					border: var(--aw-selectable-border, solid 1px #DDDDDD);
					border-radius: var(--aw-selectable-border-radius, 4px);
					box-shadow: var(--aw-selectable-box-shadow,none);
					background-color: var(--aw-selectable-background-color,#333333);
					overflow: hidden;
					cursor: pointer;
				}
				.selectable:hover .inner .on::before {
					opacity: var(--aw-selectable-on-effect-intensity,.25);
				}
				.selectable:hover .inner .off::before {
					opacity: var(--aw-selectable-off-effect-intensity,.25);
				}
				.selectable[checked] .inner{
					left: 0%;
				}
				.inner {
					position: absolute;
					top: 0;
					left: -100%;
					width: 200%;
					height: 100%;
					transition: left var(--aw-selectable-duration,0.4s);
				}
				.inner .on {
					position: absolute;
					top: 0;
					left: 0;
					width: 50%;
					height: 100%;
					text-align: var(--aw-selectable-on-text-align, center);
					background-color: var(--aw-selectable-on-background-color,#209e4a);
					color: var(--aw-selectable-on-color,white);
					font-size: var(--aw-selectable-on-font-size,var(--aw-selectable-font-size,10px));
					font-weight: var(--aw-selectable-on-font-weight,var(--aw-selectable-font-weight,bold));
					transition: opacity .3s;
					display: flex;
					flex-flow: row wrap;
					align-items: center;
					justify-content: center;
				}
				.inner .on::before {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					content: "";
					background-color: var(--aw-selectable-effect-background-color,#333333);
					opacity: 0;
					transition: opacity .3s;
				}
				.inner .off {
					position: absolute;
					top: 0;
					left: 50%;
					width: 50%;
					height: 100%;
					text-align: var(--aw-selectable-off-text-align, center);
					background-color: var(--aw-selectable-off-background-color,#aa2020);
					color: var(--aw-selectable-off-color,white);
					font-size: var(--aw-selectable-off-font-size,var(--aw-selectable-font-size,10px));
					font-weight: var(--aw-selectable-off-font-weight,var(--aw-selectable-font-weight,bold));
					transition: opacity .3s;
					display: flex;
					flex-flow: row wrap;
					align-items: center;
					justify-content: center;
				}
				.inner .off::before {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					content: "";
					background-color: var(--aw-selectable-effect-background-color,#333333);
					opacity: 0;
					transition: opacity .3s;
				}
				.inner .mark {
					position: absolute;
					top: 0;
					left: calc(50% - calc(var(--aw-selectable-mark-width,14px) / 2));
					width: var(--aw-selectable-mark-width,14px);
					height: 100%;
					background-color: var(--aw-selectable-mark-background-color, white);
					border: var(--aw-selectable-mark-border, none);
					box-shadow: var(--aw-selectable-mark-box-shadow,0 0 1px #333333);
				}
				.inner span {
					position: relative;
					flex-grow: 0;
					flex-basis: 0;
					z-index: 1;
				}
			</style>
			<div id="label" hidden="{{!label}}">{{label}}</div>
			<div class="container">
				<div id="tag" size$="[[size]]" hidden="{{!tag}}">{{tag}}</div>
				<div class="selectable" checked$="{{checked}}" on-click="_click">
					<div class="inner">
						<div class="on"><span hidden="{{!ontext}}">{{ontext}}</span></div>
						<div class="off"><span hidden="{{!offtext}}">{{offtext}}</span></div>
						<div class="mark"></div>
					</div>
				</div>
			</div>
			<input 
				type="hidden"
				id$="[[id]]"
				name$="[[name]]"
				value$="{{value}}"
				checked$="{{checked}}"
				disabled$="{{disabled}}"
				required$="[[required]]"
			/>
		`;
	}
	
	static get properties() {
		return {
			// Atributos del selectable
			// ..........................
			
			/** Id del componente */
			id: { type: String, value: "" },
			/** Nombre del componente */
			name: { type: String, value: "" },
			/** Valor del componente */
			value: { type: String, value: "" },
			/** Estado del componente */
			checked: {type: Boolean, value: false },
			/** Desactiva el componente */
			disabled: {type: Boolean, value: false },

			// Atributos de diseño
			// ..........................

			/** Label del componente */
			label: { type: String },
			/** Etiqueta del componente */
			tag: { type: String },
			/** Texto cuando está activo */
			ontext: { type: String, value: "" },
			/** Texto cuando está inactivo */
			offtext: { type: String, value: "" },
			/**
			 * Tamaño del input
			 * @type {"big"|"small"}
			 */
			size: { type: String, reflectToAttribute: true },

			// Atributos de validación

			/** Indica que es obligatorio */
			required: { type: Boolean, value: false },
			/** No valida el componente */
			novalidate: { type: Boolean, value: false },

			// Relación con el aw-form
			// ..........................

			/** El componente no se registras en el formmulario */
			noregister: { type: Boolean, value: false }
		};
	}

	constructor() {
		super();

		this.id = undefined;
		this.name = undefined;
		this.value = undefined;
		this.checked = false;
		this.disabled = false;
		this.label = undefined;
		this.tag = "";
		this.ontext = "";
		this.offtext = "";

		/** @type {HTMLInputElement} */
		this.inputElement = null;
		/** @type {HTMLInputElement} */
		this.input = null;
		/** @type {MutationObserver} */
		this.observerCheck = undefined;
		/** @type {MutationObserver} */
		this.observerDisabled = undefined;
		/** @type {AwForm} */
		this.parentForm = undefined;
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Acciones a realizar cuando conecta el componente.
	 */
	connectedCallback() {
		super.connectedCallback();
	
		// Elementos del componente
		
		this.inputElement = this.shadowRoot.querySelector( "input" );
	
		// Observamos el checked del input
		
		this.observerCheck = new MutationObserver( ev => this._change( ev ));
		this.observerCheck.observe( this.inputElement, { attributes: true, attributeOldValue: true, attributeFilter: ['checked'] });
	
		// Observamos el disabled del input
		
		this.observerDisabled = new MutationObserver( ev => this._changeDisabled( ev ));
		this.observerDisabled.observe( this.inputElement, { attributes: true, attributeOldValue: true, attributeFilter: ['disabled'] });

		// Escuchamos los errores

		this.error_listen();

		// Buscamos si tiene pertenee a un formulario

		this._register_in_form();

		// Seteamos el inicio

		//this._set();

		// Marcamos como disabled si corresponde

		this._setDisabled();

		// Invocamos la función externa connected

		if ( typeof this.connectedfunc === "function" ) {
			this.connectedfunc( this );
		}
		
		// Resolvemos

		this.removeAttribute( "unresolved" );    
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Acciones a realizar cuando se desconecta el componente.
	 */
	disconnectedCallback(){
		super.disconnectedCallback();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.$.input );
		}
		
		// Dejamos de escuchar el evento

		this.observerCheck.disconnect();
		this.observerDisabled.disconnect();
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
	 * @method	checked
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
	 * @method	_change
	 * 
	 * Acciones a realizar cuando cambia el componente.
	 */
	_change() {	
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}
	}

	/**
	 * @method	_click
	 * 
	 * Acciones a realizar cuando se hace click.
	 */
	_click()
	{
		if( !this.checked ) {
			this.checked = true;
		} else {
			this.checked = false;
		}
	}

	/**
	 * @method	_registerInForm
	 * 
	 * Registra el componente en el formulario.
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
	 * @method	_setDisabled
	 * 
	 * Pone el checkbox como desactivado.
	 */
	_setDisabled() {
		if ( this.disabled ) {
			this.shadowRoot.querySelector( ".selectable" ).setAttribute( "disabled", "" );
		} else {
			this.shadowRoot.querySelector( ".selectable" ).removeAttribute( "disabled" );
		}
	}
}

window.customElements.define( "aw-selectable", AwSelectable );
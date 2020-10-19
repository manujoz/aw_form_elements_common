import { PolymerElement, html } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwInputErrorMixin } 			from "../aw_form_mixins/aw-input-error-mixin.js";
import { AwFormValidateMixin } 			from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 		from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_form_helpers/aw-input-error.js";

class AwOnOff extends AwInputErrorMixin( AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement ))) {
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					width: 30px;
					display: inline-block;
					vertical-align: var(--aw-input-vertical-align, middle);
					-webkit-user-select: none;
					-moz-user-select: none;
					-khtml-user-select: none;
					-ms-user-select:none;
				}
				:host([unresolved]) {
					display: none;
				}

				.cont_onoff {
					position: relative;
					width: 30px;
					height: 14px;
					border-radius: 5px;
					background-color: var(--aw-input-onoff-bg-off,#e0e0e0);
					cursor: pointer;
					transition: background .3s;
				}

				.cont_onoff[disabled] {
					opacity: 0.7;;
				}

				.cont_onoff > .circle {
					position: absolute;
					width: 18px;
					height: 18px;
					top: -2px;
					left: -6px;
					border-radius: 50%;
					background-color: var(--aw-input-onoff-bt-off,#BBBBBB);
					transition: background .3s, left .3s;
				}

				.cont_onoff[active] {
					background-color: var(--aw-input-onoff-bg-on,#98c298);
				}

				.cont_onoff[active] > .circle {
					background-color: var(--aw-input-onoff-bt-on,#508050);
					left: calc(100% - 12px);
				}
			</style>
			<div id="container">
				<div class="cont_onoff" on-click="_click">
					<div class="circle"></div>
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
			</div>
		`;
	}
	
	static get properties() {
		return {
			// Elementos del input

			inputElement: { type: Object, value: null },
			input: { type: Boolean, value: false },
			
			// Atributos del checkbox
			
			id: { type: String, value: "" },
			name: { type: String, value: "" },
			value: { type: String, value: "" },
			checked: {type: Boolean, value: false },
			disabled: {type: Boolean, value: false },
			subtitle: { type: String, value: "" },
		
			// Observer
			
			observerCheck: { type: Object, value: null },
			observerDisabled: { type: Object, value: null },

			// Atributos de validación

			required: { type: Boolean, value: false },
			novalidate: { type: Boolean, value: false },

			// Relación con el aw-form y el form

			parentForm: Object,
			noregister: { type: Boolean, value: false }
		};
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Acciones a realizar cuando conecta el componente.
	 */
	connectedCallback() {
		super.connectedCallback();
	
		// Elementos del componente
		
		this.inputElement = this.$.container.querySelector( "input" );

		// Asignamos el input de visibilidad
		
		this.input = this.inputElement;
	
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

		this._set();

		// Marcamos como disabled si corresponde

		this._setDisabled();
		
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
	 * @method	checked
	 * 
	 * Indica si el input está checkeado o no
	 * 
	 * @return {boolean}
	 */
	checked()
	{
		if( this.inputElement.hasAttribute( "checked" )) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value()
	{
		return this.inputElement.value;
	}

	/**
	 * @method	_set
	 * 
	 * Activa el botón si está checado al iniciar.
	 */
	_set() {
		if( this.checked ) {
			this.$.container.querySelector( ".cont_onoff" ).setAttribute( "active", "" );
		}
	}

	/**
	 * @method	_changeDisabled
	 * 
	 * Cambia el disabled del componente.
	 */
	_changeDisabled() {
		if( this.inputElement.hasAttribute( "disabled" )) {
			this.disabled = true;
		} else {
			this.disabled = false;
		}

		if( this.disabled && !this.hasAttribute( "disabled" )) {
			this.setAttribute( "disabled", "" );
		} else if( !this.disabled && this.hasAttribute( "disabled" )) {
			this.removeAttribute( "disabled" );
		}

		this._setDisabled();
	}
	
	/**
	 * @method	_setDisabled
	 * 
	 * Pone el checkbox como desactivado.
	 */
	_setDisabled() {
		if ( this.disabled ) {
			this.shadowRoot.querySelector( ".cont_onoff" ).setAttribute( "disabled", "" );
		} else {
			this.shadowRoot.querySelector( ".cont_onoff" ).removeAttribute( "disabled" );
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
	 * @method	_click
	 * 
	 * Acciones que se realizan al hacer click en el botón.
	 */
	_click() {
		if( this.disabled ) {
			return false;
		}

		if( !this.checked ) {
			if( !this.hasAttribute( "checked" )) {
				this.setAttribute( "checked", "" );
			}
			this.checked = true;
		} else {
			if( this.hasAttribute( "checked" )) {
				this.removeAttribute( "checked" );
			}
			this.checked = false; 
		}
		
		// Invocamos la función externa de change change

		if ( typeof this.clickfunc === "function" ) {
			this.clickfunc( this.inputElement );
		}
	}
	
	/**
	 * @method	_change
	 * 
	 * Acciones a realizar cuando cambia el componente.
	 */
	_change() {
		if( this.checked ) {
			this.$.container.querySelector( ".cont_onoff" ).setAttribute( "active", "" );
		} else {
			this.$.container.querySelector( ".cont_onoff" ).removeAttribute( "active" );
		}
	
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}
	}
}

window.customElements.define( "aw-onoff", AwOnOff );
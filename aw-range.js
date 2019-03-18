import { PolymerElement, html, Polymer } 	from "../aw_polymer_3/polymer/polymer-element.js";
import { AwFormValidateMixin } 				from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 			from "../aw_extern_functions/aw-extern-functions-mixin.js";

class AwRange extends AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement )) {
	static get template() {
		return html`
			<style>
				:host {
					position: relative;
					min-width: 150px;
					padding: 0px;
					padding-top: 15px;
					margin-bottom: 2px;
					background-color: var(--aw-input-range-bg-color, white);
					vertical-align: var(--aw-input-vertical-align, middle);
					display: inline-block;
					-webkit-user-select: none;
					-moz-user-select: none;
					-khtml-user-select: none;
					-ms-user-select:none;
				}
				:host([unresolved]) {
					display: none;
				}

				#label {
					position: absolute;
					top: -16px !important;
					left: 0px !important;
					color: var(--aw-input-range-label-color,var(--aw-input-label-color,var(--aw-input-placeholder-color,#888888)));
					font-family: var(--aw-input-range-label-font-family,var(--aw-input-font-family, "arial"));
					font-size: var(--aw-input-range-label-font-size,12px);
					font-weight: var(--aw-input-range-label-font-weight,normal);
					text-align: var(--aw-input-range-label-text-align,left);
					white-space: nowrap;
					transition: color .2s;
				}
				#label[focused] {
					color: var(--aw-input-label-color-focus,var(--aw-primary-color, #1C7CDD));
				}
				#label[disabled] {
					color: var(--aw-input-disabled-color, #BBBBBB) !important;
				}

				#container {
					position: relative;
					width: 100%;
					display: inline-block;
					min-height: 20px;
				}
				
				#container > input {
					display: none;
				}
				
				/* SLIDER */
				
				#cont_slider {
					position: absolute;
					top: calc(50% - 2px);
					left: 5px;
					width: calc(100% - 10px);
					height: 4px;
					background-color: var(--aw-input-range-line-color,#CCCCCC);
					border-radius: 2px;
				}
				#bar {
					position: absolute;
					top: 0px;
					left: 0px;
					height: 100%;
					width: 0px;
					background-color: var(--aw-input-range-bar-color,var(--aw-primary-color,#1C7CDD));
					border-radius: 2px;
				}
				#slider {
					position: absolute;
					top: 0x;
					left: 0px;
					width: 1px;
					height: 100%;
				}
				
				#slider > div {
					position: absolute;
					top: calc(50% - 10px);
					height: 20px;
					left: -10px;
					width: 20px;
					border-radius: 50%;
					background-color: var(--aw-input-range-bar-color,var(--aw-primary-color,#1C7CDD));
					border: solid 3px var(--aw-input-range-bg-color, white);
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					-ms-box-sizing: border-box;
					box-sizing: border-box;
					cursor: pointer;
				}
				
				.cont_value {
					position: absolute;
					top: 0px;
					right: 0px;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					font-size: 14px;
					padding-bottom: 2px;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					-ms-box-sizing: border-box;
					box-sizing: border-box;
					transition: color .3s;
				}
				.cont_value[focused] {
					color: var(--aw-input-range-bar-color,var(--aw-primary-color,#1C7CDD));
				}

				/* ESTILO OCULTO */

				.hidden, [hidden] {
					display: none;
				}
			</style>
			<div id="container">
				<div id="label" hidden="{{!label}}">{{label}}</div>
				<div id="cont_slider" on-click="_click">
					<div id="bar"></div>
					<div id="slider">
						<div></div>
					</div>
				</div>
				<div class="cont_value" hidden="{{!showvalue}}">{{value}}</div>
				<input
					id$="[[id]]"
					name$="[[name]]"
					value$="{{value}}"
					
					data-type="range"
					/>
			</div>
		`;
	}

	static get properties() {
		return {
			// Elemento del input

			inputElement: { type: Object, value: null },
			input: { type: Boolean, value: false },
			
			// Elementos del slider
			
			contenedor: { type: Object, value: null },
			bar: { type: Object, value: null },
			slider: { type: Object, value: null },
			divValue: { type: Object, value: null },
			
			// Atributos del input
			
			id: { type: String, value: "" },
			name: { type: String, value: "" },
			value: { type: Number },
			min: { type: Number, value: 0 },
			max: { type: Number, value: 10 },
			step: { type: Number, value: 1 },
			label: { type: String, value: "" },
			showvalue: { type: Boolean, value: false },

			// Relación con el aw-form y el form

			parentForm: Object,
			noregister: { type: Boolean, value: false }
		};
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Acciones a realizar al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();
		
		// Cogemos el input
		
		this.inputElement = this.$.container.querySelector( "input" );

		// Asignamos el input de visibilidad
		
		this.input = this.inputElement;
		
		// Cogemos los elementos
		
		this.contenedor = this.$.cont_slider;
		this.bar = this.$.bar;
		this.slider = this.$.slider;
		this.divValue = this.shadowRoot.querySelector( ".cont_value" );
		
		// Ajustes del componente
		
		this.startLeft = 0; // Indica la posición inicial al empezar a deslizar el slider
		this.orStep = this.step; // Indica el step original antes de ser ajustado
		
		// Ajustamos los atributos
		
		this._setAttributes();
		
		// Ajustamos el step
		
		this._adjustComponent();	
		
		// Asignamos el gestures
		
		this._setGestures();

		// Buscamos si tiene pertenee a un formulario

		this._register_in_form();
		
		// Resolvemos

		this.removeAttribute( "unresolved" );
	}
	
	/**
	 * @method	disconnectedCallback
	 * 
	 * Acciones a realizar cuando se desconecta el componente.
	 */
	disconnectedCallback() {
		super.disconnectedCallback();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.$.input );
		}
		
		Polymer.Tactil.remove( this.slider, 'track', this._handleTrack.bind( this ));
	}

	/**
	 * @method	_setAttributes
	 * 
	 * Asigna los atributos del componente.
	 */
	_setAttributes() {
		if( this.min > this.max ) {
			this.max = this.min + 10;
		}
		
		// Ajustamos la división de value y el ancho del slider
		
		if( this.showvalue ) {
			let ancho = 92;
			if( this.max >= 10000000000 || this.min <= -10000000000) {
				ancho = 85;
			} else if( this.max >= 1000000000 || this.min <= -1000000000 ) {
				ancho = 78;
			} else if( this.max >= 100000000 || this.min <= -100000000 ) {
				ancho = 71;
			} else if( this.max >= 10000000 || this.min <= -10000000 ) {
				ancho = 63;
			} else if( this.max >= 1000000 || this.min <= -1000000 ) {
				ancho = 56;
			} else if( this.max >= 100000 || this.min <= -100000 ) {
				ancho = 48;
			} else if( this.max >= 10000 || this.min <= -10000 ) {
				ancho = 41;
			} else if( this.max >= 1000 || this.min <= -1000 ) {
				ancho = 34;
			} else if( this.max >= 100 || this.min <= -100 ) {
				ancho = 27;
			} else {
				ancho = 20;
			}
			
			this.divValue.style.width = ancho + "px";
			this.contenedor.style.width = "calc(100% - " + (17 + ancho) + "px)";
		}
		
		// Ponemos el value
		
		if( !this.value ) {
			this.value = this.min;
		}
		
		if( this.value < this.min ) {
			this.min = this.value;
		}
		if ( this.value > this.max ) {
			this.max = this.value;
		}
	}
	
	/**
	 * @method	_adjustComponent
	 * 
	 * Ajusta el componente.
	 */
	_adjustComponent() {
		// Recurrimos si no se ha cargado el contenedor
		
		if( this.contenedor.offsetWidth === 0 ) {
			setTimeout(function(){
				this._adjustComponent();
			}.bind( this ), 20);
			return false;
		}
		
		this._adjustStep();
		
		if( this.value !== this.min ) {
			this._adjustValue();
		}
	}
	
	/**
	 * @method	_adjustStep
	 * 
	 * Ajusta los pasos del componente.
	 */
	_adjustStep() {
		// Calculamos los valores necesarios
		
		var ancho = this.contenedor.offsetWidth;
		var diff = this.max - this.min;
		var divisiones = diff / this.step;
		
		// Si hay más divisiones que ancho reajustamos el step
		
		if( divisiones > ancho ) {
			var step = diff / ancho;
			this.step = parseFloat(step.toFixed( 2 ));
			divisiones = diff / this.step;
		}
		
		while( divisiones > ancho ) {
			this.step = this.step + 0.1;
			divisiones = diff / this.step;
		}
	}
	
	/**
	 * @method	_adjustValue
	 * 
	 * Ajusto el value del componente.
	 */
	_adjustValue() {
		// Calculamos los valores necesarios
		
		var ancho = this.contenedor.offsetWidth;
		var diff = this.max - this.min;
		var divisiones = diff / this.step;
		var anchoDiv = (ancho / diff) * this.step;
		
		// Calculamo el newLeft
		
		var newLeft = this.value * anchoDiv;
		if( this.orStep !== this.step ) {
			newLeft = this.value / this.step;
		}
		
		// Movemos el slider
		
		this.bar.style.width = newLeft + "px";
		this.slider.style.left = newLeft + "px";
	}
	
	/**
	 * @method	_getValue
	 * 
	 * Obtiene el value del input.
	 */
	_getValue() {
		var newLeft = parseInt( window.getComputedStyle( this.slider, null ).getPropertyValue( "left" ).replace( "px", "" ));
		var ancho = this.contenedor.offsetWidth;
		var diff = this.max - this.min;
		var divisiones = diff / this.step;
		var anchoDiv = (ancho / diff) * this.step;
		var divsMovidas = newLeft / anchoDiv;
		
		var value = divsMovidas * this.step;
		
		// Comprobamos si el step original es enetero para ajustar el value
		
		if( this.orStep - Math.floor(this.orStep ) === 0 ) {
			// Es entero
			this.value = Math.round( value );
		} else {
			divsMovidas = parseInt(newLeft / anchoDiv);
			value = divsMovidas * this.step;
			this.value = parseFloat( value.toFixed( 1 ));
		}
	}
	
	/**
	 * @method	_setGestures
	 * 
	 * Asigna los gestures al componente.
	 */
	_setGestures() {
		Polymer.Tactil.add( this.slider, "track", this._handleTrack.bind( this ));
	}
	
	/**
	 * @method	_handleTrack
	 * 
	 * Maneja el movimiento táctil.
	 */
	_handleTrack( response ) {
		if ( response.state === "start" ) {
			this._startTrack();
		}
		
		if ( response.state === "track" ) {
			this._tracking( response );
		}

		if ( response.state === "end") {
			this._endTrack();
		}
	}
	
	/**
	 * @method	_startTrack
	 * 
	 * Comienza el movimiento táctil.
	 */
	_startTrack() {
		this.startLeft = parseInt( window.getComputedStyle( this.slider, null ).getPropertyValue( "left" ).replace( "px", "" ));
		
		this.divValue.setAttribute( "focused", "" );
		this.$.label.setAttribute( "focused", "" );
	}
	
	/**
	 * @method	_tracking
	 * 
	 * Función que controla el movimiento táctil.
	 */
	_tracking( detail ) {
		// Calculamos los valores necesarios
		
		var ancho = this.contenedor.offsetWidth;
		var diff = this.max - this.min;
		var divisiones = diff / this.step;
		var anchoDiv = parseInt((ancho / diff) * this.step);
		var divsMovidas = parseInt( detail.dx / anchoDiv );
		
		// Calculmaos el nuevo left
		
		var newLeft = divsMovidas * anchoDiv + this.startLeft;
		
		// Ajustamos el left
		
		if( newLeft < 0 ) {
			newLeft = 0;
			divsMovidas = 0;
		}
		
		if( newLeft > this.contenedor.offsetWidth ) {
			newLeft = this.contenedor.offsetWidth;
			divsMovidas = divisiones;
		}
		
		// Movemos el slider
		
		this.bar.style.width = newLeft + "px";
		this.slider.style.left = newLeft + "px";
		
		// Obtenemos el value
		
		this._getValue( newLeft, divsMovidas );
	}
	
	/**
	 * @method	_endTrack
	 * 
	 * Métodos que finaliza el movimiento táctil.
	 */
	_endTrack() {
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}
		
		this.divValue.removeAttribute( "focused" );
		this.$.label.removeAttribute( "focused" );
	}

	/**
	 * @method	_register_in_form
	 * 
	 * Registra el input en el formulario de Arisman Webs.
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
	 * Acciones a realizar cuandl se hace click sobre el campo.
	 */
	_click( ev ) {
		if( ev.target.id !== "bar" && ev.target.id !== "cont_slider" ) {
			return false;
		}
		
		var ancho = this.contenedor.offsetWidth;
		var diff = this.max - this.min;
		var divisiones = diff / this.step;
		var anchoDiv = (ancho / diff) * this.step;
		var divsMovidas = Math.round( ev.layerX / anchoDiv );
		
		var newLeft = divsMovidas * anchoDiv;
		
		// Movemos el slider
		
		this.bar.style.width = newLeft + "px";
		this.slider.style.left = newLeft + "px";
		
		this._getValue();
	}
}

window.customElements.define( "aw-range", AwRange );
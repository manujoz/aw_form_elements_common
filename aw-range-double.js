import { PolymerElement, html, Polymer } 	from "../aw_polymer_3/polymer/polymer-element.js";
import { AwFormValidateMixin } 				from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 			from "../aw_extern_functions/aw-extern-functions-mixin.js";

/**
 * Componente de aw-range-doeble
 * 
 * @attr {String} connectedfunc
 * @attr {String} changefunc
 * @cssprop --aw-primary-color
 * @cssprop --aw-error-color
 * @cssprop --aw-input-range-bar-color
 * @cssprop --aw-input-range-bg-color
 * @cssprop --aw-input-range-color
 * @cssprop --aw-input-range-font-size
 * @cssprop --aw-input-range-font-weight
 * @cssprop --aw-input-range-label-color
 * @cssprop --aw-input-range-label-font-family
 * @cssprop --aw-input-range-label-font-weight
 * @cssprop --aw-input-range-label-text-align
 * @cssprop --aw-input-range-line-color
 * @cssprop --aw-input-range-value-padding
 */
class AwRangeDouble extends AwFormValidateMixin( AwExternsFunctionsMixin( PolymerElement )) {
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
				:host([fullwidth]) {
					width: 100%;
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
					color: var(--aw-input-range-label-color-focus,var(--aw-input-label-color-focus,var(--aw-primary-color, #1C7CDD)));
				}
				#label[disabled] {
					color: var(--aw-input-range-disabled-color,var(--aw-input-disabled-color, #BBBBBB)) !important;
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
					width: 100%;
					background-color: var(--aw-input-range-bar-color,var(--aw-primary-color,#1C7CDD));
					border-radius: 2px;
				}
				#slider1 {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 1px;
					height: 100%;
				}
				#slider2 {
					position: absolute;
					top: 0px;
					left: 100%;
					width: 1px;
					height: 100%;
				}
				
				#slider1 > div, #slider2 > div {
					position: absolute;
					top: calc(50% - 10px);
					height: 20px;
					left: -10px;
					width: 20px;
					border-radius: 50%;
					background-color: var(--aw-input-range-slider-color,var(--aw-input-range-bar-color,var(--aw-primary-color,#1C7CDD)));
					border: solid 3px var(--aw-input-range-bg-color, white);
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					-ms-box-sizing: border-box;
					box-sizing: border-box;
					cursor: pointer;
				}
				
				.cont_value_1, .cont_value_2 {
					position: absolute;
					top: 0px;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					color: var(--aw-input-range-color, #333333);
					font-size: var(--aw-input-range-font-size, 14px);
					font-weight: var(--aw-input-range-font-weight, normal);
					padding: var(--aw-input-range-value-padding, 0 0 2px 0);
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					-ms-box-sizing: border-box;
					box-sizing: border-box;
					transition: color .3s;
				}
				.cont_value_1 {
					left: 0px;
				}
				.cont_value_2 {
					right: 0px;
				}
				.cont_value_1[focused],.cont_value_2[focused] {
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
					<div id="slider1">
						<div></div>
					</div>
					<div id="slider2">
						<div></div>
					</div>
				</div>
				<div class="cont_value_1" hidden="{{!showvalue}}">{{val1}}</div>
				<div class="cont_value_2" hidden="{{!showvalue}}">{{val2}}</div>
				<input
					id$="[[id]]"
					name$="[[name]]"
					value$="{{value}}"
					type="hidden"
					
					data-type="range"
					/>
			</div>
		`;
	}

	static get properties() {
		return {
			// Atributos del input
			// ......................
			
			/** Id del componente */
			id: { type: String },
			/** Nombre del componente */
			name: { type: String },
			/** Valor del componente */
			value: { type: Number },
			/** Valor mínimo del componente */
			min: { type: Number },
			/** Valor máximo del componente */
			max: { type: Number },
			/** Pasos al desplazar el slider */
			step: { type: Number },
			/** Label del componente */
			label: { type: String },
			/** Muestra el valor del componente */
			showvalue: { type: Boolean },
			/** Pone el componente en ancho completo */
			fullwidth: { type: Boolean },

			// Relación con el aw-form
			// ........................

			/** El componente no se registra en el formulario */
			noregister: { type: Boolean }
		}
	}

	constructor() {
		super();

		this.id = undefined;
		this.name = undefined;
		this.value = undefined;
		this.min = 0;
		this.max = 10;
		this.step = 1;
		this.fullwidth = false;
		this.label = undefined;
		this.showvalue = false;
		this.noregister = false;

		this.val1 = undefined;
		this.val2 = undefined;
		
		/** @type {HTMLInputElement} */
		this.inputElement = null;
		/** @type {HTMLInputElement} */
		this.input = null;
		/** @type {AwForm} */
		this.parentForm = undefined;
		/** @type {HTMLInputElement} */
		this.contenedor = undefined;
		/** @type {HTMLInputElement} */
		this.bar = undefined;
		/** @type {HTMLInputElement} */
		this.slider_1 = undefined;
		/** @type {HTMLInputElement} */
		this.slider_2 = undefined;
		/** @type {HTMLInputElement} */
		this.divValue_1 = undefined;
		/** @type {HTMLInputElement} */
		this.divValue_2 = undefined;
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
		this.slider_1 = this.$.slider1;
		this.slider_2 = this.$.slider2;
		this.divValue_1 = this.shadowRoot.querySelector( ".cont_value_1" );
		this.divValue_2 = this.shadowRoot.querySelector( ".cont_value_2" );
		
		// Ajustes del componente
		
		this.left1 = 0; // Indica la posición izquierda en la que está el elemento deslizador
		this.left2 = this.contenedor.offsetWidth; // Indica la posición izquierda en la que está el elemento deslizador
		
		// Ajustamos los atributos
		
		this._setAttributes();
		
		// Ajustamos el step
		
		this._adjustComponent();	
		
		// Asignamos el gestures
		
		this._setGestures();

		// Buscamos si tiene pertenee a un formulario

		this._register_in_form();

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
	disconnectedCallback() {
		super.disconnectedCallback();

		// Quitamos el elemento del registro

		if( !this.noregister && this.parentForm ) {
			this.parentForm._unregister_element( this.$.input );
		}
		
		Polymer.Tactil.remove( this.slider_1, 'track', this._handleTrack.bind( this ));
		Polymer.Tactil.remove( this.slider_2, 'track', this._handleTrack.bind( this ));
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
	 * @method	_setAttributes
	 * 
	 * Asigna los atributos del componente.
	 */
	_setAttributes() {
		if( this.min > this.max ) {
			this.max = this.min + 10;
		}

		// Nos aseguramos de tratar con solo un decimal
		
		if( this.min % 1 != 0 ) {
			this.min = parseFloat( this.min.toFixed( 1 ));
		}

		if( this.max % 1 != 0 ) {
			this.max = parseFloat( this.max.toFixed( 1 ));
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
			
			this.divValue_1.style.width = ancho + "px";
			this.divValue_2.style.width = ancho + "px";
			this.contenedor.style.left = ( 5 + ancho ) + "px";
			this.contenedor.style.width = "calc(100% - " + (17 + ( ancho * 2 )) + "px)";
			this.left2 = this.contenedor.offsetWidth;
		}
		
		// Ponemos el value
		
		if( !this.value ) {
			this.val1 = this.min;
			this.val2 = this.max;
			this.value = this.val1 + "-" + this.val2;
		} else {
			var sv = this.value.split( "-" );
			this.val1 = parseFloat( sv[ 0 ].toFixed( 1 ));
			this.val2 = parseFloat( sv[ 1 ].toFixed( 1 ));
			
			if( this.val1 > this.val2 ) {
				this.val1 = parseFloat( sv[ 1 ].toFixed( 1 ));
				this.val2 = parseFloat( sv[ 0 ].toFixed( 1 ));
			}
		}
		
		// Reajustamos min y max si es necesario
		
		if( this.min > this.val1 ) {
			this.val1 = this.min;
		}
		if( this.max < this.val2 ) {
			this.val2 = this.max;
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
		
		if( this.val1 !== this.min || this.val2 !== this.max ) {
			this._adjustValue();
		}
	}
	
	/**
	 * @method	_adjustStep
	 * 
	 * Ajusta los pasos del componente.
	 */
	_adjustStep() {
		if( this.step % 1 != 0 ) {
			this.step = parseFloat( this.step.toFixed( 1 ));
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
		var anchoDiv = ancho / diff;
		
		if( this.step > 0 && this.step < 1 ) {
			anchoDiv = anchoDiv * 10;
		}
		
		// Calculamo el newLeft del slider1

		let leftSlider1 = (this.val1 - this.min) * anchoDiv;
		this.left1 = parseFloat( leftSlider1.toFixed( 3 ));
		
		// Calculamo el newLeft del slider1

		let leftSlider2 = (this.val2 - this.min) * anchoDiv;
		this.left2 = parseFloat( leftSlider2.toFixed( 3 ));
		
		// Movemos el slider
		
		this.slider_1.style.left = this.left1 + "px";
		this.slider_2.style.left = this.left2 + "px";
		this.bar.style.left = this.left1 + "px";
		this.bar.style.width = (this.left2 - this.left1) + "px";
	}
	
	/**
	 * @method	_getValue
	 * 
	 * Obtiene el value del input.
	 */
	_getValue() {
		let ancho = this.contenedor.offsetWidth;
		let diff = this.max - this.min;
		let divs = diff / this.step;
		let anchoDiv = 1;

		if( divs < ancho ) {
			// Obtenmos cual es el ancho de cada división
			anchoDiv = parseFloat((( ancho / diff ) * this.step ).toFixed( 3 ));

			// Calculamos los valores en función al ancho de la división
			
			if(this.step.toString().indexOf(".") === -1) {
				this.val1 = parseFloat((((this.left1 / anchoDiv) * this.step) + this.min).toFixed( 0 ));
				this.val2 = parseFloat((((this.left2 / anchoDiv) * this.step) + this.min).toFixed( 0 ));
			} else {
				this.val1 = parseFloat((((this.left1 / anchoDiv) * this.step) + this.min).toFixed( 1 ));
				this.val2 = parseFloat((((this.left2 / anchoDiv) * this.step) + this.min).toFixed( 1 ));
			}
		} else {
			// Obtenemos el valor del pixel
			let pixelValue = diff / ancho;

			// Calculamos los valores en función al valor del pixel
			let val1 = (this.left1 * pixelValue) + this.min;
			let val2 = (this.left2 * pixelValue) + this.min;

			// Si el paso es un entero o un decimal
			if( this.step % 1 == 0 ) {
				// Ajsutamos el valor 1 a un múltiplo de los pasos
				val1 = parseInt( val1 );
				while( val1 % this.step != 0 ) {
					val1++;
				}

				// Ajustamos el valor 2 a un múltiplo de los pasos
				val2 = parseInt( val2 );
				while( val1 % this.step != 0 ) {
					val2++;
				}
			} else {
				let step = this.step * 10;

				// Ajsutamos el valor 1 a un múltiplo de los pasos
				val1 = parseFloat( val1.toFixed( 1 ));
				val1 = val1 * 10;
				while( val1 % step != 0 ) {
					val1++;
				}
				val1 = val1 / 10;

				// Ajustamos el valor 2 a un múltiplo de los pasos
				val2 = parseFloat( val2.toFixed( 1 ));
				val2 = val2 * 10;
				while( val2 % step != 0 ) {
					val2++;
				}
				val2 = val2 / 10;
			}

			this.val1 = val1;
			this.val2 = val2;
		}
		
		// Asignamos el value
		this.value = this.val1 + "-" + this.val2;
	}
	
	/**
	 * @method	_setGestures
	 * 
	 * Asigna los gestures al componente.
	 */
	_setGestures() {
		Polymer.Tactil.add( this.slider_1, "track", this._handleTrack.bind( this ) );
		Polymer.Tactil.add( this.slider_2, "track", this._handleTrack.bind( this ) );
	}
	
	/**
	 * @method	_handleTrack
	 * 
	 * Maneja el movimiento táctil.
	 */
	_handleTrack( response ) {
		if ( response.state === "start" ) {
			this._startTrack( response );
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
	_startTrack( response ) {
		this.currentSlider = response.target;
		
		if( this.currentSlider === this.slider_1 ) {
			this.startLeft = this.left1;
			this.divValue_1.setAttribute( "focused", "" );
		} else if( this.currentSlider === this.slider_2 ) {
			this.startLeft = this.left2;
			this.divValue_2.setAttribute( "focused", "" );
		}
		
		this.$.label.setAttribute( "focused", "" );
	}
	
	/**
	 * @method	_tracking
	 * 
	 * Función que controla el movimiento táctil.
	 */
	_tracking( detail ) {	
		// Calculamos los valores necesarios
		let ancho = this.contenedor.offsetWidth;
		let diff = this.max - this.min;
		let divs = diff / this.step;
		let anchoDiv = 1;
		if( divs < ancho ) {
			anchoDiv = parseFloat((( ancho / diff ) * this.step ).toFixed( 3 ));
		}
		
		let divsMovidas = parseInt(( detail.dx + this.startLeft ) / anchoDiv );

		// Calculamos el nuevo left
		let newLeft = divsMovidas * anchoDiv;
		
		if( newLeft < 0 ) {
			newLeft = 0;
		} else if( newLeft > ancho ) {
			newLeft = ancho;
		}

		// Hacemos los cálculos para el slider 1
		if( this.currentSlider === this.slider_1 ) {
			if( parseFloat( newLeft.toFixed( 3 )) >= this.left2 ) {
				newLeft = this.left2 - anchoDiv;
			}

			this.left1 = parseFloat( newLeft.toFixed( 3 ));
			
			this.bar.style.left = this.left1 + "px";
			this.bar.style.width = (this.left2 - this.left1) + "px";
			this.slider_1.style.left = this.left1 + "px";
		}
		
		// Hacemos los cálculos para el slider 2
		if( this.currentSlider === this.slider_2 ) {
			if( parseFloat( newLeft.toFixed( 3 )) <= this.left1 ) {
				newLeft = this.left1 + anchoDiv;
			}
			
			this.left2 = parseFloat( newLeft.toFixed( 3 ));
			
			this.bar.style.width = (this.left2 - this.left1) + "px";
			this.slider_2.style.left = this.left2 + "px";
		}

		this._getValue();
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
		
		this.divValue_1.removeAttribute( "focused" );
		this.divValue_2.removeAttribute( "focused" );
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
	_click( ev ) {/*
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
		
		this._getValue();*/
	}
}

window.customElements.define( "aw-range-double", AwRangeDouble );
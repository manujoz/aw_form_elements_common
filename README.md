# AW-FORM-ELEMENTS-COMMON

Este paquete proporciona inputs de formualrio de Arisman Webs con un estilo personalizado y compatibles con el ``aw-form``.

- [aw-checkbox](#aw-checkbox): Un input type checkbox.
- [aw-radio](#aw-radio): Un input type radio.
- [aw-onoff](#aw-onoff): Un input checkbox de On/Off.
- [aw-selectable](#aw-selectable): Un input checkbox de on/Off con un estilo diferente.
- [aw-range](#aw-range): Un input de selección de rango.
- [aw-range-double](#aw-range-double): Un input de selección de rango doble.

#### Instalar los componentes

```
$ npm i aw_form_elements_common
```

También es posible instalar todo lo necesario para manejar los formularios de `aw` instalnado:

```
$ npm i aw_form_elements
```
o

```
$ npm i aw_form_elements_df
```
Esto instalará todo los campos y componentes necesarios para usar los `aw-form` incluidos los `aw-form-elements-common`.

- <a href="https://www.npmjs.com/package/aw_form" target="_blank">aw-form</a>
- <a href="https://www.npmjs.com/package/aw_form_elements_common" target="_blank">aw-form-elements-common</a>
- <a href="https://www.npmjs.com/package/aw_button" target="_blank">aw-button</a>

Para incluir este y todos los componentes de formularios disponibles, así como los `aw_form_elements`, `aw_form_elements_df`, `aw_button` y los `aw_form_elements_df`, bastará con añadir:

```html
<script src="/node_modules/aw_form_elements/aw-form-elements.js"></script>
```
o

```html
<script src="/node_modules/aw_form_elements_df/aw-form-elements-df.js"></script>
```

Elementos de formulario comunes desarrollados por Arisman Webs en Polymer 3.

___

## aw-checkbox

Un input checkbox con un estilo más bonito y propiedades especiales:

```html
<script src="/node_modules/aw_form_elements_common/aw-checkbox.js"></script>
<aw-checkbox></aw-checkbox>
```

Los parámetros que admite este campos son:

- `name`: El nombre del input.
- `value`: El valor del campo.
- `checked`: Si estará activado o no.
- `disabled`: Un input desactivado.
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `clickfunc`: Una función donde se retorna el input para tratarlo fuera del componente hacemos click sobre él.
- `unresolved`: No muestra el campo hasta que haya cargo el componente. Usar si usamos preffix o suffix.

#### Ejemplos:

##### Labels y subtitle

Podemos incluir etiquetas y subtítulos a los checkbox añadiendo las siguientes etiquetas dentro del mismo:

```html
<aw-checkbox>
	<label>My Label</label>
	<subtitle>This is my subtitle</subtitle>
</aw-checkbox>
```

#### Métodos

El checbox tiene disponible los siguientes métodos que pueden usarse en javascript para interactuar con el mismo.


```html
<aw-checkbox label="Car" name="car"></aw-checkbox>
```
```javascript
/** @type {AwCheckbox} */
let checkbox = document.querySelector( "aw-checkbox" );

// Returns if the checkbox is marked or not
let checked = checkbox.checked();

// Gets the value of the checkbox
let value = checkbox.get_value();

// Show an error message in the input
checkbox.error_show( "Error message" );

// Remove the error message from the input
checkbox.error_hide();

// Returns a boolean depending on whether or not the input has an error flagged.
let error = checkbox.has_error();
```

#### Aplicar estilos a los aw-checkbox

Con las siguientes variables CSS podemos controlar el estilo del componente por completo. Los valores separados por `|` indican si tiene varios valores disponibles y en el orden que se irán aplicando si por ejemplo, el primer valor fuera otra variable.

```css
/* Estilos generales de tema que afectan a los inputs */

--aw-error-color: THEME-VALUE;
--aw-primary-color: THEME-VALUE;
--aw-primary-text-color: THEME-VALUE;
--aw-font-size: THEME-VALUE;

/* Estilos compartidos con todos los inputs de formulario */

--aw-input-padding-bottom: 12px;
--aw-input-vertical-align: middel;
--aw-input-error-color: ( --aw-error-color | #b13033 );
--aw-input-disabled-color: #BBBBBB;

/* Estilos propios del checbox */ 

--aw-checkbox-background-color: transparent;
--aw-checkbox-border-color: #333333;
--aw-checkbox-checked-border-color: ( --aw-checkbox-checked-color | --aw-primary-color, #1C7CDD );
--aw-checkbox-checked-color: ( -aw-primary-color, #1C7CDD );
--aw-checkbox-disabled-color: ( --aw-input-disabled-color | #BBBBBB );
--aw-checkbox-icon-color: white;

/* Estilos para las etiquetas del checkbox */ 

--aw-checkbox-label-margin: 0px;
--aw-checkbox-label-padding: 2px 0 0 6px;
--aw-checkbox-label-color: ( --aw-primary-text-color | #333333 );
--aw-checkbox-label-font-size: ( --aw-font-size | 16px );
--aw-checkbox-label-font-style: normal;
--aw-checkbox-label-font-weight: 300;
--aw-checkbox-label-text-align: left;

/* Estilos para los subtítulos del checkbox */

--aw-checkbox-subtitle-margin: 3px 0 0 0;
--aw-checkbox-subtitle-padding: 5px 0 0 6px;
--aw-checkbox-subtitle-border: solid 1px #DDDDDD;
--aw-checkbox-subtitle-size: 12px;
--aw-checkbox-subtitle-color: #888888;
--aw-checkbox-subtitle-text-align: left;
```
___

## aw-radio

Un input type radio con un estilo más bonito y propiedades especiales:

```html
<script src="/node_modules/aw_form_elements_common/aw-radio.js"></script>
<aw-radio></aw-radio>
```

Los parámetros que admite este campos son:

- `name`: El nombre del input.
- `value`: El valor del campo.
- `checked`: Si estará activado o no.
- `disabled`: Un input desactivado.
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `clickfunc`: Una función donde se retorna el input para tratarlo fuera del componente hacemos click sobre él.
- `unresolved`: No muestra el campo hasta que haya cargo el componente. Usar si usamos preffix o suffix.

#### Ejemplos:

##### Labels y subtitle

Podemos incluir etiquetas y subtítulos a los checkbox añadiendo las siguientes etiquetas dentro del mismo:

```html
<aw-radio>
	<label>My Label</label>
	<subtitle>This is my subtitle</subtitle>
</aw-radio>
```

#### Métodos

El radio tiene disponible los siguientes métodos que pueden usarse en javascript para interactuar con el mismo.


```html
<aw-radio label="Car" name="car"></aw-radio>
```
```javascript
/** @type {AwRadio} */
let radio = document.querySelector( "aw-radio" );

// Returns if the radio input is marked or not
let checked = radio.checked();

// Gets the value of the radio input
let value = radio.get_value();

// Show an error message in the input
radio.error_show( "Error message" );

// Remove the error message from the input
radio.error_hide();

// Returns a boolean depending on whether or not the input has an error flagged.
let error = radio.has_error();
```

#### Aplicar estilos a los aw-radio

Los estilos para el `aw-radio` son exactamente iguales que para el a `aw-checkbox`
___

## aw-onoff

Es como un checkbox con en forma de botón de encendido y apagado con menos opciones que el aw-checkbox pero útil cuando se quiere preguntar algo cuya respuesta es un sí o un no. No dispone de etiquetas ni subtítulos.

Un input type checkbpx con un estilo más bonito y propiedades especiales:

```html
<script src="/node_modules/aw_form_elements_common/aw-onoff.js"></script>
<aw-onnoff><aw-onoff>
```
Los parámetros que admite este campos son:

- `id`: El ID del inpit
- `name`: El nombre del input.
- `value`: El valor del campo.
- `checked`: Si estará activado o no.
- `disabled`: Un input desactivado.
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `clickfunc`: Una función donde se retorna el input para tratarlo fuera del componente hacemos click sobre él.
- `unresolved`: No muestra el campo hasta que haya cargo el componente. Usar si usamos preffix o suffix.

#### Métodos

El botón on-off tiene disponible los siguientes métodos que pueden usarse en javascript para interactuar con el mismo.


```html
<aw-onoff label="Car" name="car"></aw-onoff>
```
```javascript
/** @type {AwOnOff} */
let button = document.querySelector( "aw-onoff" );

// Returns if the on-off input is marked or not
let checked = button.checked();

// Gets the value of the on-off input
let value = button.get_value();
```

#### Aplicar estilos a los aw-onoff

Con las siguientes variables CSS podemos controlar el estilo del componente por completo. Los valores separados por `|` indican si tiene varios valores disponibles y en el orden que se irán aplicando si por ejemplo, el primer valor fuera otra variable.

```css

/* Estilos compartidos con todos los inputs de formulario */

--aw-input-vertical-align: middel;

/* Estilos propios del on-off */ 

--aw-input-onoff-bg-off: #e0e0e0;
--aw-input-onoff-bt-off: #BBBBBB;
--aw-input-onoff-bg-on: #98c298;
--aw-input-onoff-bt-on: #508050;
```
___

## aw-selectable

Es similar al `aw-onoff` pero nos permite un grado de personalización más alto, en este caso si le podemos meter una etiqueta e incluso un texto para cuando está apagado y otro para cuando está encendido.

Un input type checkbox con un estilo más bonito y propiedades especiales:

```html
<script src="/node_modules/aw_form_elements_common/aw-selectable.js"></script>
<aw-selectable><aw-selectable>
```
Los parámetros que admite este campos son:

- `id`: El ID del inpit
- `name`: El nombre del input.
- `value`: El valor del campo.
- `checked`: Si estará activado o no.
- `disabled`: Un input desactivado.
- `novalidate`: Evita que el campo sea validado por el onchange o por el aw-form.
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `clickfunc`: Una función donde se retorna el input para tratarlo fuera del componente hacemos click sobre él.
- `unresolved`: No muestra el campo hasta que haya cargo el componente. Usar si usamos preffix o suffix.

#### Ejemplos:

##### Labels y tags

Para añadir una etiqueta tan solo hay que añadir el atributo label al componente

```html
<aw-selectable name="selectable" label="Mi selectable"></aw-selectable>
```

A diferencia del label que aparece en la parte superior, el `tag` aparece al lado del selectable

```html
<aw-selectable name="selectable" tag="Mi selectable"></aw-selectable>
```

##### Textos encendido y apagado

También es posible añadir un texto para cuando está activo y otro que será visible cuando esté inactivo

```html
<aw-selectable name="selectable" label="Mi selectable" ontext="OK" offtext="KO"></aw-selectable>
```

#### Métodos

El botón on-off tiene disponible los siguientes métodos que pueden usarse en javascript para interactuar con el mismo.


```html
<aw-selectable label="Car" name="car"></aw-selectable>
```
```javascript
/** @type {AwSelectable} */
let button = document.querySelector( "aw-selectable" );

// Returns if the selectable input is marked or not
let checked = button.checked();

// Gets the value of the selectable input
let value = button.get_value();
```

#### Aplicar estilos a los aw-selectable

Con las siguientes variables CSS podemos controlar el estilo del componente por completo. Los valores separados por `|` indican si tiene varios valores disponibles y en el orden que se irán aplicando si por ejemplo, el primer valor fuera otra variable.

<span style="font-size: 13px; font-style: oblique;">Los estilos del label serán similares a los de las etiquetas de los inputs con etiquetas, puedes encontrar un ejemplo en <a href="https://www.npmjs.com/package/aw_form_elements_df#aw-input-df" target="_blank">aw-input-df</a></span>

```css

/* Estilos compartidos con todos los inputs de formulario */

--aw-input-vertical-align: middel;

/* Estilos del tag */ 

--aw-selectable-tag-color: /* page default*/;
--aw-selectable-tag-font-size: /* page default*/;
--aw-selectable-tag-font-weight: /* page default*/;
--aw-selectable-tag-padding: 0 7px 0 0;
--aw-selectable-tag-text-align: left;

/* Estilos del selectable */

--aw-selectable-width: 90px;
--aw-selectable-height: 22px;
--aw-selectable-border: solid 1px #DDDDDD;
--aw-selectable-border-radius: 4px;
--aw-selectable-box-shadow: none;
--aw-selectable-background-color: #333333;

/* Efectos del selectable */

--aw-selectable-on-effect-intensity: .25;
--aw-selectable-off-effect-intensity: .25;
--aw-selectable-duration: .4s;
--aw-selectable-effect-background-color: #333333;

/* Variables genéricas que no tienen ningún valor por defecto */

--aw-selectable-font-size: null;
--aw-selectable-font-weight: null;

/* Sección on del selectable*/ 

--aw-selectable-on-text-align: center;
--aw-selectable-on-background-color: #209e4a;
--aw-selectable-on-color: white;
--aw-selectable-on-font-size: ( --aw-selectable-font-size | 10px );
--aw-selectable-on-font-weight: ( --aw-selectable-font-weight | normal );

/* Sección off del selectable*/ 

--aw-selectable-off-text-align: center;
--aw-selectable-off-background-color: #209e4a;
--aw-selectable-off-color: white;
--aw-selectable-off-font-size: ( --aw-selectable-font-size | 10px );
--aw-selectable-off-font-weight: ( --aw-selectable-font-weight | normal );

/* Marca central del selectable */

--aw-selectable-mark-width: 14px;
--aw-selectable-mark-background-color: white;
--aw-selectable-mark-border: none;
--aw-selectable-mark-box-shadow: 0 0 1px #333333;
```
___

## aw-range

Es un input que permite elegir una cifra entre un rango de cifras con un deslizador.

```html
<script src="/node_modules/aw_form_elements_common/aw-range.js"></script>
<aw-range><aw-range>
```
Los parámetros que admite este campos son:

- `id`: El ID del inpit
- `name`: El nombre del input.
- `min`: El valor mínimo permitido.
- `max`: El valor máximo permitido.
- `step`: La cantidad entre valor y valor.
- `value`: El valor del campo.
- `showvalue`: Muestra el valor acual seleccionado.
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `unresolved`: No muestra el campo hasta que haya cargo el componente. Usar si usamos preffix o suffix.

#### Ejemplos:

```html
<aw-range name="range" label="My range" min="0" max="100" step="2" value="50" showvalue></aw-range>
```

#### Métodos

El botón on-off tiene disponible los siguientes métodos que pueden usarse en javascript para interactuar con el mismo.


```html
<aw-range name="range" label="My range" min="0" max="100" step="2" value="50" showvalue></aw-range>
```
```javascript
/** @type {AwRange} */
let range = document.querySelector( "aw-range" );

// Gets the value of the selectable input
let value = range.get_value();
```

#### Aplicar estilos a los aw-range

Con las siguientes variables CSS podemos controlar el estilo del componente por completo. Los valores separados por `|` indican si tiene varios valores disponibles y en el orden que se irán aplicando si por ejemplo, el primer valor fuera otra variable.

```css

/* Estilos compartidos con todos los inputs de formulario */

--aw-input-vertical-align: middel;

/* Estilos propios del on-range */ 

--aw-input-range-bg-color: white;
--aw-input-range-label-color: ( --aw-input-label-color | --aw-input-placeholder-color | #888888 )
--aw-input-range-label-font-family: (--aw-input-font-family | Arial );
--aw-input-range-label-font-size: 12px;
--aw-input-range-label-font-weight: normal;
--aw-input-range-label-text-align: left;
--aw-input-label-color-focus: ( --aw-primary-color | #1C7CDD )
--aw-input-disabled-color: ##BBBBBB;
--aw-input-range-line-color: #CCCCCC;
--aw-input-range-bar-color( --aw-primary-color | #1C7CDD );

/* Estilos para el value */

--aw-input-range-color: #333333;
--aw-input-range-font-size: 14px;
--aw-input-range-font-weight: normal;
--aw-input-range-value-padding: 0 0 2px 0;
```
___

## aw-range-double

Es similar al `aw-range` pero este tendrá dos selectores. Es común verlo en tiendas online por ejemplo para filtrar por un rango de precios.

La diferencia es que el valor devuelto por este serán dos cifras separadads por `-`, por ejemplo `20-50`, lo que correspondería a un rango entre 20 y 50.

```html
<script src="/node_modules/aw_form_elements_common/aw-range-double.js"></script>
<aw-range-double><aw-range-double>
```
Los parámetros que admite este campos son:

- `id`: El ID del inpit
- `name`: El nombre del input.
- `min`: El valor mínimo permitido.
- `max`: El valor máximo permitido.
- `step`: La cantidad entre valor y valor.
- `value`: El valor del campo.
- `showvalue`: Muestra el valor acual seleccionado.
- `noregister`: Evita que el campo se registres en el aw-form o en un form normal.
- `connectedfunc`: Una función donde se retorna el componente para tratarlo fuera del componente cuando conecta.
- `changefunc`: Una función donde se retorna el input para tratarlo fuera del componente cuando cambia.
- `unresolved`: No muestra el campo hasta que haya cargo el componente. Usar si usamos preffix o suffix.

#### Ejemplos:

```html
<aw-range-double name="range" label="My range" min="0" max="100" step="2" value="20-50" showvalue></aw-range-double>
```

#### Métodos

El botón on-off tiene disponible los siguientes métodos que pueden usarse en javascript para interactuar con el mismo.


```html
<aw-range-double name="range" label="My range" min="0" max="100" step="2" value="50" showvalue></aw-range-double>
```
```javascript
/** @type {AwRangeDoble} */
let range = document.querySelector( "aw-range-double" );

// Gets the value of the selectable input
let value = range.get_value();
```

#### Aplicar estilos a los aw-range-double

Los estilos del `aw-range-double` son exactamente los mismos que los del `aw-range`
___

## Ejemplos de funciones externas

Las funciones externas son atributos que se les pueden añadir a los componentes para que llament automáticamente a una función con algún evento concreto. Son los atributos que terminan en `*func` en cada componente, como por ejemplo, `clickfunc` or `connectedfunc`.

Por ejemplo, si queremos que una función sea llamada cuando un componente ha cargado, tan solo tenemos que añadir el atributo `connectedfunc` al componente con el nombre de la función a llamar.

```html
<aw-checkbox label="Car" name="car" connectedfunc="connectedFUNC"></aw-checkbox>
```
```javascript
function connectedFUNC( component )
{
	// This function will be called when aw-checbox is loaded
	console.log( component );
}
```

O por ejemmplo si queremos llamar a una función cuando un campo cambie su valor:

```html
<aw-range name="range" label="My range" min="0" max="100" step="2" value="50" showvalue changefunc="changeFUNC"></aw-range>
```
```javascript
function changeFUNC( input )
{
	// This function will be called when aw-range value change
	console.log( input.value );
}
```
___

## Creando un archivo para aplicar estilos a los componentes.

Para añadir estilos personalizados a los componentes dependerá del navegador. Por ejemplo, en los navegadores basados en Chromium, podemos utilizar las variables directamente dentro del códifo CSS, pero para navegadores como Firefox deberemos crear un archivo javascript para añadir los estilos.

Se recomienda para una compatiblidad absoluta crear el archivo de javascript:


<span style="font-size:12px">index.html</span>

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
	<aw-checkbox name="checkbox1">
		<label>My label</label>
	</aw-checkbox>
	<aw-checkbox class="secundary" name="checkbox2">
		<label>My label 2</label>
	</aw-checkbox><br><br>
    <aw-range min="0" max="100"></aw-range><br>
    <aw-range class="aw-range-class" min="0" max="100"></aw-range><br>
	
	<!-- Only for not chromiun navigators -->
	<script src="/node_modules/aw_webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
	<!-- Only for not chromiun navigators -->
	<script type="module" src="/node_modules/aw_polymer_3/polymer/polymer-element.js"></script>
	<script type="module" src="/node_modules/aw_form_elements_common/aw-checkbox.js"></script>
	<script type="module" src="/node_modules/aw_form_elements_common/aw-range.js"></script>
	<script type="module" src="/my-styles.js"></script>
  </body>
</html>
```

<span style="font-size:12px">my-styles.js</span>

```javascript
import { html } from "/node_modules/aw_polymer_3/polymer/polymer-element.js";

const theme = html`
<custom-style>
	<style is="custom-style">		
		:root {
			--aw-primary-color: #b10039;
			--aw-primary-color-hv: #7a092d;
			--aw-secundary-color: #e6c50a;
			--aw-secundary-color-hv: #d89609;
			--aw-font-family: "roboto";
			--aw-font-size: "14px";
			--aw-primary-text-color: #555555;
			--aw-secundary-text-color: #F0F0F0; 
			--aw-error-color: #a43b3b;

			--aw-input-range-color: #555555;
			--aw-input-range-font-size: 12px;
			--aw-input-range-font-weight: 500;
			--aw-input-range-bg-color: #F0F0F0;

			--aw-input-onoff-bg-on: #c96161;
			--aw-input-onoff-bt-on: var(--aw-primary-color);

			--aw-checkbox-border-color: #777777;
			--aw-checkbox-label-margin: -1px 0 0 0;
			--aw-checkbox-label-font-weight: normal;
		}

		aw-checkbox.secundary {
			--aw-checkbox-checked-border-color: #A3F3A2;
			--aw-checkbox-checked-color: #A3F3A2;
		}

		aw-range.aw-range-class {
			--aw-input-range-color: #A3F3A3;
			--aw-input-range-font-size: 16px;
			--aw-input-range-font-weight: normal;
			--aw-input-range-bg-color: white;
		}
	</style>
</custom-style>
`;
document.head.appendChild(theme.content);
```


______________________________

<p style="text-align: center; padding: 50px 0">
    <b>Contacto</b><br><br>Manu J. Overa<br><a href="mailto:manu.giralda@gmail.com">manu.giralda@gmail.com</a><br><br>
    <!-- Diseño Web - <a href="https://arismanwebs.es">Arisman Webs</a> -->
</p>




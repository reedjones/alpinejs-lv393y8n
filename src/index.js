const template = document.createElement("template");

// CSSPropertyEditor.js

class CSSPropertyEditor {
  constructor(element) {
    this.element = element;
    this.form = document.createElement('form');
    this.form.className = 'css-property-form';
    this.element.appendChild(this.form);
    this.initializeForm();
  }

  initializeForm() {
    alert('yo')
    const style = window.getComputedStyle(this.element);
    const properties = style.cssText.split(';');

    properties.forEach(property => {
      const [propertyName, value] = property.split(':');
      if (propertyName && value) {
        const propertyLabel = document.createElement('label');
        propertyLabel.textContent = `${propertyName.trim()}:`;

        const input = this.createInputForProperty(propertyName.trim(), value.trim());
        propertyLabel.appendChild(input);

        this.form.appendChild(propertyLabel);
      }
    });
  }

  createInputForProperty(propertyName, value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;

    // Dynamically fetch types/values and update the input accordingly
    const propertyValueSyntax = CSS.supports(propertyName, value) ? value : '';
    input.value = propertyValueSyntax;

    input.addEventListener('input', () => {
      this.element.style[propertyName] = input.value;
    });

    return input;
  }
}



template.innerHTML = `
  <style>
  css-property-form {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }
    .css-property-form label {
      margin-bottom: 10px;
    }
    span, button {
      font-size: 200%;
    }

    span {
      width: 4rem;
      display: inline-block;
      text-align: center;
    }

    button {
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 10px;
      background-color: seagreen;
      color: white;
    }
  </style>
   <div id="element-to-edit"  x-data="$el.parentElement.data()"
   style="width: 200px; 
   height: 200px; background-color: coral;">
   edit me
   </div><br>
   <div id='form'>
   <dl id='regurgitation'></dl>
   
   </div>

`;

export class MyCounter extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));
  }

  data() {
    return {
      element: null, 
      propertyEditor: null,
      init(){
        const element = document.getElementById('element-to-edit')
        this.element = element;
    this.form = document.createElement('form');
    this.formCont = document.getElementById('form');
    this.form.className = 'css-property-form';
    this.initializeForm();
   const t = document.createElement('p')
   t.innerText='hello'
    this.formCont.appendChild(t)
    this.formCont.appendChild(this.form)
       
      },
      initializeForm() {
        const ofInterest = ["font-weight", "border-left-color", "color", "--color"];
       const stylesList = document.querySelector("#regurgitation");
        const defaultComputedStyles = this.element.computedStyleMap();

        let properties = [];
        let values = [];
//for (const [prop, val] of defaultComputedStyles) {
for (const val of ofInterest) {
  const prop = defaultComputedStyles.get(val);
  // properties
  const cssProperty = document.createElement("dt");
  cssProperty.appendChild(document.createTextNode(prop));
  stylesList.appendChild(cssProperty);

  // values
  const cssValue = document.createElement("dd");
  cssValue.appendChild(document.createTextNode(val));
  stylesList.appendChild(cssValue);
  const propertyName = prop;
   const propertyLabel = document.createElement('label');
            propertyLabel.textContent = `${propertyName.trim()}:`;

            const input = this.createInputForProperty(propertyName.trim(), val.trim());
  propertyLabel.appendChild(input);
   this.form.appendChild(propertyLabel);
}

  },
   createInputForProperty(propertyName, value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;

    // Dynamically fetch types/values and update the input accordingly
    const propertyValueSyntax = CSS.supports(propertyName, value) ? value : '';
    input.value = propertyValueSyntax;

    input.addEventListener('input', () => {
      this.element.style[propertyName] = input.value;
    });

    return input;
  }
      
    };
  }
}

customElements.define("my-counter", MyCounter);

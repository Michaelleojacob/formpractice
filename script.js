function domManager({
  tagName = 'div',
  text = null,
  classes = null,
  attributes = null,
  events = null,
  children = null,
}) {
  const el = document.createElement(tagName);
  if (classes !== null) {
    el.classList.add(...classes);
  }

  if (text !== null) {
    el.textContent = text;
  }

  if (attributes !== null) {
    attributes.map((attr) => {
      const objKey = Object.keys(attr);
      const objValue = Object.values(attr);
      return el.setAttribute(objKey, objValue);
    });
  }

  if (children !== null) {
    children.map((x) => el.appendChild(x));
  }

  if (events !== null) {
    events.map(({ type, handler }) => el.addEventListener(type, handler));
  }
  return el;
}

const submitForm = (e) => {
  e.preventDefault();
  console.log(e);
};

function makeFormUI() {
  const el = domManager({
    classes: ['wrapper'],
    attributes: [{ style: 'display:flex;' }],
    children: [
      domManager({
        tagName: 'form',
        classes: ['myform'],
        attributes: [{ style: 'display:flex; flex-direction:column' }],
        events: [{ type: 'submit', handler: submitForm }],
        children: [
          domManager({
            tagName: 'input',
            attributes: [{ placeholder: 'email' }],
          }),
          domManager({
            tagName: 'input',
            attributes: [{ placeholder: 'country' }],
          }),
          domManager({
            tagName: 'input',
            attributes: [{ placeholder: 'zip-code' }],
          }),
          domManager({
            tagName: 'input',
            attributes: [{ placeholder: 'password' }],
          }),
          domManager({
            tagName: 'input',
            attributes: [{ placeholder: 'confirm-password' }],
          }),
          domManager({ tagName: 'button', text: 'submit' }),
        ],
      }),
    ],
  });
  return el;
}

const formUI = makeFormUI();
console.log(formUI);
const container = document.querySelector('#container');
container.appendChild(formUI);

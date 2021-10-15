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
            classes: ['inputWrapper'],
            children: [
              domManager({ text: 'email: ', classes: ['emailtxt'] }),
              domManager({
                tagName: 'input',
                attributes: [
                  { placeholder: 'email' },
                  { type: 'email' },
                  { required: 'true' },
                ],
              }),
            ],
          }),
          domManager({
            classes: ['inputWrapper'],
            children: [
              domManager({ text: 'country: ', classes: ['countrytxt'] }),
              domManager({
                tagName: 'input',
                attributes: [{ placeholder: 'country' }],
              }),
            ],
          }),
          domManager({
            classes: ['inputWrapper'],
            children: [
              domManager({ text: 'zip-code: ', classes: ['zip-codetxt'] }),
              domManager({
                tagName: 'input',
                attributes: [{ placeholder: 'zip-code' }],
              }),
            ],
          }),
          domManager({
            classes: ['inputWrapper'],
            children: [
              domManager({ text: 'password: ', classes: ['passwordtxt'] }),
              domManager({
                tagName: 'input',
                attributes: [{ placeholder: 'password' }],
              }),
            ],
          }),
          domManager({
            classes: ['inputWrapper'],
            children: [
              domManager({
                text: 'confirm-password: ',
                classes: ['confirm-passwordtxt'],
              }),
              domManager({
                tagName: 'input',
                attributes: [{ placeholder: 'confirm-password' }],
              }),
            ],
          }),
          domManager({
            tagName: 'button',
            text: 'submit',
            attributes: [{ style: 'margin-top:10px;' }],
          }),
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

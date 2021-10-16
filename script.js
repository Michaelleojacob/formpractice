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

function makeFormUI() {
  let timer;
  const myobj = {
    state: false,
    setState(newState) {
      this.state = newState;
    },
    getState() {
      return this.state;
    },
    makeDomTree() {
      this.tree = domManager({
        classes: ['wrapper'],
        attributes: [{ style: 'display:flex;' }],
        children: [
          domManager({
            tagName: 'form',
            classes: ['myform'],
            attributes: [{ style: 'display:flex; flex-direction:column' }],
            events: [{ type: 'submit', handler: this.submitForm }],
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
                      { value: 'm@gmail.com' },
                    ],
                    events: [{ type: 'keyup', handler: this.handleEmail }],
                  }),
                ],
              }),
              domManager({
                classes: ['inputWrapper'],
                children: [
                  domManager({ text: 'country: ', classes: ['countrytxt'] }),
                  domManager({
                    tagName: 'input',
                    attributes: [
                      { id: 'country' },
                      { placeholder: 'country' },
                      { required: 'true' },
                    ],
                  }),
                ],
              }),
              domManager({
                classes: ['inputWrapper'],
                children: [
                  domManager({ text: 'zip-code: ', classes: ['zip-codetxt'] }),
                  domManager({
                    tagName: 'input',
                    attributes: [
                      { placeholder: 'zip-code' },
                      { maxlength: '5' },
                      { required: 'true' },
                    ],
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
      this.country = this.tree.querySelector('#country');
      return this.tree;
    },
    submitForm(e) {
      e.preventDefault();
      const submitState = myobj.getState();
      console.log(submitState);
      if (submitState === false) return;
      console.log(e);
    },
    handleEmail(e) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        !this.value.includes('@') ? myobj.makeRed(this) : myobj.clearRed(this);
        !this.value.includes('.com')
          ? myobj.makeRed(this)
          : myobj.clearRed(this);
      }, 1000);
    },
    makeRed: (el) => {
      el.setAttribute('style', 'border:2px solid red');
      myobj.setState(false);
    },
    clearRed: (el) => {
      el.setAttribute('style', 'border:');
      myobj.setState(true);
    },
  };
  return myobj;
}

const formObj = makeFormUI();
console.log(formObj);
const formUI = formObj.makeDomTree();
const container = document.querySelector('#container');
container.appendChild(formUI);

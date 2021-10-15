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

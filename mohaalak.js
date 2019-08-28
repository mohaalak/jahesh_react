function render(element, parentDom) {
  if (element === undefined) {
    debugger;
  }
  if (element.type === 'TEXT ELEMENT') {
    const dom = document.createTextNode(element.nodeValue);
    parentDom.appendChild(dom);
    return;
  }

  if (
    typeof element.type === 'function' &&
    element.type.prototype.isMohaalakClass
  ) {
    const instance = new element.type(element.props);

    const div = document.createElement('div');
    instance.__internalInstance = div;
    render(instance.render(), div);
    parentDom.appendChild(div);
    return;
  }

  if (typeof element.type === 'function') {
    render(element.type(element.props), parentDom);

    return;
  }

  const dom = document.createElement(element.type);

  const propsKeys = Object.keys(element.props);

  propsKeys
    .filter(x => x.substr(0, 2) === 'on')
    .forEach(x => {
      dom.addEventListener(x.substr(2).toLowerCase(), element.props[x]);
    });

  propsKeys
    .filter(x => x.substr(0, 2) !== 'on')
    .filter(x => x !== 'children')
    .forEach(x => {
      dom[x] = element.props[x];
    });

  if (element.props.children) {
    for (const child of element.props.children) {
      render(child, dom);
    }
  }

  parentDom.appendChild(dom);
}

function createElement(type, props, ...children) {
  const rawChildren = children
    .filter(child => child !== false || child !== null)
    .map(child =>
      typeof child === 'string'
        ? { type: 'TEXT ELEMENT', nodeValue: child }
        : child
    )
    .reduce(
      (prev, child) =>
        Array.isArray(child) ? [...prev, ...child] : [...prev, child],
      []
    );
  return { type, props: { ...props, children: rawChildren } };
}

class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState(partialState) {
    this.state = { ...this.state, ...partialState };

    const root = this.__internalInstance;

    for (let i = 0; i < root.children.length; i++) {
      root.removeChild(root.children[i]);
    }

    render(this.render(), this.__internalInstance);
  }

  render() {}
}

Component.prototype.isMohaalakClass = true;
export default { render, createElement, Component };

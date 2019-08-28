function render(element, parentDom) {
  if (element.type === 'TEXT ELEMENT') {
    const dom = document.createTextNode(element.nodeValue);
    parentDom.appendChild(dom);
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

  console.log(dom);
  parentDom.appendChild(dom);
}

function createElement(type, props, ...children) {
  const rawChildren = children
    .filter(child => child !== false || child !== null)
    .map(child =>
      typeof child === 'string'
        ? { type: 'TEXT ELEMENT', nodeValue: child }
        : child
    );
  return { type, props: { ...props, children: rawChildren } };
}
export default { render, createElement };

function isEvent(name) {
  return name.startsWith('on');
}

function isAttribute(name) {
  return !isEvent(name) && name !== 'children';
}

function setStyle($el, styleMap) {
  Object.keys(styleMap).forEach((key) => {
    let value = styleMap[key];
    if (typeof value === 'number') {
      value += 'px';
    }
    // eslint-disable-next-line no-param-reassign
    $el.style[key] = value;
  });
}

function updateDomProperties(dom, prevProps, nextProps) {
  if (dom.nodeType === Node.TEXT_NODE) {
    if (nextProps.nodeValue !== prevProps.nodeValue) {
      dom.nodeValue = nextProps.nodeValue;
    }
    return;
  }

  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  const removedKeys = prevKeys.filter((key) => !nextKeys.includes(key));

  removedKeys.forEach((key) => {
    if (isEvent(key)) {
      const eventType = key.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[key]);
    } else if (isAttribute(key)) {
      dom.removeAttribute(key);
    }
  });

  nextKeys.forEach((key) => {
    if (key === 'children') {
      return;
    }

    if (prevKeys.includes(key) && prevProps[key] === nextProps[key]) {
      return;
    }

    const value = nextProps[key];

    if (key === 'className') {
      dom.setAttribute('class', value);
      return;
    }

    if (key === 'style') {
      setStyle(dom, value);
      return;
    }

    if (isEvent(key)) {
      const eventType = key.toLowerCase().substring(2);
      if (prevProps[key]) {
        dom.removeEventListener(eventType, prevProps[key]);
      }
      dom.addEventListener(eventType, value);
      return;
    }

    dom.setAttribute(key, value);
  });
}

function instantiate(element) {
  if (typeof element.type === 'function') {
    const instance = instantiate(element.type(element.props));
    return { dom: instance.dom, element, childInstance: instance };
  }

  if (typeof element === 'string') {
    const dom = document.createTextNode(element);
    return { dom, element, childInstances: [] };
  }

  const dom = document.createElement(element.type);
  updateDomProperties(dom, {}, element.props);

  // eslint-disable-next-line no-nested-ternary
  const childElements = element.props.children || [];
  const childInstances = childElements.map(instantiate);
  const childDoms = childInstances.map((childInstance) => childInstance.dom);
  childDoms.forEach((childDom) => dom.appendChild(childDom));

  return { dom, element, childInstances };
}

function reconcileChildren(prevInstance, element) {
  const nextChildElements = element.props.children || [];
  const max = Math.max(nextChildElements.length, prevInstance.childInstances.length);
  const nextChildInstances = [];
  for (let i = 0; i < max; i += 1) {
    // eslint-disable-next-line no-use-before-define
    const childInstance = reconcile(
      prevInstance.dom,
      prevInstance.childInstances[i],
      nextChildElements[i],
    );
    nextChildInstances.push(childInstance);
  }
  return nextChildInstances.filter((instance) => instance !== null);
}

function reconcile(parentDom, prevInstance, element) {
  if (!prevInstance) {
    const nextInstance = instantiate(element);
    parentDom.innerHTML = '';
    parentDom.appendChild(nextInstance.dom);
    return nextInstance;
  }

  if (!element) {
    parentDom.removeChild(prevInstance.dom);
    return null;
  }

  if (prevInstance.element.type !== element.type) {
    const nextInstance = instantiate(element);
    parentDom.replaceChild(nextInstance.dom, prevInstance.dom);
    return nextInstance;
  }

  if (typeof element === 'string') {
    updateDomProperties(
      prevInstance.dom,
      { nodeValue: prevInstance.element },
      { nodeValue: element },
    );
    prevInstance.element = element;
    return prevInstance;
  }

  if (typeof element.type === 'function') {
    const ele = element.type(element.props);

    const childInstance = reconcile(parentDom, prevInstance.childInstance, ele);
    prevInstance.dom = childInstance.dom;
    prevInstance.childInstance = childInstance;
    prevInstance.element = element;
    return prevInstance;
  }

  updateDomProperties(prevInstance.dom, prevInstance.element.props, element.props);
  prevInstance.childInstances = reconcileChildren(prevInstance, element);
  prevInstance.element = element;
  return prevInstance;
}

window.rootInstance = null;

export function render(element, container) {
  rootInstance = reconcile(container, rootInstance, element);
}

document.documentElement.removeAttribute;

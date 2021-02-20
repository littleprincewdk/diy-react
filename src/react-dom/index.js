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

function appendChild($el, child) {
  if (Array.isArray(child)) {
    child.forEach((_child) => appendChild($el, _child));
  } else {
    $el.appendChild(child);
  }
}

function renderElement(element) {
  if (Array.isArray(element)) {
    return element.map((ele) => renderElement(ele));
  }

  if (typeof element.type === 'function') {
    return renderElement(element.type(element.props));
  }

  if (typeof element === 'string') {
    return document.createTextNode(element);
  }

  const $el = document.createElement(element.type);
  Object.keys(element.props).forEach((key) => {
    if (key === 'children') {
      return;
    }

    const value = element.props[key];

    if (key === 'className') {
      $el.setAttribute('class', value);
      return;
    }

    if (key === 'style') {
      setStyle($el, value);
      return;
    }

    if (key.startsWith('on')) {
      const eventType = key.toLowerCase().substring(2);
      $el.addEventListener(eventType, value);
      return;
    }

    $el.setAttribute(key, value);
  });

  if (element.props.children) {
    appendChild($el, renderElement(element.props.children));
  }

  return $el;
}

export function render(element, $el) {
  const nodes = renderElement(element);
  // eslint-disable-next-line no-param-reassign
  $el.innerHTML = '';
  appendChild($el, nodes);
}

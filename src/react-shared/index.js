export function isReactComponent(fn) {
  return !!fn.prototype.isReactComponent;
}

export function isEvent(name) {
  return name.startsWith('on');
}

export function isAttribute(name) {
  return !isEvent(name) && name !== 'children';
}

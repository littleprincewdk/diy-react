export function createElement(type, props, ...children) {
  const { key, ...restProps } = props || {};

  if (children.length >= 1) {
    restProps.children = children.reduce((previous, current) => previous.concat(current), []);
  }

  return { key, type, props: restProps };
}

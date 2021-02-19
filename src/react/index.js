export function createElement(type, props, ...children) {
  const { key, ...restProps } = props || {};

  if (children.length === 1) {
    [restProps.children] = children;
  } else if (children.length > 1) {
    restProps.children = children;
  }

  return { key, type, props: restProps };
}

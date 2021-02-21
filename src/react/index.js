import { reconcile } from 'react-reconciler';

export function createElement(type, props, ...children) {
  const { key, ...restProps } = props || {};

  if (children.length >= 1) {
    restProps.children = children.reduce((previous, current) => previous.concat(current), []);
  }

  return { key, type, props: restProps };
}

function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  reconcile(parentDom, internalInstance, element);
}

export class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };

    updateInstance(this._internalInstance);
  }
}

Component.prototype.isReactComponent = {};

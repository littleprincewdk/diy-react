import { reconcile } from 'react-reconciler';

let rootInstance = null;

export function render(element, container) {
  rootInstance = reconcile(container, rootInstance, element);
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './index.css';

const list = [
  { id: 1, title: 'item 1' },
  { id: 2, title: 'item 2' },
];

function handleClick(e) {
  console.log(e);
}

const App = (
  <ul className={styles.list} style={{ fontSize: 20 }}>
    {list.map((item) => (
      <li className={styles.item} onClick={handleClick}>
        {item.title}
      </li>
    ))}
  </ul>
);

ReactDOM.render(App, document.getElementById('root'));

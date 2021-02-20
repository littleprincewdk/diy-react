import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './index.css';

const TODOList = [
  { id: 1, title: 'reading', done: true },
  { id: 2, title: 'coding' },
  { id: 2, title: 'swimming' },
];

function Checkbox(props) {
  const { checked, onClick } = props;
  return (
    <div className={`${styles.checkbox} ${checked ? styles.checked : ''}`} onClick={onClick} />
  );
}

function handleClick(e) {
  console.log(e);
}

function App() {
  return (
    <div className={styles.list} style={{ fontSize: 20 }}>
      {TODOList.map((item) => (
        <div className={styles.item}>
          <Checkbox checked={item.done} onClick={handleClick} />
          <span className={styles.title}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

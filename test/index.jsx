import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './index.css';

const TODOList = [
  { id: 1, title: 'reading', done: true },
  { id: 2, title: 'coding' },
  { id: 3, title: 'swimming' },
];

function Checkbox(props) {
  const { checked, onClick } = props;
  return (
    <div className={`${styles.checkbox} ${checked ? styles.checked : ''}`} onClick={onClick} />
  );
}

function handleClick(todoId) {
  const todo = TODOList.find((item) => item.id === todoId);
  todo.done = !todo.done;
  // eslint-disable-next-line no-use-before-define
  render();
}

function App() {
  return (
    <div className={styles.list} style={{ fontSize: 20 }}>
      {TODOList.map((todo) => (
        <div className={styles.todo}>
          <Checkbox checked={todo.done} onClick={() => handleClick(todo.id)} />
          <span className={styles.title}>{todo.title}</span>
        </div>
      ))}
    </div>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();

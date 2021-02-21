import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './index.css';

const TODOList = [
  { id: 1, title: 'reading', done: true },
  { id: 2, title: 'coding' },
  { id: 3, title: 'swimming' },
];

class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked,
    };
  }

  handleClick = () => {
    const { onClick } = this.props;
    const { checked } = this.state;

    this.setState({
      checked: !checked,
    });

    onClick(!checked);
  };

  render() {
    const { checked } = this.state;

    return (
      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
        onClick={this.handleClick}
      />
    );
  }
}

function handleClick(todoId, checked) {
  const todo = TODOList.find((item) => item.id === todoId);
  todo.done = checked;
}

function App() {
  return (
    <div className={styles.list} style={{ fontSize: 20 }}>
      {TODOList.map((todo) => (
        <div className={styles.todo}>
          <Checkbox checked={todo.done} onClick={(checked) => handleClick(todo.id, checked)} />
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

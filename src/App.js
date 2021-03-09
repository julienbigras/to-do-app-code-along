import Todo from "./Components/Todo";
import Form from "./Components/Form";
import FilterButton from "./Components/FilterButton";

function App(props) {
  function addTask(name) {
    alert(`hello this is ${name}`);
  }

  const taskList = props.tasks.map((task) => (
    <Todo
      name={task.name}
      completed={task.completed}
      id={task.id}
      key={task.id}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;

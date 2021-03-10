import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./Components/Todo";
import Form from "./Components/Form";
import FilterButton from "./Components/FilterButton";

function App(props) {
  // setState for our task list
  const [tasks, setTasks] = useState(props.tasks);

  // function to add a new task to the to do list
  function addTask(name) {
    const newTask = {
      id: `todo-${nanoid()}`,
      name: name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  // function to update the "completed" value of the task object in state
  function toggleCompletedTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // function to edit the names of the tasks on the list
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // create a new object for that task, and update the name to the new name
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // function to delete a task from the to do list
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // maps over the starting tasks data being passed into the App component as a prop
  const taskList = tasks.map((task) => (
    <Todo
      name={task.name}
      completed={task.completed}
      id={task.id}
      key={task.id}
      toggleCompletedTask={toggleCompletedTask}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = tasks.length !== 1 ? "tasks" : "task";
  const headingText = `${tasks.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
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

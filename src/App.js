import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./Components/Todo";
import Form from "./Components/Form";
import FilterButton from "./Components/FilterButton";

// different functions that will be associated with the different filter buttons
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // useState for our task list
  const [tasks, setTasks] = useState(props.tasks);
  // useState for our filter buttons
  const [filter, setFilter] = useState("All");

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
    /* maps over the tasks list and flips the "completed" value if the task id matches the id
    being passed into the toggle function */
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    // updates the task state with the toggled completion value
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
    // updates the tasks state to include the item with the edited name
    setTasks(editedTaskList);
  }

  // function to delete a task from the to do list
  function deleteTask(id) {
    // returns all the tasks except the one whose id matches the id being passed into the delete function
    const remainingTasks = tasks.filter((task) => id !== task.id);
    // updates the tasks state with only the remaining tasks
    setTasks(remainingTasks);
  }

  // maps over the starting tasks data being passed into the App component as a prop
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
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

  // edits the header text content depending on how many tasks are on the list
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // maps over the filter names and creates a button component for each
  const filterList = FILTER_NAMES.map((name) => {
    return (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    );
  });

  return (
    <div className="todoapp stack-large">
      <h1>To-Do List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
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

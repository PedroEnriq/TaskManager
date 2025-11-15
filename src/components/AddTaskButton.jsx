import "./AddTaskButton.css"

function AddTaskButton({ onAdd }) {
  return (
    <button className="add-task-btn" onClick={onAdd}>
      Add Task
    </button>
  )
}

export default AddTaskButton
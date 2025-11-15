import TaskCard from "./TaskCard"

function TaskList({ tasks, onAddMember, onTaskUpdate, onDeleteTask }) { 
  return (
    <div className="task-list">
      {tasks.map(task => (
        
        <TaskCard 
          key={task.id} 
          task={task} 
          onAddMember={onAddMember} 
          onTaskUpdate={onTaskUpdate} 
          onDeleteTask={onDeleteTask} 
        />
      ))}
    </div>
  )
}

export default TaskList
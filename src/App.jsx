import { useState } from "react";
import "../src/App.css";
import "../src/responsive.css";
import TaskList from "./components/TaskList";
import AddTaskButton from "./components/AddTaskButton";
import MemberModal from "./components/MemberModal"; 
import ConfirmationModal from "./components/ConfirmationModal";
import { TASKS } from "./Data";



function App() {
  const [tasks, setTasks] = useState(TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [taskIdToEdit, setTaskIdToEdit] = useState(null); 
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null); 
  
  const handlePreDeleteTask = (taskId) => {
    setTaskIdToDelete(taskId); 
    setIsConfirmationOpen(true); 
  };


  const handleDeleteTask = () => {
    if (taskIdToDelete) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskIdToDelete));
    }
    
    setIsConfirmationOpen(false);
    setTaskIdToDelete(null);
  };
  
  
  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    setTaskIdToDelete(null);
  };


  const handleTaskUpdate = (taskId, field, newValue) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, [field]: newValue, isNew: false } : task
      )
    );
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(), 
      title: "New Task", 
      description: "Description of the new task...", 
      members: [],
      status: "Pending", 
      isNew: true,
    };
    setTasks([...tasks, newTask]);
  };

  const handleAddMember = (taskId) => {
    setTaskIdToEdit(taskId);
    setIsModalOpen(true);
  };

  const handleConfirmAddMember = (memberName) => {
    if (!memberName || memberName.trim() === "" || !taskIdToEdit) {
      setIsModalOpen(false); 
      setTaskIdToEdit(null);
      return; 
    }

    const newMember = {
      id: Date.now(),
      name: memberName.trim(), 
    };

    setTasks(tasks => 
        tasks.map(task =>
          task.id === taskIdToEdit
            ? {
                ...task,
                members: [
                  ...task.members,
                  newMember,
                ],
              }
            : task
        )
    );

    setIsModalOpen(false);
    setTaskIdToEdit(null);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskIdToEdit(null);
  };
  
  const taskToConfirm = tasks.find(t => t.id === taskIdToDelete);


  return (
    <div className="task-container">
      <div className="task-header-box">
        <h1>Task Manager</h1>
      </div>

      <div className="task-list-area">
        <TaskList 
          tasks={tasks} 
          onAddMember={handleAddMember} 
          onTaskUpdate={handleTaskUpdate} 
          onDeleteTask={handlePreDeleteTask} 
        />
      </div>

      <AddTaskButton onAdd={handleAddTask} />
      
      <MemberModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmAddMember} 
      />

      <ConfirmationModal 
        isOpen={isConfirmationOpen} 
        onClose={handleCloseConfirmation} 
        onConfirm={handleDeleteTask} 
        title={`Delete "${taskToConfirm?.title || 'this task'}"?`}
        message="This action is irreversible. Are you sure you want to delete this task permanently?"
      />
    </div>
  );
}

export default App;
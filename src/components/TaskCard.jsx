import { useState, useEffect } from 'react'; 
import TeamMember from "./TeamMember"
import StatusSelector from "./StatusSelector" 
import "./TaskCard.css"

function TaskCard({ task, onAddMember, onTaskUpdate, onDeleteTask }) {
  
  const [isTitleEditing, setIsTitleEditing] = useState(task.isNew || false);
  const [isDescEditing, setIsDescEditing] = useState(task.isNew || false);
  const [tempTitle, setTempTitle] = useState(task.title);
  const [tempDesc, setTempDesc] = useState(task.description);

  useEffect(() => {
    if (task.isNew && isTitleEditing) {
      document.getElementById(`title-input-${task.id}`).focus();
    }
  }, [task.isNew, isTitleEditing, task.id]);

  const handleTitleSave = () => {
    const newTitle = tempTitle.trim() || 'New Task';
    if (newTitle === task.title && !task.isNew) {
      setIsTitleEditing(false);
      return;
    }

    onTaskUpdate(task.id, 'title', newTitle);
    setTempTitle(newTitle); 
    setIsTitleEditing(false);
  };

  const descPlaceholder = 'description of the new task';

  const handleDescSave = () => {
    const newDesc = tempDesc.trim() || 'without description';

    if (newDesc === task.description && !task.isNew) {
      setIsDescEditing(false);
      return;
    }
    
    onTaskUpdate(task.id, 'description', newDesc);
    setTempDesc(newDesc);
    setIsDescEditing(false);
  };
  
  return (
    <div className="task-card">
      
      <button 
        className="delete-btn"
        onClick={() => onDeleteTask(task.id)}
        title="Delete Task"
      >
        ❌
      </button>
      
      {isTitleEditing ? (
        <input
          id={`title-input-${task.id}`}
          type="text"
          className="task-title-input"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          onBlur={handleTitleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.blur();
            }
          }}
        />
      ) : (
        <h3 className="task-title" onClick={() => setIsTitleEditing(true)} title="Clique para editar">{task.title}</h3>
      )}
      
      {isDescEditing ? (
        <textarea
          className="task-desc-input"
          value={
            tempDesc === 'description of the new task' || tempDesc === 'without description'
              ? ''
              : tempDesc
          }
          placeholder={descPlaceholder}
          onChange={(e) => setTempDesc(e.target.value)}
          onBlur={handleDescSave}
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault(); 
              e.target.blur();
            }
          }}
        />
      ) : (
        <p className="task-desc" onClick={() => setIsDescEditing(true)} title="Clique para editar">{task.description}</p>
      )}

      <div className="task-info">
        <div className="member-actions">
          <div className="team">
            {task.members.map(member => (
              <TeamMember key={member.id} name={member.name} />
            ))}
          </div>

          <button
            className="add-member-btn"
            onClick={() => onAddMember(task.id)}
          >
            + Add member
          </button>
        </div>

        <StatusSelector 
          currentStatus={task.status}
          taskId={task.id}
          onTaskUpdate={onTaskUpdate}
        />
        
      </div>
    </div>
  );
}

export default TaskCard;
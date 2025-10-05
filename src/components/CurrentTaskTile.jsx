import React from "react";

const CurrentTaskTile = ({ task }) => {
  if (!task) {
    return null;
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString("pl-PL");

  const progressValue = "100 / 100";

  return (
    <div className="current-task-tile">
      <h2 className="task-title">{task.title || "Brak tytułu zadania"}</h2>

      <p className="task-description">
        {task.description ||
          'Brak opisu dla tego zadania. Kliknij "View all" by przejść do szczegółów.'}
      </p>

      <div className="task-footer">
        <span className="task-date">{formattedDate}</span>
        <span className="task-progress">{progressValue}</span>
      </div>
    </div>
  );
};

export default CurrentTaskTile;

import React from "react";

const CalendarIcon = () => (
  <svg
    className="icon"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ></path>
  </svg>
);
const CheckIcon = () => (
  <svg
    className="icon"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const CurrentTaskTile = ({ task }) => {
  if (!task) {
    return (
      <div className="current-task-tile">
        <h2>Current Task</h2>
        <p className="task-description">No currently assigned task.</p>
      </div>
    );
  }

  const taskTitle = task.title || "No task title";
  const formattedDate = new Date(task.createdAt).toLocaleDateString("pl-PL");
  const progressValue = "100 / 100";

  return (
    <div className="current-task-tile">
      <h2>Current Task</h2>
      <h3 className="task-title">{taskTitle}</h3>

      <p className="task-description">
        {task.description ||
          'No task description. Click "View all" to see details.'}
      </p>

      <div className="task-footer">
        <div>
          <span className="task-date">
            <CalendarIcon />
            {formattedDate}
          </span>
          <span className="task-progress">
            <CheckIcon />
            {progressValue}
          </span>
        </div>
        <button>View all</button>
      </div>
    </div>
  );
};

export default CurrentTaskTile;

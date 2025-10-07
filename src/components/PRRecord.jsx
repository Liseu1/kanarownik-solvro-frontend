import React from "react";

const CalendarIcon = () => (
  <svg
    className="icon"
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
const UserIcon = () => (
  <svg
    className="icon"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ></path>
  </svg>
);

const PRRecord = ({ pullRequest }) => {
  const { task, assignee, reviewer, githubCreatedAt, status } = pullRequest;

  const formattedDate = new Date(githubCreatedAt).toLocaleDateString("pl-PL");

  return (
    <div className="pr-record">
      <span className="pr-task-title">{task?.title || "No task"} </span>

      <div className="pr-details">
        <span className="pr-date">
          <CalendarIcon /> {formattedDate}
        </span>
        <span className="pr-assignee">
          <UserIcon />@{assignee?.username}
        </span>
        <span className="pr-reviewer">
          <UserIcon />@{reviewer?.username} (Reviewer)
        </span>

        <span className={`pr-status status-${status?.toLowerCase()}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default PRRecord;

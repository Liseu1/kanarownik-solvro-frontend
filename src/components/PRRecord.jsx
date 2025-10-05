import React from "react";

const PRRecord = ({ pullRequest }) => {
  const { task, assignee, reviewer, githubCreatedAt, status } = pullRequest;

  const formattedDate = new Date(githubCreatedAt).toLocaleDateString("pl-PL");

  return (
    <div className="pr-record">
      <span className="pr-task-title">
        {task?.title || "Brak zadania"}{" "}
        {/* Użycie operatora ?. dla bezpieczeństwa */}
      </span>

      <div className="pr-details">
        <span className="pr-date">{formattedDate}</span>
        <span className="pr-assignee">@{assignee?.username}</span>
        <span className="pr-reviewer">@{reviewer?.username} (Reviewer)</span>

        <span className={`pr-status status-${status}`}>{status}</span>
      </div>
    </div>
  );
};

export default PRRecord;

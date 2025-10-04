import React from "react";

import useDataFetcher from "../hooks/useDataFetcher";
import Stats from "./Stats";

const REFRESH_INTERVAL = 1800000;

const Dashboard = () => {
  const PR_KEY = "api/pr";
  const USERS_KEY = "api/users";
  const TASKS_KEY = "api/tasks";

  const {
    data: pullRequests = [],
    isLoading: prLoading,
    error: prError,
  } = useDataFetcher(PR_KEY, REFRESH_INTERVAL);
  const {
    data: usersData = [],
    isLoading: usersLoading,
    error: usersError,
  } = useDataFetcher(USERS_KEY, REFRESH_INTERVAL);
  const {
    data: taskCount = [],
    isLoading: tasksLoading,
    error: tasksError,
  } = useDataFetcher(TASKS_KEY, REFRESH_INTERVAL);

  const isLoading = prLoading || usersLoading || tasksLoading;
  const error = prError || usersError || tasksError;

  if (isLoading) {
    return (
      <div className="loading" style={{ padding: "50px" }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" style={{ padding: "50px" }}>
        Error: {error}
      </div>
    );
  }

  if (!Array.isArray(pullRequests) || pullRequests.length === 0) {
    return (
      <div className="error" style={{ padding: "50px" }}>
        No data to display for Pull Requests.
      </div>
    );
  }

  const totalPRs = pullRequests.length;
  const tasksAdded = taskCount.length;

  const totalUsers = usersData.length;
  const activeUsersCount = usersData.filter(
    (user) => user.isActive === true,
  ).length;
  const activeUsersValue = `${activeUsersCount} / ${totalUsers}`;

  const statisticsData = [
    {
      id: "stat-total-prs",
      title: "Pull Requests",
      value: totalPRs,
      link: "/pull-requests",
    },
    {
      id: "tasks-added",
      title: "Tasks Added",
      value: tasksAdded,
      link: "/tasks",
    },
    {
      id: "active-users",
      title: "Active Users",
      value: activeUsersValue,
      link: "/users?isActive=true",
    },
  ];

  return (
    <div>
      <div className="dashboard-layout">
        <div className="stats-container">
          {statisticsData.map((stat) => (
            <Stats
              key={stat.id}
              title={stat.title}
              value={stat.value}
              link={stat.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

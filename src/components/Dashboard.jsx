import React, { useRef, useState } from "react";

import funkyTownSound from "../funky-town.mp3";
import useDataFetcher from "../hooks/useDataFetcher";
import CurrentTaskTile from "./CurrentTaskTile";
import PullRequestsTile from "./PullRequestsTile";
import Stats from "./Stats";

const REFRESH_INTERVAL = 1800000;

const Dashboard = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const audioRef = useRef(null);

  const toggleSpin = () => {
    setIsSpinning((prev) => {
      const newState = !prev;

      if (audioRef.current) {
        if (newState) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
      return newState;
    });
  };

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

  const totalPRs = pullRequests.length;
  const tasksAdded = taskCount.length;

  const totalUsers = usersData.length;
  const activeUsersCount = usersData.filter(
    (user) => user.isActive === true,
  ).length;
  const activeUsersValue = `${activeUsersCount} / ${totalUsers}`;

  const currentTask = taskCount.length > 0 ? taskCount[0] : null;

  const statisticsData = [
    {
      id: "active-users",
      title: "Active Users",
      value: activeUsersValue,
      link: "/users?isActive=true",
    },
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
  ];

  return (
    <div className="dashboard">
      <audio ref={audioRef} loop src={funkyTownSound} preload="auto" />
      <div className="dashboard-grid">
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

        <div className="center-column-stack">
          <PullRequestsTile pullRequests={pullRequests} />
          <CurrentTaskTile task={currentTask} />
        </div>

        <div className="navigation-tile" onClick={toggleSpin}>
          <img
            src="/src/majonez.gif"
            alt="Kanarkowe menu nawigacyjne"
            className={`navigation-image ${isSpinning ? "is-spinning" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

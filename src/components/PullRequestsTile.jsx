import React from "react";

import PRRecord from "./PRRecord";

const PullRequestsTile = ({ pullRequests }) => {
  const recentPRs = pullRequests.slice(0, 4);

  return (
    <div className="pull-requests-tile">
      <h2>Recent pull requests</h2>
      <div className="pr-list">
        {recentPRs.map((pr) => (
          <PRRecord key={pr.id} pullRequest={pr} />
        ))}
      </div>
    </div>
  );
};

export default PullRequestsTile;

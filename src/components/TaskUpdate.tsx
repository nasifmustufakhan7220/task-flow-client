"use client";
import { useState } from "react";
import { ITaskCard } from "./DashboardCard";

const TaskUpdate = ({ task }: { task: ITaskCard }) => {
  const [statusU, setStatusU] = useState(task.status);
  return (
    <div>
      <select
        value={statusU}
        onChange={(e) => setStatusU(e.target.value)}
        className="btn"
      >
        <option disabled={true}>Task Status</option>
        <option>Completed</option>
        <option>In Progress</option>
        <option>Pending</option>
      </select>
    </div>
  );
};

export default TaskUpdate;

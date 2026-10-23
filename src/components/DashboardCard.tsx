import { ClipboardList, TrendingUp } from "lucide-react";
import TaskCard from "./TaskCard";

export const getAllTasks = async () => {
  const res = await fetch("http://localhost:5000/tasks");
  return res.json();
};

export interface ITaskCard {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  tag:string;
}
const cols = "grid grid-cols-[48px_1fr_100px_120px_120px] items-center gap-4 px-5 py-4 text-sm";

const priorityBadge: Record<string, string> = {
  high: "badge-error",
  medium: "badge-warning",
  low: "badge-ghost",
};

const statusBadage: Record<string, string>={
  Pending: "text-[#9c9c9c]",
  Completed: "text-[#75c9a9]",
  On_review: "text-[#e8b65f]",
}

const DashboardCard = async () => {
  const tasks: ITaskCard[] = await getAllTasks();
  const inProgress = tasks.filter((task) => task.status === "In Progress");
  const completed = tasks.filter((task) => task.status === "Completed");
  const todo = tasks.filter((task) => task.status === "Pending");
  return (
    <div>
      
      <div className=" flex items-center gap-4">
        <div>
          <div className=" rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-normal tracking-tight text-gray-900">
                Total Task
              </h2>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 shadow-sm">
                <ClipboardList className="h-6 w-6 text-gray-900" />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-end gap-7">
              <p className="text-5xl font-medium leading-none tracking-tight text-black">
                {tasks.length}
              </p>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-green-500">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <TrendingUp className="h-4 w-4" />
                  </span>

                  <span className="text-lg font-medium">+7%</span>
                </div>

                <p className="text-lg text-gray-500">from last month</p>
              </div>
            </div>
          </div>
        </div>

        <TaskCard tasks={inProgress} />

        <TaskCard tasks={completed} />

        <TaskCard tasks={todo} />
      </div>

      <div className="bg-base-100 rounded-box shadow-md mt-8 p-5">
        <h2 className="text-xl mb-4">Tasks overview</h2>

        <div className={`${cols} bg-base-200 rounded-box`}>
          <p>#</p>
          <p>Name</p>
          <p>Priority</p>
          <p>Tags</p>
          <p>Status</p>
        </div>

        {tasks.map((task, i) => (
          <div key={task._id} className={cols}>
            <p className="opacity-60">{String(i + 1).padStart(2, "0")}</p>
            <p className="font-medium">{task.title}</p>
            <span
              className={`badge badge-outline ${priorityBadge[task.priority]}`}
            >
              {task.priority}
            </span>
            <span className={`badge badge-ghost badge-outline`}>{task.tag}</span>
            <p className={`badge ${task.status === "In Progress" ? `text-[#9373de]` : `${statusBadage[task.status]}`}`}>{task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;

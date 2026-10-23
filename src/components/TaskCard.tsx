import { ClipboardList, TrendingUp } from "lucide-react";
import { ITaskCard } from "./DashboardCard";

const TaskCard = ({tasks}:{tasks:ITaskCard[]}) => {
  return (
    <div className=" rounded-2xl bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-normal tracking-tight text-gray-900">
          {tasks.map(task=>task.status).slice(0,1)}
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

          <p className="text-lg text-gray-500">
            from last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
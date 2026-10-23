import { getAllTasks, ITaskCard } from "./DashboardCard";
import TaskUpdate from "./TaskUpdate";

const TasksLists = async () => {
  const allTasks: ITaskCard[] = await getAllTasks();
  return (
    <div className="">
      {allTasks.map((task) => (
        <div
          className="bg-base-100 flex justify-between items-center text-center rounded-box shadow-md p-8 mt-5"
          key={task._id}
        >
          <p>{task.title}</p>
          <TaskUpdate task={task}/>
        </div>
      ))}
    </div>
  );
};

export default TasksLists;

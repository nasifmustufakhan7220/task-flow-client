import CreateTaskButton from "@/components/CreateTaskButton";
import TasksLists from "@/components/TasksLists";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <div className="bg-base-100 rounded-box shadow-md mb-6 flex justify-between p-5 items-center">
        <p className="text-2xl">Dashboard</p>
        <CreateTaskButton />
      </div>
      <Suspense fallback={<p>Loading......</p>}>
        <TasksLists/>
      </Suspense>
    </div>
  );
};

export default page;

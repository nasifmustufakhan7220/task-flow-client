"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const statusOptions = ["Pending", "On_review", "Completed", "In Progress"];
const priorityOptions = ["high", "medium", "low"];

const CreateTaskButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
    string,
    string
    >;
    setIsOpen(false);
    e.currentTarget.reset();
    const response = await fetch("http://localhost:5000/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const res = await response.json();
    if(res){
      router.refresh();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn text-xl bg-slate-500 text-white"
      >
        <Plus size={18} />
        Create task
      </button>

      <dialog className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="mb-4 text-lg font-semibold">Create task</h3>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-medium">
              Task name
              <input
                name="title"
                type="text"
                required
                placeholder="Enter task name"
                className="input w-full"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium">
              Task description
              <input
                name="description"
                type="text"
                required
                placeholder="Enter task description"
                className="input w-full"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium">
              Task tags
              <input
                name="tag"
                type="text"
                placeholder="e.g. homepage redesign"
                className="input w-full"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium">
              Task status
              <select
                name="status"
                defaultValue="Pending"
                className="select w-full"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium">
              Task priority
              <select
                name="priority"
                defaultValue="medium"
                className="select w-full"
              >
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>

            <div className="modal-action mt-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn bg-slate-500 text-white">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <button type="button">close</button>
        </div>
      </dialog>
    </>
  );
};

export default CreateTaskButton;

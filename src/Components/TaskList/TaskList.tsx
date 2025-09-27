import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { Search, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { TaskItem } from "../TaskItem/TaskItem";
import { useStatusCountHook } from "../../Hooks/useStatusCountHook";
import "./TaskList.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export type status = {
  inProgress: boolean;
  Completed: boolean;
  Pending: boolean;
};
export type task = {
  id: string;
  title: string;
  description: string;
  status: string;
  timestamp: string;
};

export const TaskList = () => {
  const [Task, setTask] = useState<task[]>([]);
  const [Inputtext, setInput] = useState<string>("");

  useEffect(() => {
    const updated = (() => {
      try {
        const task = localStorage.getItem("tasks");
        return task ? JSON.parse(task) : [];
      } catch {
        return [];
      }
    })();

    if (Inputtext) {
      const filtered = updated.filter((cur: any) =>
        cur.title?.toLowerCase().includes(Inputtext.toLowerCase())
      );
      setTask(filtered.length > 0 ? filtered : []);
    } else {
      setTask(updated);
    }
  }, [Inputtext]);

  const [statusOpen, setStatusOpen] = useState<status>({
    inProgress: false,
    Completed: false,
    Pending: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleStatus = (statuss: keyof status) => {
    setStatusOpen((prev) => ({ ...prev, [statuss]: !prev[statuss] }));
  };

  return (
    <div className="tasks">
      {/* Search Input */}
      <div className="search_input_div">
        <div className="search_icon">
          <Search size={15} color="#034EA2" />
        </div>
        <div className="search_input">
          <Input
            placeholder="Search To-Do"
            type="text"
            name="searchtasks"
            value={Inputtext}
            onChange={(e) => handleChange(e)}
            className="searchfilter"
          />
        </div>
      </div>

      <div className="Tasklist">
        {/* In Progress */}
        <div className="InProgress" onClick={() => handleStatus("inProgress")}>
          <div className="inleft">
            <h1 className="progress_count">{`In Progress (${useStatusCountHook(
              Task,
              "InProgress"
            )})`}</h1>
          </div>
          <div className="inright">
            {!statusOpen.inProgress ? <ChevronDown /> : <ChevronUp />}
          </div>
        </div>
        <AnimatePresence>
          {statusOpen.inProgress &&
            Task.map(
              (cur, id) =>
                cur.status === "InProgress" && (
                  <motion.div
                    key={id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="task_div"
                  >
                    <TaskItem {...cur} />
                  </motion.div>
                )
            )}
        </AnimatePresence>

        {/* Completed */}
        <div className="Completed" onClick={() => handleStatus("Completed")}>
          <div className="inleft">
            <h1 className="completed_count">
              {`Completed (${useStatusCountHook(Task, "Completed")})`}
            </h1>
          </div>
          <div className="inright">
            {!statusOpen.Completed ? <ChevronDown /> : <ChevronUp />}
          </div>
        </div>
        <AnimatePresence>
          {statusOpen.Completed &&
            Task.map(
              (cur, id) =>
                cur.status === "Completed" && (
                  <motion.div
                    key={id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="task_div"
                  >
                    <TaskItem {...cur} />
                  </motion.div>
                )
            )}
        </AnimatePresence>

        {/* Pending */}
        <div className="Pending" onClick={() => handleStatus("Pending")}>
          <div className="inleft">
            <h1 className="pending_count">
              {`Pending (${useStatusCountHook(Task, "Pending")})`}
            </h1>
          </div>
          <div className="inright">
            {!statusOpen.Pending ? <ChevronDown /> : <ChevronUp />}
          </div>
        </div>
        <AnimatePresence>
          {statusOpen.Pending &&
            Task.map(
              (cur, id) =>
                cur.status === "Pending" && (
                  <motion.div
                    key={id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="task_div"
                  >
                    <TaskItem {...cur} />
                  </motion.div>
                )
            )}
        </AnimatePresence>
      </div>

      {/* Floating Add Task Button */}
      <Link to="/addTask">
        <div className="addTaskin">
          <Plus size={20} color="#FFFFFF" />
        </div>
      </Link>
    </div>
  );
};

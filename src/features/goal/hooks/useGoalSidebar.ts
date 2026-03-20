import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { GoalType } from "@/features/goal/types/Goal";
import { TaskType } from "@/features/goal/types/Task";

import { getTasksAction } from "@/features/goal/actions/tasks/getTasks";

interface UseGoalsSidebarProps {
  closeSidebar: () => void;
  goal: GoalType;
  updateCheckedTask: (taskId: string, isChecked: boolean) => void;
}

export function useGoalsSidebar({
  closeSidebar,
  goal,
  updateCheckedTask,
}: UseGoalsSidebarProps) {
  const router = useRouter();

  const [goalTasks, setGoalTasks] = useState<TaskType[]>([]);
  const [addedTask, setAddedTask] = useState({});
  const [deletedTask, setDeletedTask] = useState({});
  const [checkedTask, setCheckedTask] = useState<{
    taskId: string;
    isChecked: boolean;
  } | null>(null);

  function handleCheckedTask(taskId: string, isChecked: boolean) {
    setCheckedTask({ taskId, isChecked });
    updateCheckedTask(taskId, isChecked);
  }

  function updateDeletedTask(taskId: string) {
    setDeletedTask(taskId);
  }

  function handleAddTask(task: {
    title: string;
    goalId: string;
    action: string;
  }) {
    setAddedTask(task);
  }

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasksAction(goal.id);
      setGoalTasks(tasks);
    }

    fetchTasks();
  }, [goal.id]);

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasksAction(goal.id);
      setGoalTasks(tasks);
    }
    fetchTasks();
  }, [addedTask]);

  /*   useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasksAction(goal.id);
      setGoalTasks(tasks);
    }
    fetchTasks();
  }, [goal]); */

  /*   useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasksAction(goal.id);
      setGoalTasks(tasks);
    }
    fetchTasks();
  }, [addedTask]); */

  /*   useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasksAction(goal.id);
      setGoalTasks(tasks);
    }
    fetchTasks();
  }, [deletedTask]); */

  /*   useEffect(() => {
    if (!checkedTask) return;

    async function fetchTasks() {
      const tasks = await getTasksAction(goal.id);
      setGoalTasks(tasks);
    }

    fetchTasks();
  }, [checkedTask]); */

  async function handleDeleteGoal() {
    //   const response = await deleteGoal(goal.id);
    router.refresh();
    closeSidebar();
  }

  const allTasks = goalTasks.length;
  const checkedTasks = goalTasks.filter((task) => task.isChecked).length;

  return {
    goalTasks,
    handleCheckedTask,
    updateDeletedTask,
    handleAddTask,
    handleDeleteGoal,
    allTasks,
    checkedTasks,
  };
}

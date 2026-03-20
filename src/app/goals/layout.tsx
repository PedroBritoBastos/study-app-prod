import { GoalContextProvider } from "@/features/goal/contexts/GoalContext";

export default function GoalsLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return <GoalContextProvider>{children}</GoalContextProvider>;
}
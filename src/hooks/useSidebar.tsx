import { useState } from "react";

export function useSidebar() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   function openSidebar() {
      setIsSidebarOpen(true);
   }

   function closeSidebar() {
      setIsSidebarOpen(false);
   }

   return {
      isSidebarOpen,
      openSidebar,
      closeSidebar,
   };
}
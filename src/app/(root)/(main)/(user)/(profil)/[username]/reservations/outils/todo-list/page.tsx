import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Separator } from "@/components/shadcn/separator";
import { AddTask } from "@/components/user/todoList/AddTask";
import { SideMenu } from "@/components/user/todoList/SideMenu";
import { TodoContent } from "@/components/user/todoList/TodoContent";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { PenIcon, X } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Mes Todo-lists",
   description: "Page des todo-lists utilisateur",
};

export default async function page() {
   // Connected user
   const { userId } = auth();
   if (!userId) return;
   const user = await getUserByClerkId(userId);
   if (!user) {
      return;
   }

   // All User List Data
   const allList = await db.todolist.findMany({
      where: {
         userId: user.id,
      },
   });

   //TODO: récupérer id list selon choix utilisateur

	// All Task by list id
   const allTasks = await db.task.findMany({
		orderBy: {
			createdAt: "desc",
		}
   });

	

   return (
      <div className="flex items-start gap-5 max-lg:px-2">
         {/* Left Menu */}
         <SideMenu allList={allList} />

         {/* Content */}
         <TodoContent allList={allList} allTasks={allTasks}/>
      </div>
   );
}

"use client"

import React from "react";
import NavigationBar from "@/components/Dashboard/NavigationBar";

interface IAppLayout {
  children: React.ReactNode
}

const AppLayout = ({ children }: IAppLayout) => {
  return (
    <div className=" flex flex-col w-full h-full max-w-full max-h-full">
      <NavigationBar />
      <div>
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
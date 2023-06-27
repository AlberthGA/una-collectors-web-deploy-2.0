"use client"

import React from "react";

interface ILoginLayout {
  children: React.ReactNode
}

const LoginLayout = ({ children }: ILoginLayout) => {
  return (
    <div className=" flex flex-col w-full h-full max-w-full max-h-full login-page">
      <div className='flex flex-1 content-center items-center justify-center overflow-x-auto'>
        {children}
      </div>
    </div>
  );
}

export default LoginLayout;
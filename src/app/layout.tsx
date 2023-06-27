"use client"

import React from "react";
import msalInstance from '../pages/api/auth/msalInstance';
import { MsalProvider } from '@azure/msal-react';
import './../styles/globals.css';

interface IAdminLayout {
  children: React.ReactNode
}

const AdminLayout = ({ children }: IAdminLayout) => {
  return (
    <html lang="en" className="w-full h-full">
      <head>
        <title>Collectors Web</title>
      </head>
      <body className="w-full h-full max-h-full ">
        <MsalProvider instance={msalInstance}>
          {children}
        </MsalProvider>
      </body>
    </html>

  );
}

export default AdminLayout;
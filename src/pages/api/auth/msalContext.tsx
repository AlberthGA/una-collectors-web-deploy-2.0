"use client" 
import React, { createContext } from "react";
import msalInstance from "./msalInstance";

export const MsalContext = createContext(msalInstance);

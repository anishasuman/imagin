import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar";

import { ThemeProvider } from "@/components/theme-provider";

import { ClerkProvider } from "@clerk/react-router";

import { shadcn } from "@clerk/themes";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;



if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const RootLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="imagine-ui-theme">
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        appearance={{
          theme : shadcn
        }}
      >
        <div className="flex flex-col h-screen min-h-screen w-full">
          <Navbar />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </ClerkProvider>
    </ThemeProvider>
  );
};


export default RootLayout;
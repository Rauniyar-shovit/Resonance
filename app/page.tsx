import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import React from "react";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center flex-col justify-center gap-4 bg-background">
      <h1 className="text-2xl font-semibold">Welcome to Resonance</h1>

      <div>
        <OrganizationSwitcher />
        <UserButton />
      </div>
    </div>
  );
};

export default Home;

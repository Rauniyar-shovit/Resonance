import VoicesLayout from "@/features/voices/views/voices-layout";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <VoicesLayout>{children}</VoicesLayout>;
};

export default Layout;

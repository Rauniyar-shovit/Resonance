import React from "react";

/**
 * Shell for the voices route.
 *
 * The header lives with the view rather than here: its mono note counts what the
 * library holds, which only the view's query knows.
 */
const VoicesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">{children}</div>
  );
};

export default VoicesLayout;

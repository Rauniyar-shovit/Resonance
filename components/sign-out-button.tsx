"use client";

import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <ClerkSignOutButton>
      <Button>Sign out</Button>
    </ClerkSignOutButton>
  );
}

export default SignOutButton;

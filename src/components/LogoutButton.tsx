"use client";

import React from "react";
import { logoutAction } from "@/app/actions/auth-actions";

export default function LogoutButton({ className }: { className?: string }) {
  const handleLogout = () => {
    sessionStorage.removeItem("carefirst_admin_tab_session");
  };

  return (
    <form action={logoutAction} onSubmit={handleLogout}>
      <button type="submit" className={`cursor-pointer ${className || ""}`}>
        LOG OUT
      </button>
    </form>
  );
}

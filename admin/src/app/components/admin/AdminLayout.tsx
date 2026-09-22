"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#f7f8fc]"
      style={{
        display: "grid",
        gridTemplateColumns: collapsed
          ? "72px minmax(0, 1fr)"
          : "244px minmax(0, 1fr)",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: collapsed ? "72px" : "244px",
          minWidth: collapsed ? "72px" : "244px",
          transition: "width 300ms ease",
        }}
      >
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />
      </div>

      {/* HALAMAN ADMIN */}
      <main
        className="min-w-0"
        style={{
          width: "100%",
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  );
}
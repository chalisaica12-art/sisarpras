"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

function Icon({
  children,
  size = 18,
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/* =========================
   ICON
========================= */

function DashboardIcon() {
  return (
    <Icon>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </Icon>
  );
}

function BoxIcon() {
  return (
    <Icon>
      <path d="M4 7h16v13H4z" />
      <path d="M4 7l2-3h12l2 3" />
      <path d="M8 11h8" />
    </Icon>
  );
}

function TruckIcon() {
  return (
    <Icon>
      <path d="M3 6h11v11H3z" />
      <path d="M14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </Icon>
  );
}

function DocumentIcon() {
  return (
    <Icon>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v5h4" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </Icon>
  );
}

function RoomIcon() {
  return (
    <Icon>
      <path d="M5 20V5h12v15" />
      <path d="M17 8h3v12" />
      <path d="M9 9h3" />
      <path d="M11 13v3" />
    </Icon>
  );
}

function UsersIcon() {
  return (
    <Icon>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
      <path d="M16 5.5a3 3 0 010 5.5" />
      <path d="M17 15c2.5.5 4 2 4 4" />
    </Icon>
  );
}

function WrenchIcon() {
  return (
    <Icon>
      <path d="M14 6a5 5 0 01-6 6l-5 5 3 3 5-5a5 5 0 006-6l-3 2-2-2z" />
    </Icon>
  );
}

function WarningIcon() {
  return (
    <Icon>
      <path d="M12 4l9 16H3z" />
      <path d="M12 9v5" />
      <path d="M12 17h.01" />
    </Icon>
  );
}

function ChartIcon() {
  return (
    <Icon>
      <path d="M5 20V10" />
      <path d="M12 20V4" />
      <path d="M19 20v-7" />
      <path d="M3 20h18" />
    </Icon>
  );
}

function SettingsIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 000-6l-1.6-.6a6.5 6.5 0 00-.7-1.7l.7-1.6a1.7 1.7 0 00-4.2-1.7L12 4a6.5 6.5 0 00-2 0l-1.6-.6a1.7 1.7 0 00-4.2 1.7l.7 1.6a6.5 6.5 0 00-.7 1.7L2.6 9a1.7 1.7 0 000 6l1.6.6a6.5 6.5 0 00.7 1.7l-.7 1.6a1.7 1.7 0 004.2 1.7L10 20a6.5 6.5 0 002 0l1.6.6a1.7 1.7 0 004.2-1.7l-.7-1.6a6.5 6.5 0 00.7-1.7z" />
    </Icon>
  );
}

function ShieldIcon() {
  return (
    <Icon>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  );
}

function UserIcon() {
  return (
    <Icon size={17}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
    </Icon>
  );
}

function LogoutIcon() {
  return (
    <Icon size={17}>
      <path d="M10 5H5v14h5" />
      <path d="M14 8l4 4-4 4" />
      <path d="M18 12H9" />
    </Icon>
  );
}

function ChevronIcon({
  collapsed,
}: {
  collapsed: boolean;
}) {
  return (
    <Icon size={16}>
      {collapsed ? (
        <path d="M9 6l6 6-6 6" />
      ) : (
        <path d="M15 6l-6 6 6 6" />
      )}
    </Icon>
  );
}

/* =========================
   MENU ITEM
========================= */

type MenuItemProps = {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: number;
  collapsed: boolean;
};

function MenuItem({
  href,
  label,
  icon,
  badge,
  collapsed,
}: MenuItemProps) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== "/dashboard" &&
      pathname.startsWith(href));

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`group relative flex h-8.5 items-center rounded-md text-[13px] transition ${
        collapsed
          ? "justify-center px-0"
          : "gap-3 px-2.5"
      } ${
        active
          ? "bg-[#202f70] text-white"
          : "text-[#565b68] hover:bg-[#f2f4fa]"
      }`}
    >
      <span className="shrink-0">
        {icon}
      </span>

      {!collapsed && (
        <>
          <span className="flex-1 truncate">
            {label}
          </span>

          {badge !== undefined && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d71920] px-1 text-[11px] font-semibold text-white">
              {badge}
            </span>
          )}
        </>
      )}

      {collapsed && badge !== undefined && (
        <span className="absolute right-1 top-0 flex h-4 min-w-4 -translate-y-1/2 items-center justify-center rounded-full bg-[#d71920] px-1 text-[9px] font-semibold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}

/* =========================
   SIDEBAR
========================= */

type AdminSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function AdminSidebar({
  collapsed,
  onToggle,
}: AdminSidebarProps) {
  return (
    <aside
  className="sticky top-0 z-50 flex h-screen w-full flex-col border-r border-[#e8eaf0] bg-white"
>
      {/* =========================
          LOGO
      ========================= */}

      <div
        className={`flex items-center border-b border-[#f0f1f5] ${
          collapsed
            ? "justify-center px-3 py-6"
            : "gap-3 px-6 py-6"
        }`}
      >
        <Image
          src="/Logo2.png"
          alt="Logo SISARPRAS"
          width={42}
          height={42}
          className={`shrink-0 object-contain ${
            collapsed
              ? "h-9 w-9"
              : "h-10.5 w-10.5"
          }`}
        />

        {!collapsed && (
          <div className="min-w-0">
            <div className="text-[16px] font-bold tracking-[-0.3px] text-[#202f70]">
              SISARPRAS
            </div>

            <div className="mt-0.5 max-w-[150px] text-[9px] font-medium leading-[1.25] text-[#59617a]">
              Sistem Informasi Sarana &amp;
              Prasarana Sekolah
            </div>
          </div>
        )}
      </div>

      {/* =========================
          TOGGLE
      ========================= */}

      <button
        type="button"
        onClick={onToggle}
        title={
          collapsed
            ? "Tampilkan sidebar"
            : "Sembunyikan sidebar"
        }
        className="absolute -right-4 top-6 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-[#e1e4eb] bg-white text-[#505766] shadow-sm transition hover:bg-[#f4f6fa]"
      >
        <ChevronIcon collapsed={collapsed} />
      </button>

      {/* =========================
          MENU
      ========================= */}

      <div
        className={`flex-1 overflow-y-auto pb-3 pt-5 ${
          collapsed ? "px-3" : "px-6"
        }`}
      >
        {/* DASBOR */}

        {!collapsed && (
          <div className="mb-2 mt-2 px-2.5 text-[10px] font-medium tracking-[0.5px] text-[#777b86]">
            DASBOR
          </div>
        )}

        <MenuItem
          href="/dashboard"
          label="Dasbor"
          icon={<DashboardIcon />}
          collapsed={collapsed}
        />

        {/* DATA */}

        {!collapsed && (
          <div className="mb-2 mt-5 px-2.5 text-[10px] font-medium tracking-[0.5px] text-[#777b86]">
            DATA
          </div>
        )}

        <MenuItem
          href="/barang"
          label="Data Barang"
          icon={<BoxIcon />}
          collapsed={collapsed}
        />

        <MenuItem
          href="/distribusi"
          label="Distribusi Barang"
          icon={<TruckIcon />}
          collapsed={collapsed}
        />

        <MenuItem
          href="/perolehan"
          label="Data Perolehan"
          icon={<DocumentIcon />}
          collapsed={collapsed}
        />

        <MenuItem
          href="/ruangan"
          label="Data Ruangan"
          icon={<RoomIcon />}
          collapsed={collapsed}
        />

        <MenuItem
          href="/pengguna"
          label="Data Pengguna"
          icon={<UsersIcon />}
          collapsed={collapsed}
        />

        {/* OPERASIONAL */}

        {!collapsed && (
          <div className="mb-2 mt-5 px-2.5 text-[10px] font-medium tracking-[0.5px] text-[#777b86]">
            OPERASIONAL
          </div>
        )}

        <MenuItem
          href="/perawatan"
          label="Perawatan & Perbaikan"
          icon={<WrenchIcon />}
          collapsed={collapsed}
        />

        <MenuItem
          href="/pengaduan"
          label="Pengaduan Kerusakan"
          icon={<WarningIcon />}
          badge={5}
          collapsed={collapsed}
        />

        <MenuItem
          href="/rekap-laporan"
          label="Rekap Laporan Bulanan"
          icon={<ChartIcon />}
          collapsed={collapsed}
        />

        {/* KONTEN */}

        {!collapsed && (
          <div className="mb-2 mt-5 px-2.5 text-[10px] font-medium tracking-[0.5px] text-[#777b86]">
            KONTEN
          </div>
        )}

        <MenuItem
          href="/informasi-home"
          label="Informasi Home"
          icon={<DocumentIcon />}
          collapsed={collapsed}
        />

        {/* SISTEM */}

        {!collapsed && (
          <div className="mb-2 mt-5 px-2.5 text-[10px] font-medium tracking-[0.5px] text-[#777b86]">
            SISTEM
          </div>
        )}

        <MenuItem
          href="/pengaturan-profil"
          label="Pengaturan Profil"
          icon={<SettingsIcon />}
          collapsed={collapsed}
        />

        <MenuItem
          href="/role"
          label="Peran & Hak Akses"
          icon={<ShieldIcon />}
          collapsed={collapsed}
        />
      </div>

      {/* =========================
          PROFILE
      ========================= */}

      <div
        className={`border-t border-[#edf0f5] bg-[#f5f7fc] ${
          collapsed
            ? "px-2 py-3"
            : "px-4 py-3"
        }`}
      >
        <div
          className={`flex items-center rounded-lg bg-white ${
            collapsed
              ? "justify-center px-2 py-2.5"
              : "px-3 py-2.5"
          }`}
        >
          <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#07164f] text-white">
            <UserIcon />
          </div>

          {!collapsed && (
            <>
              <div className="ml-3 min-w-0 flex-1">
                <div className="truncate text-[12px] font-semibold text-[#252a35]">
                  Hendra Wijaya, S.
                </div>

                <div className="truncate text-[10px] text-[#777b86]">
                  Wakasek Sarpras
                </div>
              </div>

              <button
                type="button"
                className="ml-2 text-[#d71920] transition hover:opacity-70"
                title="Keluar"
              >
                <LogoutIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
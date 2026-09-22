"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

/* =========================================================
   TYPE
========================================================= */

type Role = {
  id: number;
  nama: string;
  kode: string;
  deskripsi: string;
  hakAkses: string[];
};

type SortField =
  | "nama"
  | "hakAkses"
  | "jumlahHakAkses";

type SortDirection = "asc" | "desc";

/* =========================================================
   DATA
========================================================= */

const initialRoles: Role[] = [
  {
    id: 1,
    nama: "User",
    kode: "USER",
    deskripsi:
      "Pengguna yang dapat membuat dan memantau laporan kerusakan.",
    hakAkses: [
      "melihat dashboard",
      "tambah pengaduan",
      "lihat pengaduan",
      "detail pengaduan",
      "chat pelapor",
      "ubah profil",
    ],
  },

  {
    id: 2,
    nama: "Admin",
    kode: "ADMIN",
    deskripsi:
      "Pengelola operasional sarana dan prasarana sekolah.",
    hakAkses: [
      "melihat dashboard",
      "tambah barang",
      "lihat barang",
      "detail barang",
      "ubah barang",
      "hapus barang",
      "tambah distribusi",
      "lihat distribusi",
      "detail distribusi",
      "tambah perolehan",
      "lihat perolehan",
      "detail perolehan",
      "ubah perolehan",
      "hapus perolehan",
      "tambah ruangan",
      "lihat ruangan",
      "detail ruangan",
      "ubah ruangan",
      "hapus ruangan",
      "perawatan & perbaikan",
      "pengaduan kerusakan",
      "ubah status pengaduan",
      "chat pelapor",
      "rekap laporan bulanan",
      "ubah profil",
    ],
  },

  {
    id: 3,
    nama: "Super Admin",
    kode: "SUPER_ADMIN",
    deskripsi:
      "Pengelola sistem dengan akses administrasi dan pengaturan hak akses.",
    hakAkses: [
      "melihat dashboard",
      "tambah barang",
      "lihat barang",
      "detail barang",
      "ubah barang",
      "hapus barang",
      "import barang",
      "export barang",
      "print barang",
      "tambah distribusi",
      "lihat distribusi",
      "detail distribusi",
      "ubah distribusi",
      "hapus distribusi",
      "tambah perolehan",
      "lihat perolehan",
      "detail perolehan",
      "ubah perolehan",
      "hapus perolehan",
      "tambah ruangan",
      "lihat ruangan",
      "detail ruangan",
      "ubah ruangan",
      "hapus ruangan",
      "import ruangan",
      "export ruangan",
      "print ruangan",
      "data pengguna",
      "tambah pengguna",
      "ubah pengguna",
      "hapus pengguna",
      "perawatan & perbaikan",
      "pengaduan kerusakan",
      "ubah status pengaduan",
      "chat pelapor",
      "rekap laporan bulanan",
      "peran & hak akses",
      "ubah profil",
    ],
  },
];

/* =========================================================
   ICON
========================================================= */

function Icon({
  children,
  size = 18,
}: {
  children: React.ReactNode;
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
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SearchIcon() {
  return (
    <Icon size={16}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Icon>
  );
}

function FilterIcon() {
  return (
    <Icon size={16}>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </Icon>
  );
}

function PlusIcon() {
  return (
    <Icon size={16}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Icon>
  );
}

function EditIcon() {
  return (
    <Icon size={16}>
      <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </Icon>
  );
}

function TrashIcon() {
  return (
    <Icon size={16}>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M18 7v13H6V7" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </Icon>
  );
}

function ChevronDownIcon() {
  return (
    <Icon size={14}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

/* =========================================================
   NORMALIZE SEARCH
========================================================= */

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/* =========================================================
   PAGE
========================================================= */

export default function RolePage() {
  const [roles] =
    useState<Role[]>(initialRoles);

  /* =======================================================
     SEARCH
  ======================================================= */

  const [search, setSearch] =
    useState("");

  /* =======================================================
     FILTER HAK AKSES
  ======================================================= */

  const [filterPermission, setFilterPermission] =
    useState("Semua Hak Akses");

  /* =======================================================
     SORTING
  ======================================================= */

  const [sortField, setSortField] =
    useState<SortField>("nama");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  /* =======================================================
     PAGINATION
  ======================================================= */

  const [entriesPerPage, setEntriesPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* =======================================================
     SEMUA HAK AKSES
  ======================================================= */

  const allPermissions = useMemo(() => {
    const permissionSet =
      new Set<string>();

    roles.forEach((role) => {
      role.hakAkses.forEach(
        (permission) => {
          permissionSet.add(permission);
        }
      );
    });

    return Array.from(permissionSet).sort(
      (a, b) =>
        a.localeCompare(b, "id")
    );
  }, [roles]);

  /* =======================================================
     SEARCH + FILTER + SORT
  ======================================================= */

  const filteredRoles = useMemo(() => {
    const keyword =
      normalizeText(search);

    const result = roles.filter((role) => {
      /* ---------------------------------------------
         GABUNG SEMUA TEKS YANG BISA DICARI
      --------------------------------------------- */

      const permissionText =
        role.hakAkses
          .map((permission) =>
            normalizeText(permission)
          )
          .join(" ");

      const searchableText =
        [
          role.nama,
          role.kode,
          role.deskripsi,
          permissionText,
        ]
          .map((value) =>
            normalizeText(value)
          )
          .join(" ");

      /* ---------------------------------------------
         SEARCH
      --------------------------------------------- */

      const matchesSearch =
        keyword === "" ||
        searchableText.includes(
          keyword
        );

      /* ---------------------------------------------
         FILTER HAK AKSES
      --------------------------------------------- */

      const matchesPermission =
        filterPermission ===
          "Semua Hak Akses" ||
        role.hakAkses.some(
          (permission) =>
            permission ===
            filterPermission
        );

      return (
        matchesSearch &&
        matchesPermission
      );
    });

    /* -----------------------------------------------
       SORTING
    ------------------------------------------------ */

    result.sort((a, b) => {
      let comparison = 0;

      if (sortField === "nama") {
        comparison =
          a.nama.localeCompare(
            b.nama,
            "id"
          );
      }

      if (sortField === "hakAkses") {
        const first =
          a.hakAkses[0] || "";

        const second =
          b.hakAkses[0] || "";

        comparison =
          first.localeCompare(
            second,
            "id"
          );
      }

      if (
        sortField ===
        "jumlahHakAkses"
      ) {
        comparison =
          a.hakAkses.length -
          b.hakAkses.length;
      }

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    roles,
    search,
    filterPermission,
    sortField,
    sortDirection,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredRoles.length /
        entriesPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    entriesPerPage;

  const paginatedRoles =
    filteredRoles.slice(
      startIndex,
      startIndex +
        entriesPerPage
    );

  /* =======================================================
     SORT HANDLER
  ======================================================= */

  function handleSort(
    field: SortField
  ) {
    if (sortField === field) {
      setSortDirection(
        (previous) =>
          previous === "asc"
            ? "desc"
            : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  }

  /* =======================================================
     ADD
  ======================================================= */

  function handleAddRole() {
    alert(
      "Form tambah role akan dibuat setelah database dihubungkan."
    );
  }

  /* =======================================================
     EDIT
  ======================================================= */

  function handleEdit(role: Role) {
    alert(
      `Ubah hak akses role: ${role.nama}`
    );
  }

  /* =======================================================
     DELETE
  ======================================================= */

  function handleDelete(role: Role) {
    if (
      role.nama === "Super Admin"
    ) {
      alert(
        "Role Super Admin tidak dapat dihapus."
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Apakah role "${role.nama}" ingin dihapus?`
      );

    if (confirmed) {
      alert(
        `Role "${role.nama}" akan dihapus setelah database terhubung.`
      );
    }
  }

  /* =======================================================
     RESET
  ======================================================= */

  function handleReset() {
    setSearch("");
    setFilterPermission(
      "Semua Hak Akses"
    );
    setSortField("nama");
    setSortDirection("asc");
    setCurrentPage(1);
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className={styles.page}>
      {/* =================================================
          HEADER
      ================================================= */}

      <section className={styles.header}>
        <div>
          <h1>
            Peran & Hak Akses
          </h1>

          <p>
            Kelola role pengguna dan
            hak akses terhadap fitur
            SISARPRAS.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        <section className={styles.tableCard}>
          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <div className={styles.tableHeader}>
            <div>
              <h2>
                Daftar Peran dan Hak Akses
              </h2>

              <p>
                Atur hak akses setiap role
                sesuai kewenangannya.
              </p>
            </div>

            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddRole}
            >
              <PlusIcon />
              Tambah Peran
            </button>
          </div>

          {/* =================================================
              TABLE TOOLS
          ================================================= */}

          <div className={styles.tableTools}>
            {/* SEARCH */}

            <div className={styles.searchBox}>
              <SearchIcon />

              <input
                type="text"
                value={search}
                placeholder="Cari nama role, deskripsi, atau hak akses..."
                onChange={(event) => {
                  setSearch(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* FILTER HAK AKSES */}

            <div className={styles.filterArea}>
              <div className={styles.filterLabel}>
                <FilterIcon />
                <span>
                  Hak Akses
                </span>
              </div>

              <div className={styles.selectWrap}>
                <select
                  value={
                    filterPermission
                  }
                  onChange={(event) => {
                    setFilterPermission(
                      event.target.value
                    );
                    setCurrentPage(1);
                  }}
                >
                  <option value="Semua Hak Akses">
                    Semua Hak Akses
                  </option>

                  {allPermissions.map(
                    (permission) => (
                      <option
                        key={permission}
                        value={permission}
                      >
                        {permission}
                      </option>
                    )
                  )}
                </select>

                <ChevronDownIcon />
              </div>
            </div>

            {/* SORTING */}

            <div className={styles.sortArea}>
              <label>
                Urutkan
              </label>

              <div className={styles.sortSelect}>
                <select
                  value={sortField}
                  onChange={(event) => {
                    handleSort(
                      event.target
                        .value as SortField
                    );
                  }}
                >
                  <option value="nama">
                    Nama Role
                  </option>

                  <option value="hakAkses">
                    Nama Hak Akses
                  </option>

                  <option value="jumlahHakAkses">
                    Jumlah Hak Akses
                  </option>
                </select>

                <button
                  type="button"
                  onClick={() =>
                    setSortDirection(
                      (previous) =>
                        previous ===
                        "asc"
                          ? "desc"
                          : "asc"
                    )
                  }
                >
                  {sortDirection ===
                  "asc"
                    ? "A-Z"
                    : "Z-A"}
                </button>
              </div>
            </div>

            {/* RESET */}

            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Reset
            </button>

            {/* ENTRIES */}

            <div className={styles.entries}>
              <span>
                Tampilkan
              </span>

              <select
                value={entriesPerPage}
                onChange={(event) => {
                  setEntriesPerPage(
                    Number(
                      event.target.value
                    )
                  );
                  setCurrentPage(1);
                }}
              >
                <option value={5}>
                  5
                </option>

                <option value={10}>
                  10
                </option>

                <option value={25}>
                  25
                </option>

                <option value={50}>
                  50
                </option>
              </select>

              <span>
                entri
              </span>
            </div>
          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th
                    className={
                      styles.numberColumn
                    }
                  >
                    No
                  </th>

                  <th className={styles.roleColumn}>
                    Nama Role
                  </th>

                  <th className={styles.descriptionColumn}>
                    Deskripsi
                  </th>

                  <th className={styles.permissionColumn}>
                    Daftar Hak Akses
                  </th>

                  <th className={styles.actionColumn}>
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedRoles.length >
                0 ? (
                  paginatedRoles.map(
                    (role, index) => (
                      <tr key={role.id}>
                        {/* NUMBER */}

                        <td
                          className={
                            styles.numberColumn
                          }
                        >
                          {startIndex +
                            index +
                            1}
                        </td>

                        {/* ROLE */}

                        <td>
                          <div
                            className={
                              styles.roleName
                            }
                          >
                            <strong>
                              {role.nama}
                            </strong>

                            <span>
                              {role.kode}
                            </span>
                          </div>
                        </td>

                        {/* DESCRIPTION */}

                        <td>
                          <p
                            className={
                              styles.description
                            }
                          >
                            {role.deskripsi}
                          </p>
                        </td>

                        {/* PERMISSIONS */}

                        <td>
                          <div
                            className={
                              styles.permissionList
                            }
                          >
                            {role.hakAkses.map(
                              (
                                permission
                              ) => {
                                const isMatched =
                                  search
                                    .trim()
                                    .length >
                                    0 &&
                                  normalizeText(
                                    permission
                                  ).includes(
                                    normalizeText(
                                      search
                                    )
                                  );

                                return (
                                  <span
                                    key={
                                      permission
                                    }
                                    className={`${styles.permissionBadge} ${
                                      isMatched
                                        ? styles.matchedPermission
                                        : ""
                                    }`}
                                  >
                                    {
                                      permission
                                    }
                                  </span>
                                );
                              }
                            )}
                          </div>
                        </td>

                        {/* ACTION */}

                        <td
                          className={
                            styles.actionColumn
                          }
                        >
                          <div
                            className={
                              styles.actions
                            }
                          >
                            <button
                              type="button"
                              className={
                                styles.editButton
                              }
                              title="Ubah"
                              onClick={() =>
                                handleEdit(
                                  role
                                )
                              }
                            >
                              <EditIcon />
                            </button>

                            <button
                              type="button"
                              className={
                                styles.deleteButton
                              }
                              title="Hapus"
                              onClick={() =>
                                handleDelete(
                                  role
                                )
                              }
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className={
                        styles.emptyTable
                      }
                    >
                      Tidak ada data yang
                      sesuai dengan pencarian
                      atau filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className={styles.tableFooter}>
            <span>
              Menampilkan{" "}
              {filteredRoles.length ===
              0
                ? 0
                : startIndex + 1}{" "}
              sampai{" "}
              {Math.min(
                startIndex +
                  entriesPerPage,
                filteredRoles.length
              )}{" "}
              dari{" "}
              {filteredRoles.length}{" "}
              entri
            </span>

            <div className={styles.pagination}>
              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  1
                }
                onClick={() =>
                  setCurrentPage(
                    (previous) =>
                      Math.max(
                        1,
                        previous - 1
                      )
                  )
                }
              >
                ‹
              </button>

              {Array.from(
                {
                  length:
                    totalPages,
                },
                (_, index) =>
                  index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    page ===
                    safeCurrentPage
                      ? styles.activePage
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(
                      page
                    )
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (previous) =>
                      Math.min(
                        totalPages,
                        previous + 1
                      )
                  )
                }
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Role = "Administrator" | "Staff TU (Tata Usaha)";

type Pengguna = {
  id: number;
  nama: string;
  email: string;
  role: Role;
  tanggal: string;
};

type SortKey = "nama" | "email" | "role" | "tanggal";
type SortDirection = "asc" | "desc";

/* =========================================================
   DATA DUMMY
========================================================= */

const penggunaData: Pengguna[] = [
  {
    id: 1,
    nama: "Administrator",
    email: "admin@mail.com",
    role: "Administrator",
    tanggal: "05/12/2026 14:19",
  },
  {
    id: 2,
    nama: "Staff TU (Tata Usaha)",
    email: "stafftu@mail.com",
    role: "Staff TU (Tata Usaha)",
    tanggal: "05/12/2026 14:19",
  },
  {
    id: 3,
    nama: "Rindi Andika",
    email: "rindi@gmail.com",
    role: "Administrator",
    tanggal: "05/12/2026 15:50",
  },
  {
    id: 4,
    nama: "Atik Rahmawati",
    email: "atik@gmail.com",
    role: "Administrator",
    tanggal: "05/12/2026 15:52",
  },
  {
    id: 5,
    nama: "Naurah Fauziah",
    email: "naurah@gmail.com",
    role: "Administrator",
    tanggal: "05/12/2026 15:53",
  },
  {
    id: 6,
    nama: "Dina Pratiwi",
    email: "dina@gmail.com",
    role: "Staff TU (Tata Usaha)",
    tanggal: "06/12/2026 09:12",
  },
  {
    id: 7,
    nama: "Rizky Maulana",
    email: "rizky@gmail.com",
    role: "Staff TU (Tata Usaha)",
    tanggal: "06/12/2026 10:25",
  },
  {
    id: 8,
    nama: "Siti Aisyah",
    email: "siti@gmail.com",
    role: "Administrator",
    tanggal: "06/12/2026 11:40",
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
    >
      {children}
    </svg>
  );
}

function SearchIcon() {
  return (
    <Icon size={17}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </Icon>
  );
}

function PlusIcon() {
  return (
    <Icon size={17}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Icon>
  );
}

function FilterIcon() {
  return (
    <Icon size={17}>
      <path d="M4 5h16" />
      <path d="M7 12h10" />
      <path d="M10 19h4" />
    </Icon>
  );
}

function UsersIcon() {
  return (
    <Icon size={21}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  );
}

function EyeIcon() {
  return (
    <Icon size={16}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </Icon>
  );
}

function EditIcon() {
  return (
    <Icon size={16}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </Icon>
  );
}

function TrashIcon() {
  return (
    <Icon size={16}>
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </Icon>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PenggunaPage() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");

  const [sortKey, setSortKey] =
    useState<SortKey>("nama");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* =========================================================
     CARD DATA
  ========================================================= */

  const totalAdministrator =
    penggunaData.filter(
      (item) => item.role === "Administrator"
    ).length;

  const totalStaffTU =
    penggunaData.filter(
      (item) => item.role === "Staff TU (Tata Usaha)"
    ).length;

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredData = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim();

    return penggunaData.filter((item) => {
      const matchesSearch =
        keyword === "" ||
        item.nama
          .toLowerCase()
          .includes(keyword) ||
        item.email
          .toLowerCase()
          .includes(keyword) ||
        item.role
          .toLowerCase()
          .includes(keyword);

      const matchesRole =
        filterRole === "Semua" ||
        item.role === filterRole;

      return (
        matchesSearch &&
        matchesRole
      );
    });
  }, [search, filterRole]);

  /* =========================================================
     SORTING
  ========================================================= */

  const sortedData = useMemo(() => {
    const data = [...filteredData];

    data.sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      const result =
        valueA.localeCompare(
          valueB,
          "id",
          {
            sensitivity: "base",
          }
        );

      return sortDirection === "asc"
        ? result
        : -result;
    });

    return data;
  }, [
    filteredData,
    sortKey,
    sortDirection,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedData.length / rowsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const currentData =
    sortedData.slice(
      (safeCurrentPage - 1) *
        rowsPerPage,
      safeCurrentPage * rowsPerPage
    );

  const startNumber =
    sortedData.length === 0
      ? 0
      : (safeCurrentPage - 1) *
          rowsPerPage +
        1;

  const endNumber = Math.min(
    safeCurrentPage * rowsPerPage,
    sortedData.length
  );

  /* =========================================================
     HANDLER
  ========================================================= */

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleFilterRole(value: string) {
    setFilterRole(value);
    setCurrentPage(1);
  }

  function handleRowsPerPage(
    value: number
  ) {
    setRowsPerPage(value);
    setCurrentPage(1);
  }

  function handleSortKey(
    value: SortKey
  ) {
    setSortKey(value);
    setCurrentPage(1);
  }

  function handleSortDirection(
    value: SortDirection
  ) {
    setSortDirection(value);
    setCurrentPage(1);
  }

  function handlePrevious() {
    setCurrentPage((page) =>
      Math.max(1, page - 1)
    );
  }

  function handleNext() {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1)
    );
  }

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main className={styles.page}>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Daftar Pengguna</h1>

          <p>
            Kelola data pengguna dan
            peran akses dalam sistem
            SISARPRAS.
          </p>
        </div>
      </section>

      <section className={styles.content}>

        {/* ===================================================
            SUMMARY CARDS
        =================================================== */}

        <div className={styles.summaryGrid}>

          {/* ADMINISTRATOR */}

          <div
            className={`${styles.summaryCard} ${styles.adminCard}`}
          >
            <div className={styles.cardIcon}>
              <UsersIcon />
            </div>

            <div className={styles.cardContent}>
              <span className={styles.cardTitle}>
                Total Administrator
              </span>

              <strong className={styles.cardNumber}>
                {totalAdministrator}
              </strong>

              <span className={styles.cardDescription}>
                Pengguna dengan peran administrator
              </span>
            </div>
          </div>

          {/* STAFF TU */}

          <div
            className={`${styles.summaryCard} ${styles.staffCard}`}
          >
            <div className={styles.cardIcon}>
              <UsersIcon />
            </div>

            <div className={styles.cardContent}>
              <span className={styles.cardTitle}>
                Total Staff TU
              </span>

              <strong className={styles.cardNumber}>
                {totalStaffTU}
              </strong>

              <span className={styles.cardDescription}>
                Pengguna dengan peran Staff TU
              </span>
            </div>
          </div>

        </div>

        {/* ===================================================
            ADD BUTTON
        =================================================== */}

        <div className={styles.addRow}>
          <button
            type="button"
            className={styles.addButton}
          >
            <PlusIcon />
            Tambah Data
          </button>
        </div>

        {/* ===================================================
            TABLE CARD
        =================================================== */}

        <section className={styles.tableCard}>

          {/* TOOLBAR */}

          <div className={styles.toolbar}>

            <div className={styles.toolbarLeft}>

              {/* TAMPILKAN */}

              <div
                className={
                  styles.entriesControl
                }
              >
                <span>
                  Tampilkan
                </span>

                <select
                  value={
                    rowsPerPage
                  }
                  onChange={(
                    event
                  ) =>
                    handleRowsPerPage(
                      Number(
                        event.target
                          .value
                      )
                    )
                  }
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

              {/* FILTER ROLE */}

              <div
                className={
                  styles.filterControl
                }
              >
                <FilterIcon />

                <select
                  value={
                    filterRole
                  }
                  onChange={(
                    event
                  ) =>
                    handleFilterRole(
                      event.target
                        .value
                    )
                  }
                >
                  <option value="Semua">
                    Semua Peran
                  </option>

                  <option value="Administrator">
                    Administrator
                  </option>

                  <option value="Staff TU (Tata Usaha)">
                    Staff TU (Tata Usaha)
                  </option>
                </select>
              </div>

            </div>

            {/* SEARCH */}

            <div
              className={
                styles.searchBox
              }
            >
              <SearchIcon />

              <input
                type="text"
                placeholder="Cari nama, email, atau peran..."
                value={search}
                onChange={(
                  event
                ) =>
                  handleSearch(
                    event.target
                      .value
                  )
                }
              />
            </div>

          </div>

          {/* =================================================
              SORTING
          ================================================= */}

          <div
            className={
              styles.sortBar
            }
          >
            <div
              className={
                styles.sortLabel
              }
            >
              Urutkan data
            </div>

            <select
              value={sortKey}
              onChange={(
                event
              ) =>
                handleSortKey(
                  event.target
                    .value as SortKey
                )
              }
            >
              <option value="nama">
                Nama
              </option>

              <option value="email">
                Email
              </option>

              <option value="role">
                Peran
              </option>

              <option value="tanggal">
                Tanggal Ditambahkan
              </option>
            </select>

            <select
              value={
                sortDirection
              }
              onChange={(
                event
              ) =>
                handleSortDirection(
                  event.target
                    .value as SortDirection
                )
              }
            >
              <option value="asc">
                A-Z
              </option>

              <option value="desc">
                Z-A
              </option>
            </select>

            <span
              className={
                styles.resultCount
              }
            >
              {sortedData.length} pengguna
            </span>
          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div
            className={
              styles.tableWrapper
            }
          >
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

                  <th>
                    Nama Lengkap
                  </th>

                  <th>
                    Alamat Email
                  </th>

                  <th>
                    Peran
                  </th>

                  <th>
                    Tanggal Ditambahkan
                  </th>

                  <th
                    className={
                      styles.actionColumn
                    }
                  >
                    Aksi
                  </th>

                </tr>
              </thead>

              <tbody>

                {currentData.length >
                0 ? (
                  currentData.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={
                          item.id
                        }
                      >

                        {/* NOMOR */}

                        <td
                          className={
                            styles.numberColumn
                          }
                        >
                          {(safeCurrentPage -
                            1) *
                            rowsPerPage +
                            index +
                            1}
                        </td>

                        {/* NAMA */}

                        <td>
                          <span
                            className={
                              styles.nameText
                            }
                          >
                            {
                              item.nama
                            }
                          </span>
                        </td>

                        {/* EMAIL */}

                        <td>
                          <span
                            className={
                              styles.emailText
                            }
                          >
                            {
                              item.email
                            }
                          </span>
                        </td>

                        {/* ROLE */}

                        <td>
                          <span
                            className={
                              item.role ===
                              "Administrator"
                                ? styles.adminBadge
                                : styles.staffBadge
                            }
                          >
                            {
                              item.role
                            }
                          </span>
                        </td>

                        {/* TANGGAL */}

                        <td>
                          <span
                            className={
                              styles.dateText
                            }
                          >
                            {
                              item.tanggal
                            }
                          </span>
                        </td>

                        {/* AKSI */}

                        <td>
                          <div
                            className={
                              styles.actionButtons
                            }
                          >

                            <button
                              type="button"
                              className={`${styles.actionButton} ${styles.viewButton}`}
                              title="Lihat"
                            >
                              <EyeIcon />
                            </button>

                            <button
                              type="button"
                              className={`${styles.actionButton} ${styles.editButton}`}
                              title="Edit"
                            >
                              <EditIcon />
                            </button>

                            <button
                              type="button"
                              className={`${styles.actionButton} ${styles.deleteButton}`}
                              title="Hapus"
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
                      colSpan={6}
                      className={
                        styles.emptyState
                      }
                    >
                      Data pengguna
                      tidak ditemukan.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>

          {/* =================================================
              TABLE FOOTER
          ================================================= */}

          <div
            className={
              styles.tableFooter
            }
          >

            <span
              className={
                styles.showingText
              }
            >
              Menampilkan{" "}
              {startNumber}–
              {endNumber} dari{" "}
              {sortedData.length}{" "}
              pengguna
            </span>

            <div
              className={
                styles.pagination
              }
            >

              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  1
                }
                onClick={
                  handlePrevious
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
              ).map(
                (number) => (
                  <button
                    key={
                      number
                    }
                    type="button"
                    className={
                      safeCurrentPage ===
                      number
                        ? styles.activePage
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(
                        number
                      )
                    }
                  >
                    {number}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={
                  handleNext
                }
              >
                ›
              </button>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}
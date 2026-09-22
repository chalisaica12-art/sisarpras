"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Perolehan = {
  id: number;
  nama: string;
  deskripsi: string;
};

type SortKey = "nama" | "deskripsi";
type SortDirection = "asc" | "desc";

const perolehanData: Perolehan[] = [
  {
    id: 1,
    nama: "BLUD",
    deskripsi: "Badan Layanan Umum Daerah",
  },
  {
    id: 2,
    nama: "BOS",
    deskripsi: "Bantuan Operasional Sekolah",
  },
  {
    id: 3,
    nama: "BPOPP",
    deskripsi:
      "Biaya Penunjang Operasional Penyelenggaraan Pendidikan",
  },
  {
    id: 4,
    nama: "CSR",
    deskripsi: "Corporate Social Responsibility",
  },
  {
    id: 5,
    nama: "TEFA",
    deskripsi: "Teaching Factory",
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

export default function PerolehanPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState("Semua");

  const [sortKey, setSortKey] =
    useState<SortKey>("nama");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredData = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim();

    return perolehanData.filter((item) => {
      const matchesSearch =
        keyword === "" ||
        item.nama
          .toLowerCase()
          .includes(keyword) ||
        item.deskripsi
          .toLowerCase()
          .includes(keyword);

      const matchesFilter =
        filter === "Semua" ||
        item.nama === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [search, filter]);

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

  function handleFilter(value: string) {
    setFilter(value);
    setCurrentPage(1);
  }

  function handleRowsPerPage(
    value: number
  ) {
    setRowsPerPage(value);
    setCurrentPage(1);
  }

  function handleSortKey(value: SortKey) {
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
          HEADER BIRU FULL
      ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Daftar Perolehan</h1>

          <p>
            Kelola sumber perolehan
            barang sarana dan prasarana
            sekolah.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className={styles.content}>

        {/* ===================================================
            ADD BUTTON
        =================================================== */}

        <div className={styles.addDataRow}>
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

          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div className={styles.toolbar}>

            <div className={styles.toolbarLeft}>

              {/* TAMPILKAN */}

              <div
                className={
                  styles.entriesControl
                }
              >
                <span>Tampilkan</span>

                <select
                  value={rowsPerPage}
                  onChange={(event) =>
                    handleRowsPerPage(
                      Number(
                        event.target.value
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

                <span>entri</span>
              </div>

              {/* FILTER */}

              <div
                className={
                  styles.filterControl
                }
              >
                <FilterIcon />

                <select
                  value={filter}
                  onChange={(event) =>
                    handleFilter(
                      event.target.value
                    )
                  }
                >
                  <option value="Semua">
                    Semua Perolehan
                  </option>

                  {perolehanData.map(
                    (item) => (
                      <option
                        key={item.id}
                        value={item.nama}
                      >
                        {item.nama}
                      </option>
                    )
                  )}
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
                placeholder="Cari nama atau deskripsi..."
                value={search}
                onChange={(event) =>
                  handleSearch(
                    event.target.value
                  )
                }
              />
            </div>
          </div>

          {/* =================================================
              SORTING
          ================================================= */}

          <div className={styles.sortBar}>

            <div
              className={
                styles.sortLabel
              }
            >
              Urutkan data
            </div>

            <select
              value={sortKey}
              onChange={(event) =>
                handleSortKey(
                  event.target.value as SortKey
                )
              }
            >
              <option value="nama">
                Nama
              </option>

              <option value="deskripsi">
                Deskripsi
              </option>
            </select>

            <select
              value={sortDirection}
              onChange={(event) =>
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
              {sortedData.length} data
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

                  <th>Nama</th>

                  <th>Deskripsi</th>

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

                {currentData.length > 0 ? (
                  currentData.map(
                    (item, index) => (
                      <tr key={item.id}>

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
                            {item.nama}
                          </span>
                        </td>

                        {/* DESKRIPSI */}

                        <td>
                          <span
                            className={
                              styles.descriptionText
                            }
                          >
                            {item.deskripsi}
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
                      colSpan={4}
                      className={
                        styles.emptyState
                      }
                    >
                      Data perolehan
                      tidak ditemukan.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>

          {/* =================================================
              FOOTER TABLE
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
              Menampilkan {startNumber}–
              {endNumber} dari{" "}
              {sortedData.length} data
            </span>

            <div
              className={
                styles.pagination
              }
            >

              <button
                type="button"
                disabled={
                  safeCurrentPage === 1
                }
                onClick={
                  handlePrevious
                }
              >
                ‹
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
              ).map((number) => (
                <button
                  key={number}
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
              ))}

              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={handleNext}
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
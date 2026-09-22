"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

/* =========================================================
   TYPE
========================================================= */

type SortField =
  | "bulan"
  | "total"
  | "pending"
  | "diproses"
  | "selesai";

type SortDirection = "asc" | "desc";

type MonthlyReport = {
  id: number;
  bulan: string;
  bulanNumber: number;
  tahun: number;
  total: number;
  pending: number;
  diverifikasi: number;
  diproses: number;
  selesai: number;
};

/* =========================================================
   DATA DUMMY
========================================================= */

const initialData: MonthlyReport[] = [
  {
    id: 1,
    bulan: "Januari",
    bulanNumber: 1,
    tahun: 2026,
    total: 6,
    pending: 1,
    diverifikasi: 1,
    diproses: 1,
    selesai: 3,
  },
  {
    id: 2,
    bulan: "Februari",
    bulanNumber: 2,
    tahun: 2026,
    total: 10,
    pending: 2,
    diverifikasi: 1,
    diproses: 2,
    selesai: 5,
  },
  {
    id: 3,
    bulan: "Maret",
    bulanNumber: 3,
    tahun: 2026,
    total: 5,
    pending: 1,
    diverifikasi: 1,
    diproses: 1,
    selesai: 2,
  },
  {
    id: 4,
    bulan: "April",
    bulanNumber: 4,
    tahun: 2026,
    total: 13,
    pending: 2,
    diverifikasi: 2,
    diproses: 3,
    selesai: 6,
  },
  {
    id: 5,
    bulan: "Mei",
    bulanNumber: 5,
    tahun: 2026,
    total: 11,
    pending: 1,
    diverifikasi: 2,
    diproses: 3,
    selesai: 5,
  },
  {
    id: 6,
    bulan: "Juni",
    bulanNumber: 6,
    tahun: 2026,
    total: 16,
    pending: 2,
    diverifikasi: 2,
    diproses: 4,
    selesai: 8,
  },
  {
    id: 7,
    bulan: "Juli",
    bulanNumber: 7,
    tahun: 2026,
    total: 12,
    pending: 1,
    diverifikasi: 2,
    diproses: 3,
    selesai: 6,
  },
  {
    id: 8,
    bulan: "Agustus",
    bulanNumber: 8,
    tahun: 2026,
    total: 14,
    pending: 2,
    diverifikasi: 2,
    diproses: 4,
    selesai: 6,
  },
  {
    id: 9,
    bulan: "September",
    bulanNumber: 9,
    tahun: 2026,
    total: 9,
    pending: 1,
    diverifikasi: 1,
    diproses: 3,
    selesai: 4,
  },
  {
    id: 10,
    bulan: "Oktober",
    bulanNumber: 10,
    tahun: 2026,
    total: 0,
    pending: 0,
    diverifikasi: 0,
    diproses: 0,
    selesai: 0,
  },
  {
    id: 11,
    bulan: "November",
    bulanNumber: 11,
    tahun: 2026,
    total: 0,
    pending: 0,
    diverifikasi: 0,
    diproses: 0,
    selesai: 0,
  },
  {
    id: 12,
    bulan: "Desember",
    bulanNumber: 12,
    tahun: 2026,
    total: 0,
    pending: 0,
    diverifikasi: 0,
    diproses: 0,
    selesai: 0,
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

function ChevronDownIcon() {
  return (
    <Icon size={14}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function RekapLaporanBulananPage() {
  const [data] =
    useState<MonthlyReport[]>(initialData);

  /* =======================================================
     FILTER
  ======================================================= */

  const [selectedYear, setSelectedYear] =
    useState("2026");

  const [selectedMonth, setSelectedMonth] =
    useState("Semua");

  const [search, setSearch] =
    useState("");

  /* =======================================================
     SORTING
  ======================================================= */

  const [sortField, setSortField] =
    useState<SortField>("bulan");

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
     FILTER + SORT DATA
  ======================================================= */

  const filteredData = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    const result = data.filter((item) => {
      const matchesYear =
        selectedYear === "Semua" ||
        item.tahun.toString() === selectedYear;

      const matchesMonth =
        selectedMonth === "Semua" ||
        item.bulan === selectedMonth;

      const matchesSearch =
        !keyword ||
        item.bulan
          .toLowerCase()
          .includes(keyword);

      return (
        matchesYear &&
        matchesMonth &&
        matchesSearch
      );
    });

    result.sort((a, b) => {
      let comparison = 0;

      if (sortField === "bulan") {
        comparison =
          a.bulanNumber -
          b.bulanNumber;
      }

      if (sortField === "total") {
        comparison =
          a.total - b.total;
      }

      if (sortField === "pending") {
        comparison =
          a.pending - b.pending;
      }

      if (sortField === "diproses") {
        comparison =
          a.diproses - b.diproses;
      }

      if (sortField === "selesai") {
        comparison =
          a.selesai - b.selesai;
      }

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    data,
    selectedYear,
    selectedMonth,
    search,
    sortField,
    sortDirection,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredData.length /
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

  const paginatedData =
    filteredData.slice(
      startIndex,
      startIndex + entriesPerPage
    );

  /* =======================================================
     SUMMARY
  ======================================================= */

  const summaryData = useMemo(() => {
    const result = data.filter((item) => {
      const matchesYear =
        selectedYear === "Semua" ||
        item.tahun.toString() === selectedYear;

      const matchesMonth =
        selectedMonth === "Semua" ||
        item.bulan === selectedMonth;

      return (
        matchesYear &&
        matchesMonth
      );
    });

    return result.reduce(
      (acc, item) => {
        acc.total += item.total;
        acc.pending += item.pending;
        acc.diproses += item.diproses;
        acc.selesai += item.selesai;

        return acc;
      },
      {
        total: 0,
        pending: 0,
        diproses: 0,
        selesai: 0,
      }
    );
  }, [
    data,
    selectedYear,
    selectedMonth,
  ]);

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
            Rekap Laporan Bulanan
          </h1>

          <p>
            Rekapitulasi jumlah laporan
            kerusakan berdasarkan periode
          </p>
        </div>
      </section>

      <div className={styles.container}>
        {/* =================================================
            FILTER
        ================================================= */}

        <section
          className={styles.filterCard}
        >
          <div
            className={styles.filterTitle}
          >
            <div
              className={styles.filterIcon}
            >
              <FilterIcon />
            </div>

            <div>
              <h2>
                Filter Rekap
              </h2>

              <p>
                Pilih tahun dan bulan
                yang ingin ditampilkan.
              </p>
            </div>
          </div>

          <div
            className={styles.filterControls}
          >
            {/* TAHUN */}

            <div className={styles.field}>
              <label>Tahun</label>

              <div
                className={styles.selectWrap}
              >
                <select
                  value={selectedYear}
                  onChange={(event) => {
                    setSelectedYear(
                      event.target.value
                    );
                    setCurrentPage(1);
                  }}
                >
                  <option value="Semua">
                    Semua Tahun
                  </option>

                  <option value="2026">
                    2026
                  </option>
                </select>

                <ChevronDownIcon />
              </div>
            </div>

            {/* BULAN */}

            <div className={styles.field}>
              <label>Bulan</label>

              <div
                className={styles.selectWrap}
              >
                <select
                  value={selectedMonth}
                  onChange={(event) => {
                    setSelectedMonth(
                      event.target.value
                    );
                    setCurrentPage(1);
                  }}
                >
                  <option value="Semua">
                    Semua Bulan
                  </option>

                  {[
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember",
                  ].map((month) => (
                    <option
                      key={month}
                      value={month}
                    >
                      {month}
                    </option>
                  ))}
                </select>

                <ChevronDownIcon />
              </div>
            </div>

            {/* RESET */}

            <button
              type="button"
              className={styles.resetButton}
              onClick={() => {
                setSelectedYear("2026");
                setSelectedMonth("Semua");
                setSearch("");
                setSortField("bulan");
                setSortDirection("asc");
                setCurrentPage(1);
              }}
            >
              Reset
            </button>
          </div>
        </section>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <section
          className={styles.summaryGrid}
        >
          <div
            className={styles.summaryCard}
          >
            <span
              className={
                styles.summaryLabel
              }
            >
              Total Laporan
            </span>

            <strong>
              {summaryData.total}
            </strong>

            <small>
              Laporan masuk
            </small>
          </div>

          <div
            className={styles.summaryCard}
          >
            <span
              className={
                styles.summaryLabel
              }
            >
              Pending
            </span>

            <strong>
              {summaryData.pending}
            </strong>

            <small>
              Menunggu tindakan
            </small>
          </div>

          <div
            className={styles.summaryCard}
          >
            <span
              className={
                styles.summaryLabel
              }
            >
              Sedang Diproses
            </span>

            <strong>
              {summaryData.diproses}
            </strong>

            <small>
              Dalam penanganan
            </small>
          </div>

          <div
            className={styles.summaryCard}
          >
            <span
              className={
                styles.summaryLabel
              }
            >
              Selesai
            </span>

            <strong>
              {summaryData.selesai}
            </strong>

            <small>
              Penanganan selesai
            </small>
          </div>
        </section>

        {/* =================================================
            TABLE
        ================================================= */}

        <section
          className={styles.tableCard}
        >
          <div
            className={styles.tableHeader}
          >
            <div>
              <h2>
                Rekapitulasi Laporan
              </h2>

              <p>
                Data jumlah laporan
                berdasarkan bulan.
              </p>
            </div>
          </div>

          {/* =================================================
              TABLE TOOLS
          ================================================= */}

          <div
            className={styles.tableTools}
          >
            {/* SEARCHING */}

            <div
              className={styles.searchBox}
            >
              <SearchIcon />

              <input
                type="text"
                placeholder="Cari bulan..."
                value={search}
                onChange={(event) => {
                  setSearch(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* SORTING */}

            <div
              className={styles.sortArea}
            >
              <label>
                Urutkan
              </label>

              <div
                className={styles.sortSelect}
              >
                <select
                  value={sortField}
                  onChange={(event) => {
                    setSortField(
                      event.target
                        .value as SortField
                    );
                    setCurrentPage(1);
                  }}
                >
                  <option value="bulan">
                    Bulan
                  </option>

                  <option value="total">
                    Total Laporan
                  </option>

                  <option value="pending">
                    Pending
                  </option>

                  <option value="diproses">
                    Diproses
                  </option>

                  <option value="selesai">
                    Selesai
                  </option>
                </select>

                <button
                  type="button"
                  onClick={() =>
                    setSortDirection(
                      (previous) =>
                        previous === "asc"
                          ? "desc"
                          : "asc"
                    )
                  }
                >
                  {sortDirection === "asc"
                    ? "A-Z"
                    : "Z-A"}
                </button>
              </div>
            </div>

            {/* ENTRIES */}

            <div
              className={styles.entries}
            >
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
                    Bulan
                  </th>

                  <th>
                    Total Laporan
                  </th>

                  <th>
                    Pending
                  </th>

                  <th>
                    Diverifikasi
                  </th>

                  <th>
                    Diproses
                  </th>

                  <th>
                    Selesai
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map(
                    (item, index) => (
                      <tr
                        key={item.id}
                      >
                        <td
                          className={
                            styles.numberColumn
                          }
                        >
                          {startIndex +
                            index +
                            1}
                        </td>

                        <td>
                          <strong
                            className={
                              styles.monthName
                            }
                          >
                            {item.bulan}
                          </strong>

                          <small>
                            {item.tahun}
                          </small>
                        </td>

                        <td>
                          <span
                            className={
                              styles.totalBadge
                            }
                          >
                            {item.total}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              item.pending > 0
                                ? styles.pendingValue
                                : styles.zeroValue
                            }
                          >
                            {item.pending}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              item.diverifikasi >
                              0
                                ? styles.verifiedValue
                                : styles.zeroValue
                            }
                          >
                            {
                              item.diverifikasi
                            }
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              item.diproses > 0
                                ? styles.processValue
                                : styles.zeroValue
                            }
                          >
                            {item.diproses}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              item.selesai > 0
                                ? styles.completeValue
                                : styles.zeroValue
                            }
                          >
                            {item.selesai}
                          </span>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className={
                        styles.emptyTable
                      }
                    >
                      Tidak ada data
                      laporan yang sesuai
                      dengan filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              FOOTER / PAGINATION
          ================================================= */}

          <div
            className={
              styles.tableFooter
            }
          >
            <span>
              Menampilkan{" "}
              {filteredData.length === 0
                ? 0
                : startIndex + 1}{" "}
              sampai{" "}
              {Math.min(
                startIndex +
                  entriesPerPage,
                filteredData.length
              )}{" "}
              dari{" "}
              {filteredData.length}{" "}
              entri
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
                  length: totalPages,
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
                    setCurrentPage(page)
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
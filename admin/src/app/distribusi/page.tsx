"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

/* =========================================================
   TYPE
========================================================= */

type DistributionItem = {
  id: number;
  tanggal: string;
  bulan: number;
  tahun: number;
  nama: string;
  kode: string;
  lokasi?: string;
  penerima?: string;
};

type SortKey =
  | "tanggal"
  | "nama"
  | "kode"
  | "lokasi"
  | "penerima";

type SortDirection = "asc" | "desc";

/* =========================================================
   DATA BARANG MASUK
========================================================= */

const barangMasukData: DistributionItem[] = [
  {
    id: 1,
    tanggal: "01-07-2026",
    bulan: 7,
    tahun: 2026,
    nama: "Laptop Lenovo ThinkPad",
    kode: "1.3.2.10.01.01.001.0010",
    lokasi: "Gudang Sarpras",
  },
  {
    id: 2,
    tanggal: "03-07-2026",
    bulan: 7,
    tahun: 2026,
    nama: "Printer Epson L5190",
    kode: "1.3.2.10.02.03.001.0027",
    lokasi: "Gudang Sarpras",
  },
  {
    id: 3,
    tanggal: "05-07-2026",
    bulan: 7,
    tahun: 2026,
    nama: "CCTV IP CAM HILOOK",
    kode: "02.09.03.01.14.0042",
    lokasi: "Gudang Sarpras",
  },
  {
    id: 4,
    tanggal: "08-06-2026",
    bulan: 6,
    tahun: 2026,
    nama: "Access Point TP-Link",
    kode: "1.3.2.16.02.04.026.0001",
    lokasi: "Gudang Sarpras",
  },
  {
    id: 5,
    tanggal: "12-05-2026",
    bulan: 5,
    tahun: 2026,
    nama: "Monitor LED 24 Inch",
    kode: "1.3.2.10.01.01.001.0011",
    lokasi: "Gudang Sarpras",
  },
  {
    id: 6,
    tanggal: "15-03-2025",
    bulan: 3,
    tahun: 2025,
    nama: "Proyektor Epson",
    kode: "1.3.2.10.03.01.001.0005",
    lokasi: "Gudang Sarpras",
  },
  {
    id: 7,
    tanggal: "20-08-2025",
    bulan: 8,
    tahun: 2025,
    nama: "Speaker Aktif",
    kode: "1.3.2.08.01.04.001.0008",
    lokasi: "Gudang Sarpras",
  },
];

/* =========================================================
   DATA BARANG KELUAR
========================================================= */

const barangKeluarData: DistributionItem[] = [
  {
    id: 1,
    tanggal: "01-07-2026",
    bulan: 7,
    tahun: 2026,
    nama: "Dispenser Galon Bawah Midea",
    kode: "1.3.2.05.02.06.038.0002",
    penerima: "Agus Supriyadi, M.Pd",
  },
  {
    id: 2,
    tanggal: "03-07-2026",
    bulan: 7,
    tahun: 2026,
    nama: "Printer Epson L5190",
    kode: "1.3.2.10.02.03.001.0027",
    penerima: "Ruang Humas",
  },
  {
    id: 3,
    tanggal: "05-07-2026",
    bulan: 7,
    tahun: 2026,
    nama: "CCTV IP CAM HILOOK",
    kode: "02.09.03.01.14.0042",
    penerima: "HOME THEATER",
  },
  {
    id: 4,
    tanggal: "08-06-2026",
    bulan: 6,
    tahun: 2026,
    nama: "Access Point TP-Link",
    kode: "1.3.2.16.02.04.026.0001",
    penerima: "LAB BAHASA",
  },
  {
    id: 5,
    tanggal: "10-05-2026",
    bulan: 5,
    tahun: 2026,
    nama: "Monitor LED 24 Inch",
    kode: "1.3.2.10.01.01.001.0011",
    penerima: "Bank Mini",
  },
  {
    id: 6,
    tanggal: "12-03-2025",
    bulan: 3,
    tahun: 2025,
    nama: "Proyektor Epson",
    kode: "1.3.2.10.03.01.001.0005",
    penerima: "Ruang Multimedia",
  },
  {
    id: 7,
    tanggal: "20-08-2025",
    bulan: 8,
    tahun: 2025,
    nama: "Speaker Aktif",
    kode: "1.3.2.08.01.04.001.0008",
    penerima: "Aula Sekolah",
  },
];

/* =========================================================
   BULAN
========================================================= */

const months = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
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

function PrintIcon() {
  return (
    <Icon size={17}>
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v7H6z" />
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

/* =========================================================
   PAGE
========================================================= */

export default function DistribusiPage() {
  /* =======================================================
     TAHUN OTOMATIS DARI DATA
  ======================================================= */

  const availableYears = useMemo(() => {
    const years = [
      ...barangMasukData.map(
        (item) => item.tahun
      ),
      ...barangKeluarData.map(
        (item) => item.tahun
      ),
    ];

    return [...new Set(years)].sort(
      (a, b) => b - a
    );
  }, []);

  /* =======================================================
     FILTER PERIODE
  ======================================================= */

  const [selectedMonth, setSelectedMonth] =
    useState(7);

  const [selectedYear, setSelectedYear] =
    useState(2026);

  const [appliedMonth, setAppliedMonth] =
    useState(7);

  const [appliedYear, setAppliedYear] =
    useState(2026);

  /* =======================================================
     SEARCH
  ======================================================= */

  const [searchMasuk, setSearchMasuk] =
    useState("");

  const [searchKeluar, setSearchKeluar] =
    useState("");

  /* =======================================================
     SORTING
  ======================================================= */

  const [sortMasuk, setSortMasuk] =
    useState<SortKey>("tanggal");

  const [sortMasukDirection, setSortMasukDirection] =
    useState<SortDirection>("asc");

  const [sortKeluar, setSortKeluar] =
    useState<SortKey>("tanggal");

  const [sortKeluarDirection, setSortKeluarDirection] =
    useState<SortDirection>("asc");

  /* =======================================================
     PAGINATION
  ======================================================= */

  const rowsPerPage = 5;

  const [pageMasuk, setPageMasuk] =
    useState(1);

  const [pageKeluar, setPageKeluar] =
    useState(1);

  /* =======================================================
     FILTER BARANG MASUK
  ======================================================= */

  const filteredMasuk = useMemo(() => {
    const search =
      searchMasuk.toLowerCase().trim();

    return barangMasukData.filter((item) => {
      const matchesPeriod =
        item.bulan === appliedMonth &&
        item.tahun === appliedYear;

      const matchesSearch =
        search === "" ||
        item.nama
          .toLowerCase()
          .includes(search) ||
        item.kode
          .toLowerCase()
          .includes(search) ||
        item.lokasi
          ?.toLowerCase()
          .includes(search);

      return (
        matchesPeriod &&
        matchesSearch
      );
    });
  }, [
    searchMasuk,
    appliedMonth,
    appliedYear,
  ]);

  /* =======================================================
     FILTER BARANG KELUAR
  ======================================================= */

  const filteredKeluar = useMemo(() => {
    const search =
      searchKeluar.toLowerCase().trim();

    return barangKeluarData.filter((item) => {
      const matchesPeriod =
        item.bulan === appliedMonth &&
        item.tahun === appliedYear;

      const matchesSearch =
        search === "" ||
        item.nama
          .toLowerCase()
          .includes(search) ||
        item.kode
          .toLowerCase()
          .includes(search) ||
        item.penerima
          ?.toLowerCase()
          .includes(search);

      return (
        matchesPeriod &&
        matchesSearch
      );
    });
  }, [
    searchKeluar,
    appliedMonth,
    appliedYear,
  ]);

  /* =======================================================
     SORT BARANG MASUK
  ======================================================= */

  const sortedMasuk = useMemo(() => {
    const data = [...filteredMasuk];

    data.sort((a, b) => {
      let result = 0;

      if (sortMasuk === "tanggal") {
        const dateA = new Date(
          a.tahun,
          a.bulan - 1,
          Number(
            a.tanggal.slice(0, 2)
          )
        ).getTime();

        const dateB = new Date(
          b.tahun,
          b.bulan - 1,
          Number(
            b.tanggal.slice(0, 2)
          )
        ).getTime();

        result = dateA - dateB;
      } else {
        const valueA = String(
          a[sortMasuk] ?? ""
        );

        const valueB = String(
          b[sortMasuk] ?? ""
        );

        result =
          valueA.localeCompare(
            valueB,
            "id",
            {
              numeric: true,
              sensitivity: "base",
            }
          );
      }

      return sortMasukDirection ===
        "asc"
        ? result
        : -result;
    });

    return data;
  }, [
    filteredMasuk,
    sortMasuk,
    sortMasukDirection,
  ]);

  /* =======================================================
     SORT BARANG KELUAR
  ======================================================= */

  const sortedKeluar = useMemo(() => {
    const data = [...filteredKeluar];

    data.sort((a, b) => {
      let result = 0;

      if (sortKeluar === "tanggal") {
        const dateA = new Date(
          a.tahun,
          a.bulan - 1,
          Number(
            a.tanggal.slice(0, 2)
          )
        ).getTime();

        const dateB = new Date(
          b.tahun,
          b.bulan - 1,
          Number(
            b.tanggal.slice(0, 2)
          )
        ).getTime();

        result = dateA - dateB;
      } else {
        const valueA = String(
          a[sortKeluar] ?? ""
        );

        const valueB = String(
          b[sortKeluar] ?? ""
        );

        result =
          valueA.localeCompare(
            valueB,
            "id",
            {
              numeric: true,
              sensitivity: "base",
            }
          );
      }

      return sortKeluarDirection ===
        "asc"
        ? result
        : -result;
    });

    return data;
  }, [
    filteredKeluar,
    sortKeluar,
    sortKeluarDirection,
  ]);

  /* =======================================================
     PAGINATION MASUK
  ======================================================= */

  const totalPagesMasuk =
    Math.max(
      1,
      Math.ceil(
        sortedMasuk.length /
          rowsPerPage
      )
    );

  const currentMasuk =
    sortedMasuk.slice(
      (pageMasuk - 1) *
        rowsPerPage,
      pageMasuk * rowsPerPage
    );

  /* =======================================================
     PAGINATION KELUAR
  ======================================================= */

  const totalPagesKeluar =
    Math.max(
      1,
      Math.ceil(
        sortedKeluar.length /
          rowsPerPage
      )
    );

  const currentKeluar =
    sortedKeluar.slice(
      (pageKeluar - 1) *
        rowsPerPage,
      pageKeluar * rowsPerPage
    );

  /* =======================================================
     APPLY FILTER
  ======================================================= */

  function handleShow() {
    setAppliedMonth(selectedMonth);
    setAppliedYear(selectedYear);

    setPageMasuk(1);
    setPageKeluar(1);

    setSearchMasuk("");
    setSearchKeluar("");
  }

  /* =======================================================
     PRINT
  ======================================================= */

  function handlePrint() {
    window.print();
  }

  /* =======================================================
     NAMA BULAN
  ======================================================= */

  const monthName =
    months.find(
      (month) =>
        month.value === appliedMonth
    )?.label ?? "";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className={styles.page}>
      {/* =================================================
          HEADER
      ================================================= */}

      <section className={styles.hero}>
        <h1>Distribusi Barang</h1>

        <p>
          Kelola dan pantau pergerakan
          barang masuk dan barang keluar
          sarana dan prasarana sekolah.
        </p>
      </section>

      {/* =================================================
          FILTER BULAN & TAHUN
      ================================================= */}

      <section className={styles.filterPanel}>
        <div className={styles.filterField}>
          <label htmlFor="bulan">
            Bulan
          </label>

          <select
            id="bulan"
            value={selectedMonth}
            onChange={(event) =>
              setSelectedMonth(
                Number(
                  event.target.value
                )
              )
            }
          >
            {months.map((month) => (
              <option
                key={month.value}
                value={month.value}
              >
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterField}>
          <label htmlFor="tahun">
            Tahun
          </label>

          <select
            id="tahun"
            value={selectedYear}
            onChange={(event) =>
              setSelectedYear(
                Number(
                  event.target.value
                )
              )
            }
          >
            {availableYears.map(
              (year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        <button
          type="button"
          className={styles.showButton}
          onClick={handleShow}
        >
          <FilterIcon />
          Tampilkan
        </button>
      </section>

      {/* =================================================
          ACTION BAR
      ================================================= */}

      <section className={styles.actionBar}>
        <div>
          <h2>
            Distribusi {monthName}{" "}
            {appliedYear}
          </h2>

          <p>
            Data transaksi barang pada
            periode yang dipilih.
          </p>
        </div>

        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.primaryAction}
          >
            <PlusIcon />
            Barang Masuk
          </button>

          <button
            type="button"
            className={styles.primaryAction}
          >
            <PlusIcon />
            Barang Keluar
          </button>

          <button
            type="button"
            className={styles.secondaryAction}
            onClick={handlePrint}
          >
            <PrintIcon />
            Print Masuk
          </button>

          <button
            type="button"
            className={styles.secondaryAction}
            onClick={handlePrint}
          >
            <PrintIcon />
            Print Keluar
          </button>
        </div>
      </section>

      {/* =================================================
          BARANG MASUK
      ================================================= */}

      <section className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <div>
            <h2>
              Barang Masuk {monthName}{" "}
              {appliedYear}
            </h2>

            <p>
              Riwayat barang yang masuk
              ke sarana sekolah.
            </p>
          </div>

          <span
            className={styles.countBadge}
          >
            {sortedMasuk.length} barang
          </span>
        </div>

        <div className={styles.tableTools}>
          {/* SEARCH */}

          <div className={styles.searchBox}>
            <SearchIcon />

            <input
              type="text"
              placeholder="Cari nama barang, kode, atau lokasi..."
              value={searchMasuk}
              onChange={(event) => {
                setSearchMasuk(
                  event.target.value
                );

                setPageMasuk(1);
              }}
            />
          </div>

          {/* SORTING */}

          <div className={styles.sortArea}>
            <label htmlFor="sort-masuk">
              Urutkan
            </label>

            <select
              id="sort-masuk"
              value={sortMasuk}
              onChange={(event) => {
                setSortMasuk(
                  event.target
                    .value as SortKey
                );

                setPageMasuk(1);
              }}
            >
              <option value="tanggal">
                Tanggal
              </option>

              <option value="nama">
                Nama Barang
              </option>

              <option value="kode">
                Kode
              </option>

              <option value="lokasi">
                Lokasi
              </option>
            </select>

            <select
              value={
                sortMasukDirection
              }
              onChange={(event) => {
                setSortMasukDirection(
                  event.target
                    .value as SortDirection
                );

                setPageMasuk(1);
              }}
            >
              <option value="asc">
                Terlama → Terbaru
              </option>

              <option value="desc">
                Terbaru → Terlama
              </option>
            </select>
          </div>

          <span
            className={styles.resultText}
          >
            {sortedMasuk.length} data
          </span>
        </div>

        {/* TABLE */}

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

                <th>Tanggal</th>

                <th>Nama Barang</th>

                <th>Kode</th>

                <th>Lokasi</th>
              </tr>
            </thead>

            <tbody>
              {currentMasuk.length >
              0 ? (
                currentMasuk.map(
                  (item, index) => (
                    <tr key={item.id}>
                      <td
                        className={
                          styles.numberColumn
                        }
                      >
                        {(pageMasuk -
                          1) *
                          rowsPerPage +
                          index +
                          1}
                      </td>

                      <td>
                        {item.tanggal}
                      </td>

                      <td
                        className={
                          styles.itemName
                        }
                      >
                        {item.nama}
                      </td>

                      <td
                        className={
                          styles.code
                        }
                      >
                        {item.kode}
                      </td>

                      <td>
                        {item.lokasi}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className={
                      styles.empty
                    }
                  >
                    Tidak ada barang masuk
                    pada periode yang
                    dipilih.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className={styles.pagination}>
          <span>
            Menampilkan{" "}
            {currentMasuk.length > 0
              ? (pageMasuk - 1) *
                  rowsPerPage +
                1
              : 0}
            –
            {(pageMasuk - 1) *
              rowsPerPage +
              currentMasuk.length}{" "}
            dari {sortedMasuk.length} data
          </span>

          <div
            className={
              styles.pageButtons
            }
          >
            <button
              type="button"
              disabled={
                pageMasuk === 1
              }
              onClick={() =>
                setPageMasuk(
                  (previous) =>
                    previous - 1
                )
              }
            >
              ‹
            </button>

            {Array.from(
              {
                length:
                  totalPagesMasuk,
              },
              (_, index) =>
                index + 1
            ).map((number) => (
              <button
                type="button"
                key={number}
                className={
                  pageMasuk ===
                  number
                    ? styles.activePage
                    : ""
                }
                onClick={() =>
                  setPageMasuk(
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
                pageMasuk ===
                totalPagesMasuk
              }
              onClick={() =>
                setPageMasuk(
                  (previous) =>
                    previous + 1
                )
              }
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* =================================================
          BARANG KELUAR
      ================================================= */}

      <section
        className={`${styles.tableCard} ${styles.outgoingCard}`}
      >
        <div className={styles.cardHeader}>
          <div>
            <h2>
              Barang Keluar {monthName}{" "}
              {appliedYear}
            </h2>

            <p>
              Riwayat distribusi barang
              kepada penerima atau tujuan.
            </p>
          </div>

          <span
            className={`${styles.countBadge} ${styles.outCount}`}
          >
            {sortedKeluar.length} barang
          </span>
        </div>

        <div className={styles.tableTools}>
          {/* SEARCH */}

          <div className={styles.searchBox}>
            <SearchIcon />

            <input
              type="text"
              placeholder="Cari nama barang, kode, atau penerima..."
              value={searchKeluar}
              onChange={(event) => {
                setSearchKeluar(
                  event.target.value
                );

                setPageKeluar(1);
              }}
            />
          </div>

          {/* SORTING */}

          <div className={styles.sortArea}>
            <label htmlFor="sort-keluar">
              Urutkan
            </label>

            <select
              id="sort-keluar"
              value={sortKeluar}
              onChange={(event) => {
                setSortKeluar(
                  event.target
                    .value as SortKey
                );

                setPageKeluar(1);
              }}
            >
              <option value="tanggal">
                Tanggal
              </option>

              <option value="nama">
                Nama Barang
              </option>

              <option value="kode">
                Kode
              </option>

              <option value="penerima">
                Penerima / Tujuan
              </option>
            </select>

            <select
              value={
                sortKeluarDirection
              }
              onChange={(event) => {
                setSortKeluarDirection(
                  event.target
                    .value as SortDirection
                );

                setPageKeluar(1);
              }}
            >
              <option value="asc">
                Terlama → Terbaru
              </option>

              <option value="desc">
                Terbaru → Terlama
              </option>
            </select>
          </div>

          <span
            className={styles.resultText}
          >
            {sortedKeluar.length} data
          </span>
        </div>

        {/* TABLE */}

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

                <th>Tanggal</th>

                <th>Nama Barang</th>

                <th>Kode</th>

                <th>
                  Penerima / Tujuan
                </th>
              </tr>
            </thead>

            <tbody>
              {currentKeluar.length >
              0 ? (
                currentKeluar.map(
                  (item, index) => (
                    <tr key={item.id}>
                      <td
                        className={
                          styles.numberColumn
                        }
                      >
                        {(pageKeluar -
                          1) *
                          rowsPerPage +
                          index +
                          1}
                      </td>

                      <td>
                        {item.tanggal}
                      </td>

                      <td
                        className={
                          styles.itemName
                        }
                      >
                        {item.nama}
                      </td>

                      <td
                        className={
                          styles.code
                        }
                      >
                        {item.kode}
                      </td>

                      <td>
                        {item.penerima}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className={
                      styles.empty
                    }
                  >
                    Tidak ada barang keluar
                    pada periode yang
                    dipilih.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className={styles.pagination}>
          <span>
            Menampilkan{" "}
            {currentKeluar.length > 0
              ? (pageKeluar - 1) *
                  rowsPerPage +
                1
              : 0}
            –
            {(pageKeluar - 1) *
              rowsPerPage +
              currentKeluar.length}{" "}
            dari {sortedKeluar.length} data
          </span>

          <div
            className={
              styles.pageButtons
            }
          >
            <button
              type="button"
              disabled={
                pageKeluar === 1
              }
              onClick={() =>
                setPageKeluar(
                  (previous) =>
                    previous - 1
                )
              }
            >
              ‹
            </button>

            {Array.from(
              {
                length:
                  totalPagesKeluar,
              },
              (_, index) =>
                index + 1
            ).map((number) => (
              <button
                type="button"
                key={number}
                className={
                  pageKeluar ===
                  number
                    ? styles.activePage
                    : ""
                }
                onClick={() =>
                  setPageKeluar(
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
                pageKeluar ===
                totalPagesKeluar
              }
              onClick={() =>
                setPageKeluar(
                  (previous) =>
                    previous + 1
                )
              }
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
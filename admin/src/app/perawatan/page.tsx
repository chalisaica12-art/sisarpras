"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Ruangan = {
  id: number;
  nama: string;
  jumlahBahan: number;
  jumlahBarang: number;
};

type SortKey =
  | "nama"
  | "jumlahBahan"
  | "jumlahBarang";

type SortDirection = "asc" | "desc";

type FilterBarang =
  | "Semua"
  | "Ada Barang"
  | "Tidak Ada Barang";

/* =========================================================
   DATA DUMMY
========================================================= */

const ruanganData: Ruangan[] = [
  {
    id: 1,
    nama: "AUDITORIUM",
    jumlahBahan: 3,
    jumlahBarang: 1,
  },
  {
    id: 2,
    nama: "Aula",
    jumlahBahan: 0,
    jumlahBarang: 0,
  },
  {
    id: 3,
    nama: "Bank Mini",
    jumlahBahan: 0,
    jumlahBarang: 1,
  },
  {
    id: 4,
    nama: "Dapur CS",
    jumlahBahan: 0,
    jumlahBarang: 0,
  },
  {
    id: 5,
    nama: "Dapur Guru",
    jumlahBahan: 0,
    jumlahBarang: 0,
  },
  {
    id: 6,
    nama: "Fitness room",
    jumlahBahan: 0,
    jumlahBarang: 0,
  },
  {
    id: 7,
    nama: "GEDUNG",
    jumlahBahan: 0,
    jumlahBarang: 1,
  },
  {
    id: 8,
    nama: "Gudang barat samping kantin",
    jumlahBahan: 0,
    jumlahBarang: 0,
  },
  {
    id: 9,
    nama: "Gudang Sarpras",
    jumlahBahan: 0,
    jumlahBarang: 394,
  },
  {
    id: 10,
    nama: "HOME TEATHER",
    jumlahBahan: 0,
    jumlahBarang: 1,
  },
  {
    id: 11,
    nama: "Hotel",
    jumlahBahan: 0,
    jumlahBarang: 0,
  },
  {
    id: 12,
    nama: "Kantin",
    jumlahBahan: 0,
    jumlahBarang: 2,
  },
  {
    id: 13,
    nama: "LAB BAHASA",
    jumlahBahan: 1,
    jumlahBarang: 8,
  },
  {
    id: 14,
    nama: "LAB IPA",
    jumlahBahan: 2,
    jumlahBarang: 12,
  },
  {
    id: 15,
    nama: "LAB KOMPUTER",
    jumlahBahan: 1,
    jumlahBarang: 25,
  },
  {
    id: 16,
    nama: "LAB MULTIMEDIA",
    jumlahBahan: 1,
    jumlahBarang: 15,
  },
  {
    id: 17,
    nama: "Lapangan Basket",
    jumlahBahan: 0,
    jumlahBarang: 3,
  },
  {
    id: 18,
    nama: "Lapangan Futsal",
    jumlahBahan: 0,
    jumlahBarang: 4,
  },
  {
    id: 19,
    nama: "Perpustakaan",
    jumlahBahan: 2,
    jumlahBarang: 18,
  },
  {
    id: 20,
    nama: "Ruang BK",
    jumlahBahan: 0,
    jumlahBarang: 2,
  },
  {
    id: 21,
    nama: "Ruang Guru",
    jumlahBahan: 1,
    jumlahBarang: 20,
  },
  {
    id: 22,
    nama: "Ruang Kepala Sekolah",
    jumlahBahan: 0,
    jumlahBarang: 4,
  },
  {
    id: 23,
    nama: "Ruang TU",
    jumlahBahan: 1,
    jumlahBarang: 12,
  },
  {
    id: 24,
    nama: "UKS",
    jumlahBahan: 1,
    jumlahBarang: 5,
  },
  {
    id: 25,
    nama: "Aula",
    jumlahBahan: 0,
    jumlahBarang: 2,
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

function ExportIcon() {
  return (
    <Icon size={15}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </Icon>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PerawatanPage() {
  const [search, setSearch] = useState("");

  const [filterBarang, setFilterBarang] =
    useState<FilterBarang>("Semua");

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

    return ruanganData.filter((item) => {
      const matchesSearch =
        keyword === "" ||
        item.nama
          .toLowerCase()
          .includes(keyword);

      const matchesFilter =
        filterBarang === "Semua" ||
        (filterBarang === "Ada Barang" &&
          item.jumlahBarang > 0) ||
        (filterBarang === "Tidak Ada Barang" &&
          item.jumlahBarang === 0);

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [search, filterBarang]);

  /* =========================================================
     SORTING
  ========================================================= */

  const sortedData = useMemo(() => {
    const data = [...filteredData];

    data.sort((a, b) => {
      if (sortKey === "nama") {
        const result = a.nama.localeCompare(
          b.nama,
          "id",
          {
            sensitivity: "base",
          }
        );

        return sortDirection === "asc"
          ? result
          : -result;
      }

      const result =
        a[sortKey] - b[sortKey];

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
      sortedData.length /
        rowsPerPage
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
      safeCurrentPage *
        rowsPerPage
    );

  const startNumber =
    sortedData.length === 0
      ? 0
      : (safeCurrentPage - 1) *
          rowsPerPage +
        1;

  const endNumber = Math.min(
    safeCurrentPage *
      rowsPerPage,
    sortedData.length
  );

  /* =========================================================
     HANDLER
  ========================================================= */

  function handleSearch(
    value: string
  ) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleFilter(
    value: FilterBarang
  ) {
    setFilterBarang(value);
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
      Math.min(
        totalPages,
        page + 1
      )
    );
  }

  function handleExport(
    item: Ruangan
  ) {
    alert(
      `Export data ruangan "${item.nama}" ke Excel akan dihubungkan ke sistem database.`
    );
  }

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <main className={styles.page}>

      {/* HEADER */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Perawatan dan Perbaikan
          </h1>

          <p>
            Kelola data bahan dan barang
            untuk kebutuhan perawatan
            sarana dan prasarana sekolah.
          </p>
        </div>
      </section>

      <section className={styles.content}>

        {/* TABLE CARD */}

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

              {/* FILTER */}

              <div
                className={
                  styles.filterControl
                }
              >
                <FilterIcon />

                <select
                  value={
                    filterBarang
                  }
                  onChange={(
                    event
                  ) =>
                    handleFilter(
                      event.target
                        .value as FilterBarang
                    )
                  }
                >
                  <option value="Semua">
                    Semua Data
                  </option>

                  <option value="Ada Barang">
                    Ada Barang
                  </option>

                  <option value="Tidak Ada Barang">
                    Tidak Ada Barang
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
                placeholder="Cari nama ruangan..."
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

          {/* SORTING */}

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
                Nama Ruangan
              </option>

              <option value="jumlahBahan">
                Jumlah Bahan
              </option>

              <option value="jumlahBarang">
                Jumlah Barang
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
                A-Z / Terendah
              </option>

              <option value="desc">
                Z-A / Tertinggi
              </option>
            </select>

            <span
              className={
                styles.resultCount
              }
            >
              {sortedData.length} ruangan
            </span>
          </div>

          {/* TABLE */}

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
                    Nama Ruangan
                  </th>

                  <th
                    className={
                      styles.centerColumn
                    }
                  >
                    Jumlah Bahan
                  </th>

                  <th
                    className={
                      styles.centerColumn
                    }
                  >
                    Jumlah Barang
                  </th>

                  <th
                    className={
                      styles.exportColumn
                    }
                  >
                    Export
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

                        {/* NO */}

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

                        {/* NAMA RUANGAN */}

                        <td>
                          <div
                            className={
                              styles.roomName
                            }
                          >
                            <span>
                              {
                                item.nama
                              }
                            </span>
                          </div>
                        </td>

                        {/* JUMLAH BAHAN */}

                        <td
                          className={
                            styles.centerColumn
                          }
                        >
                          <span
                            className={
                              styles.materialBadge
                            }
                          >
                            {
                              item.jumlahBahan
                            }{" "}
                            bahan
                          </span>
                        </td>

                        {/* JUMLAH BARANG */}

                        <td
                          className={
                            styles.centerColumn
                          }
                        >
                          <span
                            className={
                              styles.itemBadge
                            }
                          >
                            {
                              item.jumlahBarang
                            }{" "}
                            barang
                          </span>
                        </td>

                        {/* EXPORT */}

                        <td
                          className={
                            styles.exportColumn
                          }
                        >
                          <div
                            className={
                              styles.exportGroup
                            }
                          >
                            <select
                              defaultValue="Excel"
                              className={
                                styles.exportSelect
                              }
                            >
                              <option value="Excel">
                                Excel
                              </option>
                            </select>

                            <button
                              type="button"
                              className={
                                styles.exportButton
                              }
                              onClick={() =>
                                handleExport(
                                  item
                                )
                              }
                              title="Export Excel"
                            >
                              <ExportIcon />
                              Export
                            </button>
                          </div>
                        </td>

                        {/* AKSI */}

                        <td
                          className={
                            styles.actionColumn
                          }
                        >
                          <button
                            type="button"
                            className={
                              styles.viewButton
                            }
                            title="Lihat"
                          >
                            <EyeIcon />
                          </button>
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
                      Data perawatan dan
                      perbaikan tidak
                      ditemukan.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>

          {/* FOOTER */}

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
              ruangan
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
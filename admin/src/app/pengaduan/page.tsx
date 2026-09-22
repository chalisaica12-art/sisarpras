"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Priority = "Tinggi" | "Sedang" | "Rendah";
type Status = "Pending" | "Diproses" | "Selesai";

type Pengaduan = {
  id: string;
  nomor: string;
  pelapor: string;
  kontak: string;
  lokasi: string;
  barang: string;
  deskripsi: string;
  prioritas: Priority;
  status: Status;
  tanggal: string;
  unread: boolean;
};

type SortKey =
  | "pelapor"
  | "lokasi"
  | "barang"
  | "prioritas"
  | "status"
  | "tanggal";

type SortDirection = "asc" | "desc";

const STORAGE_KEY = "sisarpras_pengaduan_dibaca";

const initialData: Pengaduan[] = [
  {
    id: "LPR-2026-001",
    nomor: "LPR-2026-001",
    pelapor: "Muhammad Satriyo Prijambodo",
    kontak: "085755122267",
    lokasi: "Ruang Mekatronika",
    barang: "AC di ruang guru mekatronika lt1",
    deskripsi: "Keluar tetesan air",
    prioritas: "Tinggi",
    status: "Pending",
    tanggal: "09/06/2026 14:40",
    unread: true,
  },
  {
    id: "LPR-2026-002",
    nomor: "LPR-2026-002",
    pelapor: "Ines Rheynata Amalia",
    kontak: "087766712862",
    lokasi: "Ruang DKV 1",
    barang: "TV",
    deskripsi: "Tidak Berfungsi",
    prioritas: "Tinggi",
    status: "Pending",
    tanggal: "04/06/2026 10:46",
    unread: true,
  },
  {
    id: "LPR-2026-003",
    nomor: "LPR-2026-003",
    pelapor: "Rindi",
    kontak: "-",
    lokasi: "Ruang Teori 4",
    barang: "Kursi koyah",
    deskripsi: "Baut kendor pada kursi",
    prioritas: "Tinggi",
    status: "Selesai",
    tanggal: "03/06/2026 11:19",
    unread: false,
  },
  {
    id: "LPR-2026-004",
    nomor: "LPR-2026-004",
    pelapor: "Rindi Andika",
    kontak: "-",
    lokasi: "Ruang Tata Usaha",
    barang: "Pintu",
    deskripsi: "Engsel pintu bermasalah",
    prioritas: "Sedang",
    status: "Selesai",
    tanggal: "29/05/2026 11:40",
    unread: true,
  },
  {
    id: "LPR-2026-005",
    nomor: "LPR-2026-005",
    pelapor: "Suci Lestari",
    kontak: "085736953980",
    lokasi: "STUDIO ANIMASI",
    barang: "Lampu",
    deskripsi: "Mati total",
    prioritas: "Tinggi",
    status: "Selesai",
    tanggal: "22/05/2026 09:10",
    unread: false,
  },
  {
    id: "LPR-2026-006",
    nomor: "LPR-2026-006",
    pelapor: "Aldilah rahma",
    kontak: "085282287766",
    lokasi: "LAB TG",
    barang: "Ac",
    deskripsi: "Tidak berfungsi",
    prioritas: "Tinggi",
    status: "Pending",
    tanggal: "22/05/2026 08:08",
    unread: false,
  },
  {
    id: "LPR-2026-007",
    nomor: "LPR-2026-007",
    pelapor: "Aldilah rahma",
    kontak: "085282287766",
    lokasi: "Ruang Desain 2",
    barang: "Ac",
    deskripsi: "Tidak berfungsi",
    prioritas: "Tinggi",
    status: "Pending",
    tanggal: "21/05/2026 08:06",
    unread: false,
  },
  {
    id: "LPR-2026-008",
    nomor: "LPR-2026-008",
    pelapor: "Maulana Ikhsan",
    kontak: "08583928775",
    lokasi: "Ruang Teori 8",
    barang: "Kipas angin, pintu, tong sampah",
    deskripsi:
      "Kipas angin tidak bisa menyala, pintu tidak bisa ditutup, tong sampah terlalu kecil",
    prioritas: "Tinggi",
    status: "Pending",
    tanggal: "21/05/2026 13:39",
    unread: true,
  },
  {
    id: "LPR-2026-009",
    nomor: "LPR-2026-009",
    pelapor: "Septi Retno Desi Purnoningsyas",
    kontak: "085735258725",
    lokasi: "Lab 4 RPL",
    barang: "Tirai",
    deskripsi: "Dipindah",
    prioritas: "Sedang",
    status: "Selesai",
    tanggal: "20/05/2026 14:38",
    unread: false,
  },
  {
    id: "LPR-2026-010",
    nomor: "LPR-2026-010",
    pelapor: "Harijono Mochammad",
    kontak: "085812324609",
    lokasi: "OFFSET",
    barang: "Akses Point",
    deskripsi: "Tidak fungsi",
    prioritas: "Tinggi",
    status: "Selesai",
    tanggal: "20/05/2026 13:11",
    unread: false,
  },
];

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

function ExternalLinkIcon() {
  return (
    <Icon size={15}>
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </Icon>
  );
}

function convertDate(value: string) {
  const [date, time] = value.split(" ");
  const [day, month, year] = date.split("/");

  return `${year}-${month}-${day}T${time}`;
}

export default function PengaduanPage() {
  const router = useRouter();

  const [data, setData] =
    useState<Pengaduan[]>(initialData);

  const [readIds, setReadIds] =
    useState<string[]>([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("Semua");

  const [sortKey, setSortKey] =
    useState<SortKey>("tanggal");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("desc");

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setReadIds(parsed);
      }
    } catch {
      setReadIds([]);
    }
  }, []);

  const displayData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      unread:
        item.unread &&
        !readIds.includes(item.id),
    }));
  }, [data, readIds]);

  const unreadCount =
    displayData.filter(
      (item) => item.unread
    ).length;

  const filteredData = useMemo(() => {
    const keyword =
      search.toLowerCase().trim();

    return displayData.filter((item) => {
      const matchesSearch =
        keyword === "" ||
        item.pelapor
          .toLowerCase()
          .includes(keyword) ||
        item.lokasi
          .toLowerCase()
          .includes(keyword) ||
        item.barang
          .toLowerCase()
          .includes(keyword) ||
        item.deskripsi
          .toLowerCase()
          .includes(keyword);

      const matchesFilter =
        filter === "Semua" ||
        item.status === filter ||
        item.prioritas === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [displayData, search, filter]);

  const sortedData = useMemo(() => {
    const result = [...filteredData];

    result.sort((a, b) => {
      let comparison = 0;

      if (sortKey === "tanggal") {
        comparison =
          new Date(
            convertDate(a.tanggal)
          ).getTime() -
          new Date(
            convertDate(b.tanggal)
          ).getTime();
      } else if (sortKey === "prioritas") {
        const order = {
          Tinggi: 3,
          Sedang: 2,
          Rendah: 1,
        };

        comparison =
          order[a.prioritas] -
          order[b.prioritas];
      } else if (sortKey === "status") {
        const order = {
          Pending: 1,
          Diproses: 2,
          Selesai: 3,
        };

        comparison =
          order[a.status] -
          order[b.status];
      } else {
        comparison = a[sortKey]
          .toString()
          .localeCompare(
            b[sortKey].toString(),
            "id",
            {
              sensitivity: "base",
            }
          );
      }

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    filteredData,
    sortKey,
    sortDirection,
  ]);

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

  function markAsRead(id: string) {
    const newReadIds = Array.from(
      new Set([...readIds, id])
    );

    setReadIds(newReadIds);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newReadIds)
    );
  }

  function openDetail(id: string) {
    markAsRead(id);
    router.push(`/pengaduan/${id}`);
  }

  function handleDelete(id: string) {
    const confirmed =
      window.confirm(
        "Apakah kamu yakin ingin menghapus laporan ini?"
      );

    if (!confirmed) return;

    setData((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function resetReadStatus() {
    localStorage.removeItem(
      STORAGE_KEY
    );

    setReadIds([]);
  }

  return (
    <main className={styles.page}>

      {/* HEADER */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div>
            <h1>
              Manajemen Pengaduan Kerusakan
            </h1>

            <p>
              Kelola dan tindak lanjuti
              seluruh pengaduan kerusakan
              sarana dan prasarana sekolah.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>

        <section className={styles.tableCard}>

          {/* TITLE */}

          <div className={styles.tableHeader}>

            <div className={styles.titleGroup}>

              <div>
                <h2>
                  Daftar Pengaduan Kerusakan
                </h2>

                <p>
                  Pantau dan tindak lanjuti
                  laporan kerusakan yang masuk.
                </p>
              </div>

              {unreadCount > 0 && (
                <span
                  className={
                    styles.unreadCount
                  }
                >
                  {unreadCount} belum dibaca
                </span>
              )}

            </div>

            <div className={styles.headerActions}>

              <button
                type="button"
                className={
                  styles.publicButton
                }
              >
                <ExternalLinkIcon />
                Lihat Form Publik
              </button>

              {readIds.length > 0 && (
                <button
                  type="button"
                  onClick={
                    resetReadStatus
                  }
                  className={
                    styles.resetButton
                  }
                >
                  Reset Dibaca
                </button>
              )}

            </div>

          </div>

          {/* TOOLBAR */}

          <div className={styles.toolbar}>

            <div className={styles.toolbarLeft}>

              <div className={styles.entriesControl}>
                <span>
                  Tampilkan
                </span>

                <select
                  value={rowsPerPage}
                  onChange={(event) => {
                    setRowsPerPage(
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

              <div className={styles.filterControl}>
                <FilterIcon />

                <select
                  value={filter}
                  onChange={(event) => {
                    setFilter(
                      event.target.value
                    );
                    setCurrentPage(1);
                  }}
                >
                  <option value="Semua">
                    Semua Data
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Diproses">
                    Diproses
                  </option>

                  <option value="Selesai">
                    Selesai
                  </option>

                  <option value="Tinggi">
                    Prioritas Tinggi
                  </option>

                  <option value="Sedang">
                    Prioritas Sedang
                  </option>

                  <option value="Rendah">
                    Prioritas Rendah
                  </option>
                </select>
              </div>

            </div>

            <div className={styles.searchBox}>
              <SearchIcon />

              <input
                type="text"
                placeholder="Cari pelapor, lokasi, barang..."
                value={search}
                onChange={(event) => {
                  setSearch(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
              />
            </div>

          </div>

          {/* SORTING */}

          <div className={styles.sortBar}>

            <span className={styles.sortLabel}>
              Urutkan data
            </span>

            <select
              value={sortKey}
              onChange={(event) => {
                setSortKey(
                  event.target.value as SortKey
                );
                setCurrentPage(1);
              }}
            >
              <option value="tanggal">
                Tanggal
              </option>

              <option value="pelapor">
                Pelapor
              </option>

              <option value="lokasi">
                Lokasi
              </option>

              <option value="barang">
                Barang
              </option>

              <option value="prioritas">
                Prioritas
              </option>

              <option value="status">
                Status
              </option>
            </select>

            <select
              value={sortDirection}
              onChange={(event) => {
                setSortDirection(
                  event.target
                    .value as SortDirection
                );
                setCurrentPage(1);
              }}
            >
              <option value="asc">
                A-Z / Terlama
              </option>

              <option value="desc">
                Z-A / Terbaru
              </option>
            </select>

            <span className={styles.resultCount}>
              {sortedData.length} pengaduan
            </span>

          </div>

          {/* LEGEND */}

          <div className={styles.legend}>
            <span className={styles.legendDot} />

            <span>
              Warna biru muda menandakan
              pengaduan belum dibaca.
            </span>
          </div>

          {/* TABLE */}

          <div className={styles.tableWrapper}>

            <table>

              <thead>
                <tr>
                  <th className={styles.numberColumn}>
                    No
                  </th>

                  <th>
                    Pelapor
                  </th>

                  <th>
                    Lokasi
                  </th>

                  <th>
                    Barang
                  </th>

                  <th className={styles.centerColumn}>
                    Prioritas
                  </th>

                  <th className={styles.centerColumn}>
                    Status
                  </th>

                  <th>
                    Tanggal
                  </th>

                  <th className={styles.actionColumn}>
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>

                {currentData.length > 0 ? (
                  currentData.map(
                    (item, index) => (
                      <tr
                        key={item.id}
                        className={
                          item.unread
                            ? styles.unreadRow
                            : ""
                        }
                      >

                        <td
                          className={
                            styles.numberColumn
                          }
                        >
                          <div
                            className={
                              styles.numberWrap
                            }
                          >
                            {item.unread && (
                              <span
                                className={
                                  styles.rowDot
                                }
                              />
                            )}

                            <span>
                              {(safeCurrentPage -
                                1) *
                                rowsPerPage +
                                index +
                                1}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div
                            className={
                              item.unread
                                ? styles.unreadText
                                : styles.primaryText
                            }
                          >
                            {item.pelapor}
                          </div>

                          <div
                            className={
                              styles.secondaryText
                            }
                          >
                            {item.kontak}
                          </div>
                        </td>

                        <td>
                          <span
                            className={
                              styles.normalText
                            }
                          >
                            {item.lokasi}
                          </span>
                        </td>

                        <td>
                          <div
                            className={
                              item.unread
                                ? styles.unreadText
                                : styles.primaryText
                            }
                          >
                            {item.barang}
                          </div>

                          <div
                            className={
                              styles.secondaryText
                            }
                          >
                            {item.deskripsi}
                          </div>
                        </td>

                        <td
                          className={
                            styles.centerColumn
                          }
                        >
                          <span
                            className={`${styles.badge} ${
                              item.prioritas ===
                              "Tinggi"
                                ? styles.highBadge
                                : item.prioritas ===
                                    "Sedang"
                                  ? styles.mediumBadge
                                  : styles.lowBadge
                            }`}
                          >
                            {item.prioritas}
                          </span>
                        </td>

                        <td
                          className={
                            styles.centerColumn
                          }
                        >
                          <span
                            className={`${styles.badge} ${
                              item.status ===
                              "Selesai"
                                ? styles.successBadge
                                : item.status ===
                                    "Diproses"
                                  ? styles.processBadge
                                  : styles.pendingBadge
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <span
                            className={
                              styles.dateText
                            }
                          >
                            {item.tanggal}
                          </span>
                        </td>

                        <td
                          className={
                            styles.actionColumn
                          }
                        >
                          <div
                            className={
                              styles.actionButtons
                            }
                          >

                            <button
                              type="button"
                              title="Lihat detail"
                              onClick={() =>
                                openDetail(
                                  item.id
                                )
                              }
                              className={`${styles.actionButton} ${styles.viewButton}`}
                            >
                              <EyeIcon />
                            </button>

                            <button
                              type="button"
                              title="Hapus"
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              className={`${styles.actionButton} ${styles.deleteButton}`}
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
                      colSpan={8}
                      className={
                        styles.emptyState
                      }
                    >
                      Data pengaduan tidak
                      ditemukan.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}

          <div className={styles.tableFooter}>

            <span
              className={
                styles.showingText
              }
            >
              Menampilkan{" "}
              {startNumber}–
              {endNumber} dari{" "}
              {sortedData.length}{" "}
              pengaduan
            </span>

            <div className={styles.pagination}>

              <button
                type="button"
                disabled={
                  safeCurrentPage === 1
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
              >
                ‹
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((number) => (
                <button
                  key={number}
                  type="button"
                  className={
                    safeCurrentPage === number
                      ? styles.activePage
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(number)
                  }
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                disabled={
                  safeCurrentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                  )
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
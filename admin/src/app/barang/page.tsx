"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import styles from "./page.module.css";

/* =========================
   TYPE
========================= */

type Kondisi =
  | "Baik"
  | "Rusak Ringan"
  | "Rusak Berat";

type Perolehan =
  | "BOS"
  | "BPOPP"
  | "BLUD"
  | "CSR"
  | "TEFA";

type Barang = {
  id: number;
  kode: string;
  nama: string;
  tahun: string;
  kondisi: Kondisi;
  lokasi: string;
  perolehan: Perolehan;
};

type SortKey =
  | "kode"
  | "nama"
  | "tahun"
  | "kondisi"
  | "lokasi"
  | "perolehan";

type SortDirection = "asc" | "desc";

/* =========================
   DATA DARI SUPABASE
========================= */

const kondisiOptions: Kondisi[] = [
  "Baik",
  "Rusak Ringan",
  "Rusak Berat",
];

const perolehanOptions: Perolehan[] = [
  "BOS",
  "BPOPP",
  "BLUD",
  "CSR",
  "TEFA",
];

/* =========================
   ICON
========================= */

function Icon({
  children,
  size = 20,
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

function BoxIcon() {
  return (
    <Icon>
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="m3 8 9 5 9-5" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </Icon>
  );
}

function CheckIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </Icon>
  );
}

function WarningIcon() {
  return (
    <Icon>
      <path d="M10.3 3.8 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </Icon>
  );
}

function AlertIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6" />
      <path d="m15 9-6 6" />
    </Icon>
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

function PlusIcon() {
  return (
    <Icon size={17}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Icon>
  );
}

function ImportIcon() {
  return (
    <Icon size={16}>
      <path d="M12 15V3" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 21h14" />
    </Icon>
  );
}

function ExportIcon() {
  return (
    <Icon size={16}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </Icon>
  );
}

function PrintIcon() {
  return (
    <Icon size={16}>
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v7H6z" />
    </Icon>
  );
}

function EyeIcon() {
  return (
    <Icon size={16}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
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

function DeleteIcon() {
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

/* =========================
   STAT CARD
   STRUKTUR SAMA DENGAN DASBOR
========================= */

function StatCard({
  title,
  value,
  description,
  type,
}: {
  title: string;
  value: number;
  description: string;
  type: "blue" | "green" | "yellow" | "red";
}) {
  return (
    <div
      className={`${styles.statCard} ${styles[`${type}Card`]}`}
    >
      <div className={styles.statTop}>
        <span className={styles.statLabel}>
          {title}
        </span>

        <div
          className={`${styles.statIcon} ${styles[`${type}Icon`]}`}
        >
          {type === "blue" && <BoxIcon />}
          {type === "green" && <CheckIcon />}
          {type === "yellow" && <WarningIcon />}
          {type === "red" && <AlertIcon />}
        </div>
      </div>

      <h2>{value}</h2>

      <p className={styles.statInfo}>
        {description}
      </p>
    </div>
  );
}

/* =========================
   PAGE
========================= */

export default function BarangPage() {
  /* =========================
     DATA + CRUD SUPABASE
  ========================= */

  const [barangData, setBarangData] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    tahun: "",
    kondisi: "Baik" as Kondisi,
    lokasi: "",
    perolehan: "BOS" as Perolehan,
  });

  async function loadBarang() {
    setLoading(true);
    const { data, error } = await supabase
      .from("barang")
      .select("id, kode_barang, nama_barang, tahun_pembelian, kondisi, lokasi, asal_perolehan, created_at")
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal mengambil data barang:", error);
      alert(`Gagal mengambil data barang: ${error.message}`);
      setBarangData([]);
      setLoading(false);
      return;
    }

    const mapped: Barang[] = (data ?? []).map((item: any) => ({
      id: Number(item.id),
      kode: String(item.kode_barang ?? ""),
      nama: String(item.nama_barang ?? ""),
      tahun: String(item.tahun_pembelian ?? ""),
      kondisi: item.kondisi as Kondisi,
      lokasi: String(item.lokasi ?? ""),
      perolehan: item.asal_perolehan as Perolehan,
    }));

    setBarangData(mapped);
    setLoading(false);
  }

  useEffect(() => {
    loadBarang();
  }, []);

  function openAddModal() {
    setEditingId(null);
    setForm({
      kode: "",
      nama: "",
      tahun: "",
      kondisi: "Baik",
      lokasi: "",
      perolehan: "BOS",
    });
    setModalOpen(true);
  }

  function openEditModal(item: Barang) {
    setEditingId(item.id);
    setForm({
      kode: item.kode,
      nama: item.nama,
      tahun: item.tahun,
      kondisi: item.kondisi,
      lokasi: item.lokasi,
      perolehan: item.perolehan,
    });
    setModalOpen(true);
  }

  function closeModal() {
    if (!saving) setModalOpen(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const kode = form.kode.trim();
    const nama = form.nama.trim();
    const tahun = form.tahun.trim();
    const lokasi = form.lokasi.trim();

    if (!kode || !nama || !tahun || !lokasi || !form.kondisi || !form.perolehan) {
      alert("Semua data barang wajib diisi.");
      return;
    }

    if (!/^\d{4}$/.test(tahun)) {
      alert("Tahun pembelian harus 4 digit, contoh: 2026.");
      return;
    }

    setSaving(true);

    if (editingId === null) {
      const { error } = await supabase.from("barang").insert({
        kode_barang: kode,
        nama_barang: nama,
        tahun_pembelian: tahun,
        kondisi: form.kondisi,
        lokasi,
        asal_perolehan: form.perolehan,
      });

      if (error) {
        console.error("Gagal menambah barang:", error);
        alert(`Gagal menambah barang: ${error.message}`);
        setSaving(false);
        return;
      }

      alert("Data barang berhasil ditambahkan.");
    } else {
      const { error } = await supabase
        .from("barang")
        .update({
          kode_barang: kode,
          nama_barang: nama,
          tahun_pembelian: tahun,
          kondisi: form.kondisi,
          lokasi,
          asal_perolehan: form.perolehan,
        })
        .eq("id", editingId);

      if (error) {
        console.error("Gagal mengubah barang:", error);
        alert(`Gagal mengubah barang: ${error.message}`);
        setSaving(false);
        return;
      }

      alert("Data barang berhasil diubah.");
    }

    setSaving(false);
    setModalOpen(false);
    await loadBarang();
  }

  async function handleDelete(item: Barang) {
    const confirmed = window.confirm(
      `Hapus data barang "${item.nama}" dengan kode ${item.kode}?`
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("barang")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.error("Gagal menghapus barang:", error);
      alert(`Gagal menghapus barang: ${error.message}`);
      return;
    }

    setPage(1);
    await loadBarang();
  }

  /* =========================
     FILTER
  ========================= */

  const [keyword, setKeyword] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [perolehan, setPerolehan] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [tahun, setTahun] = useState("");

  const [filterOpen, setFilterOpen] =
    useState(false);

  /* =========================
     PAGINATION
  ========================= */

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  /* =========================
     SORTING
  ========================= */

  const [sortKey, setSortKey] =
    useState<SortKey>("kode");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  /* =========================
     FILTER DATA
  ========================= */

  const filteredData = useMemo(() => {
    return barangData.filter((item) => {
      const search =
        keyword.toLowerCase().trim();

      const keywordMatch =
        search === "" ||
        item.kode
          .toLowerCase()
          .includes(search) ||
        item.nama
          .toLowerCase()
          .includes(search);

      const lokasiMatch =
        lokasi === "" ||
        item.lokasi === lokasi;

      const perolehanMatch =
        perolehan === "" ||
        item.perolehan === perolehan;

      const kondisiMatch =
        kondisi === "" ||
        item.kondisi === kondisi;

      const tahunMatch =
        tahun === "" ||
        item.tahun === tahun;

      return (
        keywordMatch &&
        lokasiMatch &&
        perolehanMatch &&
        kondisiMatch &&
        tahunMatch
      );
    });
  }, [
    barangData,
    keyword,
    lokasi,
    perolehan,
    kondisi,
    tahun,
  ]);

  /* =========================
     SORT DATA
  ========================= */

  const sortedData = useMemo(() => {
    const data = [...filteredData];

    const conditionOrder: Record<
      Kondisi,
      number
    > = {
      Baik: 1,
      "Rusak Ringan": 2,
      "Rusak Berat": 3,
    };

    data.sort((a, b) => {
      let result = 0;

      if (sortKey === "tahun") {
        result =
          Number(a.tahun) -
          Number(b.tahun);
      } else if (sortKey === "kondisi") {
        result =
          conditionOrder[a.kondisi] -
          conditionOrder[b.kondisi];
      } else {
        result = String(
          a[sortKey]
        ).localeCompare(
          String(b[sortKey]),
          "id",
          {
            numeric: true,
            sensitivity: "base",
          }
        );
      }

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

  /* =========================
     STATISTIK
  ========================= */

  const totalBarang =
    barangData.length;

  const kondisiBaik =
    barangData.filter(
      (item) =>
        item.kondisi === "Baik"
    ).length;

  const kondisiRingan =
    barangData.filter(
      (item) =>
        item.kondisi ===
        "Rusak Ringan"
    ).length;

  const kondisiBerat =
    barangData.filter(
      (item) =>
        item.kondisi ===
        "Rusak Berat"
    ).length;

  const persentaseBaik =
    totalBarang > 0
      ? Math.round(
          (kondisiBaik /
            totalBarang) *
            100
        )
      : 0;

  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedData.length /
        rowsPerPage
    )
  );

  const startIndex =
    (page - 1) * rowsPerPage;

  const currentData =
    sortedData.slice(
      startIndex,
      startIndex + rowsPerPage
    );

  /* =========================
     SORT HANDLER
  ========================= */

  function handleSort(
    key: SortKey
  ) {
    if (sortKey === key) {
      setSortDirection(
        (previous) =>
          previous === "asc"
            ? "desc"
            : "asc"
      );
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }

    setPage(1);
  }

  /* =========================
     RESET FILTER
  ========================= */

  function resetFilter() {
    setKeyword("");
    setLokasi("");
    setPerolehan("");
    setKondisi("");
    setTahun("");
    setPage(1);
  }

  /* =========================
     SORT BUTTON
     TANPA PANAH
  ========================= */

  function SortButton({
    label,
    column,
  }: {
    label: string;
    column: SortKey;
  }) {
    return (
      <button
        type="button"
        className={`${styles.sortButton} ${
          sortKey === column
            ? styles.sortActive
            : ""
        }`}
        onClick={() =>
          handleSort(column)
        }
      >
        {label}
      </button>
    );
  }

  return (
    <main className={styles.page}>

      {/* =========================
          HEADER
      ========================= */}

      <section className={styles.topArea}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h1>Data Barang</h1>

            <p className={styles.subtitle}>
              Kelola dan pantau seluruh data
              barang sarana dan prasarana
              sekolah.
            </p>
          </div>
        </header>
      </section>

      {/* =========================
          STATISTIC CARDS
          SAMA DENGAN DASBOR
      ========================= */}

      <section className={styles.statsGrid}>

        <StatCard
          title="Total Barang"
          value={totalBarang}
          description="Total seluruh sarana yang tercatat"
          type="blue"
        />

        <StatCard
          title="Kondisi Baik"
          value={kondisiBaik}
          description={`${persentaseBaik}% dari total barang`}
          type="green"
        />

        <StatCard
          title="Rusak Ringan"
          value={kondisiRingan}
          description="Perlu pemeliharaan berkala"
          type="yellow"
        />

        <StatCard
          title="Rusak Berat"
          value={kondisiBerat}
          description="Perlu penanganan lebih lanjut"
          type="red"
        />

      </section>

      {/* =========================
          TOOLBAR
      ========================= */}

      <section className={styles.toolbar}>

        <div className={styles.toolbarLeft}>

          <button
            type="button"
            className={styles.secondaryButton}
          >
            <ImportIcon />
            Import Excel
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
          >
            <ExportIcon />
            Export
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
          >
            <PrintIcon />
            Print
          </button>

        </div>

        <button
          type="button"
          className={styles.primaryButton}
          onClick={openAddModal}
        >
          <PlusIcon />
          Tambah Data
        </button>

      </section>

      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <section className={styles.filterCard}>

        <div className={styles.searchRow}>

          <div className={styles.searchBox}>
            <SearchIcon />

            <input
              type="text"
              value={keyword}
              placeholder="Cari kode atau nama barang..."
              onChange={(event) => {
                setKeyword(
                  event.target.value
                );
                setPage(1);
              }}
            />
          </div>

          <button
            type="button"
            className={styles.filterButton}
            onClick={() =>
              setFilterOpen(
                (previous) =>
                  !previous
              )
            }
          >
            <FilterIcon />
            Filter
          </button>

          <button
            type="button"
            className={styles.resetButton}
            onClick={resetFilter}
          >
            Reset
          </button>

        </div>

        {filterOpen && (
          <div className={styles.filterGrid}>

            <select
              value={lokasi}
              onChange={(event) => {
                setLokasi(
                  event.target.value
                );
                setPage(1);
              }}
            >
              <option value="">
                Semua Lokasi
              </option>

              <option value="Gudang Sarpras">
                Gudang Sarpras
              </option>

              <option value="HOME THEATER">
                HOME THEATER
              </option>

              <option value="LAB BAHASA">
                LAB BAHASA
              </option>

              <option value="RUANG HUMAS">
                RUANG HUMAS
              </option>

              <option value="Bank Mini">
                Bank Mini
              </option>

              <option value="LKS">
                LKS
              </option>

              <option value="Ruang TU">
                Ruang TU
              </option>

              <option value="Bengkel">
                Bengkel
              </option>
            </select>

            <select
              value={perolehan}
              onChange={(event) => {
                setPerolehan(
                  event.target.value
                );
                setPage(1);
              }}
            >
              <option value="">
                Semua Perolehan
              </option>

              <option value="BOS">
                BOS
              </option>

              <option value="BPOPP">
                BPOPP
              </option>

              <option value="BLUD">
                BLUD
              </option>

              <option value="CSR">
                CSR
              </option>

              <option value="TEFA">
                TEFA
              </option>
            </select>

            <select
              value={kondisi}
              onChange={(event) => {
                setKondisi(
                  event.target.value
                );
                setPage(1);
              }}
            >
              <option value="">
                Semua Kondisi
              </option>

              <option value="Baik">
                Baik
              </option>

              <option value="Rusak Ringan">
                Rusak Ringan
              </option>

              <option value="Rusak Berat">
                Rusak Berat
              </option>
            </select>

            <select
              value={tahun}
              onChange={(event) => {
                setTahun(
                  event.target.value
                );
                setPage(1);
              }}
            >
              <option value="">
                Semua Tahun
              </option>

              <option value="2026">
                2026
              </option>

              <option value="2025">
                2025
              </option>

              <option value="2024">
                2024
              </option>
            </select>

          </div>
        )}

      </section>

      {/* =========================
          TABLE
      ========================= */}

      <section className={styles.tableCard}>

        <div className={styles.tableHeader}>

          <div>
            <h2>Daftar Barang</h2>

            <p>
              Menampilkan{" "}
              <strong>
                {sortedData.length}
              </strong>{" "}
              data barang
            </p>
          </div>

          <label className={styles.rowsSelect}>
            Baris:

            <select
              value={rowsPerPage}
              onChange={(event) => {
                setRowsPerPage(
                  Number(
                    event.target.value
                  )
                );
                setPage(1);
              }}
            >
              <option value={5}>
                5
              </option>

              <option value={10}>
                10
              </option>

              <option value={20}>
                20
              </option>
            </select>
          </label>

        </div>

        <div className={styles.tableWrapper}>

          <table>

            <thead>
              <tr>

                <th>No</th>

                <th>
                  <SortButton
                    label="Kode Barang"
                    column="kode"
                  />
                </th>

                <th>
                  <SortButton
                    label="Nama Barang"
                    column="nama"
                  />
                </th>

                <th>
                  <SortButton
                    label="Tahun Pembelian"
                    column="tahun"
                  />
                </th>

                <th>
                  <SortButton
                    label="Kondisi"
                    column="kondisi"
                  />
                </th>

                <th>
                  <SortButton
                    label="Lokasi"
                    column="lokasi"
                  />
                </th>

                <th>
                  <SortButton
                    label="Asal Perolehan"
                    column="perolehan"
                  />
                </th>

                <th>Aksi</th>

              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan={8} className={styles.empty}>
                    Memuat data barang...
                  </td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map(
                  (item, index) => (
                    <tr key={item.id}>

                      <td>
                        {startIndex +
                          index +
                          1}
                      </td>

                      <td
                        className={
                          styles.code
                        }
                      >
                        {item.kode}
                      </td>

                      <td
                        className={
                          styles.itemName
                        }
                      >
                        {item.nama}
                      </td>

                      <td>
                        {item.tahun}
                      </td>

                      <td>

                        <span
                          className={`${styles.badge} ${
                            item.kondisi ===
                            "Baik"
                              ? styles.baik
                              : item.kondisi ===
                                "Rusak Ringan"
                              ? styles.ringan
                              : styles.berat
                          }`}
                        >
                          {item.kondisi}
                        </span>

                      </td>

                      <td>
                        {item.lokasi}
                      </td>

                      <td>

                        <span
                          className={
                            styles.source
                          }
                        >
                          {item.perolehan}
                        </span>

                      </td>

                      <td>

                        <div
                          className={
                            styles.actionGroup
                          }
                        >

                          <button
                            type="button"
                            className={`${styles.actionButton} ${styles.actionView}`}
                            title="Lihat detail"
                          >
                            <EyeIcon />
                          </button>

                          <button
                            type="button"
                            className={`${styles.actionButton} ${styles.actionEdit}`}
                            title="Edit barang"
                            onClick={() => openEditModal(item)}
                          >
                            <EditIcon />
                          </button>

                          <button
                            type="button"
                            className={`${styles.actionButton} ${styles.actionPrint}`}
                            title="Print barang"
                          >
                            <PrintIcon />
                          </button>

                          <button
                            type="button"
                            className={`${styles.actionButton} ${styles.actionDelete}`}
                            title="Hapus barang"
                            onClick={() => handleDelete(item)}
                          >
                            <DeleteIcon />
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
                      styles.empty
                    }
                  >
                    Data barang tidak ditemukan.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =========================
            PAGINATION
        ========================= */}

        <div className={styles.pagination}>

          <span>
            Menampilkan{" "}
            <strong>
              {sortedData.length ===
              0
                ? 0
                : startIndex + 1}
            </strong>{" "}
            -{" "}
            <strong>
              {Math.min(
                startIndex +
                  rowsPerPage,
                sortedData.length
              )}
            </strong>{" "}
            dari{" "}
            <strong>
              {sortedData.length}
            </strong>{" "}
            data
          </span>

          <div
            className={
              styles.pageButtons
            }
          >

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (previous) =>
                    previous - 1
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
            ).map((number) => (
              <button
                type="button"
                key={number}
                className={
                  page === number
                    ? styles.activePage
                    : ""
                }
                onClick={() =>
                  setPage(number)
                }
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage(
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


      {modalOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{editingId === null ? "Tambah Data Barang" : "Edit Data Barang"}</h2>
                <p>Lengkapi data barang berikut.</p>
              </div>
              <button type="button" className={styles.modalClose} onClick={closeModal} disabled={saving} aria-label="Tutup">
                ×
              </button>
            </div>

            <form className={styles.formGrid} onSubmit={handleSubmit}>
              <label>
                <span>Kode Barang <b>*</b></span>
                <input value={form.kode} onChange={(event) => setForm({ ...form, kode: event.target.value })} placeholder="Contoh: 1.3.2.08.01.10.087.0001" required />
              </label>

              <label>
                <span>Nama Barang <b>*</b></span>
                <input value={form.nama} onChange={(event) => setForm({ ...form, nama: event.target.value })} placeholder="Nama barang" required />
              </label>

              <label>
                <span>Tahun Pembelian <b>*</b></span>
                <input
                  value={form.tahun}
                  onChange={(event) => setForm({ ...form, tahun: event.target.value.replace(/\D/g, "").slice(0, 4) })}
                  placeholder="2026"
                  inputMode="numeric"
                  maxLength={4}
                  required
                />
              </label>

              <label>
                <span>Kondisi <b>*</b></span>
                <select value={form.kondisi} onChange={(event) => setForm({ ...form, kondisi: event.target.value as Kondisi })} required>
                  {kondisiOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>

              <label>
                <span>Lokasi <b>*</b></span>
                <input value={form.lokasi} onChange={(event) => setForm({ ...form, lokasi: event.target.value })} placeholder="Contoh: Gudang Sarpras" required />
              </label>

              <label>
                <span>Asal Perolehan <b>*</b></span>
                <select value={form.perolehan} onChange={(event) => setForm({ ...form, perolehan: event.target.value as Perolehan })} required>
                  {perolehanOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>

              <div className={styles.formActions}>
                <button type="button" className={styles.modalCancel} onClick={closeModal} disabled={saving}>Batal</button>
                <button type="submit" className={styles.modalSave} disabled={saving}>
                  {saving ? "Menyimpan..." : editingId === null ? "Simpan Data" : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

/* =========================================================
   TYPE
========================================================= */

type TemplateType =
  | "Layanan Pengaduan"
  | "Pengumuman Terjadwal"
  | "Bantuan Cepat"
  | "Informasi Penting"
  | "Informasi Layanan";

type Status = "Aktif" | "Nonaktif";

type Information = {
  id: number;
  template: TemplateType;
  judul: string;
  badge: string;
  isi: string;
  hari: string;
  jam: string;
  lokasi: string;
  periode: string;
  telepon: string;
  whatsapp: string;
  teksTombol: string;
  link: string;
  status: Status;
  urutan: number;
};

/* =========================================================
   TEMPLATE
========================================================= */

const templates: {
  type: TemplateType;
  description: string;
  icon: string;
}[] = [
  {
    type: "Layanan Pengaduan",
    description:
      "Informasi jam dan layanan pengaduan.",
    icon: "clock",
  },
  {
    type: "Pengumuman Terjadwal",
    description:
      "Pengumuman pemeliharaan atau kegiatan.",
    icon: "megaphone",
  },
  {
    type: "Bantuan Cepat",
    description:
      "Kontak dan bantuan cepat Sarpras.",
    icon: "headset",
  },
  {
    type: "Informasi Penting",
    description:
      "Informasi penting yang perlu diperhatikan.",
    icon: "warning",
  },
  {
    type: "Informasi Layanan",
    description:
      "Panduan dan informasi layanan.",
    icon: "calendar",
  },
];

/* =========================================================
   DATA YANG SUDAH DIUNGGAH
   SEMENTARA DUMMY
========================================================= */

const initialInformation: Information[] = [
  {
    id: 1,
    template: "Layanan Pengaduan",
    judul: "Jam Operasional",
    badge: "Aktif",
    isi: "Pelaporan mandiri via web tetap dapat dikirim 24 jam.",
    hari: "Senin - Jumat",
    jam: "07.00 - 15.00 WIB",
    lokasi: "",
    periode: "",
    telepon: "",
    whatsapp: "",
    teksTombol: "",
    link: "",
    status: "Aktif",
    urutan: 1,
  },
  {
    id: 2,
    template: "Pengumuman Terjadwal",
    judul: "Pemeliharaan AC & Listrik",
    badge: "Minggu Ini",
    isi: "Pemeliharaan berkala pendingin ruangan (AC) & instalasi listrik lab dimulai minggu ini. Mohon amankan perangkat elektronik setelah praktikum.",
    hari: "",
    jam: "",
    lokasi: "Ruang Lab Kimia, Fisika, & RPL",
    periode: "Minggu ini",
    telepon: "",
    whatsapp: "",
    teksTombol: "",
    link: "",
    status: "Aktif",
    urutan: 2,
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

function ClockIcon({ size = 22 }) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

function MegaphoneIcon({ size = 22 }) {
  return (
    <Icon size={size}>
      <path d="M4 13h3l10 5V6L7 11H4z" />
      <path d="M7 13v5" />
      <path d="M20 9.5a4 4 0 0 1 0 5" />
    </Icon>
  );
}

function HeadsetIcon({ size = 22 }) {
  return (
    <Icon size={size}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 1z" />
      <path d="M20 13v3a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 1z" />
      <path d="M14 20h2" />
    </Icon>
  );
}

function WarningIcon({ size = 22 }) {
  return (
    <Icon size={size}>
      <path d="m12 4 9 16H3L12 4Z" />
      <path d="M12 9v5" />
      <path d="M12 17h.01" />
    </Icon>
  );
}

function CalendarIcon({ size = 22 }) {
  return (
    <Icon size={size}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 9h16" />
      <path d="M8 13h2M14 13h2M8 17h2" />
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

function SearchIcon() {
  return (
    <Icon size={17}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Icon>
  );
}

function EditIcon() {
  return (
    <Icon size={15}>
      <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </Icon>
  );
}

function TrashIcon() {
  return (
    <Icon size={15}>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M18 7v13H6V7" />
      <path d="M10 11v5M14 11v5" />
    </Icon>
  );
}

function CloseIcon() {
  return (
    <Icon size={18}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </Icon>
  );
}

function InfoIcon() {
  return (
    <Icon size={17}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </Icon>
  );
}

function MapPinIcon() {
  return (
    <Icon size={17}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  );
}

function PhoneIcon() {
  return (
    <Icon size={17}>
      <path d="M6 3h3l2 5-2 1.5a15 15 0 0 0 5.5 5.5L16 13l5 2v3a2 2 0 0 1-2 2C10 20 4 14 4 5a2 2 0 0 1 2-2Z" />
    </Icon>
  );
}

/* =========================================================
   ICON TEMPLATE
========================================================= */

function TemplateIcon({
  type,
  size = 24,
}: {
  type: TemplateType;
  size?: number;
}) {
  if (type === "Layanan Pengaduan") {
    return <ClockIcon size={size} />;
  }

  if (type === "Pengumuman Terjadwal") {
    return <MegaphoneIcon size={size} />;
  }

  if (type === "Bantuan Cepat") {
    return <HeadsetIcon size={size} />;
  }

  if (type === "Informasi Penting") {
    return <WarningIcon size={size} />;
  }

  return <CalendarIcon size={size} />;
}

/* =========================================================
   EMPTY TEMPLATE CARD
========================================================= */

function EmptyTemplateCard({
  template,
  onSelect,
}: {
  template: (typeof templates)[number];
  onSelect: () => void;
}) {
  return (
    <div
      className={`${styles.homeCard} ${styles.emptyTemplateCard}`}
    >
      <div className={styles.cardTop}>
        <div
          className={`${styles.cardIcon} ${
            styles[`icon_${template.icon}`]
          }`}
        >
          <TemplateIcon type={template.type} />
        </div>

        <span className={styles.emptyBadge}>
          Template
        </span>
      </div>

      <span className={styles.cardCategory}>
        {template.type.toUpperCase()}
      </span>

      <h3>Judul Informasi</h3>

      {template.type === "Layanan Pengaduan" && (
        <>
          <div className={styles.emptyTimeBox}>
            <strong>Hari Operasional</strong>
            <b>00.00 - 00.00</b>
            <span>WIB</span>
          </div>

          <div className={styles.emptyInfo}>
            <InfoIcon />
            <span>
              Keterangan tambahan akan
              ditampilkan di sini.
            </span>
          </div>
        </>
      )}

      {template.type ===
        "Pengumuman Terjadwal" && (
        <>
          <p className={styles.emptyDescription}>
            Isi pengumuman akan ditampilkan
            di sini.
          </p>

          <div className={styles.emptyLocation}>
            <MapPinIcon />
            <span>Lokasi kegiatan</span>
          </div>
        </>
      )}

      {template.type === "Bantuan Cepat" && (
        <>
          <p className={styles.emptyDescription}>
            Keterangan bantuan akan
            ditampilkan di sini.
          </p>

          <div className={styles.emptyContact}>
            <PhoneIcon />
            <div>
              <strong>
                Nomor kontak
              </strong>
              <span>
                WhatsApp Siaga Sarpras
              </span>
            </div>
          </div>
        </>
      )}

      {template.type === "Informasi Penting" && (
        <>
          <p className={styles.emptyDescription}>
            Informasi penting akan
            ditampilkan di sini.
          </p>

          <div className={styles.emptyLocation}>
            <MapPinIcon />
            <span>Lokasi informasi</span>
          </div>
        </>
      )}

      {template.type === "Informasi Layanan" && (
        <>
          <p className={styles.emptyDescription}>
            Deskripsi layanan akan
            ditampilkan di sini.
          </p>

          <div className={styles.emptyLink}>
            Lihat panduan layanan →
          </div>
        </>
      )}

      <button
        type="button"
        className={styles.selectTemplateButton}
        onClick={onSelect}
      >
        <PlusIcon />
        Pilih Template
      </button>
    </div>
  );
}

/* =========================================================
   UPLOADED CARD
========================================================= */

function UploadedCard({
  item,
  onEdit,
  onDelete,
}: {
  item: Information;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className={styles.uploadedCard}>
      <div
        className={`${styles.cardIcon} ${
          styles[`icon_${getIconName(item.template)}`]
        }`}
      >
        <TemplateIcon type={item.template} />
      </div>

      <div className={styles.uploadedMain}>
        <div className={styles.uploadedMeta}>
          <span className={styles.cardCategory}>
            {item.template.toUpperCase()}
          </span>

          {item.badge && (
            <span className={styles.uploadedBadge}>
              {item.badge}
            </span>
          )}

          <span
            className={`${styles.statusBadge} ${
              item.status === "Aktif"
                ? styles.statusActive
                : styles.statusInactive
            }`}
          >
            {item.status}
          </span>
        </div>

        <h3>{item.judul}</h3>

        <p>{item.isi}</p>

        <div className={styles.uploadedDetails}>
          {item.hari && (
            <span>
              {item.hari}
            </span>
          )}

          {item.jam && (
            <span>
              {item.jam}
            </span>
          )}

          {item.lokasi && (
            <span>
              <MapPinIcon />
              {item.lokasi}
            </span>
          )}

          {item.telepon && (
            <span>
              <PhoneIcon />
              {item.telepon}
            </span>
          )}

          {item.whatsapp && (
            <span>
              {item.whatsapp}
            </span>
          )}
        </div>
      </div>

      <div className={styles.uploadedActions}>
        <button
          type="button"
          className={styles.editButton}
          onClick={onEdit}
        >
          <EditIcon />
          Edit
        </button>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
        >
          <TrashIcon />
          Hapus
        </button>
      </div>
    </article>
  );
}

function getIconName(
  template: TemplateType
) {
  if (template === "Layanan Pengaduan")
    return "clock";

  if (template === "Pengumuman Terjadwal")
    return "megaphone";

  if (template === "Bantuan Cepat")
    return "headset";

  if (template === "Informasi Penting")
    return "warning";

  return "calendar";
}

/* =========================================================
   PAGE
========================================================= */

export default function InformasiHomePage() {
  const [information, setInformation] =
    useState<Information[]>(
      initialInformation
    );

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");

  const [filterTemplate, setFilterTemplate] =
    useState("Semua Template");

  const [filterStatus, setFilterStatus] =
    useState("Semua Status");

  const [sortBy, setSortBy] =
    useState<
      "urutan" | "judul" | "template"
    >("urutan");

  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const [entriesPerPage, setEntriesPerPage] =
    useState(5);

  const [currentPage, setCurrentPage] =
    useState(1);

  const emptyForm: Information = {
    id: 0,
    template: "Layanan Pengaduan",
    judul: "",
    badge: "",
    isi: "",
    hari: "",
    jam: "",
    lokasi: "",
    periode: "",
    telepon: "",
    whatsapp: "",
    teksTombol: "",
    link: "",
    status: "Aktif",
    urutan:
      information.length + 1,
  };

  const [form, setForm] =
    useState<Information>(
      emptyForm
    );

  /* =======================================================
     TEMPLATE SELECTION
  ======================================================= */

  function chooseTemplate(
    template: TemplateType
  ) {
    const nextOrder =
      information.length + 1;

    setEditingId(null);

    setForm({
      id: 0,
      template,
      judul: "",
      badge:
        template ===
        "Layanan Pengaduan"
          ? "Aktif"
          : template ===
              "Pengumuman Terjadwal"
            ? "Minggu Ini"
            : template ===
                "Informasi Penting"
              ? "Penting"
              : "",
      isi: "",
      hari: "",
      jam: "",
      lokasi: "",
      periode: "",
      telepon: "",
      whatsapp: "",
      teksTombol:
        template ===
        "Informasi Layanan"
          ? "Lihat panduan pelaporan"
          : "",
      link:
        template ===
        "Informasi Layanan"
          ? "/form-pelaporan"
          : "",
      status: "Aktif",
      urutan: nextOrder,
    });

    setSelectedTemplate(
      template
    );
  }

  /* =======================================================
     EDIT
  ======================================================= */

  function editInformation(
    item: Information
  ) {
    setForm({
      ...item,
    });

    setEditingId(item.id);
    setSelectedTemplate(
      item.template
    );
  }

  /* =======================================================
     DELETE
  ======================================================= */

  function deleteInformation(
    item: Information
  ) {
    const confirmed =
      window.confirm(
        `Hapus informasi "${item.judul}"?`
      );

    if (!confirmed) return;

    setInformation((previous) =>
      previous
        .filter(
          (data) =>
            data.id !== item.id
        )
        .map((data, index) => ({
          ...data,
          urutan: index + 1,
        }))
    );

    setCurrentPage(1);
  }

  /* =======================================================
     SAVE
  ======================================================= */

  function saveInformation() {
    if (!form.judul.trim()) {
      alert(
        "Judul informasi wajib diisi."
      );
      return;
    }

    if (!form.isi.trim()) {
      alert(
        "Isi informasi wajib diisi."
      );
      return;
    }

    if (editingId !== null) {
      setInformation((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? {
                ...form,
                judul:
                  form.judul.trim(),
                isi:
                  form.isi.trim(),
              }
            : item
        )
      );
    } else {
      setInformation((previous) => [
        ...previous,
        {
          ...form,
          id: Date.now(),
          urutan:
            previous.length + 1,
        },
      ]);
    }

    setSelectedTemplate(null);
    setEditingId(null);
    setCurrentPage(1);
  }

  /* =======================================================
     SEARCH FILTER SORT
  ======================================================= */

  const filteredInformation =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      const result =
        information.filter(
          (item) => {
            const searchable = [
              item.template,
              item.judul,
              item.badge,
              item.isi,
              item.hari,
              item.jam,
              item.lokasi,
              item.periode,
              item.telepon,
              item.whatsapp,
              item.status,
            ]
              .join(" ")
              .toLowerCase();

            const matchesSearch =
              !keyword ||
              searchable.includes(
                keyword
              );

            const matchesTemplate =
              filterTemplate ===
                "Semua Template" ||
              item.template ===
                filterTemplate;

            const matchesStatus =
              filterStatus ===
                "Semua Status" ||
              item.status ===
                filterStatus;

            return (
              matchesSearch &&
              matchesTemplate &&
              matchesStatus
            );
          }
        );

      result.sort((a, b) => {
        let comparison = 0;

        if (
          sortBy === "urutan"
        ) {
          comparison =
            a.urutan -
            b.urutan;
        }

        if (
          sortBy === "judul"
        ) {
          comparison =
            a.judul.localeCompare(
              b.judul,
              "id"
            );
        }

        if (
          sortBy === "template"
        ) {
          comparison =
            a.template.localeCompare(
              b.template,
              "id"
            );
        }

        return sortDirection ===
          "asc"
          ? comparison
          : -comparison;
      });

      return result;
    }, [
      information,
      search,
      filterTemplate,
      filterStatus,
      sortBy,
      sortDirection,
    ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredInformation.length /
          entriesPerPage
      )
    );

  const safePage =
    Math.min(
      currentPage,
      totalPages
    );

  const startIndex =
    (safePage - 1) *
    entriesPerPage;

  const visibleInformation =
    filteredInformation.slice(
      startIndex,
      startIndex +
        entriesPerPage
    );

  /* =======================================================
     RESET
  ======================================================= */

  function resetFilter() {
    setSearch("");
    setFilterTemplate(
      "Semua Template"
    );
    setFilterStatus(
      "Semua Status"
    );
    setSortBy("urutan");
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
            Informasi Home
          </h1>

          <p>
            Kelola informasi yang
            ditampilkan pada bagian
            Informasi Terkini Sarpras
            di halaman Home.
          </p>
        </div>
      </section>

      {/* =================================================
          TEMPLATE KOSONG
      ================================================= */}

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <h2>
              Template Informasi
            </h2>

            <p>
              Pilih salah satu template
              untuk membuat informasi
              baru.
            </p>
          </div>

          <span className={styles.templateCount}>
            5 Template Tersedia
          </span>
        </div>

        <div className={styles.templateGrid}>
          {templates.map(
            (template) => (
              <EmptyTemplateCard
                key={
                  template.type
                }
                template={
                  template
                }
                onSelect={() =>
                  chooseTemplate(
                    template.type
                  )
                }
              />
            )
          )}
        </div>
      </section>

      {/* =================================================
          INFORMASI SUDAH DIUNGGAH
      ================================================= */}

      <section className={styles.uploadedSection}>
        <div className={styles.uploadedHeading}>
          <div>
            <h2>
              Informasi yang Sudah
              Diunggah
            </h2>

            <p>
              Informasi yang sudah
              dibuat dan ditampilkan
              pada halaman User.
            </p>
          </div>

          <span>
            {information.length}{" "}
            informasi
          </span>
        </div>

        {/* TOOLS */}

        <div className={styles.tools}>
          <div className={styles.searchBox}>
            <SearchIcon />

            <input
              value={search}
              placeholder="Cari judul, isi, template, lokasi..."
              onChange={(event) => {
                setSearch(
                  event.target.value
                );
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            value={filterTemplate}
            onChange={(event) => {
              setFilterTemplate(
                event.target.value
              );
              setCurrentPage(1);
            }}
          >
            <option>
              Semua Template
            </option>

            {templates.map(
              (template) => (
                <option
                  key={
                    template.type
                  }
                  value={
                    template.type
                  }
                >
                  {
                    template.type
                  }
                </option>
              )
            )}
          </select>

          <select
            value={filterStatus}
            onChange={(event) => {
              setFilterStatus(
                event.target.value
              );
              setCurrentPage(1);
            }}
          >
            <option>
              Semua Status
            </option>

            <option value="Aktif">
              Aktif
            </option>

            <option value="Nonaktif">
              Nonaktif
            </option>
          </select>

          <div className={styles.sortBox}>
            <span>
              Urutkan
            </span>

            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(
                  event.target.value as
                    | "urutan"
                    | "judul"
                    | "template"
                );
                setCurrentPage(1);
              }}
            >
              <option value="urutan">
                Urutan
              </option>

              <option value="judul">
                Judul
              </option>

              <option value="template">
                Template
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

          <button
            type="button"
            className={
              styles.resetButton
            }
            onClick={
              resetFilter
            }
          >
            Reset
          </button>

          <div className={styles.entries}>
            <span>
              Tampilkan
            </span>

            <select
              value={
                entriesPerPage
              }
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
            </select>

            <span>
              entri
            </span>
          </div>
        </div>

        {/* LIST */}

        <div className={styles.uploadedList}>
          {visibleInformation.length >
          0 ? (
            visibleInformation.map(
              (item) => (
                <UploadedCard
                  key={item.id}
                  item={item}
                  onEdit={() =>
                    editInformation(
                      item
                    )
                  }
                  onDelete={() =>
                    deleteInformation(
                      item
                    )
                  }
                />
              )
            )
          ) : (
            <div
              className={
                styles.emptyUploaded
              }
            >
              <InfoIcon />

              <strong>
                Belum ada informasi
              </strong>

              <span>
                Pilih salah satu
                template di atas untuk
                menambahkan informasi.
              </span>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className={styles.listFooter}>
          <span>
            Menampilkan{" "}
            {filteredInformation.length ===
            0
              ? 0
              : startIndex + 1}{" "}
            sampai{" "}
            {Math.min(
              startIndex +
                entriesPerPage,
              filteredInformation.length
            )}{" "}
            dari{" "}
            {
              filteredInformation.length
            }{" "}
            informasi
          </span>

          <div className={styles.pagination}>
            <button
              type="button"
              disabled={
                safePage === 1
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
                  safePage
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
                safePage ===
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

      {/* =================================================
          MODAL FORM
      ================================================= */}

      {selectedTemplate && (
        <div
          className={
            styles.modalOverlay
          }
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedTemplate(
                null
              );
              setEditingId(null);
            }
          }}
        >
          <div
            className={
              styles.modal
            }
          >
            <div
              className={
                styles.modalHeader
              }
            >
              <div>
                <h2>
                  {editingId
                    ? "Edit Informasi"
                    : "Tambah Informasi"}
                </h2>

                <p>
                  Isi informasi sesuai
                  dengan template yang
                  dipilih.
                </p>
              </div>

              <button
                type="button"
                className={
                  styles.closeButton
                }
                onClick={() => {
                  setSelectedTemplate(
                    null
                  );
                  setEditingId(null);
                }}
              >
                <CloseIcon />
              </button>
            </div>

            <div
              className={
                styles.modalContent
              }
            >
              {/* PREVIEW */}

              <div
                className={
                  styles.previewArea
                }
              >
                <span
                  className={
                    styles.previewLabel
                  }
                >
                  PREVIEW
                </span>

                <div
                  className={
                    styles.previewCard
                  }
                >
                  <div
                    className={
                      styles.cardTop
                    }
                  >
                    <div
                      className={`${styles.cardIcon} ${
                        styles[
                          `icon_${getIconName(
                            form.template
                          )}`
                        ]
                      }`}
                    >
                      <TemplateIcon
                        type={
                          form.template
                        }
                      />
                    </div>

                    {form.badge && (
                      <span
                        className={
                          styles.previewBadge
                        }
                      >
                        {
                          form.badge
                        }
                      </span>
                    )}
                  </div>

                  <span
                    className={
                      styles.cardCategory
                    }
                  >
                    {form.template.toUpperCase()}
                  </span>

                  <h3>
                    {form.judul ||
                      "Judul Informasi"}
                  </h3>

                  {form.template ===
                    "Layanan Pengaduan" && (
                    <>
                      <div
                        className={
                          styles.previewTime
                        }
                      >
                        <strong>
                          {form.hari ||
                            "Hari Operasional"}
                        </strong>

                        <b>
                          {form.jam ||
                            "00.00 - 00.00 WIB"}
                        </b>
                      </div>

                      <div
                        className={
                          styles.previewInfo
                        }
                      >
                        <InfoIcon />

                        <span>
                          {form.isi ||
                            "Keterangan tambahan akan ditampilkan di sini."}
                        </span>
                      </div>
                    </>
                  )}

                  {form.template !==
                    "Layanan Pengaduan" && (
                    <>
                      <p
                        className={
                          styles.previewDescription
                        }
                      >
                        {form.isi ||
                          "Isi informasi akan ditampilkan di sini."}
                      </p>

                      {form.template ===
                        "Bantuan Cepat" && (
                        <div
                          className={
                            styles.previewContact
                          }
                        >
                          <PhoneIcon />

                          <div>
                            <strong>
                              {form.telepon ||
                                "Nomor kontak"}
                            </strong>

                            <span>
                              {form.whatsapp ||
                                "WhatsApp Siaga Sarpras"}
                            </span>

                            {form.jam && (
                              <small>
                                {form.jam}
                              </small>
                            )}
                          </div>
                        </div>
                      )}

                      {(form.template ===
                        "Pengumuman Terjadwal" ||
                        form.template ===
                          "Informasi Penting") &&
                        form.lokasi && (
                          <div
                            className={
                              styles.previewLocation
                            }
                          >
                            <MapPinIcon />
                            {
                              form.lokasi
                            }
                          </div>
                        )}

                      {form.template ===
                        "Informasi Layanan" && (
                        <div
                          className={
                            styles.previewLink
                          }
                        >
                          {form.teksTombol ||
                            "Lihat panduan pelaporan"}{" "}
                          →
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* FORM */}

              <div
                className={
                  styles.formArea
                }
              >
                <div
                  className={
                    styles.selectedTemplate
                  }
                >
                  <span>
                    Template
                  </span>

                  <strong>
                    {
                      form.template
                    }
                  </strong>
                </div>

                <div
                  className={
                    styles.formGrid
                  }
                >
                  <div
                    className={
                      styles.formGroup
                    }
                  >
                    <label>
                      Judul Informasi *
                    </label>

                    <input
                      value={
                        form.judul
                      }
                      placeholder="Contoh: Jam Operasional"
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (
                            previous
                          ) => ({
                            ...previous,
                            judul:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                    />
                  </div>

                  <div
                    className={
                      styles.formGroup
                    }
                  >
                    <label>
                      Status *
                    </label>

                    <select
                      value={
                        form.status
                      }
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (
                            previous
                          ) => ({
                            ...previous,
                            status:
                              event
                                .target
                                .value as Status,
                          })
                        )
                      }
                    >
                      <option value="Aktif">
                        Aktif
                      </option>

                      <option value="Nonaktif">
                        Nonaktif
                      </option>
                    </select>
                  </div>
                </div>

                {/* LAYANAN */}

                {form.template ===
                  "Layanan Pengaduan" && (
                  <>
                    <div
                      className={
                        styles.formGrid
                      }
                    >
                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Hari Operasional *
                        </label>

                        <input
                          value={
                            form.hari
                          }
                          placeholder="Contoh: Senin - Jumat"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                hari:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>

                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Jam Operasional *
                        </label>

                        <input
                          value={
                            form.jam
                          }
                          placeholder="Contoh: 07.00 - 15.00 WIB"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                jam:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>
                    </div>

                    <div
                      className={
                        styles.formGroup
                      }
                    >
                      <label>
                        Keterangan Tambahan
                      </label>

                      <textarea
                        value={
                          form.isi
                        }
                        placeholder="Contoh: Pelaporan mandiri via web tetap dapat dikirim 24 jam."
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,
                              isi:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>
                  </>
                )}

                {/* PENGUMUMAN */}

                {form.template ===
                  "Pengumuman Terjadwal" && (
                  <>
                    <div
                      className={
                        styles.formGroup
                      }
                    >
                      <label>
                        Badge
                      </label>

                      <input
                        value={
                          form.badge
                        }
                        placeholder="Contoh: Minggu Ini"
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,
                              badge:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>

                    <div
                      className={
                        styles.formGroup
                      }
                    >
                      <label>
                        Isi Pengumuman *
                      </label>

                      <textarea
                        value={
                          form.isi
                        }
                        placeholder="Tuliskan pengumuman..."
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,
                              isi:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>

                    <div
                      className={
                        styles.formGrid
                      }
                    >
                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Lokasi
                        </label>

                        <input
                          value={
                            form.lokasi
                          }
                          placeholder="Contoh: Ruang Lab Kimia, Fisika, & RPL"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                lokasi:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>

                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Periode
                        </label>

                        <input
                          value={
                            form.periode
                          }
                          placeholder="Contoh: Minggu ini"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                periode:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* BANTUAN CEPAT */}

                {form.template ===
                  "Bantuan Cepat" && (
                  <>
                    <div
                      className={
                        styles.formGroup
                      }
                    >
                      <label>
                        Isi Informasi *
                      </label>

                      <textarea
                        value={
                          form.isi
                        }
                        placeholder="Tuliskan informasi bantuan..."
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,
                              isi:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>

                    <div
                      className={
                        styles.formGrid
                      }
                    >
                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Nomor Telepon
                        </label>

                        <input
                          value={
                            form.telepon
                          }
                          placeholder="(021) 789-2244 ext. 104"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                telepon:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>

                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          WhatsApp
                        </label>

                        <input
                          value={
                            form.whatsapp
                          }
                          placeholder="WhatsApp Siaga Sarpras"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                whatsapp:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>
                    </div>

                    <div
                      className={
                        styles.formGroup
                      }
                    >
                      <label>
                        Jam Layanan
                      </label>

                      <input
                        value={
                          form.jam
                        }
                        placeholder="Pukul 07.00 - 16.00 WIB"
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,
                              jam:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>
                  </>
                )}

                {/* INFORMASI PENTING */}

                {form.template ===
                  "Informasi Penting" && (
                  <>
                    <div
                      className={
                        styles.formGroup
                      }
                    >
                      <label>
                        Badge
                      </label>

                      <input
                        value={
                          form.badge
                        }
                        placeholder="Contoh: Penting"
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,
                              badge:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>

                    <div
                      className={
                        styles.formGroup
                      }
                    >
                      <label>
                        Isi Informasi *
                      </label>

                      <textarea
                        value={
                          form.isi
                        }
                        placeholder="Tuliskan informasi penting..."
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,
                              isi:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>

                    <div
                      className={
                        styles.formGrid
                      }
                    >
                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Lokasi
                        </label>

                        <input
                          value={
                            form.lokasi
                          }
                          placeholder="Contoh: Aula Utama"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                lokasi:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>

                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Periode
                        </label>

                        <input
                          value={
                            form.periode
                          }
                          placeholder="Contoh: 8 - 12 September 2026"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                periode:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* INFORMASI LAYANAN */}

                {form.template ===
                  "Informasi Layanan" && (
                  <>
                    <div
                      className={
                        styles.formGroup
                      }
                    >
                      <label>
                        Isi Informasi *
                      </label>

                      <textarea
                        value={
                          form.isi
                        }
                        placeholder="Tuliskan informasi layanan..."
                        onChange={(
                          event
                        ) =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,
                              isi:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </div>

                    <div
                      className={
                        styles.formGrid
                      }
                    >
                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Teks Tombol
                        </label>

                        <input
                          value={
                            form.teksTombol
                          }
                          placeholder="Lihat panduan pelaporan"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                teksTombol:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>

                      <div
                        className={
                          styles.formGroup
                        }
                      >
                        <label>
                          Link Tujuan
                        </label>

                        <input
                          value={
                            form.link
                          }
                          placeholder="/form-pelaporan"
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                previous
                              ) => ({
                                ...previous,
                                link:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* URUTAN */}

                <div
                  className={
                    styles.formGroup
                  }
                >
                  <label>
                    Urutan Tampil
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={
                      form.urutan
                    }
                    onChange={(
                      event
                    ) =>
                      setForm(
                        (
                          previous
                        ) => ({
                          ...previous,
                          urutan:
                            Number(
                              event
                                .target
                                .value
                            ),
                        })
                      )
                    }
                  />

                  <small>
                    Menentukan posisi
                    informasi pada Home.
                  </small>
                </div>
              </div>
            </div>

            <div
              className={
                styles.modalFooter
              }
            >
              <button
                type="button"
                className={
                  styles.cancelButton
                }
                onClick={() => {
                  setSelectedTemplate(
                    null
                  );
                  setEditingId(null);
                }}
              >
                Batal
              </button>

              <button
                type="button"
                className={
                  styles.saveButton
                }
                onClick={
                  saveInformation
                }
              >
                {editingId
                  ? "Simpan Perubahan"
                  : "Simpan Informasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
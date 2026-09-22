"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* =========================
   ICONS
========================= */

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function DraftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

/* =========================
   TYPES
========================= */

type Language = "id" | "en";

type BilingualText = {
  id: string;
  en: string;
};

type ReportStatus =
  | "All"
  | "Submitted"
  | "Verified"
  | "Processed"
  | "Completed"
  | "Draft";

type Report = {
  id: string;
  date: string;

  title: BilingualText;
  location: BilingualText;
  description: BilingualText;

  status: ReportStatus;
  image?: string;
};

/* =========================
   DATA
========================= */

const reports: Report[] = [
  {
    id: "LPR-2026-001",
    date: "8 September 2026",

    title: {
      id: "AC Ruang 10",
      en: "Classroom AC – Room 10",
    },

    location: {
      id: "Ruang 10 (Gedung B – Kelas 10 MIPA 2)",
      en: "Room 10 (Building B – Class 10 MIPA 2)",
    },

    description: {
      id: "AC tidak berfungsi dan tidak mengeluarkan udara dingin sejak jam pelajaran pertama. Mengeluarkan dengung pada blower indoor.",
      en: "The AC is not functioning and does not produce cold air since the first class period. The indoor blower makes a buzzing sound.",
    },

    status: "Submitted",
  },

  {
    id: "LPR-2026-002",
    date: "9 September 2026",

    title: {
      id: "Proyektor LCD Epson EB-X400",
      en: "Epson EB-X400 LCD Projector",
    },

    location: {
      id: "Laboratorium Komputer 1 (Lantai 2)",
      en: "Computer Laboratory 1 (2nd Floor)",
    },

    description: {
      id: "Lampu indikator berkedip merah dan proyektor mati mendadak setelah 5 menit pemakaian. Diduga lampu overheat atau filter debu tersumbat.",
      en: "The indicator light blinks red and the projector suddenly shuts down after 5 minutes of use. The lamp may be overheating or the dust filter may be clogged.",
    },

    status: "Submitted",
  },

  {
    id: "LPR-2026-003",
    date: "7 September 2026",

    title: {
      id: "Kran Wastafel & Pipa Saluran",
      en: "Sink Faucet & Drain Pipe",
    },

    location: {
      id: "Toilet Siswa Lantai 2 (Sayap Timur)",
      en: "Student Restroom – 2nd Floor (East Wing)",
    },

    description: {
      id: "Pipa pembuangan wastafel bocor dan air merembes ke lantai selasar sehingga menimbulkan genangan air licin membahayakan siswa.",
      en: "The sink drain pipe is leaking and water is spreading onto the hallway floor, creating a slippery puddle that may endanger students.",
    },

    status: "Submitted",
  },

  {
    id: "LPR-2026-004",
    date: "4 September 2026",

    title: {
      id: "Pintu & Gagang Lemari Alat Olahraga",
      en: "Sports Equipment Cabinet Door & Handle",
    },

    location: {
      id: "Gedung Olahraga / Ruang Senam",
      en: "Sports Hall / Gymnastics Room",
    },

    description: {
      id: "Engsel pintu lemari patah dan gagang kunci lepas saat inventarisasi bola basket mingguan oleh guru PJOK.",
      en: "The cabinet door hinge is broken and the lock handle came off during the weekly basketball equipment inventory conducted by the PE teacher.",
    },

    status: "Completed",
  },

  {
    id: "DRAFT",
    date: "15 September 2026",

    title: {
      id: "Kursi Ruang Kelas 11",
      en: "Classroom Chair – Room 11",
    },

    location: {
      id: "Ruang 11 IPS 1",
      en: "Room 11 IPS 1",
    },

    description: {
      id: "Beberapa bagian kursi terlihat rusak dan perlu diperiksa kembali sebelum laporan dikirim.",
      en: "Several parts of the chair appear to be damaged and need to be checked again before the report is submitted.",
    },

    status: "Draft",
  },
];

const tabs: {
  label: ReportStatus;
  count?: number;
}[] = [
  { label: "All", count: 5 },
  { label: "Submitted", count: 3 },
  { label: "Verified", count: 0 },
  { label: "Processed", count: 0 },
  { label: "Completed", count: 1 },
  { label: "Draft", count: 1 },
];

/* =========================
   PAGE
========================= */

export default function ReportsPage() {
  const locale = useLocale();
  const t = useTranslations("Reports");

  const language: Language =
    locale === "id" ? "id" : "en";

  const [activeTab, setActiveTab] =
    useState<ReportStatus>("All");

  const [search, setSearch] = useState("");

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesTab =
        activeTab === "All" ||
        report.status === activeTab;

      const keyword = search
        .toLowerCase()
        .trim();

      const title =
        report.title[language].toLowerCase();

      const location =
        report.location[language].toLowerCase();

      const matchesSearch =
        report.id
          .toLowerCase()
          .includes(keyword) ||
        title.includes(keyword) ||
        location.includes(keyword);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search, language]);

  function getTabLabel(status: ReportStatus) {
    switch (status) {
      case "All":
        return t("all");

      case "Submitted":
        return t("submitted");

      case "Verified":
        return t("verified");

      case "Processed":
        return t("processed");

      case "Completed":
        return t("completed");

      case "Draft":
        return t("draft");

      default:
        return status;
    }
  }

  return (
    <main className={styles.page}>
      <Navbar />

      <div className={styles.container}>

        {/* =========================
            PAGE HEADER
        ========================= */}

        <section className={styles.pageHeader}>
          <h1>{t("title")}</h1>

          <p>{t("subtitle")}</p>
        </section>

        {/* =========================
            SEARCH
        ========================= */}

        <section className={styles.searchBox}>
          <div className={styles.searchInput}>
            <SearchIcon />

            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <Link
            href={`/${locale}/lapor`}
            className={styles.newReportButton}
          >
            <PlusIcon />
            {t("newReport")}
          </Link>
        </section>

        {/* =========================
            TABS
        ========================= */}

        <section className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`${styles.tab} ${
                activeTab === tab.label
                  ? styles.activeTab
                  : ""
              }`}
              onClick={() =>
                setActiveTab(tab.label)
              }
            >
              <span>
                {getTabLabel(tab.label)}
              </span>

              {tab.count !== undefined && (
                <span
                  className={`${styles.tabCount} ${
                    activeTab === tab.label
                      ? styles.activeTabCount
                      : ""
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </section>

        {/* =========================
            REPORT LIST
        ========================= */}

        <section className={styles.reportList}>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                locale={locale}
                language={language}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <SearchIcon />
              </div>

              <h3>{t("emptyTitle")}</h3>

              <p>{t("emptyDescription")}</p>
            </div>
          )}
        </section>

        {/* =========================
            BOTTOM
        ========================= */}

        {filteredReports.length > 0 && (
          <div className={styles.bottomArea}>
            <p>
              {t("showing")}{" "}
              {filteredReports.length}{" "}
              {t("from")}{" "}
              {reports.length}{" "}
              {t("reports")}
            </p>

            <div className={styles.pagination}>
              <button type="button" disabled>
                {t("previous")}
              </button>

              <button
                type="button"
                className={styles.currentPage}
              >
                1
              </button>

              <button type="button" disabled>
                {t("next")}
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

/* =========================
   REPORT CARD
========================= */

function ReportCard({
  report,
  locale,
  language,
}: {
  report: Report;
  locale: string;
  language: Language;
}) {
  const t = useTranslations("Reports");

  const isDraft =
    report.status === "Draft";

  const isComplete =
    report.status === "Completed";

  const detailUrl = isDraft
    ? `/${locale}/lapor`
    : `/${locale}/laporan/${report.id}`;

  function getStatusLabel(status: ReportStatus) {
    switch (status) {
      case "Submitted":
        return t("submitted");

      case "Verified":
        return t("verified");

      case "Processed":
        return t("processed");

      case "Completed":
        return t("completed");

      case "Draft":
        return t("draft");

      default:
        return status;
    }
  }

  return (
    <article
      className={`${styles.reportCard} ${
        isDraft ? styles.draftCard : ""
      }`}
    >

      {/* =========================
          CARD TOP
      ========================= */}

      <div className={styles.cardTop}>
        <div className={styles.reportMeta}>
          <span
            className={`${styles.reportId} ${
              isDraft ? styles.draftId : ""
            }`}
          >
            {report.id}
          </span>

          <span className={styles.dot}>•</span>

          <span>{report.date}</span>
        </div>

        {isDraft && (
          <span className={styles.draftBadge}>
            <DraftIcon />
            {t("draft")}
          </span>
        )}
      </div>

      {/* =========================
          CARD MAIN
      ========================= */}

      <div className={styles.cardMain}>
        <div className={styles.photoBox}>
          {report.image ? (
            <img
              src={report.image}
              alt={report.title[language]}
            />
          ) : (
            <>
              <ImageIcon />

              <span>{t("photo")}</span>
            </>
          )}
        </div>

        <div className={styles.reportContent}>

          <h2>
            {report.title[language]}
          </h2>

          <div className={styles.location}>
            <LocationIcon />

            <span>
              {report.location[language]}
            </span>
          </div>

          <p>
            {report.description[language]}
          </p>

        </div>
      </div>

      {/* =========================
          CARD BOTTOM
      ========================= */}

      <div className={styles.cardBottom}>
        <div className={styles.progress}>

          <span
            className={`${styles.statusIcon} ${
              isComplete
                ? styles.completeStatus
                : isDraft
                ? styles.draftStatus
                : ""
            }`}
          >
            {isDraft ? (
              <DraftIcon />
            ) : isComplete ? (
              <CheckIcon />
            ) : (
              <ClockIcon />
            )}
          </span>

          <span className={styles.progressLabel}>
            {isDraft
              ? t("status")
              : t("currentProgress")}
          </span>

          <strong
            className={
              isDraft
                ? styles.draftText
                : ""
            }
          >
            {isDraft
              ? t("notSent")
              : getStatusLabel(
                  report.status
                )}
          </strong>

        </div>

        <Link
          href={detailUrl}
          className={`${styles.detailButton} ${
            isDraft
              ? styles.continueButton
              : ""
          }`}
        >
          {isDraft
            ? t("viewDraft")
            : t("viewDetail")}

          <ArrowRightIcon />
        </Link>
      </div>

    </article>
  );
}
"use client";

import {
  ChangeEvent,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  useLocale,
  useTranslations,
} from "next-intl";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import styles from "./page.module.css";

/* =========================
   ICONS
========================= */

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 15v4h14v-4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="m9 7 1-3h4l1 3" />
      <path d="M6 7l1 14h10l1-14" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="2"
      />
      <path d="M9 4.5V3h6v1.5" />
      <path d="M9 10h6M9 14h6M9 18h4" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
      />
      <circle
        cx="9"
        cy="10"
        r="1.5"
      />
      <path d="m5 17 4-4 3 3 2-2 5 4" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M3 5L21 12L3 19V14L14 12L3 10V5Z" />
    </svg>
  );
}

function CheckSmall() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* =========================
   PAGE
========================= */

export default function LaporPage() {
  const locale = useLocale();
  const t = useTranslations("Report");

  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [email, setEmail] = useState("");

  const [lokasi, setLokasi] = useState("");
  const [barang, setBarang] = useState("");

  const [jenis, setJenis] =
    useState("Tidak Berfungsi");

  const [jenisLainnya, setJenisLainnya] =
    useState("");

  const [urgensi, setUrgensi] =
    useState("Sedang");

  const [deskripsi, setDeskripsi] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  /* =========================
     DAMAGE TYPES
  ========================= */

  const damageTypes = [
    {
      value: "Pecah / Patah",
      label: t("broken"),
    },
    {
      value: "Retak / Fisik",
      label: t("cracked"),
    },
    {
      value: "Tidak Berfungsi",
      label: t("notWorking"),
    },
  ];

  /* =========================
     URGENCY
  ========================= */

  const urgencyOptions = [
    {
      value: "Rendah",
      label: t("low"),
      className: "low",
    },
    {
      value: "Sedang",
      label: t("medium"),
      className: "medium",
    },
    {
      value: "Tinggi / Darurat",
      label: t("high"),
      className: "high",
    },
  ];

  /* =========================
     UPLOAD
  ========================= */

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const selected =
      e.target.files?.[0];

    if (!selected) return;

    setFile(selected);

    setPreview(
      URL.createObjectURL(selected)
    );
  };

  const removeFile = () => {
    setFile(null);
    setPreview("");
  };

  /* =========================
     PROGRESS
  ========================= */

  const progress = useMemo(() => {
    const fields = [
      nama,
      telepon,
      email,
      lokasi,
      barang,
      jenis === "Lainnya..."
        ? jenisLainnya
        : jenis,
      urgensi,
      deskripsi,
      file,
    ];

    const filled =
      fields.filter(Boolean).length;

    return Math.round(
      (filled / fields.length) * 100
    );
  }, [
    nama,
    telepon,
    email,
    lokasi,
    barang,
    jenis,
    jenisLainnya,
    urgensi,
    deskripsi,
    file,
  ]);

  return (
    <main className={styles.page}>
      <Navbar />

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className={styles.pageHeader}>
        <h1>{t("title")}</h1>

        <p>{t("subtitle")}</p>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <section className={styles.content}>
        <div className={styles.leftColumn}>

          {/* =========================
              DATA PELAPOR
          ========================= */}

          <div className={styles.formCard}>
            <div className={styles.cardHeader}>

              <div className={styles.cardTitle}>
                <h2>
                  1. {t("reporterData")}
                </h2>
              </div>

              <span className={styles.headerBadge}>
                {t("reporterIdentity")}
              </span>

            </div>

            <div className={styles.formGridThree}>

              <div className={styles.field}>
                <label>
                  {t("reporter")}
                </label>

                <input
                  type="text"
                  placeholder={t(
                    "reporterPlaceholder"
                  )}
                  value={nama}
                  onChange={(e) =>
                    setNama(e.target.value)
                  }
                />
              </div>

              <div className={styles.field}>
                <label>
                  {t("phone")}
                </label>

                <input
                  type="text"
                  placeholder={t(
                    "phonePlaceholder"
                  )}
                  value={telepon}
                  onChange={(e) =>
                    setTelepon(e.target.value)
                  }
                />
              </div>

              <div className={styles.field}>
                <label>
                  {t("email")}
                </label>

                <input
                  type="email"
                  placeholder={t(
                    "emailPlaceholder"
                  )}
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

            </div>
          </div>

          {/* =========================
              DETAIL KERUSAKAN
          ========================= */}

          <div className={styles.formCard}>

            <div className={styles.cardHeader}>

              <div className={styles.cardTitle}>
                <h2>
                  2. {t("damageDetail")}
                </h2>
              </div>

              <span className={styles.required}>
                {t("required")}
              </span>

            </div>

            <div className={styles.formGridTwo}>

              <div className={styles.field}>
                <label>
                  {t("location")}
                </label>

                <input
                  type="text"
                  placeholder={t(
                    "locationPlaceholder"
                  )}
                  value={lokasi}
                  onChange={(e) =>
                    setLokasi(e.target.value)
                  }
                />
              </div>

              <div className={styles.field}>
                <label>
                  {t("damagedItem")}
                </label>

                <input
                  type="text"
                  placeholder={t(
                    "damagedItemPlaceholder"
                  )}
                  value={barang}
                  onChange={(e) =>
                    setBarang(e.target.value)
                  }
                />
              </div>

            </div>

            {/* JENIS KERUSAKAN */}

            <div className={styles.optionSection}>

              <label>
                {t("damageType")}
              </label>

              <div className={styles.damageOptions}>

                {damageTypes.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={
                      jenis === item.value
                        ? styles.optionActive
                        : styles.option
                    }
                    onClick={() => {
                      setJenis(item.value);
                      setJenisLainnya("");
                    }}
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  type="button"
                  className={
                    jenis === "Lainnya..."
                      ? styles.optionActive
                      : styles.option
                  }
                  onClick={() =>
                    setJenis("Lainnya...")
                  }
                >
                  {t("other")}
                </button>

              </div>

              {jenis === "Lainnya..." && (
                <div
                  className={
                    styles.otherDamageField
                  }
                >
                  <input
                    type="text"
                    placeholder={t(
                      "otherPlaceholder"
                    )}
                    value={jenisLainnya}
                    onChange={(e) =>
                      setJenisLainnya(
                        e.target.value
                      )
                    }
                    autoFocus
                  />
                </div>
              )}

            </div>

            {/* URGENSI */}

            <div className={styles.optionSection}>

              <div className={styles.urgencyHeader}>

                <label>
                  {t("urgency")}
                </label>

                <span>
                  {t("urgencyHelper")}
                </span>

              </div>

              <div className={styles.urgencyOptions}>

                {urgencyOptions.map(
                  (item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={
                        urgensi === item.value
                          ? `${styles.urgencyOption} ${styles.urgencySelected}`
                          : styles.urgencyOption
                      }
                      onClick={() =>
                        setUrgensi(
                          item.value
                        )
                      }
                    >

                      <span
                        className={
                          item.className ===
                          "low"
                            ? styles.lowText
                            : item.className ===
                              "medium"
                            ? styles.mediumText
                            : styles.highText
                        }
                      >
                        {item.label}
                      </span>

                      <span
                        className={
                          urgensi ===
                          item.value
                            ? styles.radioSelected
                            : styles.radio
                        }
                      />

                    </button>
                  )
                )}

              </div>

            </div>

            {/* DESKRIPSI */}

            <div className={styles.field}>

              <div
                className={
                  styles.descriptionHeader
                }
              >

                <label>
                  {t("description")}
                </label>

                <span>
                  {deskripsi.length} / 300{" "}
                  {t("characterCount")}
                </span>

              </div>

              <textarea
                maxLength={300}
                placeholder={t(
                  "descriptionPlaceholder"
                )}
                value={deskripsi}
                onChange={(e) =>
                  setDeskripsi(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* =========================
              FOTO
          ========================= */}

          <div className={styles.formCard}>

            <div className={styles.cardHeader}>

              <div className={styles.cardTitle}>
                <h2>
                  3. {t("photoEvidence")}
                </h2>
              </div>

              <span className={styles.headerBadge}>
                {t("maxSize")}
              </span>

            </div>

            {!file ? (

              <label className={styles.uploadBox}>

                <div className={styles.uploadIcon}>
                  <UploadIcon />
                </div>

                <div className={styles.uploadText}>

                  <strong>
                    {t("uploadTitle")}
                  </strong>

                  <span>
                    {t("uploadDescription")}
                  </span>

                </div>

                <span
                  className={
                    styles.chooseFile
                  }
                >
                  {t("chooseFile")}
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleFile}
                  hidden
                />

              </label>

            ) : (

              <div className={styles.filePreview}>

                <div className={styles.fileLeft}>

                  <img
                    src={preview}
                    alt={t("photoEvidence")}
                  />

                  <div>

                    <strong>
                      {file.name}
                    </strong>

                    <span>
                      {(
                        file.size /
                        1024 /
                        1024
                      ).toFixed(1)}
                      MB •{" "}
                      {t("readyUpload")}
                    </span>

                  </div>

                </div>

                <button
                  type="button"
                  className={
                    styles.deleteButton
                  }
                  onClick={removeFile}
                  aria-label={t(
                    "deletePhoto"
                  )}
                >
                  <TrashIcon />
                </button>

              </div>

            )}

          </div>

          {/* =========================
              ACTIONS
          ========================= */}

          <div className={styles.actions}>

            <Link
              href={`/${locale}`}
              className={
                styles.cancelButton
              }
            >
              {t("cancelBack")}
            </Link>

            <div
              className={
                styles.actionRight
              }
            >

              <button
                type="button"
                className={
                  styles.draftButton
                }
              >
                {t("saveDraft")}
              </button>

              <button
                type="button"
                className={
                  styles.submitButton
                }
              >
                {t("submit")}

                <SendIcon />
              </button>

            </div>

          </div>

        </div>

        {/* =========================
            RIGHT COLUMN
        ========================= */}

        <aside
          className={styles.rightColumn}
        >

          {/* SUMMARY */}

          <div className={styles.summaryCard}>

            <div
              className={
                styles.summaryHeader
              }
            >

              <div
                className={
                  styles.summaryTitle
                }
              >
                <ClipboardIcon />

                <h2>
                  {t("summary")}
                </h2>
              </div>

              <span
                className={
                  styles.readyBadge
                }
              >
                {progress === 100
                  ? t("readyToSend")
                  : t("incomplete")}
              </span>

            </div>

            <div
              className={
                styles.summaryList
              }
            >

              <SummaryRow
                label={t("reporter")}
                value={nama || "–"}
              />

              <SummaryRow
                label={t("phoneSummary")}
                value={telepon || "–"}
              />

              <SummaryRow
                label={t("email")}
                value={email || "–"}
              />

              <SummaryRow
                label={t("locationSummary")}
                value={lokasi || "–"}
              />

              <SummaryRow
                label={t("itemSummary")}
                value={barang || "–"}
              />

              <SummaryRow
                label={t("typeSummary")}
                value={
                  jenis === "Lainnya..."
                    ? jenisLainnya ||
                      t("other")
                    : jenis ===
                      "Pecah / Patah"
                    ? t("broken")
                    : jenis ===
                      "Retak / Fisik"
                    ? t("cracked")
                    : t("notWorking")
                }
                badge
              />

              <SummaryRow
                label={t("urgencySummary")}
                value={
                  urgensi === "Rendah"
                    ? t("low")
                    : urgensi === "Sedang"
                    ? t("medium")
                    : t("high")
                }
                urgency
                urgencyType={urgensi}
              />

              <SummaryRow
                label={t("description")}
                value={deskripsi || "–"}
              />

              <SummaryRow
                label={t("photoSummary")}
                value={
                  file
                    ? t("photoAttached")
                    : t("noPhoto")
                }
                image
              />

            </div>

            <div
              className={
                styles.completeness
              }
            >

              <div
                className={
                  styles.completenessHeader
                }
              >

                <span>
                  {t("formCompleteness")}
                </span>

                <strong>
                  {progress}%
                </strong>

              </div>

              <div
                className={
                  styles.progressTrack
                }
              >
                <div
                  className={
                    styles.progressBar
                  }
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

            </div>

          </div>

          {/* GUIDE */}

          <div
            className={
              styles.guideCard
            }
          >

            <div
              className={
                styles.guideTitle
              }
            >
              <ClipboardIcon />

              <strong>
                {t("guide")}
              </strong>
            </div>

            <GuideItem>
              {t("guideReporter")}
            </GuideItem>

            <GuideItem>
              {t("guideLocation")}
            </GuideItem>

            <GuideItem>
              {t("guideDamage")}
            </GuideItem>

            <GuideItem>
              {t("guideUrgency")}
            </GuideItem>

          </div>

        </aside>

      </section>

      <Footer />
    </main>
  );
}

/* =========================
   SUMMARY ROW
========================= */

function SummaryRow({
  label,
  value,
  badge,
  urgency,
  image,
  urgencyType,
}: {
  label: string;
  value: string;
  badge?: boolean;
  urgency?: boolean;
  image?: boolean;
  urgencyType?: string;
}) {
  return (
    <div className={styles.summaryRow}>

      <span
        className={
          styles.summaryLabel
        }
      >
        {label}
      </span>

      {badge ? (

        <span
          className={
            styles.summaryTypeBadge
          }
        >
          {value}
        </span>

      ) : urgency ? (

        <span
          className={`${styles.summaryUrgency} ${
            urgencyType === "Rendah"
              ? styles.summaryUrgencyLow
              : urgencyType ===
                "Tinggi / Darurat"
              ? styles.summaryUrgencyHigh
              : styles.summaryUrgencyMedium
          }`}
        >
          {value}
        </span>

      ) : image ? (

        <span
          className={
            styles.summaryImageValue
          }
        >
          <ImageIcon />

          {value}
        </span>

      ) : (

        <strong
          className={
            styles.summaryValue
          }
        >
          {value}
        </strong>

      )}

    </div>
  );
}

/* =========================
   GUIDE ITEM
========================= */

function GuideItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        styles.guideItem
      }
    >

      <span
        className={
          styles.guideCheck
        }
      >
        <CheckSmall />
      </span>

      <p>{children}</p>

    </div>
  );
}
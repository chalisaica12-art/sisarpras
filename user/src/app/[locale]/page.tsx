"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  useLocale,
  useTranslations,
} from "next-intl";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styles from "../page.module.css";

/* =========================
   ICONS
========================= */

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.3 4.8 3.4 17a2 2 0 0 0 1.8 3h13.6a2 2 0 0 0 1.8-3L13.7 4.8a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <circle cx="12" cy="16.5" r=".7" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <circle cx="12" cy="7" r=".7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 12 4 4 8-9" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12 2.6 2.6L16 9" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 3.5h7l4 4v13h-11z" />
      <path d="M13.5 3.5v4h4" />
      <path d="M9 12h5.5" />
      <path d="M9 16h5.5" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m14.2 5.2 4.6 4.6" />
      <path d="M17.3 3.7a3.6 3.6 0 0 0 .2 4.8l-8.8 8.8a2.1 2.1 0 0 0 3 3l8.8-8.8a3.6 3.6 0 0 0 0-4.8l-2 2-2.9-2.9z" />
      <path d="m5.2 5.1 3.5 3.5" />
      <path d="m8.7 5.1-3.6 3.6" />
      <path d="M5.2 5.1 3.8 3.7" />
      <path d="m8.7 8.6 1.4 1.4" />
    </svg>
  );
}

function VerifyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="6"
        y="4.5"
        width="12"
        height="16"
        rx="2"
      />
      <path d="M9 4.5V3.5h6v1" />
      <path d="M9 9h5" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  );
}


const TEMPLATE_FROM_DB: Record<string, string> = {
  layanan_pengaduan: "Layanan Pengaduan",
  pengumuman_terjadwal: "Pengumuman Terjadwal",
  bantuan_cepat: "Bantuan Cepat",
  informasi_penting: "Informasi Penting",
  informasi_layanan: "Informasi Layanan",
};

/* =========================
   HERO DATA
========================= */

const heroImages = [
  "/foto1.jpeg",
  "/foto2.jpeg",
  "/foto3.jpeg",
];

type Information = {
  id: number;
  template: string;
  judul: string;
  badge?: string | null;
  isi?: string | null;
  hari?: string | null;
  jam?: string | null;
  lokasi?: string | null;
  periode?: string | null;
  telepon?: string | null;
  whatsapp?: string | null;
  teksTombol?: string | null;
  link?: string | null;
};

/* =========================
   HOME
========================= */

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("Home");

  const [heroIndex, setHeroIndex] = useState(0);
  const [infoIndex, setInfoIndex] = useState(0);
  const [information, setInformation] = useState<Information[]>([]);

  /* =========================
     HERO AUTO SLIDE
  ========================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(
        (current) =>
          (current + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  /* =========================
     LOAD INFORMATION FROM SUPABASE
  ========================= */

  useEffect(() => {
    async function loadInformation() {
      // Ambil semua data terlebih dahulu, lalu filter status di sisi user.
      // Ini dibuat fleksibel untuk database yang menyimpan status sebagai
      // "aktif"/"nonaktif" maupun "Aktif"/"Nonaktif".
      const { data: allMainData, error: mainError } = await supabase
        .from("informasi")
        .select("*")
        .order("urutan_tampil", { ascending: true })
        .order("created_at", { ascending: false });

      if (mainError) {
        console.error("Gagal mengambil informasi:", {
          message: mainError.message,
          details: mainError.details,
          hint: mainError.hint,
          code: mainError.code,
        });

        // Jangan pertahankan data lama jika Supabase gagal.
        setInformation([]);
        setInfoIndex(0);
        return;
      }

      // HANYA informasi aktif yang boleh tampil di Home user.
      const mainData = (allMainData ?? []).filter((item: any) => {
        const status = String(item.status ?? "")
          .trim()
          .toLowerCase();

        return status === "aktif";
      });

      if (mainData.length === 0) {
        setInformation([]);
        setInfoIndex(0);
        return;
      }

      const activeIds = mainData.map((item: any) => item.id);

      const [
        layananPengaduan,
        pengumuman,
        bantuanCepat,
        informasiPenting,
        layanan,
      ] = await Promise.all([
        supabase.from("informasi_layanan_pengaduan").select("*").in("informasi_id", activeIds),
        supabase.from("informasi_pengumuman_terjadwal").select("*").in("informasi_id", activeIds),
        supabase.from("informasi_bantuan_cepat").select("*").in("informasi_id", activeIds),
        supabase.from("informasi_penting_detail").select("*").in("informasi_id", activeIds),
        supabase.from("informasi_layanan").select("*").in("informasi_id", activeIds),
      ]);

      const detailErrors = [
        layananPengaduan.error,
        pengumuman.error,
        bantuanCepat.error,
        informasiPenting.error,
        layanan.error,
      ].filter(Boolean);

      if (detailErrors.length > 0) {
        console.error(
          "Gagal mengambil detail informasi:",
          detailErrors.map((error: any) => ({
            message: error?.message,
            details: error?.details,
            hint: error?.hint,
            code: error?.code,
          }))
        );
      }

      // Setiap template mengambil detail dari tabelnya sendiri.
      // Jangan digabung menjadi satu Map karena satu informasi_id
      // bisa memiliki bentuk detail yang berbeda.
      const layananMap = new Map(
        (layananPengaduan.data ?? []).map((item: any) => [item.informasi_id, item])
      );
      const pengumumanMap = new Map(
        (pengumuman.data ?? []).map((item: any) => [item.informasi_id, item])
      );
      const bantuanMap = new Map(
        (bantuanCepat.data ?? []).map((item: any) => [item.informasi_id, item])
      );
      const pentingMap = new Map(
        (informasiPenting.data ?? []).map((item: any) => [item.informasi_id, item])
      );
      const layananUmumMap = new Map(
        (layanan.data ?? []).map((item: any) => [item.informasi_id, item])
      );

      const merged: Information[] = mainData.map((item) => {
        const template = TEMPLATE_FROM_DB[String(item.template)] ?? String(item.template);
        const detail =
          template === "Layanan Pengaduan"
            ? layananMap.get(item.id)
            : template === "Pengumuman Terjadwal"
              ? pengumumanMap.get(item.id)
              : template === "Bantuan Cepat"
                ? bantuanMap.get(item.id)
                : template === "Informasi Penting"
                  ? pentingMap.get(item.id)
                  : layananUmumMap.get(item.id);

        return {
          id: item.id,
          template,
          judul: item.judul,
          badge: detail?.badge ?? null,
          isi:
            template === "Layanan Pengaduan"
              ? detail?.keterangan_tambahan ?? null
              : template === "Pengumuman Terjadwal"
                ? detail?.isi_pengumuman ?? null
                : detail?.isi_informasi ?? null,
          hari: detail?.hari_operasional ?? null,
          jam:
            template === "Layanan Pengaduan"
              ? detail?.jam_operasional ?? null
              : template === "Bantuan Cepat"
                ? detail?.jam_layanan ?? null
                : null,
          lokasi: detail?.lokasi ?? null,
          periode: detail?.periode ?? null,
          telepon: detail?.nomor_telepon ?? null,
          whatsapp: detail?.whatsapp ?? null,
          teksTombol: detail?.teks_tombol ?? null,
          link: detail?.link_tujuan ?? null,
        };
      });

      setInformation(merged);
      setInfoIndex(0);
    }

    loadInformation();

    const channel = supabase
      .channel("home-informasi-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "informasi" },
        () => loadInformation()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "informasi_layanan_pengaduan" },
        () => loadInformation()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "informasi_pengumuman_terjadwal" },
        () => loadInformation()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "informasi_bantuan_cepat" },
        () => loadInformation()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "informasi_penting_detail" },
        () => loadInformation()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "informasi_layanan" },
        () => loadInformation()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* =========================
     HERO CONTROL
  ========================= */

  function nextHero() {
    setHeroIndex(
      (current) =>
        (current + 1) % heroImages.length
    );
  }

  function previousHero() {
    setHeroIndex(
      (current) =>
        (current - 1 + heroImages.length) %
        heroImages.length
    );
  }

  /* =========================
     INFORMATION CONTROL
  ========================= */

  function nextInfo() {
    if (information.length <= 4) return;

    setInfoIndex((current) => {
      const maxIndex = information.length - 4;
      return Math.min(current + 1, maxIndex);
    });
  }

  function previousInfo() {
    setInfoIndex((current) => Math.max(current - 1, 0));
  }

  return (
    <main className={styles.page}>

      {/* =========================
          GLOBAL NAVBAR
      ========================= */}

      <Navbar />

      {/* =========================
          HERO
      ========================= */}

      <section className={styles.hero}>

        <div className={styles.heroContent}>

          <div className={styles.heroText}>

            <div className={styles.crumb}>

              <strong>SISARPRAS</strong>

              <span>•</span>

              <span>
                {t("crumb")}
              </span>

            </div>

            <h1>
              {t("heroTitle1")}
              <br />
              {t("heroTitle2")}
            </h1>

            <p>
              {t("heroDescription")}
            </p>

            <div className={styles.heroButtons}>

              <Link
                href={`/${locale}/lapor`}
                className={styles.primaryButton}
              >
                {t("reportButton")}
              </Link>

              <Link
                href={`/${locale}/laporan`}
                className={styles.secondaryButton}
              >
                {t("checkReportButton")}
              </Link>

            </div>

          </div>

          {/* HERO IMAGE */}

          <div className={styles.heroVisual}>

            <div className={styles.heroImageBox}>

              <div
                className={styles.heroTrack}
                style={{
                  transform:
                    `translateX(-${heroIndex * 100}%)`,
                }}
              >

                {heroImages.map(
                  (image, index) => (
                    <a
                      href={image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        styles.heroImageLink
                      }
                      key={image}
                      aria-label={
                        `${t("choosePhoto")} ${index + 1}`
                      }
                    >

                      <img
                        src={image}
                        alt={
                          `${t("choosePhoto")} ${index + 1}`
                        }
                        className={
                          styles.heroImage
                        }
                        draggable={false}
                      />

                    </a>
                  )
                )}

              </div>

              <button
                type="button"
                className={`${styles.heroArrow} ${styles.heroArrowLeft}`}
                onClick={previousHero}
                aria-label={
                  t("previousPhoto")
                }
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                className={`${styles.heroArrow} ${styles.heroArrowRight}`}
                onClick={nextHero}
                aria-label={
                  t("nextPhoto")
                }
              >
                <ChevronRight />
              </button>

            </div>

            <div className={styles.heroDots}>

              {heroImages.map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setHeroIndex(index)
                    }
                    aria-label={
                      `${t("choosePhoto")} ${index + 1}`
                    }
                    className={
                      index === heroIndex
                        ? styles.dotActive
                        : ""
                    }
                  />
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          INFORMASI TERKINI
      ========================= */}

      <section
        className={
          styles.informationSection
        }
      >

        <div className={styles.infoHeader}>

          <div>

            <div className={styles.infoTitle}>

              <InfoIcon />

              <h2>
                {t("informationTitle")}
              </h2>

            </div>

            <p>
              {t("informationDescription")}
            </p>

          </div>

        </div>

        {/* CAROUSEL */}

        <div className={styles.infoCarousel}>

          <button
            type="button"
            className={styles.carouselArrow}
            onClick={previousInfo}
            disabled={infoIndex === 0}
            aria-label={
              t("previousInformation")
            }
          >
            <ChevronLeft />
          </button>

          <div className={styles.infoCards}>

            {information.length === 0 ? (
              <div className={styles.infoEmpty}>
                Belum ada informasi aktif.
              </div>
            ) : (
              information
                .slice(infoIndex, infoIndex + 4)
                .map((item) => (
                  <article
                    key={item.id}
                    className={styles.infoCard}
                  >
                    <div className={styles.cardTop}>
                      <div
                        className={`${styles.iconBox} ${
                          item.template === "Informasi Penting"
                            ? styles.orange
                            : styles.blue
                        }`}
                      >
                        {item.template === "Informasi Penting" ? (
                          <AlertIcon />
                        ) : (
                          <InfoIcon />
                        )}
                      </div>

                      <span
                        className={`${styles.badge} ${styles.activeBadge}`}
                      >
                        {item.badge || "Aktif"}
                      </span>
                    </div>

                    <span className={styles.cardType}>
                      {item.template}
                    </span>

                    <h3>{item.judul}</h3>

                    {item.template === "Layanan Pengaduan" && (
                      <>
                        {(item.hari || item.jam) && (
                          <div className={styles.timeBox}>
                            <span>{item.hari || "Jam layanan"}</span>
                            <strong>{item.jam || "-"}</strong>
                          </div>
                        )}

                        {item.isi && (
                          <div className={styles.cardDescription}>
                            {item.isi}
                          </div>
                        )}
                      </>
                    )}

                    {item.template === "Pengumuman Terjadwal" && (
                      <>
                        {item.isi && (
                          <div className={styles.cardDescription}>
                            {item.isi}
                          </div>
                        )}

                        {item.lokasi && (
                          <div className={styles.cardInfo}>
                            <InfoIcon />
                            <span>{item.lokasi}</span>
                          </div>
                        )}

                        {item.periode && (
                          <div className={styles.cardInfo}>
                            <InfoIcon />
                            <span>{item.periode}</span>
                          </div>
                        )}
                      </>
                    )}

                    {item.template === "Bantuan Cepat" && (
                      <>
                        {item.isi && (
                          <div className={styles.cardDescription}>
                            {item.isi}
                          </div>
                        )}

                        {item.telepon && (
                          <div className={styles.cardInfo}>
                            <InfoIcon />
                            <span>{item.telepon}</span>
                          </div>
                        )}

                        {item.whatsapp && (
                          <div className={styles.cardInfo}>
                            <InfoIcon />
                            <span>{item.whatsapp}</span>
                          </div>
                        )}

                        {item.jam && (
                          <div className={styles.cardInfo}>
                            <ClockIcon />
                            <span>{item.jam}</span>
                          </div>
                        )}
                      </>
                    )}

                    {item.template === "Informasi Penting" && (
                      <>
                        {item.isi && (
                          <div className={styles.cardDescription}>
                            {item.isi}
                          </div>
                        )}

                        {item.lokasi && (
                          <div className={styles.cardInfo}>
                            <InfoIcon />
                            <span>{item.lokasi}</span>
                          </div>
                        )}

                        {item.periode && (
                          <div className={styles.cardInfo}>
                            <InfoIcon />
                            <span>{item.periode}</span>
                          </div>
                        )}
                      </>
                    )}

                    {item.template === "Informasi Layanan" && (
                      <>
                        {item.isi && (
                          <div className={styles.cardDescription}>
                            {item.isi}
                          </div>
                        )}

                        {item.teksTombol && (
                          <Link
                            href={item.link || `/${locale}/lapor`}
                            className={styles.cardInfo}
                          >
                            <span>{item.teksTombol} →</span>
                          </Link>
                        )}
                      </>
                    )}
                  </article>
                ))
            )}

          </div>

          <button
            type="button"
            className={styles.carouselArrow}
            onClick={nextInfo}
            disabled={infoIndex >= Math.max(information.length - 4, 0)}
            aria-label={
              t("nextInformation")
            }
          >
            <ChevronRight />
          </button>

        </div>



      </section>

      {/* =========================
          BOTTOM CONTENT
      ========================= */}

      <section
        className={styles.bottomSection}
      >

        {/* GUIDE */}

        <div className={styles.guideCard}>

          <div
            className={styles.sectionBadge}
          >
            <FileIcon />

            {t("reportingGuide")}
          </div>

          <h2>
            {t("guideTitle")}
          </h2>

          <p>
            {t("guideDescription")}
          </p>

          <div className={styles.guideList}>

            {/* GUIDE 1 */}

            <div>

              <span className={styles.check}>
                <CheckIcon />
              </span>

              <div>

                <strong>
                  {t("fillReporterData")}
                </strong>

                <p>
                  {t("fillReporterDescription")}
                </p>

              </div>

            </div>

            {/* GUIDE 2 */}

            <div>

              <span className={styles.check}>
                <CheckIcon />
              </span>

              <div>

                <strong>
                  {t("determineLocation")}
                </strong>

                <p>
                  {t("determineLocationDescription")}
                </p>

              </div>

            </div>

            {/* GUIDE 3 */}

            <div>

              <span className={styles.check}>
                <CheckIcon />
              </span>

              <div>

                <strong>
                  {t("explainDamage")}
                </strong>

                <p>
                  {t("explainDamageDescription")}
                </p>

              </div>

            </div>

            {/* GUIDE 4 */}

            <div>

              <span className={styles.check}>
                <CheckIcon />
              </span>

              <div>

                <strong>
                  {t("determineUrgency")}
                </strong>

                <p>
                  {t("determineUrgencyDescription")}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* PROCESS */}

        <div className={styles.processCard}>

          <div
            className={styles.sectionBadgeDark}
          >
            <ToolsIcon />

            {t("handlingProcess")}
          </div>

          <h2>
            {t("fourEasySteps")}
          </h2>

          <p>
            {t("processDescription")}
          </p>

          <div className={styles.processGrid}>

            {/* 01 */}

            <div className={styles.processItem}>

              <span className={styles.number}>
                01
              </span>

              <FileIcon />

              <h3>
                {t("report")}
              </h3>

              <p>
                {t("reportDescription")}
              </p>

            </div>

            {/* 02 */}

            <div className={styles.processItem}>

              <span className={styles.number}>
                02
              </span>

              <VerifyIcon />

              <h3>
                {t("verified")}
              </h3>

              <p>
                {t("verifiedDescription")}
              </p>

            </div>

            {/* 03 */}

            <div className={styles.processItem}>

              <span className={styles.number}>
                03
              </span>

              <ToolsIcon />

              <h3>
                {t("processed")}
              </h3>

              <p>
                {t("processedDescription")}
              </p>

            </div>

            {/* 04 */}

            <div className={styles.processItem}>

              <span className={styles.number}>
                04
              </span>

              <CheckCircleIcon />

              <h3>
                {t("completed")}
              </h3>

              <p>
                {t("completedDescription")}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          GLOBAL FOOTER
      ========================= */}

      <Footer />

    </main>
  );
}
"use client";

import { useState } from "react";
import styles from "./page.module.css";

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

/* =========================
   ICON BARANG
========================= */

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

/* =========================
   ICON CHECK
========================= */

function CheckIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </Icon>
  );
}

/* =========================
   ICON WARNING
========================= */

function WarningIcon() {
  return (
    <Icon>
      <path d="M10.3 3.8 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </Icon>
  );
}

/* =========================
   ICON ALERT
========================= */

function AlertIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6" />
      <path d="m15 9-6 6" />
    </Icon>
  );
}

/* =========================
   ICON BELL
========================= */

function BellIcon() {
  return (
    <Icon>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </Icon>
  );
}

/* =========================
   ICON CHEVRON
========================= */

function ChevronIcon({
  direction = "down",
}: {
  direction?: "down" | "left" | "right";
}) {
  return (
    <Icon size={16}>
      {direction === "down" && (
        <path d="m6 9 6 6 6-6" />
      )}

      {direction === "left" && (
        <path d="m15 18-6-6 6-6" />
      )}

      {direction === "right" && (
        <path d="m9 18 6-6-6-6" />
      )}
    </Icon>
  );
}

/* =========================
   DATA REKAP BULANAN
========================= */

const monthlyData = [
  {
    period: "Jan - Jun 2026",
    months: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    values: [5, 9, 4, 12, 10, 16],
  },
  {
    period: "Jul - Des 2026",
    months: ["Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    values: [8, 14, 11, 17, 13, 15],
  },
  {
    period: "Jan - Jun 2027",
    months: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    values: [7, 10, 8, 14, 12, 18],
  },
];

/* =========================
   DASHBOARD
========================= */

export default function DashboardPage() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("Indonesia");

  const [reportPage, setReportPage] = useState(0);

  const currentReport = monthlyData[reportPage];

  const maxValue = 20;

  /*
    Membuat titik grafik secara otomatis
    berdasarkan data bulan yang sedang aktif.
  */
  const chartWidth = 600;
  const chartHeight = 220;

  const horizontalPadding = 8;

  const usableWidth =
    chartWidth - horizontalPadding * 2;

  const usableHeight = 190;

  const points = currentReport.values.map(
    (value, index) => {
      const x =
        horizontalPadding +
        (index /
          (currentReport.values.length - 1)) *
          usableWidth;

      const y =
        usableHeight -
        (value / maxValue) * usableHeight +
        5;

      return {
        x,
        y,
      };
    }
  );

  const polylinePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <div className={styles.dashboard}>

      {/* =========================
          HEADER AREA
      ========================= */}

      <section className={styles.topArea}>
        <header className={styles.header}>

          <div className={styles.headerText}>
            <h1>Dasbor</h1>

            <p className={styles.subtitle}>
              Ringkasan kondisi sarana dan prasarana sekolah
            </p>
          </div>

          <div className={styles.headerRight}>

            {/* NOTIFIKASI */}

            <button
              type="button"
              className={styles.notificationButton}
              aria-label="Notifikasi"
            >
              <BellIcon />

              <span className={styles.notificationDot}>
                5
              </span>
            </button>

            {/* BAHASA */}

            <div className={styles.languageWrapper}>
              <button
                type="button"
                className={`${styles.languageButton} ${
                  languageOpen
                    ? styles.languageButtonActive
                    : ""
                }`}
                onClick={() =>
                  setLanguageOpen((prev) => !prev)
                }
              >
                <span className={styles.languageText}>
                  Bahasa
                </span>

                <ChevronIcon />
              </button>

              {languageOpen && (
                <div className={styles.languageDropdown}>

                  <button
                    type="button"
                    className={styles.languageOption}
                    onClick={() => {
                      setLanguage("Indonesia");
                      setLanguageOpen(false);
                    }}
                  >
                    <span>Indonesia</span>

                    {language === "Indonesia" && (
                      <strong>✓</strong>
                    )}
                  </button>

                  <button
                    type="button"
                    className={styles.languageOption}
                    onClick={() => {
                      setLanguage("English");
                      setLanguageOpen(false);
                    }}
                  >
                    <span>English</span>

                    {language === "English" && (
                      <strong>✓</strong>
                    )}
                  </button>

                </div>
              )}
            </div>
          </div>
        </header>
      </section>

      {/* =========================
          STATISTIC CARDS
      ========================= */}

      <section className={styles.statsGrid}>

        <div
          className={`${styles.statCard} ${styles.blueCard}`}
        >
          <div className={styles.statTop}>
            <span className={styles.statLabel}>
              Total Barang
            </span>

            <div
              className={`${styles.statIcon} ${styles.blueIcon}`}
            >
              <BoxIcon />
            </div>
          </div>

          <h2>425</h2>

          <p className={styles.statInfo}>
            Total seluruh sarana yang tercatat
          </p>
        </div>

        <div
          className={`${styles.statCard} ${styles.greenCard}`}
        >
          <div className={styles.statTop}>
            <span className={styles.statLabel}>
              Kondisi Baik
            </span>

            <div
              className={`${styles.statIcon} ${styles.greenIcon}`}
            >
              <CheckIcon />
            </div>
          </div>

          <h2>425</h2>

          <p className={styles.statInfo}>
            100% dari total barang
          </p>
        </div>

        <div
          className={`${styles.statCard} ${styles.yellowCard}`}
        >
          <div className={styles.statTop}>
            <span className={styles.statLabel}>
              Rusak Ringan
            </span>

            <div
              className={`${styles.statIcon} ${styles.yellowIcon}`}
            >
              <WarningIcon />
            </div>
          </div>

          <h2>0</h2>

          <p className={styles.statInfo}>
            Perlu pemeliharaan berkala
          </p>
        </div>

        <div
          className={`${styles.statCard} ${styles.redCard}`}
        >
          <div className={styles.statTop}>
            <span className={styles.statLabel}>
              Rusak Berat
            </span>

            <div
              className={`${styles.statIcon} ${styles.redIcon}`}
            >
              <AlertIcon />
            </div>
          </div>

          <h2>0</h2>

          <p className={styles.statInfo}>
            Perlu penanganan lebih lanjut
          </p>
        </div>

      </section>

      {/* =========================
          GRAFIK BARIS 1
      ========================= */}

      <section className={styles.chartGrid}>

        {/* KONDISI */}

        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>
              Grafik Barang Berdasarkan Kondisi
            </h3>
          </div>

          <div className={styles.donutArea}>

            <div
              className={styles.donut}
              style={{
                background:
                  "conic-gradient(#20bd69 0deg 360deg)",
              }}
            >
              <div className={styles.donutInner}>
                <strong>425</strong>
                <span>Barang</span>
              </div>
            </div>

            <div className={styles.legend}>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.greenDot}`}
                />
                <span>Baik</span>
                <strong>100%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.yellowDot}`}
                />
                <span>Rusak Ringan</span>
                <strong>0%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.redDot}`}
                />
                <span>Rusak Berat</span>
                <strong>0%</strong>
              </div>

            </div>
          </div>
        </div>

        {/* PEROLEHAN */}

        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>
              Grafik Jumlah Barang Berdasarkan Perolehan
            </h3>
          </div>

          <div className={styles.donutArea}>

            <div
              className={styles.donut}
              style={{
                background:
                  "conic-gradient(#2878e8 0deg 90deg, #20a565 90deg 180deg, #f2c313 180deg 252deg, #ef4444 252deg 306deg, #8b5cf6 306deg 360deg)",
              }}
            >
              <div className={styles.donutInner}>
                <strong>425</strong>
                <span>Barang</span>
              </div>
            </div>

            <div className={styles.legend}>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.blueDot}`}
                />
                <span>BOS</span>
                <strong>25%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.greenDot}`}
                />
                <span>BPOPP</span>
                <strong>25%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.yellowDot}`}
                />
                <span>BLUD</span>
                <strong>20%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.redDot}`}
                />
                <span>CSR</span>
                <strong>15%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.purpleDot}`}
                />
                <span>TEFA</span>
                <strong>15%</strong>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* =========================
          GRAFIK BARIS 2
      ========================= */}

      <section className={styles.chartGrid}>

        {/* TAHUN PEMBELIAN */}

        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>
              Grafik Jumlah Barang Berdasarkan Tahun Pembelian
            </h3>
          </div>

          <div className={styles.donutArea}>

            <div
              className={styles.donut}
              style={{
                background:
                  "conic-gradient(#2878e8 0deg 355deg, #20a866 355deg 360deg)",
              }}
            >
              <div className={styles.donutInner}>
                <strong>425</strong>
                <span>Barang</span>
              </div>
            </div>

            <div className={styles.legend}>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.blueDot}`}
                />
                <span>2025</span>
                <strong>98.8%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.greenDot}`}
                />
                <span>2026</span>
                <strong>1.2%</strong>
              </div>

            </div>
          </div>
        </div>

        {/* RUANGAN */}

        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>
              Grafik Jumlah Barang Berdasarkan Ruangan
            </h3>
          </div>

          <div className={styles.donutArea}>

            <div
              className={styles.donut}
              style={{
                background:
                  "conic-gradient(#2878e8 0deg 333deg, #20a565 333deg 345deg, #f2c313 345deg 350deg, #ef4444 350deg 355deg, #8b5cf6 355deg 360deg)",
              }}
            >
              <div className={styles.donutInner}>
                <strong>425</strong>
                <span>Barang</span>
              </div>
            </div>

            <div className={styles.legend}>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.blueDot}`}
                />
                <span>Ruang Tata Usaha</span>
                <strong>92.7%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.greenDot}`}
                />
                <span>Ruang Bendahara</span>
                <strong>3.1%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.yellowDot}`}
                />
                <span>Ruang Guru</span>
                <strong>2.1%</strong>
              </div>

              <div>
                <span
                  className={`${styles.legendDot} ${styles.redDot}`}
                />
                <span>Ruangan lainnya</span>
                <strong>2.1%</strong>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* =========================
          REKAP LAPORAN BULANAN
      ========================= */}

      <section className={styles.reportCard}>

        <div className={styles.reportHeader}>

          <div>
            <h3>Rekap Laporan Bulanan</h3>

            <p>
              Jumlah laporan kerusakan yang masuk setiap bulan
            </p>
          </div>

          {/* NAVIGASI BULAN */}

          <div className={styles.reportNavigation}>

            <button
              type="button"
              className={styles.reportArrow}
              disabled={reportPage === 0}
              onClick={() =>
                setReportPage((prev) =>
                  Math.max(prev - 1, 0)
                )
              }
              aria-label="Periode sebelumnya"
            >
              <ChevronIcon direction="left" />
            </button>

            <div className={styles.reportPeriod}>
              {currentReport.period}
            </div>

            <button
              type="button"
              className={styles.reportArrow}
              disabled={
                reportPage === monthlyData.length - 1
              }
              onClick={() =>
                setReportPage((prev) =>
                  Math.min(
                    prev + 1,
                    monthlyData.length - 1
                  )
                )
              }
              aria-label="Periode berikutnya"
            >
              <ChevronIcon direction="right" />
            </button>

          </div>
        </div>

        {/* GRAFIK */}

        <div className={styles.lineChart}>

          <div className={styles.yAxis}>
            <span>20</span>
            <span>15</span>
            <span>10</span>
            <span>5</span>
            <span>0</span>
          </div>

          <div className={styles.chartBody}>

            <div className={styles.gridLines}>
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <svg
              className={styles.lineSvg}
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >

              <polyline
                points={polylinePoints}
                fill="none"
                stroke="#243b7a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {points.map((point, index) => (
                <circle
                  key={`${currentReport.period}-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill="#243b7a"
                />
              ))}

            </svg>

            <div className={styles.monthLabels}>
              {currentReport.months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
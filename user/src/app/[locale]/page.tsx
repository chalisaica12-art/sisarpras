"use client";

import { useEffect, useState } from "react";
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

/* =========================
   HERO DATA
========================= */

const heroImages = [
  "/foto1.jpeg",
  "/foto2.jpeg",
  "/foto3.jpeg",
];

/* =========================
   HOME
========================= */

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("Home");

  const [heroIndex, setHeroIndex] = useState(0);
  const [infoIndex, setInfoIndex] = useState(0);

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
     INFORMATION AUTO FOCUS
  ========================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setInfoIndex(
        (current) =>
          (current + 1) % 2
      );
    }, 7000);

    return () => clearInterval(timer);
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
    setInfoIndex(
      (current) =>
        (current + 1) % 2
    );
  }

  function previousInfo() {
    setInfoIndex(
      (current) =>
        (current - 1 + 2) % 2
    );
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
            aria-label={
              t("previousInformation")
            }
          >
            <ChevronLeft />
          </button>

          <div className={styles.infoCards}>

            {/* CARD 1 */}

            <article
              className={`${styles.infoCard} ${
                infoIndex === 0
                  ? styles.infoCardActive
                  : styles.infoCardInactive
              }`}
              onClick={() =>
                setInfoIndex(0)
              }
            >

              <div className={styles.cardTop}>

                <div
                  className={`${styles.iconBox} ${styles.blue}`}
                >
                  <ClockIcon />
                </div>

                <span
                  className={`${styles.badge} ${styles.activeBadge}`}
                >
                  {t("active")}
                </span>

              </div>

              <span
                className={styles.cardType}
              >
                {t("complaintService")}
              </span>

              <h3>
                {t("operatingHours")}
              </h3>

              <div className={styles.timeBox}>

                <span>
                  {t("mondayFriday")}
                </span>

                <strong>
                  07.00 – 15.00{" "}
                  <small>WIB</small>
                </strong>

              </div>

              <div className={styles.cardInfo}>

                <InfoIcon />

                <span>
                  {t("selfReporting")}
                </span>

              </div>

            </article>

            {/* CARD 2 */}

            <article
              className={`${styles.infoCard} ${
                infoIndex === 1
                  ? styles.infoCardActive
                  : styles.infoCardInactive
              }`}
              onClick={() =>
                setInfoIndex(1)
              }
            >

              <div className={styles.cardTop}>

                <div
                  className={`${styles.iconBox} ${styles.orange}`}
                >
                  <AlertIcon />
                </div>

                <span
                  className={`${styles.badge} ${styles.warningBadge}`}
                >
                  {t("important")}
                </span>

              </div>

              <span
                className={styles.cardType}
              >
                {t("importantInformation")}
              </span>

              <h3>
                {t("developmentTitle1")}
                <br />
                {t("developmentTitle2")}
              </h3>

              <div
                className={
                  styles.cardDescription
                }
              >
                {t("developmentDescription")}
              </div>

            </article>

          </div>

          <button
            type="button"
            className={styles.carouselArrow}
            onClick={nextInfo}
            aria-label={
              t("nextInformation")
            }
          >
            <ChevronRight />
          </button>

        </div>

        <div className={styles.infoBottom}>

          <div className={styles.infoDots}>

            <button
              type="button"
              onClick={() =>
                setInfoIndex(0)
              }
              aria-label={
                `${t("choosePhoto")} 1`
              }
              className={
                infoIndex === 0
                  ? styles.dotActive
                  : ""
              }
            />

            <button
              type="button"
              onClick={() =>
                setInfoIndex(1)
              }
              aria-label={
                `${t("choosePhoto")} 2`
              }
              className={
                infoIndex === 1
                  ? styles.dotActive
                  : ""
              }
            />

          </div>

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
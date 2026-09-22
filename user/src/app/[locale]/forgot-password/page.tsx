"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import styles from "./page.module.css";

function MailIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
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
      <path d="m15 18-6-6 6-6" />
      <path d="M9 12h10" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <span className={styles.errorIcon}>
      !
    </span>
  );
}

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const t = useTranslations("ForgotPassword");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /* =========================
       VALIDASI EMAIL
    ========================= */

    if (!email.trim()) {
      setError(t("emailRequired"));
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setError(t("invalidEmail"));
      return;
    }

    /* =========================
       VALID
       NANTI DIHUBUNGKAN SUPABASE
    ========================= */

    setError("");

    // Nanti:
    // Kirim email pemulihan melalui Supabase Auth
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>

        {/* =========================
            BRAND
        ========================= */}

        <div className={styles.brand}>
          <img
            src="/Logo2.png"
            alt="SISARPRAS"
            className={styles.brandLogo}
          />

          <div className={styles.brandText}>
            <p className={styles.brandName}>
              SISARPRAS
            </p>

            <p className={styles.brandSubtitle}>
              {t("brandSubtitle")}
            </p>
          </div>
        </div>

        {/* =========================
            HEADING
        ========================= */}

        <div className={styles.heading}>
          <h1>
            {t("title")}
          </h1>

          <p>
            {t("subtitle")}
          </p>
        </div>

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          noValidate
        >

          {/* EMAIL */}

          <div className={styles.formGroup}>
            <label htmlFor="email">
              {t("email")}
            </label>

            <div
              className={`${styles.inputWrapper} ${
                error
                  ? styles.inputError
                  : ""
              }`}
            >
              <MailIcon />

              <input
                id="email"
                name="email"
                type="email"
                placeholder={t(
                  "emailPlaceholder"
                )}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (error) {
                    setError("");
                  }
                }}
              />
            </div>

            {/* ERROR */}

            {error && (
              <div className={styles.errorMessage}>
                <ErrorIcon />

                <span>
                  {error}
                </span>
              </div>
            )}
          </div>

          {/* =========================
              INFORMATION
          ========================= */}

          <div className={styles.infoBox}>
            <div className={styles.infoIcon}>
              <InfoIcon />
            </div>

            <div className={styles.infoContent}>
              <p className={styles.infoTitle}>
                {t("infoTitle")}
              </p>

              <p className={styles.infoText}>
                {t("infoText")}
              </p>
            </div>
          </div>

          {/* =========================
              SEND BUTTON
          ========================= */}

          <button
            type="submit"
            className={styles.sendButton}
          >
            <span>
              {t("sendButton")}
            </span>

            <ArrowRightIcon />
          </button>

          {/* =========================
              BACK TO LOGIN
          ========================= */}

          <Link
            href={`/${locale}/login`}
            className={styles.backButton}
          >
            <ArrowLeftIcon />

            <span>
              {t("backButton")}
            </span>
          </Link>

        </form>
      </div>
    </main>
  );
}
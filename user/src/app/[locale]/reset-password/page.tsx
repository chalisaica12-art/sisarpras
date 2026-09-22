"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
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
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

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
      <path d="M3 3l18 18" />
      <path d="M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.2 3.9" />
      <path d="M6.7 6.7C3.7 8.4 2.5 12 2.5 12s3.5 6 9.5 6a9.8 9.8 0 0 0 2.1-.2" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function LockIcon() {
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
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
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

export default function ResetPasswordPage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("ResetPassword");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const [success, setSuccess] = useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newErrors: {
      password?: string;
      confirmPassword?: string;
    } = {};

    /* =========================
       PASSWORD BARU
    ========================= */

    if (!password.trim()) {
      newErrors.password = t("passwordRequired");
    } else if (password.length < 8) {
      newErrors.password = t("passwordMinLength");
    }

    /* =========================
       KONFIRMASI PASSWORD
    ========================= */

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword =
        t("confirmPasswordRequired");
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword =
        t("confirmPasswordMismatch");
    }

    setErrors(newErrors);

    /* =========================
       JIKA ADA ERROR
    ========================= */

    if (Object.keys(newErrors).length > 0) {
      setSuccess(false);
      return;
    }

    /* =========================
       FRONTEND DEMO
       NANTI DIGANTI SUPABASE
    ========================= */

    setErrors({});
    setSuccess(true);

    /*
      Untuk sementara kita anggap
      perubahan password berhasil.

      Nanti setelah Supabase aktif,
      bagian ini diganti dengan:
      supabase.auth.updateUser(...)
    */

    setTimeout(() => {
      router.push(`/${locale}/login?reset=success`);
    }, 1000);
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
          <h1>{t("title")}</h1>

          <p>{t("subtitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
        >

          {/* =========================
              PASSWORD BARU
          ========================= */}

          <div className={styles.formGroup}>
            <label htmlFor="password">
              {t("password")}
            </label>

            <div
              className={`${styles.inputWrapper} ${
                errors.password
                  ? styles.inputError
                  : ""
              }`}
            >
              <LockIcon />

              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder={t(
                  "passwordPlaceholder"
                )}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);

                  if (errors.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: undefined,
                    }));
                  }
                }}
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? t("hidePassword")
                    : t("showPassword")
                }
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>

            {errors.password && (
              <div className={styles.errorMessage}>
                <ErrorIcon />

                <span>
                  {errors.password}
                </span>
              </div>
            )}
          </div>

          {/* =========================
              KONFIRMASI
          ========================= */}

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">
              {t("confirmPassword")}
            </label>

            <div
              className={`${styles.inputWrapper} ${
                errors.confirmPassword
                  ? styles.inputError
                  : ""
              }`}
            >
              <LockIcon />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder={t(
                  "confirmPasswordPlaceholder"
                )}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(
                    event.target.value
                  );

                  if (errors.confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword:
                        undefined,
                    }));
                  }
                }}
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? t("hidePassword")
                    : t("showPassword")
                }
              >
                <EyeIcon
                  open={showConfirmPassword}
                />
              </button>
            </div>

            {errors.confirmPassword && (
              <div className={styles.errorMessage}>
                <ErrorIcon />

                <span>
                  {errors.confirmPassword}
                </span>
              </div>
            )}
          </div>

          {/* =========================
              INFO PASSWORD
          ========================= */}

          <div className={styles.infoBox}>
            {t("passwordInfo")}
          </div>

          {/* =========================
              SUCCESS
          ========================= */}

          {success && (
            <div className={styles.successMessage}>
              {t("successMessage")}
            </div>
          )}

          {/* =========================
              UPDATE BUTTON
          ========================= */}

          <button
            type="submit"
            className={styles.updateButton}
          >
            {t("updateButton")}
          </button>

          {/* =========================
              BACK
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
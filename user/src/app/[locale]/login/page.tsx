"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

function MailIcon() {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
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

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
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
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

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
      <path d="M3 3l18 18" />
      <path d="M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.2 3.9" />
      <path d="M6.7 6.7C3.7 8.4 2.5 12 2.5 12s3.5 6 9.5 6a9.8 9.8 0 0 0 2.1-.2" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.22c1.89-1.74 2.99-4.3 2.99-7.36Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.61-2.41l-3.22-2.51c-.9.6-2.05.96-3.39.96-2.61 0-4.83-1.76-5.62-4.13H3.05A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.38 13.91A6 6 0 0 1 6.06 12c0-.66.11-1.3.32-1.91V7.5H3.05A10 10 0 0 0 2 12c0 1.61.39 3.13 1.05 4.5l3.33-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87C16.95 2.97 14.7 2.4 12 2.4C7.24 2.4 4.09 4.46 2.87 7.49L6.27 10.15C7.07 7.73 9.33 5.96 12 5.96Z"
      />
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

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Login");

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    /* =========================
       VALIDASI EMAIL
    ========================= */

    if (!email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = t("invalidEmail");
    }

    /* =========================
       VALIDASI PASSWORD
    ========================= */

    if (!password.trim()) {
      newErrors.password = t("passwordRequired");
    }

    setErrors(newErrors);

    /* Jangan lanjut kalau ada error */

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    /* =========================
       LOGIN SEMENTARA

       Nanti diganti Supabase Auth
    ========================= */

    localStorage.setItem(
      "sisarpras-is-logged-in",
      "true"
    );

    /* =========================
       SETELAH LOGIN
       LANGSUNG KE HOME
    ========================= */

    router.push(`/${locale}`);
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>

        {/* FOTO SEKOLAH */}

        <div className={styles.loginImage}>
          <img
            src="/school-login.jpeg"
            alt={t("schoolImageAlt")}
          />
        </div>

        {/* FORM LOGIN */}

        <div className={styles.loginForm}>

          <div className={styles.loginHeading}>
            <h1>
              {t("title")}
            </h1>

            <p>
              {t("subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* =========================
                EMAIL
            ========================= */}

            <div className={styles.formGroup}>

              <label htmlFor="email">
                {t("email")}
              </label>

              <div
                className={`${styles.inputWrapper} ${
                  errors.email
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
                    setEmail(
                      event.target.value
                    );

                    if (errors.email) {
                      setErrors((prev) => ({
                        ...prev,
                        email: undefined,
                      }));
                    }
                  }}
                />

              </div>

              {errors.email && (
                <div
                  className={
                    styles.errorMessage
                  }
                >
                  <ErrorIcon />

                  <span>
                    {errors.email}
                  </span>
                </div>
              )}

            </div>

            {/* =========================
                PASSWORD
            ========================= */}

            <div
              className={`${styles.formGroup} ${styles.passwordGroup}`}
            >

              <div
                className={
                  styles.passwordLabel
                }
              >

                <label htmlFor="password">
                  {t("password")}
                </label>

                <a
                  href={`/${locale}/forgot-password`}
                >
                  {t("forgotPassword")}
                </a>

              </div>

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
                    setPassword(
                      event.target.value
                    );

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
                  className={
                    styles.eyeButton
                  }
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? t("hidePassword")
                      : t("showPassword")
                  }
                >
                  <EyeIcon
                    open={showPassword}
                  />
                </button>

              </div>

              {errors.password && (
                <div
                  className={
                    styles.errorMessage
                  }
                >
                  <ErrorIcon />

                  <span>
                    {errors.password}
                  </span>
                </div>
              )}

            </div>

            {/* =========================
                REMEMBER ME
            ========================= */}

            <label
              className={styles.remember}
            >

              <input
                type="checkbox"
                name="remember"
              />

              <span>
                {t("rememberMe")}
              </span>

            </label>

            {/* =========================
                LOGIN BUTTON
            ========================= */}

            <button
              type="submit"
              className={styles.loginButton}
            >
              {t("loginButton")}
            </button>

            {/* =========================
                DIVIDER
            ========================= */}

            <div
              className={styles.divider}
            >
              <span></span>

              <p>
                {t("or")}
              </p>

              <span></span>
            </div>

            {/* =========================
                GOOGLE
            ========================= */}

            <button
              type="button"
              className={styles.googleButton}
            >
              <GoogleIcon />

              <span>
                {t("googleButton")}
              </span>
            </button>

            {/* =========================
                REGISTER
            ========================= */}

            <div
              className={styles.registerText}
            >
              <span>
                {t("noAccount")}
              </span>

              <a
                href={`/${locale}/register`}
              >
                {t("registerButton")}
              </a>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
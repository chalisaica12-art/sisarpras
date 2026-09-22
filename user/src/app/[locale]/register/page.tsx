"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
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
        d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87C16.95 2.97 14.7 2 12 2a9.99 9.99 0 0 0-8.95 5.5l3.33 2.59C7.17 7.72 9.39 5.96 12 5.96Z"
      />
    </svg>
  );
}

function ErrorIcon() {
  return <span className={styles.errorIcon}>!</span>;
}

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterPage() {
  const locale = useLocale();
  const t = useTranslations("Register");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newErrors: Errors = {};

    /* =========================
       NAMA
    ========================= */

    if (!name.trim()) {
      newErrors.name = t("nameRequired");
    }

    /* =========================
       EMAIL
    ========================= */

    if (!email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = t("invalidEmail");
    }

    /* =========================
       PASSWORD
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
      return;
    }

    /* =========================
       REGISTER SUPABASE
    ========================= */

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          nama: name.trim(),
        },
      },
    });

    if (error) {
      setIsLoading(false);

      setErrors({
        email: error.message,
      });

      return;
    }

    /* =========================
       REGISTER BERHASIL
    ========================= */

    setIsLoading(false);

    router.push(`/${locale}`);
  };

  return (
    <main className={styles.registerPage}>
      <div className={styles.registerCard}>

        {/* FOTO SEKOLAH */}

        <div className={styles.registerImage}>
          <img
            src="/school-login.jpeg"
            alt={t("schoolImageAlt")}
          />
        </div>

        {/* FORM REGISTER */}

        <div className={styles.registerForm}>

          {/* HEADING */}

          <div className={styles.registerHeading}>
            <h1>{t("title")}</h1>

            <p>
              {t("subtitleLine1")}
              <br />
              {t("subtitleLine2")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
          >

            {/* NAMA LENGKAP */}

            <div className={styles.formGroup}>
              <label htmlFor="name">
                {t("name")}
              </label>

              <div
                className={`${styles.inputWrapper} ${
                  errors.name
                    ? styles.inputError
                    : ""
                }`}
              >
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t(
                    "namePlaceholder"
                  )}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);

                    if (errors.name) {
                      setErrors((prev) => ({
                        ...prev,
                        name: undefined,
                      }));
                    }
                  }}
                />
              </div>

              {errors.name && (
                <div className={styles.errorMessage}>
                  <ErrorIcon />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* EMAIL */}

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
                    setEmail(event.target.value);

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
                <div className={styles.errorMessage}>
                  <ErrorIcon />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* PASSWORD */}

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
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* KONFIRMASI PASSWORD */}

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

            {/* INFO PASSWORD */}

            <div className={styles.passwordInfo}>
              {t("passwordInfo")}
            </div>

            {/* DAFTAR */}

            <button
              type="submit"
              className={styles.registerButton}
              disabled={isLoading}
            >
              {isLoading
                ? "Mendaftarkan..."
                : t("registerButton")}
            </button>

            {/* DIVIDER */}

            <div className={styles.divider}>
              <span></span>
              <p>{t("or")}</p>
              <span></span>
            </div>

            {/* GOOGLE */}

            <button
              type="button"
              className={styles.googleButton}
            >
              <GoogleIcon />

              <span>
                {t("googleButton")}
              </span>
            </button>

            {/* LOGIN */}

            <div className={styles.loginLink}>
              <span>
                {t("alreadyHaveAccount")}
              </span>

              <a href={`/${locale}/login`}>
                {t("loginButton")}
              </a>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
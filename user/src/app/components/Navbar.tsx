"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import styles from "./Navbar.module.css";

/* =========================
   ICON
========================= */

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className ?? styles.userIcon}
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={styles.logoutIcon}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

/* =========================
   NAVBAR
========================= */

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const t = useTranslations("Navbar");

  /* =========================
     STATE
  ========================= */

  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /* =========================
     LOGIN
  ========================= */

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState(
    "Pengguna"
  );

  const [userEmail, setUserEmail] = useState(
    "pengguna@gmail.com"
  );

  const profileWrapRef =
    useRef<HTMLDivElement>(null);

  /* =========================
     CEK STATUS LOGIN
  ========================= */

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn =
        localStorage.getItem(
          "sisarpras-is-logged-in"
        ) === "true";

      setIsLoggedIn(loggedIn);

      setUserName(
        localStorage.getItem(
          "sisarpras-user-name"
        ) || "Pengguna"
      );

      setUserEmail(
        localStorage.getItem(
          "sisarpras-user-email"
        ) || "pengguna@gmail.com"
      );
    };

    checkLoginStatus();

    window.addEventListener(
      "storage",
      checkLoginStatus
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkLoginStatus
      );
    };
  }, []);

  /* =========================
     TUTUP PROFILE DROPDOWN
     KETIKA KLIK DI LUAR
  ========================= */

  useEffect(() => {
    const closeOnOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        profileWrapRef.current &&
        !profileWrapRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      closeOnOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeOnOutsideClick
      );
    };
  }, []);

  /* =========================
     CLOSE ALL MENU
  ========================= */

  const closeMenu = () => {
    setMenuOpen(false);
    setLanguageOpen(false);
    setProfileOpen(false);
  };

  /* =========================
     GANTI BAHASA
  ========================= */

  const handleLanguageChange = (
    newLanguage: "id" | "en"
  ) => {
    setLanguageOpen(false);
    setMenuOpen(false);
    setProfileOpen(false);

    /*
      Ambil bagian path setelah locale.

      Contoh:
      /id        -> /
      /en        -> /
      /id/lapor  -> /lapor
      /en/lapor  -> /lapor
    */

    const pathWithoutLocale =
      pathname.replace(
        new RegExp(`^/${locale}`),
        ""
      ) || "/";

    router.push(
      `/${newLanguage}${
        pathWithoutLocale === "/"
          ? ""
          : pathWithoutLocale
      }`
    );
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "sisarpras-is-logged-in"
    );

    setIsLoggedIn(false);
    setProfileOpen(false);
    setMenuOpen(false);

    router.push(`/${locale}`);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navInner}>

        {/* =========================
            LOGO
        ========================= */}

        <Link
          href={`/${locale}`}
          className={styles.logo}
          onClick={closeMenu}
        >
          <img
            src="/Logo2.png"
            alt="SISARPRAS"
          />

          <div className={styles.logoText}>
            <strong>SISARPRAS</strong>

            <span>
              {t("subtitle")}
            </span>
          </div>
        </Link>

        {/* =========================
            HAMBURGER - MOBILE
        ========================= */}

        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => setMenuOpen(true)}
          aria-label={t("openMenu")}
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>

        {/* =========================
            OVERLAY
        ========================= */}

        <button
          type="button"
          className={`${styles.navOverlay} ${
            menuOpen
              ? styles.navOverlayOpen
              : ""
          }`}
          onClick={closeMenu}
          aria-label={t("closeMenu")}
        />

        {/* =========================
            MENU
        ========================= */}

        <nav
          className={`${styles.navMenu} ${
            menuOpen
              ? styles.navMenuOpen
              : ""
          }`}
        >

          {/* =========================
              CLOSE - MOBILE
          ========================= */}

          <button
            type="button"
            className={styles.mobileCloseButton}
            onClick={closeMenu}
            aria-label={t("closeMenu")}
          >
            <CloseIcon />
          </button>

          {/* =========================
              BERANDA / HOME
          ========================= */}

          <Link
            href={`/${locale}`}
            className={
              pathname === `/${locale}` ||
              pathname === "/"
                ? styles.active
                : ""
            }
            onClick={closeMenu}
          >
            {t("home")}
          </Link>

          {/* =========================
              FORM PELAPORAN
          ========================= */}

          <Link
            href={`/${locale}/lapor`}
            className={
              pathname === `/${locale}/lapor` ||
              pathname.startsWith(
                `/${locale}/lapor/`
              )
                ? styles.active
                : ""
            }
            onClick={closeMenu}
          >
            {t("report")}
          </Link>

          {/* =========================
              DAFTAR LAPORAN
          ========================= */}

          <Link
            href={`/${locale}/laporan`}
            className={
              pathname === `/${locale}/laporan` ||
              pathname.startsWith(
                `/${locale}/laporan/`
              )
                ? styles.active
                : ""
            }
            onClick={closeMenu}
          >
            {t("reports")}
          </Link>

          {/* =========================
              BAHASA
          ========================= */}

          <div className={styles.languageWrap}>
            <button
              type="button"
              className={styles.languageButton}
              onClick={() => {
                setLanguageOpen(
                  (value) => !value
                );

                setProfileOpen(false);
              }}
              aria-expanded={languageOpen}
              aria-haspopup="menu"
            >
              {t("language")}

              <ChevronDown />
            </button>

            {/* LANGUAGE DROPDOWN */}

            {languageOpen && (
              <div
                className={
                  styles.languageDropdown
                }
              >

                {/* INDONESIA */}

                <button
                  type="button"
                  onClick={() =>
                    handleLanguageChange("id")
                  }
                >
                  <span>
                    Indonesia
                  </span>

                  {locale === "id" && (
                    <b>✓</b>
                  )}
                </button>

                {/* ENGLISH */}

                <button
                  type="button"
                  onClick={() =>
                    handleLanguageChange("en")
                  }
                >
                  <span>
                    English
                  </span>

                  {locale === "en" && (
                    <b>✓</b>
                  )}
                </button>

              </div>
            )}
          </div>

          {/* =========================
              AUTH BUTTON
          ========================= */}

          {!isLoggedIn ? (

            <Link
              href={`/${locale}/login`}
              className={styles.loginButton}
              onClick={closeMenu}
            >
              {t("login")}
            </Link>

          ) : (

            <div
              className={styles.profileWrap}
              ref={profileWrapRef}
            >

              {/* PROFILE BUTTON */}

              <button
                type="button"
                className={
                  styles.profileAvatarButton
                }
                onClick={() => {
                  setProfileOpen(
                    (value) => !value
                  );

                  setLanguageOpen(false);
                }}
                aria-label={t("profileMenu")}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                <UserIcon />
              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div
                  className={
                    styles.profileDropdown
                  }
                >

                  {/* USER INFO */}

                  <div
                    className={
                      styles.profileDropdownHeader
                    }
                  >
                    <div
                      className={
                        styles.profileAvatarLarge
                      }
                    >
                      <UserIcon
                        className={
                          styles.profileAvatarIcon
                        }
                      />
                    </div>

                    <div
                      className={
                        styles.profileInfo
                      }
                    >
                      <strong>
                        {userName}
                      </strong>

                      <span>
                        {userEmail}
                      </span>
                    </div>
                  </div>

                  {/* DIVIDER */}

                  <div
                    className={
                      styles.profileDivider
                    }
                  />

                  {/* PROFILE */}

                  <Link
                    href={`/${locale}/profil`}
                    className={
                      styles.profileMenuItem
                    }
                    onClick={closeMenu}
                  >
                    <UserIcon
                      className={
                        styles.profileMenuIcon
                      }
                    />

                    <span>
                      {t("myProfile")}
                    </span>
                  </Link>

                  {/* LOGOUT */}

                  <button
                    type="button"
                    className={
                      styles.logoutMenuItem
                    }
                    onClick={handleLogout}
                  >
                    <LogoutIcon />

                    <span>
                      {t("logout")}
                    </span>
                  </button>

                </div>
              )}

            </div>
          )}

        </nav>
      </div>
    </header>
  );
}
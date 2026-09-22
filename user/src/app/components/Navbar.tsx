"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";
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
     USER
  ========================= */

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userName, setUserName] = useState("Pengguna");

  const [userEmail, setUserEmail] = useState(
    "pengguna@gmail.com"
  );

  const profileWrapRef =
    useRef<HTMLDivElement>(null);

  /* =========================
     CEK LOGIN SUPABASE
  ========================= */

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!user) {
        setIsLoggedIn(false);
        setUserName("Pengguna");
        setUserEmail("pengguna@gmail.com");
        return;
      }

      setIsLoggedIn(true);

      setUserEmail(
        user.email || "pengguna@gmail.com"
      );

      /* =========================
         AMBIL DATA PROFILE
      ========================= */

      const { data: profile } = await supabase
        .from("profiles")
        .select("nama, email")
        .eq("id", user.id)
        .maybeSingle();

      if (!mounted) return;

      setUserName(
        profile?.nama ||
          user.user_metadata?.nama ||
          "Pengguna"
      );

      setUserEmail(
        profile?.email ||
          user.email ||
          "pengguna@gmail.com"
      );
    };

    loadUser();

    /* =========================
       DENGARKAN PERUBAHAN AUTH
    ========================= */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      () => {
        loadUser();
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
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
     LOGOUT SUPABASE
  ========================= */

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setIsLoggedIn(false);
    setUserName("Pengguna");
    setUserEmail("pengguna@gmail.com");

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

          {/* CLOSE MOBILE */}

          <button
            type="button"
            className={styles.mobileCloseButton}
            onClick={closeMenu}
            aria-label={t("closeMenu")}
          >
            <CloseIcon />
          </button>

          {/* BERANDA */}

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

          {/* FORM PELAPORAN */}

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

          {/* DAFTAR LAPORAN */}

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

          {/* BAHASA */}

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

            {languageOpen && (
              <div
                className={
                  styles.languageDropdown
                }
              >
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
              AUTH
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
"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function UserIcon({ size = 20 }: { size?: number }) {
  return (
    <Icon size={size}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
    </Icon>
  );
}

function MailIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Icon>
  );
}

function CameraIcon() {
  return (
    <Icon size={17}>
      <path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z" />
      <circle cx="12" cy="13" r="3" />
    </Icon>
  );
}

/* =========================
   PAGE
========================= */

export default function ProfilPage() {
  const t = useTranslations("Profile");
  const router = useRouter();

  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [email, setEmail] = useState("");

  const [photo, setPhoto] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  /* =========================
     LOAD PROFILE DATA
  ========================= */

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);

        /* =========================
           AMBIL USER YANG LOGIN
        ========================= */

        const {
          data: { user },
        } = await supabase.auth.getUser();

        /* =========================
           BELUM LOGIN
        ========================= */

        if (!user) {
          router.push("/login");
          return;
        }

        /* =========================
           DATA DARI SUPABASE AUTH
        ========================= */

        let profileName =
          user.user_metadata?.nama || "";

        let profileEmail =
          user.email || "";

        /* =========================
           DATA DARI TABEL PROFILES
        ========================= */

        const { data: profile } =
          await supabase
            .from("profiles")
            .select("nama, email")
            .eq("id", user.id)
            .maybeSingle();

        /* =========================
           JIKA PROFILE DITEMUKAN
        ========================= */

        if (profile) {
          profileName =
            profile.nama || profileName;

          profileEmail =
            profile.email || profileEmail;
        }

        /* =========================
           MASUKKAN KE STATE
        ========================= */

        setName(profileName);
        setSavedName(profileName);
        setEmail(profileEmail);

        /* =========================
           LOAD FOTO
        ========================= */

        const storedPhoto =
          localStorage.getItem(
            "sisarpras-profile-photo"
          );

        if (storedPhoto) {
          setPhoto(storedPhoto);
        }
      } catch (error) {
        console.log(
          "Gagal memuat data profil:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  /* =========================
     CHANGE PHOTO
  ========================= */

  function handlePhotoChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    /* Batas ukuran 2 MB */

    if (file.size > 2 * 1024 * 1024) {
      alert(t("photoSizeError"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        return;
      }

      setPhoto(result);

      localStorage.setItem(
        "sisarpras-profile-photo",
        result
      );
    };

    reader.readAsDataURL(file);
  }

  /* =========================
     SAVE PROFILE
  ========================= */

  async function handleSave() {
    const trimmedName = name.trim();

    /* Nama tidak boleh kosong */

    if (!trimmedName) {
      setName(savedName);
      return;
    }

    try {
      setIsSaving(true);

      /* =========================
         AMBIL USER LOGIN
      ========================= */

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Sesi login tidak ditemukan.");
        return;
      }

      /* =========================
         UPDATE TABEL PROFILES
      ========================= */

      const { error: profileError } =
        await supabase
          .from("profiles")
          .update({
            nama: trimmedName,
          })
          .eq("id", user.id);

      if (profileError) {
        console.log(
          "Gagal menyimpan profile:",
          profileError
        );

        alert(
          "Nama gagal disimpan. Silakan coba lagi."
        );

        return;
      }

      /* =========================
         UPDATE USER METADATA
      ========================= */

      const { error: authError } =
        await supabase.auth.updateUser({
          data: {
            nama: trimmedName,
          },
        });

      if (authError) {
        console.log(
          "Gagal memperbarui metadata:",
          authError
        );
      }

      /* =========================
         UPDATE STATE
      ========================= */

      setName(trimmedName);
      setSavedName(trimmedName);

      alert(t("saveSuccess"));
    } catch (error) {
      console.log(
        "Gagal menyimpan profile:",
        error
      );

      alert(
        "Terjadi kesalahan saat menyimpan profile."
      );
    } finally {
      setIsSaving(false);
    }
  }

  /* =========================
     CANCEL
  ========================= */

  function handleCancel() {
    setName(savedName);
  }

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <main className={styles.page}>
        <Navbar />

        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.pageHeading}>
              <h1>{t("title")}</h1>

              <p>
                Memuat data profil...
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =========================
     MAIN
  ========================= */

  return (
    <main className={styles.page}>

      {/* =========================
          GLOBAL NAVBAR
      ========================= */}

      <Navbar />

      {/* =========================
          CONTENT
      ========================= */}

      <section className={styles.content}>
        <div className={styles.container}>

          {/* TITLE */}

          <div className={styles.pageHeading}>
            <h1>{t("title")}</h1>

            <p>
              {t("subtitle")}
            </p>
          </div>

          {/* PROFILE CARD */}

          <section className={styles.profileCard}>

            {/* TOP ACCENT */}

            <div className={styles.topAccent} />

            {/* PROFILE HEADER */}

            <div className={styles.profileHeader}>

              <div
                className={
                  styles.profileIdentity
                }
              >

                {/* AVATAR */}

                <div className={styles.avatar}>
                  {photo ? (
                    <img
                      src={photo}
                      alt={t(
                        "profilePhotoAlt"
                      )}
                    />
                  ) : (
                    <span>
                      {savedName
                        ? savedName
                            .split(" ")
                            .filter(Boolean)
                            .map(
                              (word) =>
                                word[0]
                            )
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "HN"}
                    </span>
                  )}
                </div>

                {/* IDENTITY */}

                <div
                  className={
                    styles.identityText
                  }
                >
                  <h2>{savedName}</h2>

                  <p>{email}</p>
                </div>
              </div>

              {/* CHANGE PHOTO */}

              <label
                className={
                  styles.changePhotoButton
                }
              >
                <CameraIcon />

                <span>
                  {t("changePhoto")}
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handlePhotoChange
                  }
                  hidden
                />
              </label>
            </div>

            {/* DIVIDER */}

            <div
              className={styles.divider}
            />

            {/* FORM */}

            <div className={styles.form}>

              {/* NAME */}

              <div
                className={
                  styles.formGroup
                }
              >
                <div
                  className={
                    styles.labelRow
                  }
                >
                  <label htmlFor="name">
                    {t("fullName")}
                  </label>

                  <span
                    className={
                      styles.editText
                    }
                  >
                    {t("editable")}
                  </span>
                </div>

                <div
                  className={
                    styles.inputWrapper
                  }
                >
                  <UserIcon size={19} />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    maxLength={50}
                  />
                </div>

                <p
                  className={
                    styles.helperText
                  }
                >
                  {t("nameHelper")}
                </p>
              </div>

              {/* EMAIL */}

              <div
                className={
                  styles.formGroup
                }
              >
                <div
                  className={
                    styles.labelRow
                  }
                >
                  <label htmlFor="email">
                    {t("email")}
                  </label>

                  <span
                    className={
                      styles.readOnly
                    }
                  >
                    {t("readOnly")}
                  </span>
                </div>

                <div
                  className={`${styles.inputWrapper} ${styles.disabledInput}`}
                >
                  <MailIcon />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                  />
                </div>
              </div>

            </div>

            {/* BOTTOM DIVIDER */}

            <div
              className={
                styles.dividerBottom
              }
            />

            {/* ACTION */}

            <div className={styles.actions}>

              <button
                type="button"
                className={
                  styles.cancelButton
                }
                onClick={handleCancel}
                disabled={isSaving}
              >
                {t("cancel")}
              </button>

              <button
                type="button"
                className={
                  styles.saveButton
                }
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving
                  ? "Menyimpan..."
                  : t("saveChanges")}
              </button>

            </div>

          </section>
        </div>
      </section>

      {/* =========================
          GLOBAL FOOTER
      ========================= */}

      <Footer />

    </main>
  );
}
"use client";

import { useState } from "react";
import styles from "./page.module.css";

/* =========================================================
   ICON
========================================================= */

function Icon({
  children,
  size = 18,
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

function UserIcon() {
  return (
    <Icon size={19}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
    </Icon>
  );
}

function MailIcon() {
  return (
    <Icon size={18}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Icon>
  );
}

function LockIcon() {
  return (
    <Icon size={18}>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </Icon>
  );
}

function ShieldIcon() {
  return (
    <Icon size={18}>
      <path d="M12 3 19 6v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

function CameraIcon() {
  return (
    <Icon size={15}>
      <path d="M4 7h3l1.3-2h7.4L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </Icon>
  );
}

function EyeIcon() {
  return (
    <Icon size={17}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </Icon>
  );
}

function EyeOffIcon() {
  return (
    <Icon size={17}>
      <path d="m3 3 18 18" />
      <path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.1 3.7" />
      <path d="M6.2 6.2C3.7 8 2.5 12 2.5 12s3.5 6 9.5 6c1 0 1.9-.1 2.7-.4" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </Icon>
  );
}

function SaveIcon() {
  return (
    <Icon size={16}>
      <path d="M5 4h12l2 2v14H5z" />
      <path d="M8 4v5h7V4" />
      <path d="M8 20v-6h8v6" />
    </Icon>
  );
}

function CheckIcon() {
  return (
    <Icon size={17}>
      <path d="m5 12 4 4L19 6" />
    </Icon>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PengaturanProfilPage() {
  const [name, setName] =
    useState("Administrator");

  const [email, setEmail] =
    useState("admin@sisarpras.sch.id");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* =======================================================
     SAVE
  ======================================================= */

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim()) {
      setError(
        "Nama lengkap wajib diisi."
      );
      return;
    }

    if (!email.trim()) {
      setError(
        "Alamat email wajib diisi."
      );
      return;
    }

    if (password && password.length < 6) {
      setError(
        "Kata sandi baru minimal 6 karakter."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Konfirmasi kata sandi tidak sesuai."
      );
      return;
    }

    setMessage(
      "Perubahan profil berhasil disimpan."
    );

    setPassword("");
    setConfirmPassword("");
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className={styles.page}>
      {/* =================================================
          HEADER
      ================================================= */}

      <section className={styles.header}>
        <div>
          <h1>
            Pengaturan Profil
          </h1>

          <p>
            Kelola informasi akun dan
            keamanan profil administrator.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          {/* =================================================
              INFORMASI PROFIL
          ================================================= */}

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.sectionIcon}>
                <UserIcon />
              </div>

              <div>
                <h2>
                  Informasi Profil
                </h2>

                <p>
                  Informasi dasar akun administrator.
                </p>
              </div>
            </div>

            <div className={styles.profileTop}>
              <div className={styles.avatarArea}>
                <div className={styles.avatar}>
                  A
                </div>

                <button
                  type="button"
                  className={styles.photoButton}
                  onClick={() =>
                    alert(
                      "Fitur ubah foto akan dihubungkan ke penyimpanan setelah backend selesai."
                    )
                  }
                >
                  <CameraIcon />
                  Ubah Foto
                </button>
              </div>

              <div className={styles.profileDescription}>
                <strong>
                  Profil Administrator
                </strong>

                <span>
                  Foto profil dapat digunakan
                  untuk mengenali akun saat
                  mengelola sistem.
                </span>
              </div>
            </div>

            <div className={styles.formGrid}>
              {/* NAMA */}

              <div className={styles.field}>
                <label htmlFor="name">
                  Nama Lengkap
                  <span>*</span>
                </label>

                <div className={styles.inputWrap}>
                  <UserIcon />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className={styles.field}>
                <label htmlFor="email">
                  Alamat Email
                  <span>*</span>
                </label>

                <div className={styles.inputWrap}>
                  <MailIcon />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="Masukkan alamat email"
                  />
                </div>

                <small>
                  Jika alamat email diubah,
                  akun dapat diminta untuk
                  melakukan login kembali.
                </small>
              </div>

              {/* ROLE */}

              <div className={styles.field}>
                <label>
                  Peran
                </label>

                <div
                  className={`${styles.inputWrap} ${styles.disabledInput}`}
                >
                  <ShieldIcon />

                  <input
                    type="text"
                    value="Administrator"
                    disabled
                    readOnly
                  />
                </div>

                <small>
                  Peran akun dikelola melalui
                  menu Peran & Hak Akses.
                </small>
              </div>
            </div>
          </section>

          {/* =================================================
              KEAMANAN
          ================================================= */}

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.sectionIcon}>
                <LockIcon />
              </div>

              <div>
                <h2>
                  Keamanan Akun
                </h2>

                <p>
                  Ubah kata sandi untuk menjaga
                  keamanan akun.
                </p>
              </div>
            </div>

            <div className={styles.securityInfo}>
              <ShieldIcon />

              <div>
                <strong>
                  Perbarui kata sandi secara berkala
                </strong>

                <span>
                  Kosongkan kedua kolom jika
                  tidak ingin mengubah kata sandi.
                </span>
              </div>
            </div>

            <div className={styles.passwordGrid}>
              {/* PASSWORD */}

              <div className={styles.field}>
                <label htmlFor="password">
                  Kata Sandi Baru
                </label>

                <div className={styles.inputWrap}>
                  <LockIcon />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Masukkan kata sandi baru"
                  />

                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon />
                    ) : (
                      <EyeIcon />
                    )}
                  </button>
                </div>

                <small>
                  Minimal 8 karakter.
                </small>
              </div>

              {/* CONFIRM */}

              <div className={styles.field}>
                <label htmlFor="confirmPassword">
                  Konfirmasi Kata Sandi
                </label>

                <div className={styles.inputWrap}>
                  <LockIcon />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      confirmPassword
                    }
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Konfirmasi kata sandi baru"
                  />

                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Sembunyikan konfirmasi kata sandi"
                        : "Tampilkan konfirmasi kata sandi"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon />
                    ) : (
                      <EyeIcon />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              MESSAGE
          ================================================= */}

          {error && (
            <div className={styles.errorMessage}>
              <span>!</span>
              {error}
            </div>
          )}

          {message && (
            <div className={styles.successMessage}>
              <CheckIcon />
              {message}
            </div>
          )}

          {/* =================================================
              ACTION
          ================================================= */}

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => {
                setName("Administrator");
                setEmail(
                  "admin@sisarpras.sch.id"
                );
                setPassword("");
                setConfirmPassword("");
                setError("");
                setMessage("");
              }}
            >
              Batal
            </button>

            <button
              type="submit"
              className={styles.saveButton}
            >
              <SaveIcon />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
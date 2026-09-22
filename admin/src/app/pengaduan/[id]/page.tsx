"use client";

import {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

/* =========================================================
   TYPE
========================================================= */

type Status =
  | "Pending"
  | "Diverifikasi Admin"
  | "Sedang Diproses"
  | "Selesai & Diuji";

type ChatMessage = {
  id: string;
  sender: string;
  time: string;
  text?: string;
  image?: string;
  admin: boolean;
};

type AttachedImage = {
  url: string;
  dataUrl: string;
  name: string;
  size: string;
};

/* =========================================================
   DATA LAPORAN
========================================================= */

const reportData = {
  id: "SR-2026-00128",

  pelapor: "Budi Prasetyo, S.Pd. (Guru)",
  telepon: "012345678910",
  email: "hna@gmail.com",

  lokasi: "Lab RPL",
  barang: "Meja",
  jenis: "Tidak Berfungsi",
  urgensi: "Sedang",

  createdAt: "6 September 2026, 13:20 WIB",

  description:
    "Lampu indikator optik berkedip merah dan tidak mengeluarkan cahaya saat sesi praktikum pemrograman kelas XI. Port HDMI dan kabel power sudah diganti, tetapi perangkat masih tidak merespons. Kipas pendingin berbunyi cukup keras selama 10 detik sebelum tiba-tiba berhenti.",

  /*
   * FOTO DUMMY UNTUK TESTING FITUR PERBESAR
   *
   * Nanti ketika sudah pakai Supabase,
   * bagian ini diganti dengan URL foto laporan
   * yang berasal dari database/storage.
   */
  photo:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1400&q=85",

  photoName: "lampu_proyektor_lab.jpg",
  photoSize: "1.8 MB",
};

/* =========================================================
   ICON
========================================================= */

function Icon({
  children,
  size = 20,
}: {
  children: ReactNode;
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

function CheckIcon() {
  return (
    <Icon>
      <path d="m5 12 4 4L19 6" />
    </Icon>
  );
}

function SendIcon() {
  return (
    <Icon>
      <path d="M4 5.5 20 12 4 18l3.2-6L4 5.5Z" />
      <path d="M7.2 12H20" />
    </Icon>
  );
}

function WrenchIcon() {
  return (
    <Icon>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Icon>
  );
}

function CompleteIcon() {
  return (
    <Icon>
      <path d="M12 3.5 14 5l2.5-.2.9 2.3 2.1 1.3-.6 2.4 1 2.2-1.8 1.7-.1 2.5-2.5.5-1.5 2-2.3-.8-2.3.8-1.5-2-2.5-.5-.1-2.5-1.8-1.7 1-2.2-.6-2.4 2.1-1.3.9-2.3L10 5l2-1.5Z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

function PaperclipIcon() {
  return (
    <Icon>
      <path d="m21.44 11.05-8.49 8.49a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 1 1-2.83-2.83l8.49-8.48" />
    </Icon>
  );
}

function ImageIcon() {
  return (
    <Icon>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </Icon>
  );
}

function TrashIcon() {
  return (
    <Icon>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M18 7v13H6V7" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </Icon>
  );
}

function CloseIcon() {
  return (
    <Icon>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </Icon>
  );
}

function ArrowLeftIcon() {
  return (
    <Icon size={17}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </Icon>
  );
}

function InfoIcon() {
  return (
    <Icon>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </Icon>
  );
}

/* =========================================================
   PROGRESS ITEM
========================================================= */

function ProgressItem({
  number,
  label,
  title,
  date,
  done,
  active,
  waiting,
}: {
  number: string;
  label: string;
  title: string;
  date: string;
  done?: boolean;
  active?: boolean;
  waiting?: boolean;
}) {
  return (
    <div className={styles.progressItem}>
      <div className={styles.progressTop}>
        <div
          className={`${styles.progressCircle} ${
            done
              ? styles.done
              : active
                ? styles.active
                : styles.waiting
          }`}
        >
          {done ? (
            <CheckIcon />
          ) : active ? (
            <WrenchIcon />
          ) : (
            <CompleteIcon />
          )}
        </div>

        <div
          className={`${styles.progressLine} ${
            done ? styles.doneLine : ""
          }`}
        />
      </div>

      <span
        className={`${styles.progressNumber} ${
          waiting ? styles.waitingText : ""
        }`}
      >
        {number}. {label}
      </span>

      <strong className={waiting ? styles.waitingText : ""}>
        {title}
      </strong>

      <small>{date}</small>
    </div>
  );
}

/* =========================================================
   NORMALISASI CHAT
========================================================= */

function isAdminSender(sender: string) {
  const name = sender.toLowerCase().trim();

  return (
    name.includes("administrator") ||
    name.includes("admin sarana") ||
    name === "admin" ||
    name === "adm"
  );
}

function normalizeMessages(data: unknown): ChatMessage[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter(
      (item) =>
        item &&
        typeof item === "object"
    )
    .map((item: any, index) => {
      const sender =
        typeof item.sender === "string"
          ? item.sender
          : "Budi Prasetyo";

      return {
        id:
          typeof item.id === "string"
            ? item.id
            : `msg-${index}-${Date.now()}`,

        sender,

        time:
          typeof item.time === "string"
            ? item.time
            : "Sekarang",

        text:
          typeof item.text === "string"
            ? item.text
            : undefined,

        image:
          typeof item.image === "string"
            ? item.image
            : undefined,

        admin: isAdminSender(sender),
      };
    });
}

/* =========================================================
   PAGE
========================================================= */

export default function DetailPengaduanPage() {
  const params = useParams();

  const reportId =
    typeof params.id === "string"
      ? params.id
      : reportData.id;

  /* =======================================================
     STATUS
  ======================================================= */

  const [status, setStatus] =
    useState<Status>("Sedang Diproses");

  const [savedStatus, setSavedStatus] =
    useState<Status>("Sedang Diproses");

  /* =======================================================
     CHAT
  ======================================================= */

  const [messages, setMessages] =
    useState<ChatMessage[]>([
      {
        id: "msg-1",
        sender: "Budi Prasetyo",
        time: "14:10",
        text:
          "Selamat siang Admin. Laporan kerusakan sudah saya kirim. Mohon dibantu untuk diperiksa karena akan digunakan untuk kegiatan pembelajaran.",
        admin: false,
      },

      {
        id: "msg-2",
        sender: "Admin Sarana",
        time: "09:12",
        text:
          "Baik Pak Budi. Pak Joko sudah mengambil modul pengganti dari bengkel dan akan segera menuju gedung untuk melakukan perbaikan.",
        admin: true,
      },

      {
        id: "msg-3",
        sender: "Administrator",
        time: "Sekarang",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=700&q=80",
        admin: true,
      },
    ]);

  const [message, setMessage] =
    useState("");

  /*
   * Inilah state yang mengontrol modal gambar.
   */
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [attachedImage, setAttachedImage] =
    useState<AttachedImage | null>(null);

  const [deleteMenu, setDeleteMenu] =
    useState(false);

  const [selectMode, setSelectMode] =
    useState(false);

  const [selectedMessages, setSelectedMessages] =
    useState<string[]>([]);

  const [hydrated, setHydrated] =
    useState(false);

  /* =======================================================
     REF
  ======================================================= */

  const galleryInputRef =
    useRef<HTMLInputElement>(null);

  const deleteMenuRef =
    useRef<HTMLDivElement>(null);

  const storageKey =
    `sisarpras-chat-${reportId}`;

  /* =======================================================
     LOAD CHAT
  ======================================================= */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(storageKey);

      if (saved) {
        const parsed =
          JSON.parse(saved);

        const normalized =
          normalizeMessages(parsed);

        if (normalized.length > 0) {
          setMessages(normalized);
        }
      }
    } catch (error) {
      console.error(
        "Gagal memuat chat:",
        error
      );
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  /* =======================================================
     SAVE CHAT
  ======================================================= */

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(messages)
      );
    } catch (error) {
      console.error(
        "Gagal menyimpan chat:",
        error
      );
    }
  }, [
    messages,
    hydrated,
    storageKey,
  ]);

  /* =======================================================
     STORAGE SYNC
  ======================================================= */

  useEffect(() => {
    function handleStorage(
      event: StorageEvent
    ) {
      if (event.key !== storageKey) {
        return;
      }

      if (!event.newValue) {
        setMessages([]);
        return;
      }

      try {
        const parsed =
          JSON.parse(event.newValue);

        setMessages(
          normalizeMessages(parsed)
        );
      } catch (error) {
        console.error(
          "Gagal sinkronisasi chat:",
          error
        );
      }
    }

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, [storageKey]);

  /* =======================================================
     CLOSE DELETE MENU
  ======================================================= */

  useEffect(() => {
    function closeMenu(
      event: MouseEvent
    ) {
      if (
        deleteMenuRef.current &&
        !deleteMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setDeleteMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      closeMenu
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeMenu
      );
    };
  }, []);

  /* =======================================================
     ESCAPE UNTUK MODAL
  ======================================================= */

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* =======================================================
     CURRENT STEP
  ======================================================= */

  const currentStep =
    savedStatus === "Pending"
      ? 1
      : savedStatus ===
          "Diverifikasi Admin"
        ? 2
        : savedStatus ===
            "Sedang Diproses"
          ? 3
          : 4;

  /* =======================================================
     SAVE STATUS
  ======================================================= */

  function saveStatus() {
    setSavedStatus(status);
  }

  /* =======================================================
     MARK AS READ
  ======================================================= */

  function markAsRead() {
    const key =
      "sisarpras_pengaduan_dibaca";

    try {
      const saved =
        localStorage.getItem(key);

      const list = saved
        ? JSON.parse(saved)
        : [];

      const ids =
        Array.isArray(list)
          ? list
          : [];

      if (!ids.includes(reportId)) {
        ids.push(reportId);
      }

      localStorage.setItem(
        key,
        JSON.stringify(ids)
      );
    } catch (error) {
      console.error(error);
    }
  }

  /* =======================================================
     FORMAT FILE SIZE
  ======================================================= */

  function formatSize(
    bytes: number
  ) {
    if (
      bytes <
      1024 * 1024
    ) {
      return `${Math.round(
        bytes / 1024
      )} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  /* =======================================================
     FILE TO DATA URL
  ======================================================= */

  function fileToDataUrl(
    file: File
  ) {
    return new Promise<string>(
      (resolve, reject) => {
        const reader =
          new FileReader();

        reader.onload = () =>
          resolve(
            reader.result as string
          );

        reader.onerror = reject;

        reader.readAsDataURL(file);
      }
    );
  }

  /* =======================================================
     PILIH FOTO DARI EXPLORER
  ======================================================= */

  async function handleImageSelected(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "File harus berupa gambar."
      );

      event.target.value = "";
      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        "Ukuran gambar maksimal 2 MB."
      );

      event.target.value = "";
      return;
    }

    try {
      const dataUrl =
        await fileToDataUrl(file);

      if (attachedImage?.url) {
        URL.revokeObjectURL(
          attachedImage.url
        );
      }

      setAttachedImage({
        url: URL.createObjectURL(
          file
        ),
        dataUrl,
        name: file.name,
        size: formatSize(
          file.size
        ),
      });
    } catch {
      alert(
        "Gambar gagal diproses."
      );
    }

    event.target.value = "";
  }

  /* =======================================================
     REMOVE ATTACHMENT
  ======================================================= */

  function removeAttachedImage() {
    if (attachedImage?.url) {
      URL.revokeObjectURL(
        attachedImage.url
      );
    }

    setAttachedImage(null);
  }

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  function sendMessage() {
    const text =
      message.trim();

    if (
      !text &&
      !attachedImage
    ) {
      return;
    }

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Administrator",
      time: "Sekarang",
      text:
        text || undefined,
      image:
        attachedImage?.dataUrl,
      admin: true,
    };

    setMessages(
      (previous) => [
        ...previous,
        newMessage,
      ]
    );

    setMessage("");

    if (attachedImage?.url) {
      URL.revokeObjectURL(
        attachedImage.url
      );
    }

    setAttachedImage(null);
  }

  /* =======================================================
     DELETE ALL CHAT
  ======================================================= */

  function deleteAllMessages() {
    if (
      !window.confirm(
        "Hapus semua pesan dalam chat?"
      )
    ) {
      return;
    }

    setMessages([]);

    setSelectedMessages([]);

    setSelectMode(false);

    setDeleteMenu(false);
  }

  /* =======================================================
     SELECT MODE
  ======================================================= */

  function startSelectMode() {
    setSelectMode(true);
    setDeleteMenu(false);
  }

  function cancelSelectMode() {
    setSelectMode(false);
    setSelectedMessages([]);
  }

  function selectAllMessages() {
    setSelectedMessages(
      messages.map(
        (item) => item.id
      )
    );
  }

  function toggleMessageSelection(
    id: string
  ) {
    setSelectedMessages(
      (previous) =>
        previous.includes(id)
          ? previous.filter(
              (item) =>
                item !== id
            )
          : [
              ...previous,
              id,
            ]
    );
  }

  function deleteSelectedMessages() {
    if (
      !selectedMessages.length
    ) {
      return;
    }

    if (
      !window.confirm(
        `Hapus ${selectedMessages.length} pesan?`
      )
    ) {
      return;
    }

    setMessages(
      (previous) =>
        previous.filter(
          (item) =>
            !selectedMessages.includes(
              item.id
            )
        )
    );

    setSelectedMessages([]);

    setSelectMode(false);
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <main className={styles.page}>
        {/* =================================================
            BACK
        ================================================= */}

        <div
          className={
            styles.backContainer
          }
        >
          <Link
            href="/pengaduan"
            className={
              styles.backButton
            }
          >
            <span
              className={
                styles.backIcon
              }
            >
              <ArrowLeftIcon />
            </span>

            Kembali ke Pengaduan
            Kerusakan
          </Link>
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <section
          className={
            styles.reportHeader
          }
        >
          <div
            className={
              styles.reportTitle
            }
          >
            <div>
              <div
                className={
                  styles.titleRow
                }
              >
                <h1>
                  Laporan #
                  {reportData.id}
                </h1>

                <span
                  className={
                    styles.status
                  }
                >
                  {savedStatus}
                </span>
              </div>

              <p>
                Dibuat pada{" "}
                {reportData.createdAt}
              </p>
            </div>

            <button
              type="button"
              className={
                styles.readButton
              }
              onClick={
                markAsRead
              }
            >
              <CheckIcon />
              Sudah Dibaca
            </button>
          </div>

          {/* =================================================
              PROGRESS
          ================================================= */}

          <div
            className={
              styles.progressTitle
            }
          >
            <span>
              PROGRES PENANGANAN
            </span>

            <span
              className={
                styles.stepCounter
              }
            >
              Langkah{" "}
              {currentStep} dari 4
            </span>
          </div>

          <div
            className={
              styles.progress
            }
          >
            <ProgressItem
              number="01"
              label="TERKIRIM"
              title="Laporan Terkirim"
              date="06 Sep 2026, 13:20 WIB"
              done
            />

            <ProgressItem
              number="02"
              label="DIVERIFIKASI"
              title="Diverifikasi Admin"
              date={
                currentStep >= 2
                  ? "06 Sep 2026, 14:05 WIB"
                  : "Menunggu Tindakan"
              }
              done={
                currentStep > 2
              }
              active={
                currentStep === 2
              }
              waiting={
                currentStep < 2
              }
            />

            <ProgressItem
              number="03"
              label="DIPROSES"
              title="Sedang Diproses"
              date={
                currentStep >= 3
                  ? "07 Sep 2026, 09:10 WIB"
                  : "Menunggu Tindakan"
              }
              done={
                currentStep > 3
              }
              active={
                currentStep === 3
              }
              waiting={
                currentStep < 3
              }
            />

            <ProgressItem
              number="04"
              label="SELESAI"
              title="Selesai & Diuji"
              date={
                currentStep === 4
                  ? "Penanganan selesai"
                  : "Menunggu Tindakan"
              }
              done={
                currentStep === 4
              }
              waiting={
                currentStep < 4
              }
            />
          </div>

          {/* =================================================
              ADMIN PROGRESS
          ================================================= */}

          <div
            className={
              styles.adminProgress
            }
          >
            <div>
              <strong>
                Ubah Progres Laporan
              </strong>

              <span>
                Hanya administrator yang
                dapat mengubah status.
              </span>
            </div>

            <div
              className={
                styles.progressControl
              }
            >
              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target
                      .value as Status
                  )
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Diverifikasi Admin">
                  Diverifikasi Admin
                </option>

                <option value="Sedang Diproses">
                  Sedang Diproses
                </option>

                <option value="Selesai & Diuji">
                  Selesai & Diuji
                </option>
              </select>

              <button
                type="button"
                onClick={
                  saveStatus
                }
              >
                Simpan
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section
          className={
            styles.content
          }
        >
          {/* =================================================
              DETAIL LAPORAN
          ================================================= */}

          <section
            className={
              styles.detailCard
            }
          >
            <div
              className={
                styles.sectionTitle
              }
            >
              <InfoIcon />

              <h2>
                Detail Informasi
                Laporan
              </h2>
            </div>

            <div
              className={
                styles.infoBox
              }
            >
              <div
                className={
                  styles.infoRow
                }
              >
                <span>
                  Pelapor:
                </span>

                <strong>
                  {reportData.pelapor}
                </strong>
              </div>

              <div
                className={
                  styles.infoRow
                }
              >
                <span>
                  Telepon/WhatsApp
                </span>

                <strong>
                  {reportData.telepon}
                </strong>
              </div>

              <div
                className={
                  styles.infoRow
                }
              >
                <span>
                  Email
                </span>

                <strong>
                  {reportData.email}
                </strong>
              </div>

              <div
                className={
                  styles.infoRow
                }
              >
                <span>
                  Lokasi/Ruangan:
                </span>

                <strong>
                  {reportData.lokasi}
                </strong>
              </div>

              <div
                className={
                  styles.infoRow
                }
              >
                <span>
                  Barang yang Rusak
                </span>

                <strong>
                  {reportData.barang}
                </strong>
              </div>

              <div
                className={
                  styles.infoRow
                }
              >
                <span>
                  Jenis:
                </span>

                <strong
                  className={
                    styles.typeBadge
                  }
                >
                  {reportData.jenis}
                </strong>
              </div>

              <div
                className={
                  styles.infoRow
                }
              >
                <span>
                  Urgensi:
                </span>

                <strong
                  className={
                    styles.urgentBadge
                  }
                >
                  {reportData.urgensi}
                </strong>
              </div>
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div
              className={
                styles.description
              }
            >
              <h3>
                DESKRIPSI LENGKAP
                KERUSAKAN
              </h3>

              <p>
                {reportData.description}
              </p>
            </div>

            {/* =================================================
                FOTO BARANG RUSAK
            ================================================= */}

            <div
              className={
                styles.photoSection
              }
            >
              <h3>
                FOTO BARANG YANG
                RUSAK
              </h3>

              <div
                className={
                  styles.photoBox
                }
              >
                {/* FOTO */}

                {reportData.photo ? (
                  <button
                    type="button"
                    className={
                      styles.photoImageButton
                    }
                    onClick={() =>
                      setSelectedImage(
                        reportData.photo
                      )
                    }
                    aria-label="Perbesar foto barang yang rusak"
                  >
                    <img
                      src={
                        reportData.photo
                      }
                      alt="Foto barang yang rusak"
                    />
                  </button>
                ) : (
                  <div
                    className={
                      styles.emptyPhoto
                    }
                  >
                    <ImageIcon />

                    <span>
                      Foto barang yang
                      rusak
                    </span>
                  </div>
                )}

                {/* OVERLAY */}

                <div
                  className={
                    styles.photoOverlay
                  }
                >
                  <div>
                    <ImageIcon />

                    <div>
                      <span>
                        {
                          reportData.photoName
                        }
                      </span>

                      <small>
                        {
                          reportData.photoSize
                        }
                      </small>
                    </div>
                  </div>

                  {/* =================================================
                      TOMBOL PERBESAR
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        reportData.photo
                      ) {
                        setSelectedImage(
                          reportData.photo
                        );
                      }
                    }}
                  >
                    ⛶ Perbesar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              CHAT PELAPOR
          ================================================= */}

          <aside
            className={
              styles.chatCard
            }
          >
            {/* HEADER CHAT */}

            <div
              className={
                styles.chatHeader
              }
            >
              <div
                className={
                  styles.chatProfile
                }
              >
                <div
                  className={
                    styles.adminAvatar
                  }
                >
                  <span>
                    BP
                  </span>

                  <i />
                </div>

                <div>
                  <h2>
                    Chat Pelapor
                  </h2>

                  <small>
                    {reportData.pelapor}
                  </small>
                </div>
              </div>

              <div
                className={
                  styles.deleteMenuWrap
                }
                ref={
                  deleteMenuRef
                }
              >
                <button
                  type="button"
                  className={
                    styles.trashButton
                  }
                  onClick={() =>
                    setDeleteMenu(
                      (value) =>
                        !value
                    )
                  }
                >
                  <TrashIcon />
                </button>

                {deleteMenu && (
                  <div
                    className={
                      styles.deleteMenu
                    }
                  >
                    <button
                      type="button"
                      onClick={
                        deleteAllMessages
                      }
                    >
                      <TrashIcon />
                      Hapus semua
                      pesan
                    </button>

                    <button
                      type="button"
                      onClick={
                        startSelectMode
                      }
                    >
                      <CheckIcon />
                      Pilih pesan
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SELECTION BAR */}

            {selectMode && (
              <div
                className={
                  styles.selectionBar
                }
              >
                <span>
                  {
                    selectedMessages.length
                  }{" "}
                  dipilih
                </span>

                <div>
                  <button
                    type="button"
                    onClick={
                      selectAllMessages
                    }
                  >
                    Pilih semua
                  </button>

                  <button
                    type="button"
                    onClick={
                      cancelSelectMode
                    }
                  >
                    Batal
                  </button>

                  <button
                    type="button"
                    className={
                      styles.deleteSelectedButton
                    }
                    disabled={
                      !selectedMessages.length
                    }
                    onClick={
                      deleteSelectedMessages
                    }
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}

            {/* =================================================
                CHAT BODY
            ================================================= */}

            <div
              className={
                styles.chatBody
              }
            >
              <div
                className={
                  styles.dateLabel
                }
              >
                Kemarin • 6 September
                2026
              </div>

              {messages.map(
                (item) => {
                  const selected =
                    selectedMessages.includes(
                      item.id
                    );

                  return (
                    <div
                      key={item.id}
                      className={`
                        ${styles.messageGroup}
                        ${
                          item.admin
                            ? styles.adminMessage
                            : styles.userMessage
                        }
                        ${
                          selected
                            ? styles.selectedMessage
                            : ""
                        }
                      `}
                    >
                      <div
                        className={
                          styles.messageMetaRow
                        }
                      >
                        {selectMode && (
                          <button
                            type="button"
                            className={`
                              ${styles.messageCheckbox}
                              ${
                                selected
                                  ? styles.checked
                                  : ""
                              }
                            `}
                            onClick={() =>
                              toggleMessageSelection(
                                item.id
                              )
                            }
                          >
                            {selected && (
                              <CheckIcon />
                            )}
                          </button>
                        )}

                        <span
                          className={
                            styles.messageMeta
                          }
                        >
                          {item.sender} •{" "}
                          {item.time}
                        </span>
                      </div>

                      <div
                        className={
                          styles.messageRow
                        }
                      >
                        {/* USER / PELAPOR = KIRI */}

                        {!item.admin && (
                          <div
                            className={
                              styles.smallAvatar
                            }
                          >
                            BP
                          </div>
                        )}

                        <div
                          className={
                            styles.messageContent
                          }
                        >
                          {/* FOTO CHAT */}

                          {item.image && (
                            <button
                              type="button"
                              className={
                                styles.chatImageButton
                              }
                              onClick={() =>
                                setSelectedImage(
                                  item.image!
                                )
                              }
                            >
                              <img
                                src={
                                  item.image
                                }
                                alt="Foto dari chat"
                                className={
                                  styles.chatImage
                                }
                              />

                              <span
                                className={
                                  styles.chatImageZoom
                                }
                              >
                                ⛶ Perbesar
                              </span>
                            </button>
                          )}

                          {/* PESAN */}

                          {item.text && (
                            <div
                              className={
                                styles.messageBubble
                              }
                            >
                              {item.text}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ADMIN = KANAN */}

                      {item.admin && (
                        <small
                          className={
                            styles.readStatus
                          }
                        >
                          ✓✓ Dibaca
                        </small>
                      )}
                    </div>
                  );
                }
              )}

              {/* TYPING */}

              <div
                className={
                  styles.typing
                }
              >
                <div
                  className={
                    styles.smallAvatar
                  }
                >
                  ADM
                </div>

                <div
                  className={
                    styles.typingDots
                  }
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            {/* =================================================
                ATTACHMENT PREVIEW
            ================================================= */}

            {attachedImage && (
              <div
                className={
                  styles.attachmentPreview
                }
              >
                <div
                  className={
                    styles.attachmentImageWrap
                  }
                >
                  <img
                    src={
                      attachedImage.url
                    }
                    alt="Preview gambar"
                  />
                </div>

                <div
                  className={
                    styles.attachmentInfo
                  }
                >
                  <strong>
                    {
                      attachedImage.name
                    }
                  </strong>

                  <small>
                    {
                      attachedImage.size
                    }
                  </small>
                </div>

                <button
                  type="button"
                  className={
                    styles.removeAttachment
                  }
                  onClick={
                    removeAttachedImage
                  }
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            {/* =================================================
                INPUT CHAT
            ================================================= */}

            <div
              className={
                styles.chatInput
              }
            >
              <div
                className={
                  styles.attachWrap
                }
              >
                <button
                  type="button"
                  className={
                    styles.attachButton
                  }
                  onClick={() =>
                    galleryInputRef.current?.click()
                  }
                  title="Lampirkan foto"
                >
                  <PaperclipIcon />
                </button>

                {/* LANGSUNG EXPLORER */}

                <input
                  ref={
                    galleryInputRef
                  }
                  type="file"
                  accept="image/*"
                  className={
                    styles.hiddenFileInput
                  }
                  onChange={
                    handleImageSelected
                  }
                />
              </div>

              <input
                type="text"
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Tulis pesan kepada pelapor..."
              />

              <button
                type="button"
                className={
                  styles.sendButton
                }
                onClick={
                  sendMessage
                }
              >
                <SendIcon />
              </button>
            </div>
          </aside>
        </section>

        {/* =====================================================
            MODAL PERBESAR FOTO
        ===================================================== */}

        {selectedImage && (
          <div
            className={
              styles.imageModal
            }
            onClick={() =>
              setSelectedImage(
                null
              )
            }
          >
            <button
              type="button"
              className={
                styles.closeImageButton
              }
              onClick={() =>
                setSelectedImage(
                  null
                )
              }
              aria-label="Tutup foto"
            >
              <CloseIcon />
            </button>

            <img
              src={selectedImage}
              alt="Foto diperbesar"
              className={
                styles.largeImage
              }
              onClick={(event) =>
                event.stopPropagation()
              }
            />
          </div>
        )}
      </main>
    </>
  );
}
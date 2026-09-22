"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  useLocale,
  useTranslations,
} from "next-intl";
import Footer from "../../../components/Footer";
import styles from "./page.module.css";

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

const STORAGE_KEY =
  "sisarpras-chat-SR-2026-00128";

function Icon({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
      />
      <path d="m21 15-5-5L5 21" />
    </Icon>
  );
}

function CameraIcon() {
  return (
    <Icon>
      <path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
      <circle
        cx="12"
        cy="13"
        r="3.5"
      />
    </Icon>
  );
}

function HeadsetIcon() {
  return (
    <Icon>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" />
      <path d="M20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
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

export default function DetailLaporanPage() {
  const locale = useLocale();
  const t = useTranslations("Detail");

  const defaultMessages: ChatMessage[] = [
    {
      id: "msg-1",
      sender: t("adminName"),
      time: "14:10",
      text: t("message1"),
      admin: true,
    },
    {
      id: "msg-2",
      sender: t("userName"),
      time: "14:15",
      text: t("message2"),
      admin: false,
    },
    {
      id: "msg-3",
      sender: t("adminName"),
      time: "09:12",
      text: t("message3"),
      admin: true,
    },
  ];

  const [messages, setMessages] =
    useState<ChatMessage[]>(
      defaultMessages
    );

  const [message, setMessage] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [attachedImage, setAttachedImage] =
    useState<AttachedImage | null>(null);

  const [attachmentMenu, setAttachmentMenu] =
    useState(false);

  const [deleteMenu, setDeleteMenu] =
    useState(false);

  const [selectMode, setSelectMode] =
    useState(false);

  const [selectedMessages, setSelectedMessages] =
    useState<string[]>([]);

  const [isMobile, setIsMobile] =
    useState(false);

  const [hydrated, setHydrated] =
    useState(false);

  const galleryInputRef =
    useRef<HTMLInputElement>(null);

  const cameraInputRef =
    useRef<HTMLInputElement>(null);

  const deleteMenuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 650px)"
    );

    const update = () =>
      setIsMobile(mq.matches);

    update();

    mq.addEventListener(
      "change",
      update
    );

    return () =>
      mq.removeEventListener(
        "change",
        update
      );
  }, []);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setMessages(parsed);
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
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages)
      );
    } catch (error) {
      console.error(
        "Gagal menyimpan chat:",
        error
      );
    }
  }, [messages, hydrated]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (
        deleteMenuRef.current &&
        !deleteMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setDeleteMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      close
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        close
      );
  }, []);

  function formatFileSize(bytes: number) {
    const mb =
      bytes / (1024 * 1024);

    return mb < 1
      ? `${Math.round(bytes / 1024)} KB`
      : `${mb.toFixed(1)} MB`;
  }

  function fileToDataUrl(
    file: File
  ): Promise<string> {
    return new Promise(
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

  async function handleImageSelected(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(t("imageTooLarge"));
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert(t("imageOnly"));
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
        url: URL.createObjectURL(file),
        dataUrl,
        name: file.name,
        size: formatFileSize(
          file.size
        ),
      });

      setAttachmentMenu(false);
    } catch {
      alert(t("imageProcessError"));
    }

    event.target.value = "";
  }

  function handlePaperclipClick() {
    if (!isMobile) {
      galleryInputRef.current?.click();
    } else {
      setAttachmentMenu(
        (value) => !value
      );
    }
  }

  function removeAttachedImage() {
    if (attachedImage?.url) {
      URL.revokeObjectURL(
        attachedImage.url
      );
    }

    setAttachedImage(null);
  }

  function sendMessage() {
    const text =
      message.trim();

    if (!text && !attachedImage) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        id: `msg-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,
        sender: t("userName"),
        time: t("now"),
        text:
          text || undefined,
        image:
          attachedImage?.dataUrl,
        admin: false,
      },
    ]);

    setMessage("");

    if (attachedImage?.url) {
      URL.revokeObjectURL(
        attachedImage.url
      );
    }

    setAttachedImage(null);
    setAttachmentMenu(false);
  }

  function deleteAllMessages() {
    if (
      !window.confirm(
        t("deleteAllConfirm")
      )
    ) {
      return;
    }

    setMessages([]);
    setSelectedMessages([]);
    setSelectMode(false);
    setDeleteMenu(false);
  }

  function toggleMessageSelection(
    id: string
  ) {
    setSelectedMessages(
      (previous) =>
        previous.includes(id)
          ? previous.filter(
              (item) => item !== id
            )
          : [...previous, id]
    );
  }

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

  function deleteSelectedMessages() {
    if (!selectedMessages.length) {
      return;
    }

    if (
      !window.confirm(
        t("deleteSelectedConfirm", {
          count:
            selectedMessages.length,
        })
      )
    ) {
      return;
    }

    setMessages((previous) =>
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

  return (
    <>
      <main className={styles.page}>
        <div
          className={
            styles.backContainer
          }
        >
          <Link
            href={`/${locale}/laporan`}
            className={styles.backButton}
          >
            <span
              className={styles.backIcon}
            >
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
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
            </span>

            <span>
              {t("backToReports")}
            </span>
          </Link>
        </div>

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
                  {t("reportTitle")}
                </h1>

                <span
                  className={
                    styles.status
                  }
                >
                  {t("statusProcessing")}
                </span>
              </div>

              <p>
                {t("createdAt")}
              </p>
            </div>
          </div>

          <div
            className={
              styles.progressTitle
            }
          >
            <span>
              {t("progressTitle")}
            </span>

            <span
              className={
                styles.stepCounter
              }
            >
              {t("stepCounter", {
                current: 3,
                total: 4,
              })}
            </span>
          </div>

          <div
            className={styles.progress}
          >
            <ProgressItem
              number="01"
              label={t("submitted")}
              title={t(
                "submittedTitle"
              )}
              date="06 Sep 2026, 13:20 WIB"
              done
            />

            <ProgressItem
              number="02"
              label={t("verified")}
              title={t(
                "verifiedTitle"
              )}
              date="06 Sep 2026, 14:05 WIB"
              done
            />

            <ProgressItem
              number="03"
              label={t("processed")}
              title={t(
                "processedTitle"
              )}
              date="07 Sep 2026, 09:10 WIB"
              active
            />

            <ProgressItem
              number="04"
              label={t("completed")}
              title={t(
                "completedTitle"
              )}
              date={t("waitingAction")}
              waiting
            />
          </div>
        </section>

        <section
          className={styles.content}
        >
          <div
            className={styles.leftColumn}
          >
            <div
              className={
                styles.detailCard
              }
            >
              <div
                className={
                  styles.sectionTitle
                }
              >
                <Icon>
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="15"
                    rx="2"
                  />
                  <path d="M8 5V3" />
                  <path d="M16 5V3" />
                  <path d="M8 10h8" />
                  <path d="M8 14h8" />
                </Icon>

                <h2>
                  {t("reportDetails")}
                </h2>
              </div>

              <div
                className={
                  styles.infoBox
                }
              >
                <InfoRow
                  label={t("reporter")}
                  value={t("reporterValue")}
                />

                <InfoRow
                  label={t("phone")}
                  value="012345678910"
                />

                <InfoRow
                  label={t("email")}
                  value="hna@gmail.com"
                />

                <InfoRow
                  label={t("location")}
                  value="Lab RPL"
                />

                <InfoRow
                  label={t("itemName")}
                  value={t("itemValue")}
                />

                <div
                  className={
                    styles.infoRow
                  }
                >
                  <span>
                    {t("type")}
                  </span>

                  <strong
                    className={
                      styles.typeBadge
                    }
                  >
                    {t("typeValue")}
                  </strong>
                </div>

                <div
                  className={
                    styles.infoRow
                  }
                >
                  <span>
                    {t("urgency")}
                  </span>

                  <strong
                    className={
                      styles.urgentBadge
                    }
                  >
                    {t("urgencyValue")}
                  </strong>
                </div>
              </div>

              <div
                className={
                  styles.description
                }
              >
                <h3>
                  {t("descriptionTitle")}
                </h3>

                <p>
                  {t("description")}
                </p>
              </div>

              <div
                className={
                  styles.photoSection
                }
              >
                <h3>
                  {t("photoTitle")}
                </h3>

                <div
                  className={
                    styles.photoBox
                  }
                  onClick={() =>
                    setSelectedImage(
                      "/classroom.jpg"
                    )
                  }
                >
                  <img
                    src="/classroom.jpg"
                    alt={t(
                      "photoAlt"
                    )}
                  />

                  <div
                    className={
                      styles.photoOverlay
                    }
                  >
                    <div>
                      <ImageIcon />

                      <span>
                        lampu_proyektor_lab.jpg
                        <small>
                          1.8 MB
                        </small>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        setSelectedImage(
                          "/classroom.jpg"
                        );
                      }}
                    >
                      ⛶{" "}
                      {t("enlarge")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside
            className={styles.chatCard}
          >
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
                  <HeadsetIcon />
                  <span />
                </div>

                <div>
                  <h2>
                    {t("chatTitle")}
                  </h2>

                  <small>
                    {t("active")}
                  </small>
                </div>
              </div>

              <div
                className={
                  styles.deleteMenuWrap
                }
                ref={deleteMenuRef}
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
                  aria-label={t(
                    "manageMessages"
                  )}
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

                      <span>
                        {t(
                          "deleteAll"
                        )}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={
                        startSelectMode
                      }
                    >
                      <CheckIcon />

                      <span>
                        {t(
                          "selectMessages"
                        )}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {selectMode && (
              <div
                className={
                  styles.selectionBar
                }
              >
                <span>
                  {t(
                    "selectedCount",
                    {
                      count:
                        selectedMessages.length,
                    }
                  )}
                </span>

                <div>
                  <button
                    type="button"
                    onClick={
                      selectAllMessages
                    }
                  >
                    {t("selectAll")}
                  </button>

                  <button
                    type="button"
                    onClick={
                      cancelSelectMode
                    }
                  >
                    {t("cancel")}
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
                    {t("delete")}
                  </button>
                </div>
              </div>
            )}

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
                {t("yesterday")}
              </div>

              {messages.map((item) => {
                const selected =
                  selectedMessages.includes(
                    item.id
                  );

                return (
                  <div
                    key={item.id}
                    className={`${styles.messageGroup} ${
                      item.admin
                        ? styles.adminMessage
                        : styles.userMessage
                    } ${
                      selected
                        ? styles.selectedMessage
                        : ""
                    }`}
                  >
                    <div
                      className={
                        styles.messageMetaRow
                      }
                    >
                      {selectMode && (
                        <button
                          type="button"
                          className={`${styles.messageCheckbox} ${
                            selected
                              ? styles.checked
                              : ""
                          }`}
                          onClick={() =>
                            toggleMessageSelection(
                              item.id
                            )
                          }
                          aria-label={t(
                            "selectMessage"
                          )}
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
                      {item.admin && (
                        <div
                          className={
                            styles.smallAvatar
                          }
                        >
                          ADM
                        </div>
                      )}

                      <div
                        className={
                          styles.messageContent
                        }
                      >
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
                              alt={t(
                                "chatImageAlt"
                              )}
                              className={
                                styles.chatImage
                              }
                            />
                          </button>
                        )}

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

                    {!item.admin && (
                      <small
                        className={
                          styles.readStatus
                        }
                      >
                        ✓✓ {t("read")}
                      </small>
                    )}
                  </div>
                );
              })}

              <div
                className={
                  styles.dateLabel
                }
              >
                {t("today")}
              </div>

              <div
                className={styles.typing}
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
                    alt={t(
                      "attachmentPreview"
                    )}
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
                  aria-label={t(
                    "removePhoto"
                  )}
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            <div
              className={
                styles.chatInput
              }
            >
              <input
                ref={
                  cameraInputRef
                }
                type="file"
                accept="image/*"
                capture="environment"
                className={
                  styles.hiddenFileInput
                }
                onChange={
                  handleImageSelected
                }
              />

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
                  onClick={
                    handlePaperclipClick
                  }
                  aria-label={t(
                    "attachPhoto"
                  )}
                >
                  <PaperclipIcon />
                </button>

                {isMobile &&
                  attachmentMenu && (
                    <div
                      className={
                        styles.attachmentMenu
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          cameraInputRef.current?.click()
                        }
                      >
                        <CameraIcon />

                        <span>
                          {t("camera")}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          galleryInputRef.current?.click()
                        }
                      >
                        <ImageIcon />

                        <span>
                          {t("gallery")}
                        </span>
                      </button>
                    </div>
                  )}
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
                placeholder={t(
                  "messagePlaceholder"
                )}
              />

              <button
                type="button"
                className={
                  styles.sendButton
                }
                onClick={
                  sendMessage
                }
                aria-label={t(
                  "sendMessage"
                )}
              >
                <SendIcon />
              </button>
            </div>
          </aside>
        </section>

        {selectedImage && (
          <div
            className={
              styles.imageModal
            }
            onClick={() =>
              setSelectedImage(null)
            }
          >
            <button
              type="button"
              className={
                styles.closeImageButton
              }
              onClick={() =>
                setSelectedImage(null)
              }
              aria-label={t(
                "closePhoto"
              )}
            >
              <CloseIcon />
            </button>

            <img
              src={selectedImage}
              alt={t("largePhotoAlt")}
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

      <Footer />
    </>
  );
}

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
    <div
      className={
        styles.progressItem
      }
    >
      <div
        className={
          styles.progressTop
        }
      >
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
            done
              ? styles.doneLine
              : ""
          }`}
        />
      </div>

      <span
        className={`${styles.progressNumber} ${
          waiting
            ? styles.waitingText
            : ""
        }`}
      >
        {number}. {label}
      </span>

      <strong
        className={
          waiting
            ? styles.waitingText
            : ""
        }
      >
        {title}
      </strong>

      <small>{date}</small>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className={styles.infoRow}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
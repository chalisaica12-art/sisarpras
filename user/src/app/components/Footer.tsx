"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import styles from "./Footer.module.css";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");

  return (
    <footer className={styles.footer}>

      <div className={styles.footerGrid}>

        {/* =========================
            SISARPRAS
        ========================= */}

        <div>
          <strong className={styles.footerLogo}>
            SISARPRAS
          </strong>

          <p>
            {t("description")}
          </p>
        </div>


        {/* =========================
            TAUTAN
        ========================= */}

        <div>
          <strong>
            {t("linksTitle")}
          </strong>

          <Link href={`/${locale}`}>
            {t("home")}
          </Link>

          <Link href={`/${locale}/lapor`}>
            {t("report")}
          </Link>

          <Link href={`/${locale}/laporan`}>
            {t("reports")}
          </Link>
        </div>


        {/* =========================
            ALAMAT
        ========================= */}

        <div>
          <strong>
            {t("addressTitle")}
          </strong>

          <p>
            {t("addressLine1")}
            <br />
            {t("addressLine2")}
            <br />
            {t("addressLine3")}
          </p>
        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className={styles.footerBottom}>

        <span>
          {t("copyright")}
        </span>

        <span>
          {t("tagline")}
        </span>

      </div>

    </footer>
  );
}
import { navbarTranslations } from "./navbar";
import { footerTranslations } from "./footer";
import { homeTranslations } from "./home";
import { reportTranslations } from "./report";
import { reportsTranslations } from "./reports";

export const translations = {
  id: {
    navbar: navbarTranslations.id,
    footer: footerTranslations.id,
    home: homeTranslations.id,
    report: reportTranslations.id,
    reports: reportsTranslations.id,
  },

  en: {
    navbar: navbarTranslations.en,
    footer: footerTranslations.en,
    home: homeTranslations.en,
    report: reportTranslations.en,
    reports: reportsTranslations.en,
  },
} as const;
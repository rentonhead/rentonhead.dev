import { redirect } from "next/navigation";
import { isPublicLocale, localePath } from "@/lib/site";

export default async function LegacyMobileProjects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(isPublicLocale(locale) ? localePath(locale, "/work/brewclock") : "/tr/work/brewclock");
}

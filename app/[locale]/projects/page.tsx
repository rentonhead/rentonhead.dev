import { redirect } from "next/navigation";
import { isPublicLocale, localePath } from "@/lib/site";

export default async function LegacyProjects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(isPublicLocale(locale) ? localePath(locale, "/work") : "/tr/work");
}

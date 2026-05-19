import Link from "next/link";
import type { Metadata } from "next";
import { Post } from "../../lib/interface";
import { client } from "../../lib/sanity";
import { getTranslations, setRequestLocale } from "next-intl/server";

const SITE_URL = "https://rentonhead.dev";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  const url = `${SITE_URL}/${locale}/blog`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/blog`,
        tr: `${SITE_URL}/tr/blog`,
        ru: `${SITE_URL}/ru/blog`,
        "x-default": `${SITE_URL}/en/blog`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      type: "website",
    },
  };
}

async function getData() {
  const query = `*[_type == "post"]`;
  const data = await client.fetch(query);
  return data;
}

export default async function IndexPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const data = (await getData()) as Post[];
  const t = await getTranslations("blog");

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      <div className="space-y-2 pt-8 sm:pt-12 pb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 text-balance">
          {t("title")}
        </h1>
      </div>

      <ul>
        {data.map((post) => (
          <li key={post._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div>
                <p className="text-base font-medium leading-6 text-teal-500">
                  {new Date(post._createdAt).toISOString().split("T")[0]}
                </p>
              </div>

              <Link
                href={`/blog/${post.slug.current}`}
                prefetch
                className="space-y-3 xl:col-span-3"
              >
                <div>
                  <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h3>
                </div>

                <p className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
                  {post.overview}
                </p>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

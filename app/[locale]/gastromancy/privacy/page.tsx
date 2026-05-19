import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Locale = "tr" | "en" | "ru";

const SITE_URL = "https://rentonhead.dev";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.gastromancyPrivacy" });
  const url = `${SITE_URL}/${locale}/gastromancy/privacy`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/gastromancy/privacy`,
        tr: `${SITE_URL}/tr/gastromancy/privacy`,
        ru: `${SITE_URL}/ru/gastromancy/privacy`,
        "x-default": `${SITE_URL}/en/gastromancy/privacy`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      type: "article",
    },
  };
}

type ContactItem = { label: string; value: string; href?: string };

type Section = {
  number: string;
  title: string;
  body: React.ReactNode;
};

type Content = {
  breadcrumbProjects: string;
  breadcrumbMobile: string;
  breadcrumbPrivacy: string;
  appBadge: string;
  title: string;
  effectiveLabel: string;
  effectiveValue: string;
  intro: string;
  sections: Section[];
  contactTitle: string;
  contactIntro: string;
  contactItems: ContactItem[];
};

function getContent(locale: Locale): Content {
  const link = (href: string, text: string) => (
    <a
      key={href}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-rose-500 hover:text-rose-600 underline underline-offset-2 transition-colors"
    >
      {text}
    </a>
  );

  if (locale === "tr") {
    return {
      breadcrumbProjects: "Projeler",
      breadcrumbMobile: "Mobil",
      breadcrumbPrivacy: "Gastromancy Gizlilik Politikası",
      appBadge: "Gastromancy — iOS Uygulaması",
      title: "Gizlilik Politikası",
      effectiveLabel: "Yürürlük tarihi:",
      effectiveValue: "19 Mayıs 2026",
      intro:
        'Gastromancy ("Uygulama", "biz") kişisel verilerinize saygı duyar. Bu Gizlilik Politikası, Uygulamayı kullanırken hangi verilerin işlendiğini, nasıl kullanıldığını ve haklarınızı açıklar.',
      sections: [
        {
          number: "1",
          title: "Veri Sorumlusu",
          body: (
            <p>
              <strong className="text-gray-900 dark:text-white">Hasan Cemil Acar</strong> (bireysel geliştirici)
              <br />
              E-posta:{" "}
              <a
                href="mailto:hello@gastromancy.app"
                className="text-rose-500 hover:text-rose-600 underline underline-offset-2"
              >
                hello@gastromancy.app
              </a>
              <br />
              Uygulama: Gastromancy (App Store Bundle ID:{" "}
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[13px] font-mono text-gray-700 dark:text-gray-300">
                com.gastromancy.app
              </code>
              )
            </p>
          ),
        },
        {
          number: "2",
          title: "Topladığımız Veriler",
          body: (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-2">
                  2.1 Sizin Cihazınızda Saklanan Veriler
                </h3>
                <p>
                  Aşağıdaki veriler{" "}
                  <strong className="text-gray-900 dark:text-white">yalnızca cihazınızda</strong>{" "}
                  (yerel AsyncStorage) tutulur, sunucularımıza gönderilmez:
                </p>
                <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                  <li>İsim ve avatar tercihi (girdiğiniz takdirde)</li>
                  <li>Diyet tercihleri ve alerjenler</li>
                  <li>Kaydedilen tarifler, yemek günlüğü ve serinin (streak) durumu</li>
                  <li>Dolap (pantry) içeriği ve son kullanma tarihleri</li>
                  <li>Aile profilleri (Pro)</li>
                  <li>Alışveriş listesi</li>
                  <li>Pişirme maliyet kayıtları</li>
                  <li>Günlük tarif üretim sayacı (ücretsiz limit takibi)</li>
                  <li>Pro abonelik durumu (yerel önbellek)</li>
                </ul>
                <p className="mt-3">
                  Bu verilere yalnızca cihazınızdaki Uygulama erişebilir. Uygulamayı sildiğinizde tamamı silinir.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-2">
                  2.2 Üçüncü Taraf Servislere Gönderilen Veriler
                </h3>

                <p className="font-medium text-gray-800 dark:text-gray-200 mt-3">
                  a) Google Gemini API (Yapay Zekâ Servisi)
                </p>
                <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                  <li>Tarif üretimi için girdiğiniz malzeme listesi</li>
                  <li>Kamera ile yüklediğiniz buzdolabı / malzeme fotoğrafı (yalnızca malzeme tanıma anında)</li>
                  <li>Diyet kısıtlamaları ve mood seçimi (tarifi kişiselleştirmek için)</li>
                  <li>Aile üyesi diyet profilleri (Pro kullanıcılar)</li>
                </ul>
                <p className="mt-2 text-sm">
                  Google&apos;ın gizlilik politikası:{" "}
                  {link("https://policies.google.com/privacy", "policies.google.com/privacy")}
                </p>

                <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">
                  b) RevenueCat (Abonelik Yönetimi)
                </p>
                <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                  <li>Anonim cihaz tanımlayıcısı (RevenueCat tarafından üretilir)</li>
                  <li>Satın alma durumu (aktif Pro abonelik kontrolü için)</li>
                  <li>App Store satın alma kanıtı (validation için)</li>
                </ul>
                <p className="mt-2 text-sm">
                  RevenueCat&apos;in gizlilik politikası:{" "}
                  {link("https://www.revenuecat.com/privacy", "revenuecat.com/privacy")}
                </p>

                <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">c) Apple App Store</p>
                <p className="mt-2">
                  Abonelikler Apple ID üzerinden işlenir. Kart bilgileriniz Apple tarafından yönetilir; bizimle
                  paylaşılmaz. Apple&apos;ın politikası:{" "}
                  {link("https://www.apple.com/legal/privacy/", "apple.com/legal/privacy")}
                </p>

                <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">
                  d) Sentry (Hata Raporlama — İsteğe Bağlı)
                </p>
                <p className="mt-2">
                  Eğer crash veya hata oluşursa, anonim hata raporları Sentry üzerinden iletilir. Kişisel veri
                  içermez. Yalnızca uygulamayı daha kararlı yapmak için kullanılır.
                </p>
              </div>
            </div>
          ),
        },
        {
          number: "3",
          title: "İzin İstenen Cihaz Özellikleri",
          body: (
            <>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-rose-400">
                <li>
                  <strong className="text-gray-900 dark:text-white">Kamera</strong>: malzeme tanıma fotoğrafı
                  çekmek için (Pro)
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Galeri</strong>: galeriden malzeme fotoğrafı
                  seçmek için
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Mikrofon</strong>: pişirme sırasında sesli
                  komut için
                </li>
              </ul>
              <p className="mt-3">
                Bu izinler yalnızca ilgili özellik kullanıldığında istenir. İstediğiniz an iOS Ayarlar&apos;dan
                kaldırabilirsiniz.
              </p>
            </>
          ),
        },
        {
          number: "4",
          title: "Verilerinizi Kimseyle Paylaşmıyoruz",
          body: (
            <p>
              Üçüncü taraflara reklam, analytics veya satış amaçlı veri satışı yapılmaz. Yalnızca yukarıda
              sayılan teknik servislere (yapay zekâ tarifleri, abonelik doğrulama) gönderilir.
            </p>
          ),
        },
        {
          number: "5",
          title: "Çocuklar",
          body: (
            <p>
              Uygulama 4+ yaş için tasarlanmıştır ancak abonelik satın alma kararı yetişkin onayı gerektirir.
              Apple Family Sharing onayı sürecini Apple yönetir.
            </p>
          ),
        },
        {
          number: "6",
          title: "Otomatik Yenilenen Abonelikler",
          body: (
            <ul className="space-y-1.5 list-disc pl-5 marker:text-rose-400">
              <li>
                Gastromancy Pro: Aylık ₺49,99 veya Yıllık ₺299,99 (App Store fiyatlandırması kullanılır,
                ülkenize göre değişebilir).
              </li>
              <li>
                Yıllık plan ilk kez satın alan kullanıcılar için{" "}
                <strong className="text-gray-900 dark:text-white">7 gün ücretsiz deneme</strong> içerir.
              </li>
              <li>
                Mevcut dönem sona ermeden en az 24 saat önce iptal edilmediği sürece abonelik otomatik yenilenir.
              </li>
              <li>
                Yenileme ücreti mevcut dönemin sona ermesinden 24 saat önce Apple ID&apos;nizden tahsil edilir.
              </li>
              <li>
                Aboneliği{" "}
                <strong className="text-gray-900 dark:text-white">App Store → Hesap → Abonelikler</strong>{" "}
                bölümünden yönetebilir veya iptal edebilirsiniz.
              </li>
              <li>Ücretsiz deneme süresinin kullanılmayan kısmı, abonelik satın alındığında iptal olur.</li>
            </ul>
          ),
        },
        {
          number: "7",
          title: "Haklarınız (KVKK / GDPR)",
          body: (
            <>
              <p>Verileriniz cihazınızda saklandığı için size aittir. Şunları yapma hakkına sahipsiniz:</p>
              <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                <li>Cihazınızdaki tüm verileri Uygulamayı silerek silmek</li>
                <li>Bizimle iletişime geçerek silme / inceleme talep etmek</li>
                <li>Üçüncü taraf servislere veri gönderimini durdurmak (Uygulamayı kullanmamak suretiyle)</li>
              </ul>
            </>
          ),
        },
        {
          number: "8",
          title: "Bu Politikadaki Değişiklikler",
          body: <p>Önemli değişiklikler bu sayfada yayınlanır. Tarihi yukarıda kontrol edebilirsiniz.</p>,
        },
      ],
      contactTitle: "İletişim",
      contactIntro: "Sorularınız için bize doğrudan ulaşabilirsiniz.",
      contactItems: [
        { label: "Geliştirici:", value: "Hasan Cemil Acar" },
        { label: "E-posta:", value: "hello@gastromancy.app", href: "mailto:hello@gastromancy.app" },
      ],
    };
  }

  if (locale === "ru") {
    return {
      breadcrumbProjects: "Проекты",
      breadcrumbMobile: "Мобильные",
      breadcrumbPrivacy: "Политика конфиденциальности Gastromancy",
      appBadge: "Gastromancy — приложение iOS",
      title: "Политика конфиденциальности",
      effectiveLabel: "Дата вступления в силу:",
      effectiveValue: "19 мая 2026 г.",
      intro:
        'Gastromancy («Приложение», «мы») уважает ваши персональные данные. Эта Политика конфиденциальности объясняет, какие данные обрабатываются при использовании Приложения, как они используются, и какие у вас права.',
      sections: [
        {
          number: "1",
          title: "Контролёр данных",
          body: (
            <p>
              <strong className="text-gray-900 dark:text-white">Hasan Cemil Acar</strong> (индивидуальный
              разработчик)
              <br />
              Эл. почта:{" "}
              <a
                href="mailto:hello@gastromancy.app"
                className="text-rose-500 hover:text-rose-600 underline underline-offset-2"
              >
                hello@gastromancy.app
              </a>
              <br />
              Приложение: Gastromancy (Bundle ID:{" "}
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[13px] font-mono text-gray-700 dark:text-gray-300">
                com.gastromancy.app
              </code>
              )
            </p>
          ),
        },
        {
          number: "2",
          title: "Какие данные мы собираем",
          body: (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-2">
                  2.1 Данные, хранящиеся на вашем устройстве
                </h3>
                <p>
                  Следующие данные хранятся{" "}
                  <strong className="text-gray-900 dark:text-white">только на вашем устройстве</strong> (локальный
                  AsyncStorage) и не передаются на наши серверы:
                </p>
                <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                  <li>Имя и аватар (если вы их указали)</li>
                  <li>Диетические предпочтения и аллергены</li>
                  <li>Сохранённые рецепты, дневник питания и состояние серий (streak)</li>
                  <li>Содержимое кладовой (pantry) и сроки годности</li>
                  <li>Профили семьи (Pro)</li>
                  <li>Список покупок</li>
                  <li>Журнал расходов на готовку</li>
                  <li>Дневной счётчик генерации рецептов (учёт бесплатного лимита)</li>
                  <li>Состояние Pro-подписки (локальный кэш)</li>
                </ul>
                <p className="mt-3">
                  Доступ к этим данным имеет только Приложение на вашем устройстве. Удаление Приложения удаляет
                  всё.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-2">
                  2.2 Данные, отправляемые сторонним сервисам
                </h3>

                <p className="font-medium text-gray-800 dark:text-gray-200 mt-3">
                  a) Google Gemini API (сервис ИИ)
                </p>
                <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                  <li>Списки ингредиентов, отправляемые для генерации рецептов</li>
                  <li>Фотографии с камеры для распознавания ингредиентов (только в момент распознавания)</li>
                  <li>Диетические ограничения и выбранное настроение (для персонализации)</li>
                  <li>Диетические профили членов семьи (для пользователей Pro)</li>
                </ul>
                <p className="mt-2 text-sm">
                  Политика конфиденциальности Google:{" "}
                  {link("https://policies.google.com/privacy", "policies.google.com/privacy")}
                </p>

                <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">
                  б) RevenueCat (управление подписками)
                </p>
                <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                  <li>Анонимный идентификатор устройства (генерируется RevenueCat)</li>
                  <li>Состояние покупки (для проверки активной Pro-подписки)</li>
                  <li>Чек App Store (для валидации)</li>
                </ul>
                <p className="mt-2 text-sm">
                  Политика конфиденциальности RevenueCat:{" "}
                  {link("https://www.revenuecat.com/privacy", "revenuecat.com/privacy")}
                </p>

                <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">в) Apple App Store</p>
                <p className="mt-2">
                  Подписки обрабатываются через ваш Apple ID. Платёжные данные управляются Apple и не передаются
                  нам. Политика Apple:{" "}
                  {link("https://www.apple.com/legal/privacy/", "apple.com/legal/privacy")}
                </p>

                <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">
                  г) Sentry (отчёты об ошибках — опционально)
                </p>
                <p className="mt-2">
                  В случае сбоя или ошибки анонимные отчёты отправляются через Sentry. Они не содержат
                  персональных данных. Используются только для повышения стабильности приложения.
                </p>
              </div>
            </div>
          ),
        },
        {
          number: "3",
          title: "Запрашиваемые разрешения устройства",
          body: (
            <>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-rose-400">
                <li>
                  <strong className="text-gray-900 dark:text-white">Камера</strong>: для съёмки фото
                  ингредиентов (Pro)
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Фотобиблиотека</strong>: для выбора фото
                  ингредиентов из галереи
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Микрофон</strong>: для голосовых команд во
                  время готовки
                </li>
              </ul>
              <p className="mt-3">
                Разрешения запрашиваются только при использовании соответствующей функции. Их можно отозвать в
                любое время в Настройках iOS.
              </p>
            </>
          ),
        },
        {
          number: "4",
          title: "Мы не продаём ваши данные",
          body: (
            <p>
              Никакие данные не продаются третьим лицам в рекламных, аналитических или коммерческих целях. Они
              отправляются только техническим сервисам, перечисленным выше (рецепты ИИ, проверка подписки).
            </p>
          ),
        },
        {
          number: "5",
          title: "Дети",
          body: (
            <p>
              Приложение имеет рейтинг 4+, но решения о покупке требуют согласия взрослого. Apple управляет
              процессом одобрения через Family Sharing.
            </p>
          ),
        },
        {
          number: "6",
          title: "Автопродлеваемые подписки",
          body: (
            <ul className="space-y-1.5 list-disc pl-5 marker:text-rose-400">
              <li>
                Gastromancy Pro: ₺49,99 в месяц или ₺299,99 в год (применяются цены App Store, могут отличаться
                по регионам).
              </li>
              <li>
                Годовой план включает{" "}
                <strong className="text-gray-900 dark:text-white">7 дней бесплатного пробного периода</strong>{" "}
                для новых подписчиков.
              </li>
              <li>
                Подписки продлеваются автоматически, если не отменить минимум за 24 часа до конца текущего
                периода.
              </li>
              <li>Оплата списывается с Apple ID в течение 24 часов до окончания периода.</li>
              <li>
                Управлять или отменять подписку можно через{" "}
                <strong className="text-gray-900 dark:text-white">App Store → Аккаунт → Подписки</strong>.
              </li>
              <li>Неиспользованная часть бесплатного периода аннулируется при покупке подписки.</li>
            </ul>
          ),
        },
        {
          number: "7",
          title: "Ваши права (GDPR / CCPA / KVKK)",
          body: (
            <>
              <p>Поскольку ваши данные хранятся на вашем устройстве, они принадлежат вам. Вы имеете право:</p>
              <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                <li>Удалить все данные, удалив Приложение</li>
                <li>Связаться с нами для запроса на удаление или ознакомление</li>
                <li>Прекратить отправку данных третьим сервисам (не используя Приложение)</li>
              </ul>
            </>
          ),
        },
        {
          number: "8",
          title: "Изменения в этой Политике",
          body: <p>Существенные изменения публикуются на этой странице. Дату см. вверху.</p>,
        },
      ],
      contactTitle: "Связаться с нами",
      contactIntro: "По любым вопросам пишите напрямую.",
      contactItems: [
        { label: "Разработчик:", value: "Hasan Cemil Acar" },
        { label: "Эл. почта:", value: "hello@gastromancy.app", href: "mailto:hello@gastromancy.app" },
      ],
    };
  }

  // Default: English
  return {
    breadcrumbProjects: "Projects",
    breadcrumbMobile: "Mobile",
    breadcrumbPrivacy: "Gastromancy Privacy Policy",
    appBadge: "Gastromancy — iOS App",
    title: "Privacy Policy",
    effectiveLabel: "Effective date:",
    effectiveValue: "May 19, 2026",
    intro:
      'Gastromancy ("the App", "we") respects your personal data. This Privacy Policy explains what data is processed, how it is used, and your rights.',
    sections: [
      {
        number: "1",
        title: "Data Controller",
        body: (
          <p>
            <strong className="text-gray-900 dark:text-white">Hasan Cemil Acar</strong> (individual developer)
            <br />
            Email:{" "}
            <a
              href="mailto:hello@gastromancy.app"
              className="text-rose-500 hover:text-rose-600 underline underline-offset-2"
            >
              hello@gastromancy.app
            </a>
            <br />
            App: Gastromancy (Bundle ID:{" "}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[13px] font-mono text-gray-700 dark:text-gray-300">
              com.gastromancy.app
            </code>
            )
          </p>
        ),
      },
      {
        number: "2",
        title: "Data We Collect",
        body: (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-2">
                2.1 Data Stored On Your Device
              </h3>
              <p>
                The following data is stored{" "}
                <strong className="text-gray-900 dark:text-white">only on your device</strong> (local
                AsyncStorage) and never sent to our servers:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                <li>Name and avatar (if you set them)</li>
                <li>Dietary preferences and allergens</li>
                <li>Saved recipes, food journal and streak state</li>
                <li>Pantry contents and expiry dates</li>
                <li>Household profiles (Pro)</li>
                <li>Shopping list</li>
                <li>Cooking cost log</li>
                <li>Daily recipe generation counter (free tier tracking)</li>
                <li>Pro subscription state (local cache)</li>
              </ul>
              <p className="mt-3">
                This data is accessible only by the App on your device. Deleting the App removes everything.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-[15px] mb-2">
                2.2 Data Sent To Third-Party Services
              </h3>

              <p className="font-medium text-gray-800 dark:text-gray-200 mt-3">
                a) Google Gemini API (AI Service)
              </p>
              <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                <li>Ingredient lists you submit for recipe generation</li>
                <li>
                  Photos you take with the camera for ingredient recognition (only at the moment of recognition)
                </li>
                <li>Dietary restrictions and mood selection (for personalization)</li>
                <li>Household member dietary profiles (Pro users)</li>
              </ul>
              <p className="mt-2 text-sm">
                Google&apos;s privacy policy:{" "}
                {link("https://policies.google.com/privacy", "policies.google.com/privacy")}
              </p>

              <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">
                b) RevenueCat (Subscription Management)
              </p>
              <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-rose-400">
                <li>An anonymous device identifier (generated by RevenueCat)</li>
                <li>Purchase state (to check active Pro subscription)</li>
                <li>App Store receipt (for validation)</li>
              </ul>
              <p className="mt-2 text-sm">
                RevenueCat&apos;s privacy policy:{" "}
                {link("https://www.revenuecat.com/privacy", "revenuecat.com/privacy")}
              </p>

              <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">c) Apple App Store</p>
              <p className="mt-2">
                Subscriptions are processed through your Apple ID. Payment information is managed by Apple and
                never shared with us. Apple&apos;s policy:{" "}
                {link("https://www.apple.com/legal/privacy/", "apple.com/legal/privacy")}
              </p>

              <p className="font-medium text-gray-800 dark:text-gray-200 mt-5">
                d) Sentry (Crash Reporting — Optional)
              </p>
              <p className="mt-2">
                If a crash or error occurs, anonymous reports are sent via Sentry. No personal data is included.
                Used solely to improve app stability.
              </p>
            </div>
          </div>
        ),
      },
      {
        number: "3",
        title: "Device Permissions",
        body: (
          <>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-rose-400">
              <li>
                <strong className="text-gray-900 dark:text-white">Camera</strong>: to scan ingredients via photo
                (Pro)
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Photo Library</strong>: to pick an ingredient
                photo from your gallery
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Microphone</strong>: for voice commands while
                cooking
              </li>
            </ul>
            <p className="mt-3">
              Permissions are requested only when the feature is used. You can revoke them anytime in iOS
              Settings.
            </p>
          </>
        ),
      },
      {
        number: "4",
        title: "We Do Not Sell Your Data",
        body: (
          <p>
            No data is sold to third parties for advertising, analytics, or any commercial purpose. Data is sent
            only to the technical services listed above (AI recipes, subscription validation).
          </p>
        ),
      },
      {
        number: "5",
        title: "Children",
        body: (
          <p>
            The App is rated 4+, but purchase decisions require adult consent. Apple manages the Family Sharing
            approval flow.
          </p>
        ),
      },
      {
        number: "6",
        title: "Auto-Renewable Subscriptions",
        body: (
          <ul className="space-y-1.5 list-disc pl-5 marker:text-rose-400">
            <li>
              Gastromancy Pro: ₺49.99 monthly or ₺299.99 yearly (App Store pricing applies, may vary by region).
            </li>
            <li>
              The yearly plan includes a{" "}
              <strong className="text-gray-900 dark:text-white">7-day free trial</strong> for first-time
              subscribers.
            </li>
            <li>
              Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current period.
            </li>
            <li>Renewal is charged to your Apple ID within 24 hours before the period ends.</li>
            <li>
              You can manage or cancel via{" "}
              <strong className="text-gray-900 dark:text-white">App Store → Account → Subscriptions</strong>.
            </li>
            <li>Any unused portion of a free trial is forfeited when a subscription is purchased.</li>
          </ul>
        ),
      },
      {
        number: "7",
        title: "Your Rights (GDPR / CCPA / KVKK)",
        body: (
          <>
            <p>Because your data is stored on your device, it belongs to you. You have the right to:</p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-rose-400">
              <li>Delete all data by uninstalling the App</li>
              <li>Contact us to request deletion or review</li>
              <li>Stop data being sent to third parties (by not using the App)</li>
            </ul>
          </>
        ),
      },
      {
        number: "8",
        title: "Changes to This Policy",
        body: <p>Material changes are published on this page. Check the date at the top.</p>,
      },
    ],
    contactTitle: "Contact Us",
    contactIntro: "For any questions, reach out to us directly.",
    contactItems: [
      { label: "Developer:", value: "Hasan Cemil Acar" },
      { label: "Email:", value: "hello@gastromancy.app", href: "mailto:hello@gastromancy.app" },
    ],
  };
}

export default function GastromancyPrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const c = getContent((["tr", "en", "ru"].includes(locale) ? locale : "en") as Locale);

  const contactNumber = String(c.sections.length + 1);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "tr" ? "Ana Sayfa" : locale === "ru" ? "Главная" : "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.breadcrumbProjects, item: `${SITE_URL}/${locale}/projects` },
      { "@type": "ListItem", position: 3, name: c.breadcrumbMobile, item: `${SITE_URL}/${locale}/projects/mobile` },
      { "@type": "ListItem", position: 4, name: c.breadcrumbPrivacy, item: `${SITE_URL}/${locale}/gastromancy/privacy` },
    ],
  };

  return (
    <div className="max-w-3xl pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 pt-6 mb-10 flex-wrap">
        <Link href="/projects" className="hover:text-teal-500 transition-colors duration-150">
          {c.breadcrumbProjects}
        </Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/projects/mobile" className="hover:text-teal-500 transition-colors duration-150">
          {c.breadcrumbMobile}
        </Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-600 dark:text-gray-400 font-medium">{c.breadcrumbPrivacy}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 mb-6">
          <span className="flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-rose-500 to-orange-600 flex-shrink-0">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </span>
          <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 tracking-wide">
            {c.appBadge}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight mb-4 text-balance">
          {c.title}
        </h1>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {c.effectiveLabel}{" "}
            <strong className="text-gray-700 dark:text-gray-300">{c.effectiveValue}</strong>
          </span>
        </div>

        <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] text-pretty">
          {c.intro}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {c.sections.map((section) => (
          <section key={section.number} id={`section-${section.number}`} className="scroll-mt-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-rose-400 to-orange-500 text-white text-xs font-bold flex-shrink-0 shadow-sm">
                {section.number}
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 text-balance">
                {section.title}
              </h2>
            </div>
            <div className="pl-10 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] space-y-3">
              {section.body}
            </div>
          </section>
        ))}

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <section id="section-contact" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-rose-400 to-orange-500 text-white text-xs font-bold flex-shrink-0 shadow-sm">
              {contactNumber}
            </span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{c.contactTitle}</h2>
          </div>
          <div className="pl-10">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] mb-4">
              {c.contactIntro}
            </p>
            <div className="inline-flex flex-col gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              {c.contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 text-sm">
                  <svg
                    className="w-4 h-4 text-rose-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    {item.href ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    )}
                  </svg>
                  <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-semibold text-rose-500 hover:text-rose-600 transition-colors underline underline-offset-2"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

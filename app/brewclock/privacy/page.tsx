import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – BrewClock | rentonhead.dev",
  description:
    "Privacy Policy for the BrewClock iOS app by Hasan Cemil Acar. Learn how we handle your data.",
};

const sections = [
  {
    number: "1",
    title: "Introduction",
    content: (
      <>
        <p>
          Hasan Cemil Acar (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) built the <strong>BrewClock</strong> app.
          This SERVICE is provided by Hasan Cemil Acar and is intended for use as is.
          This page is used to inform users regarding our policies with the collection, use,
          and disclosure of Personal Information if anyone decides to use our Service.
        </p>
        <p className="mt-3">
          By choosing to use our Service, you agree to the collection and use of information
          in relation to this policy.
        </p>
      </>
    ),
  },
  {
    number: "2",
    title: "Information Collection and Use",
    content: (
      <>
        <p>
          BrewClock is designed as a coffee timer and data storage application. To provide
          a better experience while using our Service, we may require you to provide us with
          certain information. The information that we request will be retained and used as
          described in this privacy policy.
        </p>
        <ul className="mt-4 space-y-4">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              ),
              label: "Local Data Storage",
              desc: "Most of your brewing data, timers, and preferences are saved locally on your device to ensure maximum privacy and fast access.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              ),
              label: "Cloud Syncing",
              desc: "The app may utilize native cloud services (such as Apple iCloud) to sync your data across your personal devices. We do not have direct access to, nor do we collect, your personal iCloud data on our own servers.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              ),
              label: "Location Data",
              desc: "BrewClock may request access to your device's location to help you find nearby coffee shops. Location data is used only within the app in real time and is not transmitted to our servers or shared with third parties.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              ),
              label: "Photo Library",
              desc: "BrewClock may request access to your photo library to allow you to add images to your coffee bean entries and save recipe cards. Photos are stored locally on your device and are not uploaded to our servers.",
            },
          ].map((item) => (
            <li key={item.label} className="flex gap-4">
              <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {item.icon}
                </svg>
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.label}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "3",
    title: "Third-Party Services",
    content: (
      <p>
        BrewClock uses <strong>RevenueCat</strong> to process in-app purchases and subscriptions.
        RevenueCat may collect purchase history and device identifiers to manage your subscription
        status. Please refer to RevenueCat&apos;s Privacy Policy at{" "}
        <a
          href="https://www.revenuecat.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-500 hover:text-amber-600 underline underline-offset-2 transition-colors"
        >
          revenuecat.com/privacy
        </a>{" "}
        for more information.
      </p>
    ),
  },
  {
    number: "4",
    title: "Subscriptions and Cancellation",
    content: (
      <p>
        BrewClock offers premium features through auto-renewing subscriptions. You can manage
        and cancel your subscriptions at any time through your <strong>Apple ID account settings</strong>.
        If you cancel your subscription, you will continue to have access to the premium features
        until the end of your current billing period.
      </p>
    ),
  },
  {
    number: "5",
    title: "Log Data and Analytics",
    content: (
      <p>
        We want to inform you that whenever you use our Service, in a case of an error in
        the app, we collect data and information (through standard first-party or third-party
        products) on your phone called Log Data. This Log Data may include information such
        as your device Internet Protocol (&quot;IP&quot;) address, device name, operating system
        version, the configuration of the app when utilizing our Service, the time and date
        of your use of the Service, and other diagnostic statistics. This data is used solely
        to improve the app&apos;s stability and performance.
      </p>
    ),
  },
  {
    number: "6",
    title: "Security",
    content: (
      <p>
        We value your trust in providing us your Personal Information, thus we are striving
        to use commercially acceptable means of protecting it. Please remember that no method
        of transmission over the internet, or method of electronic storage is 100% secure and
        reliable, and we cannot guarantee its absolute security.
      </p>
    ),
  },
  {
    number: "7",
    title: "Children's Privacy",
    content: (
      <p>
        These Services do not address anyone under the age of 13. We do not knowingly collect
        personally identifiable information from children under 13 years of age. If we discover
        that a child under 13 has provided us with personal information, we immediately delete
        this from our records. If you are a parent or guardian and you are aware that your child
        has provided us with personal information, please contact us so that we will be able
        to take the necessary actions.
      </p>
    ),
  },
  {
    number: "8",
    title: "Changes to This Privacy Policy",
    content: (
      <p>
        We may update our Privacy Policy from time to time. Thus, you are advised to review
        this page periodically for any changes. We will notify you of any changes by posting
        the new Privacy Policy on this page. These changes are effective immediately after
        they are posted on this page.
      </p>
    ),
  },
];

export default function BrewClockPrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 pt-6 mb-10">
        <Link href="/projects" className="hover:text-teal-500 transition-colors duration-150">Projects</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/projects/mobile" className="hover:text-teal-500 transition-colors duration-150">Mobile</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-600 dark:text-gray-400 font-medium">BrewClock Privacy Policy</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        {/* App badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
          <span className="flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </span>
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 tracking-wide">BrewClock — iOS App</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Privacy Policy
        </h1>

        {/* Effective date pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Effective Date: <strong className="text-gray-700 dark:text-gray-300">May 14, 2026</strong></span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {sections.map((section) => (
          <section
            key={section.number}
            id={`section-${section.number}`}
            className="scroll-mt-8"
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-bold flex-shrink-0 shadow-sm">
                {section.number}
              </span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {section.title}
              </h2>
            </div>

            <div className="pl-10 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
              {section.content}
            </div>
          </section>
        ))}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        {/* Contact section */}
        <section id="section-contact" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-bold flex-shrink-0 shadow-sm">
              9
            </span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Contact Us</h2>
          </div>

          <div className="pl-10">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] mb-4">
              If you have any questions, concerns, or suggestions about our Privacy Policy, do
              not hesitate to contact us directly.
            </p>

            <div className="inline-flex flex-col gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5 text-sm">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Developer:</span>
                <span className="font-semibold text-gray-900 dark:text-white">Hasan Cemil Acar</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                <a
                  href="mailto:rentonhead@gmail.com"
                  className="font-semibold text-amber-500 hover:text-amber-600 transition-colors underline underline-offset-2"
                >
                  rentonhead@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

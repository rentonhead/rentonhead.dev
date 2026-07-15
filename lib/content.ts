import type { PublicLocale } from "./site";

export type ProjectSlug = "brewclock" | "castor-coffee-mobile" | "rentonsoft" | "okulsistem";

export type Project = {
  slug: ProjectSlug;
  name: string;
  category: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  statement: string;
  problem: string;
  approach: string;
  result: string;
  responsibilities: string[];
  sourceHref?: string;
  accent: "amber" | "coral" | "mint" | "blue";
};

type Capability = {
  title: string;
  description: string;
  outputs: string;
  tools: string;
};

type SiteContent = {
  nav: { work: string; capabilities: string; about: string; contact: string; availability: string; menu: string };
  common: {
    eyebrow: string;
    viewWork: string;
    startProject: string;
    readCase: string;
    viewAllWork: string;
    email: string;
    external: string;
    source: string;
    nextProject: string;
    backToWork: string;
  };
  home: {
    kicker: string;
    title: string;
    intro: string;
    availability: string;
    workEyebrow: string;
    workTitle: string;
    capabilitiesEyebrow: string;
    capabilitiesTitle: string;
    bridgeEyebrow: string;
    bridgeTitle: string;
    bridgeBody: string;
    processEyebrow: string;
    processTitle: string;
    process: { title: string; body: string }[];
    ecosystemEyebrow: string;
    ecosystemTitle: string;
    ecosystemBody: string;
    contactEyebrow: string;
    contactTitle: string;
    contactBody: string;
  };
  work: { eyebrow: string; title: string; intro: string };
  capabilitiesPage: { eyebrow: string; title: string; intro: string; bridgeTitle: string; bridgeBody: string };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string[];
    factsTitle: string;
    facts: { question: string; answer: string }[];
  };
  contact: { eyebrow: string; title: string; intro: string; emailLabel: string; networkTitle: string; availability: string };
  footer: { descriptor: string; rights: string; turkish: string; business: string };
  capabilities: Capability[];
  projects: Project[];
  projectLabels: {
    overview: string;
    role: string;
    year: string;
    technology: string;
    problem: string;
    approach: string;
    result: string;
    responsibilities: string;
  };
};

const en: SiteContent = {
  nav: {
    work: "Work",
    capabilities: "Capabilities",
    about: "About",
    contact: "Contact",
    availability: "Available for selected projects",
    menu: "Menu",
  },
  common: {
    eyebrow: "Hasan Cemil Acar · rentonhead",
    viewWork: "View selected work",
    startProject: "Start a project",
    readCase: "Read case study",
    viewAllWork: "View all work",
    email: "Email Hasan",
    external: "External website",
    source: "View public repository",
    nextProject: "Next project",
    backToWork: "Back to work",
  },
  home: {
    kicker: "Independent creative technology practice · Istanbul ↔ Moscow",
    title: "Art direction and engineering, in one continuous practice.",
    intro:
      "I’m Hasan Cemil Acar, known as rentonhead — an Art Director & Programmer designing and building native apps, digital products, modern web experiences and brand systems for international teams.",
    availability: "Selected collaborations · Worldwide",
    workEyebrow: "Selected work",
    workTitle: "Products shaped from first idea to working system.",
    capabilitiesEyebrow: "Capabilities",
    capabilitiesTitle: "Creative direction with technical consequence.",
    bridgeEyebrow: "Design + engineering",
    bridgeTitle: "The visual idea survives the build.",
    bridgeBody:
      "Strategy, interface design and implementation happen at the same desk. Technical constraints inform the concept early; the design system stays intact through SwiftUI, Next.js, React Native or WordPress delivery.",
    processEyebrow: "Working method",
    processTitle: "A small, direct process with fewer handoffs.",
    process: [
      { title: "Discover", body: "Clarify the real problem, audience, constraints and signals of success." },
      { title: "Define", body: "Set the product narrative, information architecture and technical direction." },
      { title: "Design", body: "Build the visual system and interaction model around real content." },
      { title: "Build", body: "Turn the approved direction into a responsive, maintainable product." },
      { title: "Refine & ship", body: "Test edge cases, performance and accessibility before release." },
    ],
    ecosystemEyebrow: "Brand network",
    ecosystemTitle: "One person, three distinct contexts.",
    ecosystemBody:
      "rentonhead is the global creative technology practice. The Turkish personal profile lives on HasanCemilAcar.com.tr; commercial digital services for businesses in Türkiye live under RentonDiji.",
    contactEyebrow: "Contact",
    contactTitle: "Have a product that needs both a point of view and working code?",
    contactBody: "Share the context, desired outcome and timing. A short email is enough to start.",
  },
  work: {
    eyebrow: "Selected work · 2024–2026",
    title: "Digital products, operating systems and mobile experiences.",
    intro:
      "A focused selection of real products spanning native iOS, React Native, commerce, hospitality operations and school finance. No invented outcomes or decorative case-study metrics.",
  },
  capabilitiesPage: {
    eyebrow: "Capabilities",
    title: "From identity and interface to production code.",
    intro:
      "Engagements can begin with direction, design or an existing codebase. The useful difference is continuity: the same product logic carries through every layer.",
    bridgeTitle: "A partner for the ambiguous middle.",
    bridgeBody:
      "The work is especially useful when a product needs visual quality, technical judgment and a clear path to release without splitting those decisions across disconnected teams.",
  },
  about: {
    eyebrow: "About",
    title: "Hasan Cemil Acar is an Art Director & Programmer working as rentonhead.",
    intro:
      "He combines product design, visual direction and software development to take digital products from identity to working code.",
    body: [
      "Hasan works between Istanbul and Moscow with clients and collaborators internationally. His practice includes native iOS development with Swift and SwiftUI, React and Next.js web engineering, React Native mobile products, commerce systems and custom WordPress development.",
      "On the creative side, he works with Figma and Adobe tools across product interfaces, brand systems and App Store presentation. On the technical side, he designs maintainable component systems, application architecture and the production path needed to ship.",
      "rentonhead is the global personal practice — not a full-service agency. Turkish personal work and profile content are published separately, while business software and local digital services in Türkiye are represented by RentonDiji.",
    ],
    factsTitle: "Direct answers",
    facts: [
      { question: "Who is rentonhead?", answer: "rentonhead is the global creative and technical identity of Hasan Cemil Acar." },
      { question: "What does Hasan design and build?", answer: "Native iOS apps, digital product interfaces, modern web products, commerce systems, custom WordPress tools and App Store visuals." },
      { question: "Which technologies are used?", answer: "Swift, SwiftUI, TypeScript, React, Next.js, React Native, Node.js, PHP, WordPress, WooCommerce, PostgreSQL, MySQL and Redis, chosen to match the product." },
      { question: "Does rentonhead work internationally?", answer: "Yes. The practice is based between Istanbul and Moscow and is available for selected international projects." },
      { question: "How are the three websites related?", answer: "rentonhead.dev is the global practice, HasanCemilAcar.com.tr is the Turkish personal portfolio, and RentonDiji serves businesses in Türkiye." },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Start with the problem, not a long form.",
    intro: "Send a short note about the product, the people it serves and where the work currently stands.",
    emailLabel: "Primary contact",
    networkTitle: "Elsewhere",
    availability: "Available for selected product, mobile and web collaborations worldwide.",
  },
  footer: {
    descriptor: "Art Director & Programmer · Istanbul ↔ Moscow · Working globally",
    rights: "All rights reserved.",
    turkish: "Turkish profile",
    business: "Business solutions in Türkiye",
  },
  capabilities: [
    { title: "Product & Creative Direction", description: "Positioning, product narrative, interface direction and visual systems that give the work a coherent point of view.", outputs: "Direction · Product framing · Design systems", tools: "Figma · Adobe Creative Suite" },
    { title: "Native iOS Development", description: "Purpose-built iPhone experiences with a native interaction model, clear architecture and an App Store-ready delivery path.", outputs: "SwiftUI apps · Prototypes · App Store delivery", tools: "Swift · SwiftUI · Core Data" },
    { title: "Web Engineering", description: "Fast, accessible product and portfolio experiences with a maintainable component and content architecture.", outputs: "Web products · Frontends · Design systems", tools: "Next.js · React · TypeScript" },
    { title: "Commerce & WordPress Systems", description: "Commerce flows and custom operational tooling that extend WordPress and WooCommerce around real business needs.", outputs: "Stores · Plugins · Integrations", tools: "PHP · WordPress · WooCommerce" },
    { title: "Brand & App Store Visuals", description: "Identity systems, launch graphics and App Store narratives that translate product value into a clear visual story.", outputs: "Identity · Launch kits · Store visuals", tools: "Figma · Photoshop · Illustrator" },
    { title: "SEO & Digital Visibility", description: "Technical foundations and structured content that help people and AI-assisted search understand the product accurately.", outputs: "Technical SEO · Content structure · GEO", tools: "Next.js Metadata · Schema.org · Search Console" },
  ],
  projects: [
    {
      slug: "brewclock",
      name: "BrewClock",
      category: "Native iOS product",
      year: "2024",
      role: "Product design · iOS engineering",
      stack: ["Swift", "SwiftUI", "Core Data"],
      summary: "A native brewing companion that brings recipe timing, coffee tools and daily ritual into a focused iOS experience.",
      statement: "A calm native tool for a ritual that depends on time, sequence and attention.",
      problem: "Brewing guides often separate reference material, timing and personal routines. The product needed to keep those actions close without turning a simple ritual into a busy dashboard.",
      approach: "The interface was designed around quick recognition, native controls and a compact visual language. SwiftUI keeps interaction and layout aligned with the iOS platform while Core Data supports local continuity.",
      result: "A coherent native product foundation with reusable visual assets, brewing views and an architecture that can grow without abandoning the focused core experience.",
      responsibilities: ["Product concept and interaction direction", "SwiftUI interface implementation", "Visual asset and icon system", "Local data architecture"],
      accent: "amber",
    },
    {
      slug: "castor-coffee-mobile",
      name: "Castor Coffee Mobile",
      category: "Mobile commerce & loyalty",
      year: "2026",
      role: "Product direction · Mobile architecture",
      stack: ["React Native", "Expo", "TypeScript", "Zustand"],
      summary: "One mobile system for specialty e-commerce, in-cafe QR ordering and a digital loyalty identity.",
      statement: "Three customer contexts, one design system and one coherent mobile product.",
      problem: "Shopping from home, ordering at a table and identifying at the cashier have different data and checkout needs. Treating them as separate apps would fragment both the customer relationship and the product system.",
      approach: "A context switcher changes product sources, cart rules and calls to action while shared tokens and components preserve familiarity. Typed services keep the mock and future WooCommerce or cafe endpoints interchangeable.",
      result: "A demonstrable offline mobile product with completed commerce, QR, loyalty, wallet and subscription flows, ready for live backend connections.",
      responsibilities: ["Product architecture and mode model", "Design-system translation", "Mobile navigation and state strategy", "Commerce, QR and loyalty flow definition"],
      sourceHref: "https://github.com/rentonhead/CastorCoffee-ReactNative-MobileIOS_Android",
      accent: "coral",
    },
    {
      slug: "rentonsoft",
      name: "RentonSoft",
      category: "Restaurant operations platform",
      year: "2026",
      role: "Product architecture · Full-stack engineering",
      stack: ["NestJS", "React", "PostgreSQL", "Prisma", "Socket.IO"],
      summary: "A role-based restaurant system connecting table service, counter sales, kitchen display, cashier, shifts and reporting.",
      statement: "A real-time operating layer for the moments between an order, the kitchen and payment.",
      problem: "Restaurant workflows split across waiters, kitchen, bar and cashier. Every handoff needs the same order state, clear permissions and safe payment behavior without slowing service.",
      approach: "The system uses a typed monorepo, transactional order and payment rules, real-time role-based rooms and dedicated surfaces for each job rather than one overloaded admin screen.",
      result: "A deployable operations platform supporting dine-in and self-service flows, kitchen routing, split payments, shifts, refunds and management reporting.",
      responsibilities: ["System and domain architecture", "Role-based UX flows", "Realtime and payment state design", "Production deployment model"],
      accent: "mint",
    },
    {
      slug: "okulsistem",
      name: "OkulSistem",
      category: "School management & finance",
      year: "2026",
      role: "Product architecture · Full-stack engineering",
      stack: ["Next.js", "NestJS", "MySQL", "Redis", "BullMQ"],
      summary: "A modular school platform spanning administration, parent access, finance, payments, documents and communication.",
      statement: "Complex school operations translated into role-specific, auditable workflows.",
      problem: "Student records, installments, online payments, receipts, communication and consent data carry different permissions and operational risks. The platform needed clear boundaries without fragmenting the school’s daily work.",
      approach: "The product is structured as modular frontend and backend applications with role-based access, audit logging, queued notifications and payment flows that never persist card data.",
      result: "A scalable foundation for administration, teachers, finance staff and parents with security and traceability treated as product requirements.",
      responsibilities: ["Information architecture and module boundaries", "Finance and payment workflow design", "Role and permission model", "Frontend and backend product integration"],
      accent: "blue",
    },
  ],
  projectLabels: {
    overview: "Project overview",
    role: "Role",
    year: "Year",
    technology: "Technology",
    problem: "Problem",
    approach: "Approach",
    result: "Result",
    responsibilities: "Responsibilities",
  },
};

const ru: SiteContent = {
  ...en,
  nav: {
    work: "Проекты",
    capabilities: "Компетенции",
    about: "Обо мне",
    contact: "Контакты",
    availability: "Открыт к избранным проектам",
    menu: "Меню",
  },
  common: {
    ...en.common,
    viewWork: "Смотреть проекты",
    startProject: "Обсудить проект",
    readCase: "О проекте",
    viewAllWork: "Все проекты",
    email: "Написать Хасану",
    external: "Внешний сайт",
    source: "Открытый репозиторий",
    nextProject: "Следующий проект",
    backToWork: "Назад к проектам",
  },
  home: {
    kicker: "Независимая практика креативных технологий · Стамбул ↔ Москва",
    title: "Арт-дирекшн и разработка как единый процесс.",
    intro:
      "Я Хасан Джемиль Аджар, также известный как rentonhead — арт-директор и программист. Проектирую и создаю нативные приложения, цифровые продукты, современные веб-сервисы и визуальные системы для международных команд.",
    availability: "Избранные коллаборации · По всему миру",
    workEyebrow: "Избранные проекты",
    workTitle: "От первой идеи до работающей системы.",
    capabilitiesEyebrow: "Компетенции",
    capabilitiesTitle: "Креативное направление, которое учитывает реализацию.",
    bridgeEyebrow: "Дизайн + разработка",
    bridgeTitle: "Визуальная идея не теряется на этапе сборки.",
    bridgeBody:
      "Стратегия, интерфейс и реализация создаются за одним столом. Технические ограничения учитываются ещё в концепции, а дизайн-система сохраняет качество в SwiftUI, Next.js, React Native и WordPress.",
    processEyebrow: "Подход к работе",
    processTitle: "Компактный прямой процесс без лишних передач между командами.",
    process: [
      { title: "Исследование", body: "Определяю задачу, аудиторию, ограничения и реальные критерии результата." },
      { title: "Фокус", body: "Формирую продуктовую логику, структуру контента и техническое направление." },
      { title: "Дизайн", body: "Создаю визуальную систему и модель взаимодействия на реальном контенте." },
      { title: "Разработка", body: "Превращаю выбранное направление в адаптивный и поддерживаемый продукт." },
      { title: "Доработка и запуск", body: "Проверяю крайние сценарии, скорость и доступность перед релизом." },
    ],
    ecosystemEyebrow: "Система брендов",
    ecosystemTitle: "Один автор — три разных контекста.",
    ecosystemBody:
      "rentonhead — международная практика креативных технологий. Турецкое персональное портфолио находится на HasanCemilAcar.com.tr, а цифровые услуги для бизнеса в Турции представлены брендом RentonDiji.",
    contactEyebrow: "Контакты",
    contactTitle: "Продукту нужны и сильная позиция, и работающий код?",
    contactBody: "Расскажите о контексте, желаемом результате и сроках. Для начала достаточно короткого письма.",
  },
  work: {
    eyebrow: "Избранные проекты · 2024–2026",
    title: "Цифровые продукты, операционные системы и мобильные приложения.",
    intro:
      "Реальные проекты в нативной iOS-разработке, React Native, коммерции, ресторанных операциях и школьных финансах — без выдуманных результатов и декоративных метрик.",
  },
  capabilitiesPage: {
    eyebrow: "Компетенции",
    title: "От визуальной идентичности и интерфейса до продакшен-кода.",
    intro:
      "Работу можно начать со стратегии, дизайна или существующего кода. Главное преимущество — непрерывность продуктовой логики на каждом уровне.",
    bridgeTitle: "Партнёр для самой неоднозначной части продукта.",
    bridgeBody:
      "Такой формат особенно полезен, когда проекту одновременно нужны визуальное качество, техническая точность и ясный путь к релизу.",
  },
  about: {
    eyebrow: "Обо мне",
    title: "Хасан Джемиль Аджар — арт-директор и программист, работающий под именем rentonhead.",
    intro: "Он объединяет продуктовый дизайн, визуальное направление и разработку, доводя цифровые продукты от идентичности до работающего кода.",
    body: [
      "Хасан работает между Стамбулом и Москвой с международными клиентами и командами. Практика включает нативную iOS-разработку на Swift и SwiftUI, веб-продукты на React и Next.js, мобильные приложения React Native, коммерческие системы и кастомную разработку для WordPress.",
      "В креативной части он использует Figma и Adobe для интерфейсов, айдентики и материалов App Store. В технической — проектирует поддерживаемые компоненты, архитектуру приложений и понятный путь к запуску.",
      "rentonhead — международная персональная практика, а не агентство полного цикла. Турецкое портфолио публикуется отдельно, а бизнес-сервисы и локальные цифровые решения в Турции представлены RentonDiji.",
    ],
    factsTitle: "Коротко и прямо",
    facts: [
      { question: "Кто такой rentonhead?", answer: "rentonhead — международная креативная и техническая идентичность Хасана Джемиля Аджара." },
      { question: "Что Хасан проектирует и разрабатывает?", answer: "Нативные iOS-приложения, интерфейсы цифровых продуктов, современные веб-сервисы, e-commerce, инструменты WordPress и визуалы для App Store." },
      { question: "Какие технологии он использует?", answer: "Swift, SwiftUI, TypeScript, React, Next.js, React Native, Node.js, PHP, WordPress, WooCommerce, PostgreSQL, MySQL и Redis — в зависимости от задачи." },
      { question: "Работает ли rentonhead с международными клиентами?", answer: "Да. Практика базируется между Стамбулом и Москвой и открыта к избранным международным проектам." },
      { question: "Как связаны три сайта?", answer: "rentonhead.dev — международная практика, HasanCemilAcar.com.tr — турецкое персональное портфолио, RentonDiji — решения для бизнеса в Турции." },
    ],
  },
  contact: {
    eyebrow: "Контакты",
    title: "Начните с задачи, а не с длинной формы.",
    intro: "Напишите коротко о продукте, его аудитории и текущем состоянии работы.",
    emailLabel: "Основной контакт",
    networkTitle: "Другие площадки",
    availability: "Открыт к избранным продуктовым, мобильным и веб-проектам по всему миру.",
  },
  footer: {
    descriptor: "Арт-директор и программист · Стамбул ↔ Москва · Работаю глобально",
    rights: "Все права защищены.",
    turkish: "Профиль на турецком",
    business: "Решения для бизнеса в Турции",
  },
  capabilities: [
    { title: "Продуктовое и креативное направление", description: "Позиционирование, продуктовая история, интерфейсное направление и визуальные системы с цельной точкой зрения.", outputs: "Направление · Структура продукта · Дизайн-системы", tools: "Figma · Adobe Creative Suite" },
    { title: "Нативная iOS-разработка", description: "Нативные iPhone-приложения с естественной моделью взаимодействия, ясной архитектурой и подготовкой к App Store.", outputs: "SwiftUI · Прототипы · Публикация", tools: "Swift · SwiftUI · Core Data" },
    { title: "Веб-разработка", description: "Быстрые и доступные продукты и портфолио с поддерживаемой системой компонентов и контента.", outputs: "Веб-продукты · Frontend · Дизайн-системы", tools: "Next.js · React · TypeScript" },
    { title: "E-commerce и WordPress", description: "Коммерческие сценарии и операционные инструменты, расширяющие WordPress и WooCommerce под реальные задачи бизнеса.", outputs: "Магазины · Плагины · Интеграции", tools: "PHP · WordPress · WooCommerce" },
    { title: "Айдентика и визуалы App Store", description: "Фирменные системы, графика запуска и истории для App Store, ясно передающие ценность продукта.", outputs: "Айдентика · Launch kit · Store visuals", tools: "Figma · Photoshop · Illustrator" },
    { title: "SEO и цифровая видимость", description: "Техническая база и структурированный контент, помогающие людям и AI-поиску точно понимать продукт.", outputs: "Техническое SEO · Контент · GEO", tools: "Next.js Metadata · Schema.org · Search Console" },
  ],
  projects: en.projects.map((project) => {
    const localized: Record<ProjectSlug, Pick<Project, "category" | "role" | "summary" | "statement" | "problem" | "approach" | "result" | "responsibilities">> = {
      brewclock: {
        category: "Нативный iOS-продукт",
        role: "Продуктовый дизайн · iOS-разработка",
        summary: "Нативный помощник для заваривания кофе, объединяющий таймер, рецепты и ежедневный ритуал в сфокусированном iOS-интерфейсе.",
        statement: "Спокойный нативный инструмент для процесса, где важны время, последовательность и внимание.",
        problem: "Руководства по завариванию часто разделяют справочную информацию, таймер и личные привычки. Нужно было соединить их, не превращая простой ритуал в перегруженный дашборд.",
        approach: "Интерфейс строится на быстром распознавании, нативных контролах и компактном визуальном языке. SwiftUI сохраняет платформенную логику, а Core Data — локальную непрерывность.",
        result: "Цельная основа нативного продукта с переиспользуемыми визуальными элементами, экранами заваривания и архитектурой для дальнейшего роста.",
        responsibilities: ["Концепция и сценарии взаимодействия", "Реализация интерфейса на SwiftUI", "Система визуальных элементов и иконок", "Локальная архитектура данных"],
      },
      "castor-coffee-mobile": {
        category: "Мобильная коммерция и лояльность",
        role: "Продуктовое направление · Мобильная архитектура",
        summary: "Единая мобильная система для specialty e-commerce, заказа по QR в кофейне и цифровой программы лояльности.",
        statement: "Три контекста клиента, одна дизайн-система и один цельный мобильный продукт.",
        problem: "Покупка из дома, заказ за столом и идентификация на кассе требуют разных данных и checkout-сценариев. Разные приложения разрушили бы единство продукта и отношений с гостем.",
        approach: "Переключатель контекста меняет источники товаров, правила корзины и CTA, а общие токены и компоненты сохраняют знакомую логику. Типизированные сервисы позволяют заменить mock-данные живыми endpoint’ами.",
        result: "Демонстрационный офлайн-продукт с готовыми сценариями торговли, QR, лояльности, кошелька и подписок, подготовленный к интеграции с backend.",
        responsibilities: ["Архитектура продукта и модель режимов", "Перенос дизайн-системы", "Навигация и стратегия состояния", "Сценарии торговли, QR и лояльности"],
      },
      rentonsoft: {
        category: "Операционная система ресторана",
        role: "Продуктовая архитектура · Full-stack разработка",
        summary: "Ролевая ресторанная система, объединяющая обслуживание столов, быстрые продажи, кухню, кассу, смены и отчётность.",
        statement: "Операционный слой реального времени между заказом, кухней и оплатой.",
        problem: "Официанты, кухня, бар и касса работают в разных контекстах. Каждой роли нужен единый статус заказа, понятные права и безопасная оплата без замедления сервиса.",
        approach: "Типизированный monorepo, транзакционные правила заказа и оплаты, ролевые realtime-комнаты и отдельные интерфейсы для каждой задачи вместо одного перегруженного admin-экрана.",
        result: "Развёртываемая платформа для обслуживания столов и self-service, кухонной маршрутизации, разделения оплат, смен, возвратов и управленческих отчётов.",
        responsibilities: ["Системная и доменная архитектура", "Ролевые UX-сценарии", "Realtime и платёжные состояния", "Модель production-развёртывания"],
      },
      okulsistem: {
        category: "Управление школой и финансами",
        role: "Продуктовая архитектура · Full-stack разработка",
        summary: "Модульная школьная платформа для администрации, родителей, финансов, платежей, документов и коммуникации.",
        statement: "Сложные процессы школы, переведённые в ролевые и проверяемые сценарии.",
        problem: "Данные учеников, рассрочки, онлайн-платежи, чеки, коммуникация и согласия требуют разных прав и несут разные риски. Нужны ясные границы без разрыва ежедневных процессов.",
        approach: "Модульные frontend и backend, ролевой доступ, аудит действий, очереди уведомлений и платёжные сценарии, которые не сохраняют данные банковских карт.",
        result: "Масштабируемая основа для администрации, учителей, финансовых сотрудников и родителей, где безопасность и прослеживаемость являются частью продукта.",
        responsibilities: ["Информационная архитектура и границы модулей", "Финансовые и платёжные сценарии", "Модель ролей и прав", "Интеграция frontend и backend"],
      },
    };
    return { ...project, ...localized[project.slug] };
  }),
  projectLabels: {
    overview: "О проекте",
    role: "Роль",
    year: "Год",
    technology: "Технологии",
    problem: "Задача",
    approach: "Подход",
    result: "Результат",
    responsibilities: "Зона ответственности",
  },
};

export const content: Record<PublicLocale, SiteContent> = { en, ru };

export function getContent(locale: PublicLocale) {
  return content[locale];
}

export function getProject(locale: PublicLocale, slug: string) {
  return content[locale].projects.find((project) => project.slug === slug);
}

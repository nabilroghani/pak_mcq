/** Topical authority site map — single source of truth for nav + hub pages */

export const siteSections = {
  "government-exams": {
    slug: "government-exams",
    title: "Government Exams",
    headline: "Pakistan Government Exams Preparation",
    description:
      "Prepare for FPSC, PPSC, KPPSC, ETEA, NTS, SPSC, BPSC and AJKPSC with focused MCQs, past papers, online tests and job updates.",
    links: [
      { name: "FPSC", path: "/government-exams/fpsc", note: "Federal Public Service Commission" },
      { name: "CSS", path: "/government-exams/css", note: "Central Superior Services" },
      { name: "PPSC", path: "/government-exams/ppsc", note: "Punjab Public Service Commission" },
      { name: "PMS", path: "/government-exams/pms", note: "Provincial Management Service" },
      { name: "KPPSC", path: "/government-exams/kppsc", note: "Khyber Pakhtunkhwa PSC" },
      { name: "ETEA", path: "/government-exams/etea", note: "Educational Testing & Evaluation Agency" },
      { name: "NTS", path: "/government-exams/nts", note: "National Testing Service" },
      { name: "SPSC", path: "/government-exams/spsc", note: "Sindh Public Service Commission" },
      { name: "BPSC", path: "/government-exams/bpsc", note: "Balochistan Public Service Commission" },
      { name: "AJKPSC", path: "/government-exams/ajkpsc", note: "Azad Jammu & Kashmir PSC" },
    ],
    related: [
      { name: "Browse MCQs", path: "/mcqs" },
      { name: "Past Papers", path: "/past-papers" },
      { name: "Online Tests", path: "/online-tests" },
      { name: "Latest Jobs", path: "/jobs" },
    ],
  },
  mcqs: {
    slug: "mcqs",
    title: "MCQs",
    headline: "Exam-Wise MCQs for Competitive Exams",
    description:
      "Practice FPSC, PPSC, KPPSC, ETEA, NTS, SPSC, BPSC and AJKPSC MCQs with focused question banks for each commission.",
    links: [
      { name: "FPSC MCQs", path: "/mcqs/fpsc", note: "Federal Public Service Commission" },
      { name: "PPSC MCQs", path: "/mcqs/ppsc", note: "Punjab Public Service Commission" },
      { name: "KPPSC MCQs", path: "/mcqs/kppsc", note: "Khyber Pakhtunkhwa PSC" },
      { name: "ETEA MCQs", path: "/mcqs/etea", note: "Educational Testing & Evaluation Agency" },
      { name: "NTS MCQs", path: "/mcqs/nts", note: "National Testing Service" },
      { name: "SPSC MCQs", path: "/mcqs/spsc", note: "Sindh Public Service Commission" },
      { name: "BPSC MCQs", path: "/mcqs/bpsc", note: "Balochistan Public Service Commission" },
      { name: "AJKPSC MCQs", path: "/mcqs/ajkpsc", note: "Azad Jammu & Kashmir PSC" },
    ],
    related: [
      { name: "Government Exams", path: "/government-exams" },
      { name: "Online Tests", path: "/online-tests" },
      { name: "Current Affairs", path: "/current-affairs" },
      { name: "Study Resources", path: "/study-resources" },
    ],
  },
  "online-tests": {
    slug: "online-tests",
    title: "Online Tests",
    headline: "Free Online Tests for Exam Practice",
    description:
      "Attempt timed online tests for FPSC, PPSC, KPPSC, ETEA, NTS, SPSC, BPSC and AJKPSC to improve speed and accuracy.",
    links: [
      { name: "FPSC Tests", path: "/online-tests/fpsc", note: "Federal Public Service Commission" },
      { name: "PPSC Tests", path: "/online-tests/ppsc", note: "Punjab Public Service Commission" },
      { name: "KPPSC Tests", path: "/online-tests/kppsc", note: "Khyber Pakhtunkhwa PSC" },
      { name: "ETEA Tests", path: "/online-tests/etea", note: "Educational Testing & Evaluation Agency" },
      { name: "NTS Tests", path: "/online-tests/nts", note: "National Testing Service" },
      { name: "SPSC Tests", path: "/online-tests/spsc", note: "Sindh Public Service Commission" },
      { name: "BPSC Tests", path: "/online-tests/bpsc", note: "Balochistan Public Service Commission" },
      { name: "AJKPSC Tests", path: "/online-tests/ajkpsc", note: "Azad Jammu & Kashmir PSC" },
    ],
    related: [
      { name: "MCQs Practice", path: "/mcqs" },
      { name: "Past Papers", path: "/past-papers" },
      { name: "Government Exams", path: "/government-exams" },
    ],
  },
  "past-papers": {
    slug: "past-papers",
    title: "Past Papers",
    headline: "Past Papers Collection for Competitive Exams",
    description:
      "Access FPSC, PPSC, KPPSC, ETEA, NTS, SPSC, BPSC and AJKPSC past papers to understand exam patterns and most repeated questions.",
    links: [
      { name: "FPSC Past Papers", path: "/past-papers/fpsc", note: "Federal Public Service Commission" },
      { name: "PPSC Past Papers", path: "/past-papers/ppsc", note: "Punjab Public Service Commission" },
      { name: "KPPSC Past Papers", path: "/past-papers/kppsc", note: "Khyber Pakhtunkhwa PSC" },
      { name: "ETEA Past Papers", path: "/past-papers/etea", note: "Educational Testing & Evaluation Agency" },
      { name: "NTS Past Papers", path: "/past-papers/nts", note: "National Testing Service" },
      { name: "SPSC Past Papers", path: "/past-papers/spsc", note: "Sindh Public Service Commission" },
      { name: "BPSC Past Papers", path: "/past-papers/bpsc", note: "Balochistan Public Service Commission" },
      { name: "AJKPSC Past Papers", path: "/past-papers/ajkpsc", note: "Azad Jammu & Kashmir PSC" },
    ],
    related: [
      { name: "Online Tests", path: "/online-tests" },
      { name: "MCQs", path: "/mcqs" },
      { name: "Jobs", path: "/jobs" },
    ],
  },
  "current-affairs": {
    slug: "current-affairs",
    title: "Current Affairs",
    headline: "Daily & Monthly Current Affairs for Exams",
    description:
      "Stay updated with Pakistan affairs, international affairs and important current affairs MCQs for competitive exams.",
    links: [
      { name: "Daily Current Affairs", path: "/current-affairs/daily", note: "Daily updates for exams" },
      { name: "Monthly Current Affairs", path: "/current-affairs/monthly", note: "Month-wise revision" },
      { name: "International Affairs", path: "/current-affairs/international", note: "World current affairs" },
      { name: "Pakistan Affairs", path: "/current-affairs/pakistan", note: "Pakistan current affairs" },
      { name: "Important MCQs", path: "/current-affairs/important-mcqs", note: "Most expected MCQs" },
    ],
    related: [
      { name: "MCQs", path: "/mcqs" },
      { name: "Blog", path: "/blog" },
      { name: "Online Tests", path: "/online-tests" },
    ],
  },
  "study-resources": {
    slug: "study-resources",
    title: "Study Resources",
    headline: "Study Notes, Guides, Books & Exam Tips",
    description:
      "Download study notes, preparation guides, interview material, books & PDFs, syllabus outlines and exam tips.",
    links: [
      { name: "Study Notes", path: "/study-resources/study-notes", note: "Subject-wise notes" },
      { name: "Preparation Guides", path: "/study-resources/preparation-guides", note: "Exam prep roadmaps" },
      { name: "Interview Preparation", path: "/study-resources/interview-preparation", note: "Viva & interview tips" },
      { name: "Books & PDFs", path: "/study-resources/books", note: "Downloadable e-books" },
      { name: "Syllabus", path: "/study-resources/syllabus", note: "Exam syllabi" },
      { name: "Exam Tips", path: "/study-resources/exam-tips", note: "Smart prep tips" },
    ],
    related: [
      { name: "MCQs", path: "/mcqs" },
      { name: "Past Papers", path: "/past-papers" },
      { name: "Government Exams", path: "/government-exams" },
    ],
  },
};

/** Individual exam pillar pages under /government-exams/:slug */
export const governmentExamPillars = {
  fpsc: {
    slug: "fpsc",
    name: "FPSC",
    fullName: "Federal Public Service Commission",
    headline: "FPSC Exams in Pakistan – Complete Guide & Preparation",
    description:
      "Complete guide to FPSC exams — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy.",
  },
  css: {
    slug: "css",
    name: "CSS",
    fullName: "Central Superior Services",
    headline: "CSS Exam Preparation",
    description:
      "Prepare for CSS with compulsory and optional subject guidance, past paper trends, and long-term study planning.",
  },
  ppsc: {
    slug: "ppsc",
    name: "PPSC",
    fullName: "Punjab Public Service Commission",
    headline: "PPSC Exams in Pakistan – Complete Guide & Preparation",
    description:
      "Complete guide to PPSC exams — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy.",
  },
  pms: {
    slug: "pms",
    name: "PMS",
    fullName: "Provincial Management Service",
    headline: "PMS Exam Preparation",
    description:
      "Prepare for PMS with compulsory subjects, optional guidance, and province-focused competitive exam practice.",
  },
  kppsc: {
    slug: "kppsc",
    name: "KPPSC",
    fullName: "Khyber Pakhtunkhwa Public Service Commission",
    headline: "KPPSC Exams in Pakistan – Complete Guide & Preparation",
    description:
      "Complete guide to KPPSC exams — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy.",
  },
  etea: {
    slug: "etea",
    name: "ETEA",
    fullName: "Educational Testing & Evaluation Agency",
    headline: "ETEA Exam Preparation",
    description:
      "Prepare for ETEA tests with subject-wise MCQs, practice tests and study resources.",
  },
  nts: {
    slug: "nts",
    name: "NTS",
    fullName: "National Testing Service",
    headline: "NTS Exam Preparation",
    description:
      "Prepare for NTS tests with General Knowledge, English, Analytical and subject MCQs.",
  },
  spsc: {
    slug: "spsc",
    name: "SPSC",
    fullName: "Sindh Public Service Commission",
    headline: "SPSC Exam Preparation",
    description:
      "Prepare for Sindh Public Service Commission exams with MCQs, past papers and online tests.",
  },
  bpsc: {
    slug: "bpsc",
    name: "BPSC",
    fullName: "Balochistan Public Service Commission",
    headline: "BPSC Exam Preparation",
    description:
      "Prepare for Balochistan Public Service Commission exams with practice material and job updates.",
  },
  ajkpsc: {
    slug: "ajkpsc",
    name: "AJKPSC",
    fullName: "Azad Jammu & Kashmir Public Service Commission",
    headline: "AJKPSC Exam Preparation",
    description:
      "Prepare for AJKPSC exams with MCQs, past papers guidance and study resources.",
  },
};

/** Individual MCQ pillar pages under /mcqs/:slug (same exams as government-exams) */
export const mcqExamPillars = {
  fpsc: {
    slug: "fpsc",
    name: "FPSC",
    fullName: "Federal Public Service Commission",
    headline: "FPSC MCQs Practice",
    description:
      "Practice FPSC multiple-choice questions for federal competitive exams. Content and question banks will be added on this pillar page.",
  },
  ppsc: {
    slug: "ppsc",
    name: "PPSC",
    fullName: "Punjab Public Service Commission",
    headline: "PPSC MCQs Practice",
    description:
      "Practice PPSC MCQs for Punjab government jobs and competitive exams. Question banks will be added here.",
  },
  kppsc: {
    slug: "kppsc",
    name: "KPPSC",
    fullName: "Khyber Pakhtunkhwa Public Service Commission",
    headline: "KPPSC MCQs Practice",
    description:
      "Practice KPPSC MCQs for Khyber Pakhtunkhwa competitive exams. Question banks will be added here.",
  },
  etea: {
    slug: "etea",
    name: "ETEA",
    fullName: "Educational Testing & Evaluation Agency",
    headline: "ETEA MCQs Practice",
    description:
      "Practice ETEA MCQs for entry and recruitment tests. Question banks will be added here.",
  },
  nts: {
    slug: "nts",
    name: "NTS",
    fullName: "National Testing Service",
    headline: "NTS MCQs Practice",
    description:
      "Practice NTS MCQs for national-level tests. Question banks will be added here.",
  },
  spsc: {
    slug: "spsc",
    name: "SPSC",
    fullName: "Sindh Public Service Commission",
    headline: "SPSC MCQs Practice",
    description:
      "Practice SPSC MCQs for Sindh competitive exams. Question banks will be added here.",
  },
  bpsc: {
    slug: "bpsc",
    name: "BPSC",
    fullName: "Balochistan Public Service Commission",
    headline: "BPSC MCQs Practice",
    description:
      "Practice BPSC MCQs for Balochistan competitive exams. Question banks will be added here.",
  },
  ajkpsc: {
    slug: "ajkpsc",
    name: "AJKPSC",
    fullName: "Azad Jammu & Kashmir Public Service Commission",
    headline: "AJKPSC MCQs Practice",
    description:
      "Practice AJKPSC MCQs for Azad Kashmir competitive exams. Question banks will be added here.",
  },
};

const examMeta = [
  { slug: "fpsc", name: "FPSC", fullName: "Federal Public Service Commission" },
  { slug: "ppsc", name: "PPSC", fullName: "Punjab Public Service Commission" },
  { slug: "kppsc", name: "KPPSC", fullName: "Khyber Pakhtunkhwa Public Service Commission" },
  { slug: "etea", name: "ETEA", fullName: "Educational Testing & Evaluation Agency" },
  { slug: "nts", name: "NTS", fullName: "National Testing Service" },
  { slug: "spsc", name: "SPSC", fullName: "Sindh Public Service Commission" },
  { slug: "bpsc", name: "BPSC", fullName: "Balochistan Public Service Commission" },
  { slug: "ajkpsc", name: "AJKPSC", fullName: "Azad Jammu & Kashmir Public Service Commission" },
];

const buildExamPillars = (headlineSuffix, descriptionFn) =>
  Object.fromEntries(
    examMeta.map((e) => [
      e.slug,
      {
        ...e,
        headline: `${e.name} ${headlineSuffix}`,
        description: descriptionFn(e),
      },
    ])
  );

/** Past paper pillars: /past-papers/:slug */
export const pastPaperPillars = buildExamPillars(
  "Past Papers",
  (e) =>
    `Download and practice ${e.name} past papers. Paper collections and solved sets will be added on this page.`
);

/** Online test pillars: /online-tests/:slug */
export const onlineTestPillars = buildExamPillars(
  "Online Tests",
  (e) =>
    `Attempt ${e.name} online practice tests. Timed quizzes and subject-wise tests will be added on this page.`
);

/** Current affairs pillars: /current-affairs/:slug */
export const currentAffairsPillars = {
  daily: {
    slug: "daily",
    name: "Daily Current Affairs",
    headline: "Daily Current Affairs",
    description:
      "Daily current affairs updates for competitive exams. Content will be added on this pillar page.",
  },
  monthly: {
    slug: "monthly",
    name: "Monthly Current Affairs",
    headline: "Monthly Current Affairs",
    description:
      "Month-wise current affairs compilations for exam revision. Content will be added here.",
  },
  international: {
    slug: "international",
    name: "International Affairs",
    headline: "International Current Affairs",
    description:
      "World and international affairs for competitive exams. Content will be added here.",
  },
  pakistan: {
    slug: "pakistan",
    name: "Pakistan Affairs",
    headline: "Pakistan Current Affairs",
    description:
      "Pakistan affairs and national updates for competitive exams. Content will be added here.",
  },
  "important-mcqs": {
    slug: "important-mcqs",
    name: "Important MCQs",
    headline: "Important Current Affairs MCQs",
    description:
      "Most important and expected current affairs MCQs. Question banks will be added here.",
  },
};

/** Study resource pillars: /study-resources/:slug (books uses EBooks page) */
export const studyResourcePillars = {
  "study-notes": {
    slug: "study-notes",
    name: "Study Notes",
    headline: "Study Notes",
    description:
      "Subject-wise study notes for competitive exams. Notes will be added on this page.",
  },
  "preparation-guides": {
    slug: "preparation-guides",
    name: "Preparation Guides",
    headline: "Preparation Guides",
    description:
      "Step-by-step preparation guides for government exams. Guides will be added here.",
  },
  "interview-preparation": {
    slug: "interview-preparation",
    name: "Interview Preparation",
    headline: "Interview Preparation",
    description:
      "Interview and viva preparation tips. Content will be added on this page.",
  },
  syllabus: {
    slug: "syllabus",
    name: "Syllabus",
    headline: "Exam Syllabus",
    description:
      "Syllabus outlines for major competitive exams. Details will be added here.",
  },
  "exam-tips": {
    slug: "exam-tips",
    name: "Exam Tips",
    headline: "Exam Tips",
    description:
      "Smart exam tips and preparation strategies. Tips will be added on this page.",
  },
};

export const navMenu = [
  { name: "Home", path: "/" },
  {
    name: "Government Exams",
    path: "/government-exams",
    children: siteSections["government-exams"].links.map((l) => ({
      name: l.name,
      path: l.path,
    })),
  },
  {
    name: "MCQs",
    path: "/mcqs",
    children: siteSections.mcqs.links.map((l) => ({
      name: l.name.replace(" MCQs", ""),
      path: l.path,
    })),
  },
  {
    name: "Past Papers",
    path: "/past-papers",
    children: siteSections["past-papers"].links.map((l) => ({
      name: l.name.replace(" Past Papers", ""),
      path: l.path,
    })),
  },
  {
    name: "Online Tests",
    path: "/online-tests",
    children: siteSections["online-tests"].links.map((l) => ({
      name: l.name.replace(" Tests", ""),
      path: l.path,
    })),
  },
  {
    name: "Current Affairs",
    path: "/current-affairs",
    children: siteSections["current-affairs"].links.map((l) => ({
      name: l.name,
      path: l.path,
    })),
  },
  {
    name: "Study Resources",
    path: "/study-resources",
    children: siteSections["study-resources"].links.map((l) => ({
      name: l.name,
      path: l.path,
    })),
  },
  { name: "Jobs", path: "/jobs" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const footerLinks = [
  { name: "Home", path: "/" },
  { name: "MCQs", path: "/mcqs" },
  { name: "Jobs", path: "/jobs" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Editorial Policy", path: "/editorial-policy" },
  { name: "Disclaimer", path: "/disclaimer" },
];

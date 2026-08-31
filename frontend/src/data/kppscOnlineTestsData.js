/** Post-wise and subject-wise KPPSC online test directory data */

export const kppscPostOnlineTests = [
  { num: 1, post: "PMS Online Test", focus: "General Knowledge, Pakistan Affairs, Current Affairs, and analytical MCQs relevant to the Provincial Management Service exam pattern", slug: "pms" },
  { num: 2, post: "Assistant Online Test", focus: "General Knowledge, English, Computer basics, and clerical-aptitude style MCQs for the Assistant post", slug: "assistant" },
  { num: 3, post: "Assistant Director Online Test", focus: "General Knowledge, Current Affairs, and administrative-subject MCQs for Assistant Director roles", slug: "assistant-director" },
  { num: 4, post: "Section Officer Online Test", focus: "Pakistan Studies, General Knowledge, and administration-related MCQs for Section Officer candidates", slug: "section-officer" },
  { num: 5, post: "Tehsildar Online Test", focus: "Land revenue basics, General Knowledge, and Khyber Pakhtunkhwa Affairs MCQs for Tehsildar aspirants", slug: "tehsildar" },
  { num: 6, post: "Naib Tehsildar Online Test", focus: "Similar focus areas to Tehsildar, tailored for entry-level revenue department MCQs", slug: "naib-tehsildar" },
  { num: 7, post: "Patwari Online Test", focus: "General Knowledge, Everyday Science, Urdu, and basic revenue-related MCQs for Patwari candidates", slug: "patwari" },
  { num: 8, post: "Junior Clerk Online Test", focus: "General Knowledge, English, Urdu, and Computer MCQs for Junior Clerk posts", slug: "junior-clerk" },
  { num: 9, post: "Clerk Online Test", focus: "General MCQs covering GK, English, Computer, and basic clerical knowledge", slug: "clerk" },
  { num: 10, post: "Stenographer Online Test", focus: "English language, General Knowledge, and Computer MCQs relevant to Stenographer roles", slug: "stenographer" },
  { num: 11, post: "Data Entry Operator Online Test", focus: "Computer Science, General Knowledge, and typing/technical-awareness MCQs", slug: "data-entry-operator" },
  { num: 12, post: "Computer Operator Online Test", focus: "Computer Science fundamentals, MS Office concepts, and General Knowledge MCQs", slug: "computer-operator" },
  { num: 13, post: "Medical Officer Online Test", focus: "General medical knowledge, Everyday Science, and General Knowledge MCQs for MO posts", slug: "medical-officer" },
  { num: 14, post: "Women Medical Officer Online Test", focus: "Similar structure to Medical Officer, focused on WMO recruitment MCQs", slug: "women-medical-officer" },
  { num: 15, post: "Civil Judge Online Test", focus: "Legal concepts, General Knowledge, and Pakistan Affairs MCQs relevant to judiciary exams", slug: "civil-judge" },
  { num: 16, post: "Inspector Online Test", focus: "General Knowledge, Current Affairs, and law-and-order related MCQs for Inspector posts", slug: "inspector" },
  { num: 17, post: "Excise & Taxation Officer Online Test", focus: "General Knowledge, Pakistan Affairs, and taxation-awareness MCQs", slug: "excise-taxation-officer" },
  { num: 18, post: "Assistant Superintendent of Police (ASP) Online Test", focus: "General Knowledge, Current Affairs, and analytical MCQs for ASP aspirants", slug: "asp" },
  { num: 19, post: "Sub Inspector Online Test", focus: "General Knowledge, Pakistan Studies, and law-enforcement-related MCQs", slug: "sub-inspector" },
  { num: 20, post: "Assistant Commissioner Online Test", focus: "General Knowledge, Current Affairs, Pakistan Affairs, and administrative MCQs", slug: "assistant-commissioner" },
  { num: 21, post: "Deputy Superintendent of Police (DSP) Online Test", focus: "General Knowledge, Current Affairs, and analytical-reasoning MCQs for DSP candidates", slug: "dsp" },
  { num: 22, post: "District Health Officer Online Test", focus: "Public health basics, General Knowledge, and Everyday Science MCQs", slug: "district-health-officer" },
  { num: 23, post: "Lady Health Visitor (LHV) Online Test", focus: "Basic health and nursing-related knowledge combined with General Knowledge MCQs", slug: "lady-health-visitor" },
  { num: 24, post: "Staff Nurse Online Test", focus: "Nursing fundamentals, Everyday Science, and General Knowledge MCQs", slug: "staff-nurse" },
  { num: 25, post: "Pharmacist Online Test", focus: "Pharmacy basics, Everyday Science, and General Knowledge MCQs", slug: "pharmacist" },
  { num: 26, post: "Statistical Officer Online Test", focus: "Statistics fundamentals, General Knowledge, and analytical MCQs", slug: "statistical-officer" },
  { num: 27, post: "Economist Online Test", focus: "Economics fundamentals, Pakistan Affairs, and General Knowledge MCQs", slug: "economist" },
  { num: 28, post: "Accounts Officer Online Test", focus: "Basic accounting concepts, General Knowledge, and analytical MCQs", slug: "accounts-officer" },
];

export const kppscSubjectOnlineTests = [
  { subject: "General Knowledge", focus: "Broad awareness topics commonly asked across KPPSC tests", slug: "general-knowledge" },
  { subject: "Pakistan Studies", focus: "History, constitution, and national affairs", slug: "pakistan-studies" },
  { subject: "Current Affairs", focus: "Recent national and international events", slug: "current-affairs" },
  { subject: "Everyday Science", focus: "Basic and applied general science", slug: "everyday-science" },
  { subject: "English", focus: "Grammar, vocabulary, and comprehension", slug: "english" },
  { subject: "Urdu", focus: "Grammar and language MCQs", slug: "urdu" },
  { subject: "Islamiat", focus: "General Islamic studies", slug: "islamiat" },
  { subject: "Mathematics", focus: "Basic quantitative and arithmetic MCQs", slug: "mathematics" },
  { subject: "Computer Science", focus: "Computer fundamentals and MS Office concepts", slug: "computer-science" },
  { subject: "General Science", focus: "Broader general science topics", slug: "general-science" },
  { subject: "Geography", focus: "World and Pakistan geography basics", slug: "geography" },
  { subject: "World Affairs", focus: "International relations and global events", slug: "world-affairs" },
  { subject: "Khyber Pakhtunkhwa Affairs", focus: "Province-specific general knowledge", slug: "kp-affairs" },
];

export function getPostTestBySlug(slug) {
  return kppscPostOnlineTests.find((t) => t.slug === slug?.toLowerCase());
}

export function getSubjectTestBySlug(slug) {
  return kppscSubjectOnlineTests.find((t) => t.slug === slug?.toLowerCase());
}

export const kppscOnlineTestsHubPath = "/government-exams/kppsc/online-tests";

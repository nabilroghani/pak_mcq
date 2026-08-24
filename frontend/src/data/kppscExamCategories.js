/** Static KPPSC post categories — shown when API categories are unavailable */

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const rawCategories = [
  "Provincial Management Service (PMS)",
  "Assistant",
  "Assistant Director",
  "Section Officer",
  "Tehsildar",
  "Naib Tehsildar",
  "Patwari",
  "Junior Clerk",
  "Clerk",
  "Stenographer",
  "Data Entry Operator",
  "Computer Operator",
  "Medical Officer / Women Medical Officer",
  "Civil Judge",
  "Inspector",
  "Excise & Taxation Officer",
  "Assistant Superintendent of Police (ASP)",
  "Sub Inspector",
  "Assistant Commissioner",
  "Deputy Superintendent of Police (DSP)",
  "District Health Officer",
  "Lady Health Visitor",
  "Staff Nurse",
  "Pharmacist",
  "Statistical Officer",
  "Economist",
  "Accounts Officer",
  "Audit Officer",
  "Planning Officer",
  "Research Officer",
  "Agriculture Officer",
  "Engineer",
  "Lecturer",
  "Subject Specialist",
  "Physical Education Teacher",
  "Librarian",
];

export const kppscExamCategories = rawCategories.map((name, index) => ({
  _id: `kppsc-static-${index}`,
  name,
  slug: `kppsc-${slugify(name)}`,
  createdAt: new Date(2026, 0, index + 1).toISOString(),
}));

/** Main subject sidebar links when category API is empty */
export const mainSubjectFallback = [
  { name: "Pak Study", slug: "pak-study" },
  { name: "Islamic Studies", slug: "islamic-studies" },
  { name: "General Knowledge", slug: "general-knowledge" },
  { name: "Everyday Science", slug: "everyday-science" },
  { name: "Pakistan Current Affairs", slug: "pak-current-affairs" },
  { name: "World Current Affairs", slug: "world-current-affairs" },
  { name: "English", slug: "english" },
  { name: "Urdu", slug: "urdu" },
  { name: "Mathematics", slug: "mathematics" },
  { name: "Computer Science", slug: "computer-science" },
  { name: "Biology", slug: "biology" },
  { name: "Chemistry", slug: "chemistry" },
  { name: "Physics", slug: "physics" },
];

/**
 * Codemod: convert react-router-dom usage to Next.js App Router
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "src");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "app") continue;
      walk(full, files);
    } else if (/\.(jsx|js|tsx|ts)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function transform(code, file) {
  let out = code;
  const isClientCandidate =
    /react-router-dom|localStorage|window\.|document\.|useState|useEffect|useNavigate|useParams|useLocation|onClick|onChange|onSubmit/.test(
      out
    );

  const hasUseClient = /^["']use client["'];?/.test(out.trimStart());

  out = out.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]react-router-dom['"];?/g,
    (_match, imports) => {
      const names = imports.split(",").map((s) => s.trim()).filter(Boolean);
      const nextNav = [];
      const nextLink = [];
      const extra = [];

      for (const name of names) {
        if (name === "Link" || name === "NavLink") nextLink.push("Link");
        else if (name === "useNavigate") nextNav.push("useRouter");
        else if (name === "useParams") nextNav.push("useParams");
        else if (name === "useLocation") nextNav.push("usePathname");
        else if (name === "Navigate") {
          extra.push('import ClientRedirect from "@/Components/ClientRedirect";');
        }
      }

      const lines = [];
      if (nextLink.length) lines.push('import Link from "next/link";');
      if (nextNav.length) {
        const unique = [...new Set(nextNav)];
        lines.push(`import { ${unique.join(", ")} } from "next/navigation";`);
      }
      lines.push(...extra);
      return lines.join("\n");
    }
  );

  out = out.replace(/\bconst\s+navigate\s*=\s*useNavigate\s*\(\s*\)/g, "const router = useRouter()");
  out = out.replace(/\bnavigate\(/g, "router.push(");

  out = out.replace(
    /\bconst\s+location\s*=\s*useLocation\s*\(\s*\)/g,
    "const pathname = usePathname()"
  );
  out = out.replace(/\blocation\.pathname\b/g, "pathname");
  out = out.replace(/\blocation\.search\b/g, '""');
  out = out.replace(/\blocation\.key\b/g, '""');

  out = out.replace(
    /<Navigate\s+to=["']([^"']+)["']\s*replace\s*\/>/g,
    '<ClientRedirect to="$1" />'
  );
  out = out.replace(
    /<Navigate\s+to=["']([^"']+)["']\s*\/>/g,
    '<ClientRedirect to="$1" />'
  );

  // Only change Link's to= prop to href=
  out = out.replace(/<Link(\s[^>]*?)\sto=/g, "<Link$1 href=");
  out = out.replace(/<Link\sto=/g, "<Link href=");

  out = out.replace(
    /import\.meta\.env\.VITE_API_BASE_URL/g,
    "process.env.NEXT_PUBLIC_API_BASE_URL"
  );

  if (
    isClientCandidate &&
    !hasUseClient &&
    !file.includes(`${path.sep}data${path.sep}`) &&
    !file.endsWith("siteStructure.js")
  ) {
    out = `"use client";\n\n${out}`;
  }

  return out;
}

const files = walk(ROOT);
let changed = 0;
for (const file of files) {
  if (file.endsWith("App.jsx") || file.endsWith("main.jsx")) continue;

  const before = fs.readFileSync(file, "utf8");
  const after = transform(before, file);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log("updated:", path.relative(ROOT, file));
  }
}
console.log(`Done. Updated ${changed} files.`);

const fs = require("fs");
const path = require("path");

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (/\.(jsx|js|tsx|ts)$/.test(e.name)) acc.push(full);
  }
  return acc;
}

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) rmDir(full);
    else fs.unlinkSync(full);
  }
  fs.rmdirSync(dir);
}

const pagesDir = path.join("src", "pages");
if (fs.existsSync(pagesDir)) {
  try {
    rmDir(pagesDir);
    console.log("Removed src/pages");
  } catch (err) {
    console.error("Could not remove src/pages:", err.message);
    // fallback: empty conflicting barrel files so Next ignores invalid pages
    for (const name of ["HubPages.jsx", "PolicyPages.jsx", "SectionPillars.jsx"]) {
      const f = path.join(pagesDir, name);
      if (fs.existsSync(f)) {
        fs.writeFileSync(
          f,
          "export default function DeprecatedPagesRouterStub(){return null}\n"
        );
        console.log("Stubbed", name);
      }
    }
  }
}

let fixed = 0;
for (const file of walk("src")) {
  let c = fs.readFileSync(file, "utf8");
  let n = c
    .replace(/@\/pages\//g, "@/views/")
    .replace(/from ["']\.\.\/pages\//g, 'from "../views/')
    .replace(/from ["']\.\.\/\.\.\/pages\//g, 'from "../../views/');
  if (n !== c) {
    fs.writeFileSync(file, n);
    fixed++;
    console.log("fixed", file);
  }
}
console.log("Import fixes:", fixed);
console.log("views exists:", fs.existsSync(path.join("src", "views")));
console.log("pages exists:", fs.existsSync(path.join("src", "pages")));

const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// If you want a different base, change this in app.js where you mount routes.
// Example: app.use('/api', routes)
const ROUTES_DIR = __dirname;

/**
 * Convert filename -> mount path.
 * Example:
 *   "admin-messages.js" => "/admin-messages"
 *   "stripe-webhook.js" => "/stripe-webhook"
 *
 * You can customize this mapping if you want prettier URLs.
 */
function fileToMountPath(file) {
  const base = file.replace(/\.js$/i, "");
  return `/${base}`;
}

function safeRequireRoute(fullPath) {
  const mod = require(fullPath);

  // Most of your route files export a router directly:
  // module.exports = router;
  if (typeof mod === "function") return mod;      // router is a function
  if (mod && typeof mod === "object" && typeof mod.handle === "function") return mod; // express router

  // Some people export { router } — support that too
  if (mod && mod.router && typeof mod.router.handle === "function") return mod.router;

  return null;
}

// Load all route files except index.js
const files = fs
  .readdirSync(ROUTES_DIR)
  .filter((f) => f.endsWith(".js"))
  .filter((f) => f !== "index.js")
  // optional: ignore files starting with "_" or "."
  .filter((f) => !f.startsWith("_") && !f.startsWith("."))
  .sort();

const mounted = [];

for (const file of files) {
  const fullPath = path.join(ROUTES_DIR, file);
  try {
    const route = safeRequireRoute(fullPath);
    if (!route) {
      // Not an express router export — skip
      // You can console.warn here if you want.
      continue;
    }

    const mountPath = fileToMountPath(file);
    router.use(mountPath, route);
    mounted.push({ file, mountPath });
  } catch (err) {
    console.error(`[routes] Failed loading ${file}:`, err);
  }
}

// Optional debug
if (process.env.DEBUG_ROUTES === "true") {
  console.log("Mounted routes:");
  for (const m of mounted) console.log(`- ${m.mountPath}  (${m.file})`);
}

module.exports = router;

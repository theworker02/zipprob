
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function parseDuration(s) {
  const m = String(s).trim().match(/^(\d+(?:\.\d+)?)(ms|s|m|h|d)?$/i);
  if (!m) throw new Error("bad duration: " + s);
  const n = Number(m[1]);
  const u = (m[2] || "s").toLowerCase();
  const mul = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 }[u];
  return n * mul;
}
function formatDuration(ms) {
  if (ms < 1000) return ms + "ms";
  if (ms < 60000) return (ms / 1000) + "s";
  if (ms < 3600000) return (ms / 60000) + "m";
  return (ms / 3600000) + "h";
}
function run(argv) {
  const mode = argv[0] || "now";
  if (mode === "now") return new Date().toISOString();
  if (mode === "parse") return String(parseDuration(argv[1] || "1s"));
  if (mode === "format") return formatDuration(Number(argv[1] || 0));
  return new Date().toISOString();
}

module.exports = { readInput, parseDuration, formatDuration, run };

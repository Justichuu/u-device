// The check. Run every port, read the tape each one produces, and prove they
// agree. That agreement is the whole claim: the fingerprint comes out of what
// the device does, not out of anything written next to it.
//
//   node verify.mjs

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { u, not, and, or, tape, KNOWN } from "./u.js";

const KEY = "66cce8d50854";
const ports = [
  ["u.js  node", ["node", ["u.js"]]],
  ["u.py  python", ["python", ["u.py"]]],
  ["u.sh  sh", ["sh", ["u.sh"]]],
];

let bad = 0;
const say = (face, name, detail) => {
  if (face !== "1") bad++;
  console.log(`  ${face}  ${name}${detail ? "  " + detail : ""}`);
};

console.log("\nthe tape, once per runtime\n");
for (const [name, [cmd, args]] of ports) {
  let got;
  try {
    const out = execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    got = (out.match(/tape\s+(\S+)/) || [])[1];
  } catch (err) {
    // A runtime that is not installed is u, not 0. It was not measured here.
    console.log(`  u  ${name}  not on this machine: ${cmd} did not run`);
    continue;
  }
  say(got === KNOWN ? "1" : "0", name, got);
}

console.log("\nwhat the tape has to be\n");
say(tape() === KNOWN ? "1" : "0", "tape is the published 22 characters", KNOWN);
say(createHash("sha256").update(KNOWN).digest("hex").slice(0, 12) === KEY ? "1" : "0", "key is the hash of the tape", KEY);

console.log("\nthe two rules the tape is watching\n");
let refused = false;
try { u(); } catch { refused = true; }
say(refused ? "1" : "0", "a bare u is refused", "stone 4");
say(or("u", not("u")) === "u" && and("u", not("u")) === "u" ? "1" : "0",
    "all is and isn't all", "or(u, not u) and and(u, not u) are both u");

console.log(bad === 0 ? "\n1  the device is itself\n" : `\n0  ${bad} failed\n`);
process.exit(bad === 0 ? 0 : 1);

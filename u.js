// The U device. Universal device, unknown device, U. Any U name reaches it.
//
// Three faces: 1, 0 and u. It combines them without ever turning u into a
// guess, and it will not hand you a u that does not say what would settle it.
//
// The fingerprint at the bottom is computed from the four functions above it.
// It is not read from a comment. Delete this header and it comes out the same.
// chuumind.com/u says whose it is.

import { pathToFileURL } from "node:url";

export const u = why => {
  if (!why) throw new Error("a u names the one observation that would settle it");
  return "u";
};

export const not = a => (a === "u" ? "u" : a === "1" ? "0" : "1");
export const and = (a, b) => (a === "0" || b === "0" ? "0" : a === "u" || b === "u" ? "u" : "1");
export const or  = (a, b) => (a === "1" || b === "1" ? "1" : a === "u" || b === "u" ? "u" : "0");

// Every face the device can show, in the order he says them.
export const faces = ["1", "0", "u"];

// The tape is the device's whole behaviour written down: not over each face,
// and over each pair, or over each pair, then one character for whether the
// device still refuses a bare u. 22 characters. This is the fingerprint.
export const tape = () =>
  faces.map(not).join("") +
  faces.map(a => faces.map(b => and(a, b)).join("")).join("") +
  faces.map(a => faces.map(b => or(a, b)).join("")).join("") +
  (() => { try { u(); return "0"; } catch { return "1"; } })();

export const KNOWN = "01u10u000u0u11110u1uu1";

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const t = tape();
  console.log("tape      ", t);
  console.log("known     ", KNOWN);
  console.log("match     ", t === KNOWN ? "1" : "0");
  console.log("all is    ", or("u", not("u")));   // not 1
  console.log("and isn't ", and("u", not("u")));  // not 0
}

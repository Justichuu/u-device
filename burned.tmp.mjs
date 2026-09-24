


const q0 = why => {
  if (!why) throw new Error("a u names the one observation that would settle it");
  return "u";
};

const q1 = a => (a === "u" ? "u" : a === "1" ? "0" : "1");
const q2 = (a, b) => (a === "0" || b === "0" ? "0" : a === "u" || b === "u" ? "u" : "1");
const q3  = (a, b) => (a === "1" || b === "1" ? "1" : a === "u" || b === "u" ? "u" : "0");

const q4 = ["1", "0", "u"];

const q5 = () =>
  q4.map(q1).join("") +
  q4.map(a => q4.map(b => q2(a, b)).join("")).join("") +
  q4.map(a => q4.map(b => q3(a, b)).join("")).join("") +
  (() => { try { q0(); return "0"; } catch { return "1"; } })();

const q6 = "01u10u000u0u11110u1uu1";


console.log(q5());

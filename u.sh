#!/bin/sh
# The U device in POSIX shell. No runtime, no install, no dependency.
# Three faces: 1, 0 and u. Same four functions, same 22 character tape.
# chuumind.com/u says whose it is.

u()   { [ -n "$1" ] || { echo "a u names the one observation that would settle it" >&2; return 1; }; echo u; }
not() { case $1 in u) echo u;; 1) echo 0;; *) echo 1;; esac; }
and() { case $1$2 in *0*) echo 0;; *u*) echo u;; *) echo 1;; esac; }
or()  { case $1$2 in *1*) echo 1;; *u*) echo u;; *) echo 0;; esac; }

tape() {
  t=""
  for a in 1 0 u; do t="$t$(not "$a")"; done
  for a in 1 0 u; do for b in 1 0 u; do t="$t$(and "$a" "$b")"; done; done
  for a in 1 0 u; do for b in 1 0 u; do t="$t$(or "$a" "$b")"; done; done
  if u >/dev/null 2>&1; then t="${t}0"; else t="${t}1"; fi
  echo "$t"
}

KNOWN="01u10u000u0u11110u1uu1"

if [ "${0##*/}" = "u.sh" ]; then
  T=$(tape)
  echo "tape       $T"
  echo "known      $KNOWN"
  if [ "$T" = "$KNOWN" ]; then echo "match      1"; else echo "match      0"; fi
  echo "all is     $(or u "$(not u)")"
  echo "and isn't  $(and u "$(not u)")"
fi

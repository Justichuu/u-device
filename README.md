# U Device

U Device, Universal Device, Unknown Device, or a name you give it. One small
JavaScript module connects named channels to explicit adapters. Meaning can
stay open. A device without an adapter returns **U**, with the missing step.

[Try it on ChuuMind](https://chuumind.com/home/) · [License](LICENSE) ·
[Provenance](PROVENANCE.md) · [Protocol](STANDARD.md)

```js
import {createU, verifyHistory} from './u.mjs';
const u = await createU({name: 'Unknown Device'});
const observation = await u.send('text', 'Beethoven Beethovens.');
console.log(observation);
console.log(await verifyHistory(u.history()));
```

Download the source and run `node example.mjs`, or import `u.mjs` in a browser
module. It has no package dependencies. `npm test` runs the software checks.
The live Home demo offers the whole module for copying and a local text check.
Copying folds its panel away. It is not injected throughout the website.

## Burn and return

```js
await u.burn({mode: 'both', durationMs: 60000});
console.log(u.fingerprint());
u.restore();
```

Modes: `none`, `hide`, `rotate`, `both`. The default burn lasts one minute.
The elapsed host clock controls regrowth; changing the calendar clock does not.
Reading `fingerprint()` refreshes the state after the deadline. The browser
example also refreshes the display. Reloading starts a fresh visible instance.
No visitor identifier, cookie, background tracker or upload is created.

The fingerprint identifies the contributor record. It is not a biometric,
person identifier, independent signature or a guarantee of concealment. Source
files and release checksums identify the implementation separately. A copied
program can be changed; this module cannot force a fork to keep its behavior.

## Devices and boundaries

The built-in text adapter returns exactly the supplied finite JSON data.
Adapters report `1`, `0` or `U`, with the observation's scope in `evidence`.
Their reports are claims by that adapter; a hash does not make them true.
Stop asks adapters to stop, marks pending work unknown and holds new sends.
Resume never sends. Already delivered physical actions may continue.

[Rod on ChuuMind](https://chuumind.com/tools/misc/rod/) is the existing original
Joy-Con motion/vibration implementation. It has its own adapter and credits.
U Device defines the portable contract; the initial Home demo proves the local
text path, receipt checks and timed display return. It does not prove a physical
controller, every operating system or perpetual operation. See release evidence
for the runtimes actually checked.

The license is custom and shown in full, including the owner's formulation.
It permits broad use with provenance retained and temporary display burning.
It is not an assertion of approval by a license standards organization.

## Logic ports

The companion `u.js`, `u.py` and `u.sh` enumerate a finite three-value logic
table. Run `node verify.mjs` to compare the ports, or `node burn.mjs` to check
one comment-removal and function-renaming transformation. Missing runtimes
produce U and an incomplete exit status, not a passing aggregate. The shell
port requires a POSIX shell. Inputs outside `1`, `0`, `u` are rejected.

Equal tables can be written independently. Their hash identifies these outputs,
not an author, a unique program, every behavior, or a universal truth about
contradictions. `u.mjs` is the separate channel/receipt implementation used by
the Home demo. This release preserves both implementations. The source and license copied
by Home are pinned to this release.

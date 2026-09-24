// Compare the finite logic table in the available ports. U is not a pass.
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {u, not, and, or, tape, KNOWN} from './u.js';
const cwd=fileURLToPath(new URL('.',import.meta.url));
const records=[];
for(const [name,cmd,file] of [
 ['JavaScript',process.execPath,'u.js'],
 ['Python',process.env.U_PYTHON||'python','u.py'],
 ['POSIX shell',process.env.U_SHELL||'sh','u.sh']
]){
 try{
  const out=execFileSync(cmd,[file],{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']});
  const got=out.match(/tape\s+(\S+)/)?.[1];
  records.push({name,state:got===KNOWN?'1':'0',tape:got});
 }catch(error){records.push({name,state:error.code==='ENOENT'?'U':'0',evidence:error.code==='ENOENT'?'Install this runtime and rerun to settle the table.':'Runtime exited without the expected result.',code:error.code||error.status});}
}
let refused=false;try{u();}catch{refused=true;}
records.push({name:'JavaScript table and guard',state:tape()===KNOWN&&refused&&or('u',not('u'))==='u'&&and('u',not('u'))==='u'?'1':'0'});
const state=records.some(r=>r.state==='0')?'0':records.some(r=>r.state==='U')?'U':'1';
console.log(JSON.stringify({state,scope:'Listed ports and finite table only; no authorship inference.',behaviorHash:createHash('sha256').update(KNOWN).digest('hex'),records},null,2));
process.exitCode=state==='1'?0:state==='U'?2:1;

import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {u,not,and,or} from '../u.js';
const root=fileURLToPath(new URL('..',import.meta.url));
test('invalid values never acquire a known truth state',()=>{
 for(const value of [undefined,null,'','other',1,0,true,{},[]]){
  assert.throws(()=>not(value));
  for(const valid of ['1','0','u'])for(const fn of [and,or]){
   assert.throws(()=>fn(value,valid));assert.throws(()=>fn(valid,value));
  }
 }
 for(const why of [undefined,null,'','  ',false,1,{}])assert.throws(()=>u(why));
 assert.equal(u('Take the named observation'),'u');
});
test('a missing port is U in the aggregate and cannot exit as passed',()=>{
 const p=spawnSync(process.execPath,['verify.mjs'],{cwd:root,encoding:'utf8',env:{...process.env,U_PYTHON:'u-deliberately-missing-runtime',U_SHELL:'u-deliberately-missing-runtime'}});
 assert.equal(p.status,2);const r=JSON.parse(p.stdout);assert.equal(r.state,'U');assert.equal(r.records.filter(x=>x.state==='U').length,2);
});
test('the finite table survives the actual burn transformation',()=>{
 const p=spawnSync(process.execPath,['burn.mjs'],{cwd:root,encoding:'utf8'});
 assert.equal(p.status,0,p.stderr);assert.match(p.stdout,/Authorship is not established/);
});

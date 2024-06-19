/*
Unfinished attempt to fix a issue with mutliple scripts
*/
import fs from 'node:fs';
import fsp from 'node:fs/promises';

console.log(process.cwd())
const srcDir = await fsp.opendir(`./src`);
const a = await srcDir.read();
console.log(a);
console.log(srcDir);
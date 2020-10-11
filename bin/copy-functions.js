#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const srcPath = path.resolve(process.cwd(), 'functions');
const destPath = path.resolve(process.cwd(), 'out_functions');

fs.ensureDirSync(destPath);
fs.copySync(srcPath, destPath);

console.log('copied functions to `out_functions`');

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = require("qs");
console.log(qs.parse('a[b]=5'));
console.log(qs.stringify({ a: 5 }));

"use strict";var fs=require("fs");fs.readFile("../../texts/testChat.txt",function(t,s){t&&console.error(t);for(var e=[],r=s.toString().split("\n"),o=0;o<r.length;o++)e.push(r[o].split("- ")),console.log(e)});
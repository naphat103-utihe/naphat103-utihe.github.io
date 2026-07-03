const fs = require("fs");

const W = 2200;
const H = 3140;
const out = [];

const add = (value) => out.push(value);
const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function rect(x, y, w, h, fill = "#fff", stroke = "#C8D0CB", rx = 10, extra = "") {
  add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" ${extra}/>`);
}

function text(x, y, value, size = 24, fill = "#173125", weight = 400, opts = {}) {
  const family = opts.family || "Kanit, Noto Sans Thai, Prompt, Arial, sans-serif";
  const anchor = opts.anchor ? ` text-anchor="${opts.anchor}"` : "";
  const lh = opts.lh || 1.35;
  String(value)
    .split("\n")
    .forEach((line, index) => {
      add(
        `<text x="${x}" y="${y + index * size * lh}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}"${anchor}>${esc(line)}</text>`
      );
    });
}

function label(x, y, value, w = 150, fill = "#0D4A34") {
  rect(x, y, w, 34, fill, fill, 17);
  text(x + w / 2, y + 23, value, 15, "#fff", 700, { anchor: "middle" });
}

function chip(x, y, value, w = 86, active = false) {
  rect(x, y, w, 38, active ? "#0D4A34" : "#fff", "#B8C4BD", 8);
  text(x + w / 2, y + 25, value, 15, active ? "#fff" : "#0D4A34", 700, { anchor: "middle" });
}

function placeholder(x, y, w, h, value) {
  rect(x, y, w, h, "#EEF1EE", "#AEBBB3", 10, 'stroke-dasharray="10 8"');
  text(x + w / 2, y + h / 2 + 7, value, 20, "#69766F", 700, { anchor: "middle" });
}

function arrow(x1, y1, x2, y2) {
  add(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#D5A642" stroke-width="4" marker-end="url(#arrow)"/>`);
}

function sectionTitle(x, y, number, title, subtitle) {
  text(x, y, `${number} ${title}`, 34, "#0D4A34", 800);
  if (subtitle) text(x, y + 45, subtitle, 20, "#64736D", 400);
}

add(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
add(`<defs>
  <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
    <path d="M0,0 L0,6 L9,3 z" fill="#D5A642"/>
  </marker>
  <filter id="shadow">
    <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#0c3326" flood-opacity="0.12"/>
  </filter>
</defs>`);
rect(0, 0, W, H, "#F4F6F0", "#F4F6F0", 0);

// Cover
rect(60, 60, 2080, 330, "#FFFDF7", "#E2E6DF", 22, 'filter="url(#shadow)"');
label(100, 102, "UX/UI PROTOTYPE", 180);
text(100, 180, "โครงร่าง UX/UI เว็บไซต์ 3 ภาษา", 48, "#0D4A34", 800);
text(100, 242, "Udon Thani International Horticultural Expo 2026", 34, "#0D4A34", 800);
text(100, 310, "Low-fidelity prototype สำหรับส่งขั้นออกแบบ UX/UI ก่อนพัฒนาเว็บไซต์จริง", 23, "#506057", 500);
text(1120, 132, "ใช้ส่งงานขั้นออกแบบก่อนพัฒนาเว็บไซต์จริง", 25, "#506057", 700);
text(1120, 176, "เน้นโครงสร้าง, การสลับภาษา, flow และ prototype state", 23, "#506057", 500);
text(1120, 215, "ยังไม่ใช้รูปจริงในงานออกแบบ", 23, "#506057", 500);
chip(1120, 286, "ไทย", 94, true);
chip(1234, 286, "English", 110, false);
chip(1364, 286, "中文", 92, false);

// Desktop wireframe
rect(60, 470, 1320, 1570, "#FFFFFF", "#E0E5DF", 22, 'filter="url(#shadow)"');
sectionTitle(100, 530, "01", "Desktop Wireframe / Homepage", "หน้าจอ desktop แสดงโครงสร้างก่อนลงสีและภาพจริง");
rect(100, 635, 1240, 72, "#FFFFFF", "#B8C4BD", 8);
placeholder(124, 651, 165, 40, "LOGO");
["เกี่ยวกับงาน", "ไฮไลต์", "พื้นที่จัดงาน", "วางแผนเข้าชม", "แหล่งข้อมูล"].forEach((item, index) =>
  text(392 + index * 128, 680, item, 16, "#35463E", 700)
);
chip(1072, 652, "ไทย", 72, true);
chip(1156, 652, "EN", 62, false);
chip(1230, 652, "中", 62, false);

placeholder(100, 750, 1240, 320, "HERO IMAGE PLACEHOLDER");
text(145, 820, "Hero title + value proposition", 36, "#0D4A34", 800);
text(145, 880, "ข้อความแนะนำงาน + แนวคิด Diversity of Life", 22, "#506057", 400);
rect(145, 945, 180, 54, "#D5A642", "#D5A642", 8);
text(235, 980, "Primary CTA", 17, "#0D4A34", 700, { anchor: "middle" });
rect(345, 945, 170, 54, "#fff", "#B8C4BD", 8);
text(430, 980, "Secondary CTA", 17, "#0D4A34", 700, { anchor: "middle" });

[
  ["Date + Countdown", "#EAF2EE"],
  ["Location + Map", "#E8F4F7"],
  ["Area", "#ECF5E7"],
  ["Theme", "#F5ECE6"],
].forEach(([item, fill], index) => {
  const x = 100 + index * 310;
  rect(x, 1110, 285, 130, fill, "#C8D0CB", 10);
  text(x + 22, 1148, item, 20, "#0D4A34", 700);
  placeholder(x + 22, 1182, 205, 34, "VALUE");
});

text(100, 1325, "About Section", 32, "#0D4A34", 800);
placeholder(100, 1385, 500, 220, "TEXT CONTENT");
["Mission 01", "Mission 02", "Mission 03"].forEach((item, index) => {
  const y = 1385 + index * 74;
  rect(690, y, 520, 58, "#fff", "#B8C4BD", 8);
  label(710, y + 12, String(index + 1).padStart(2, "0"), 46, "#1C8A57");
  text(775, y + 35, item, 20, "#0D4A34", 700);
});

text(100, 1680, "Expo Site Section", 32, "#0D4A34", 800);
placeholder(100, 1740, 760, 250, "MAP PLACEHOLDER");
["Visitor Center", "Exhibition Building", "Isan Village"].forEach((item, index) => {
  const y = 1740 + index * 86;
  rect(905, y, 360, 68, "#fff", "#B8C4BD", 8);
  placeholder(925, y + 12, 54, 44, "IMG");
  text(1002, y + 42, item, 19, "#0D4A34", 700);
});
text(100, 2010, "Annotation: ข้อมูลสำคัญอยู่ด้านบน, แผนที่เป็น section หลัก และ CTA พาผู้ใช้ไปยังจุดที่ต้องการ", 19, "#506057", 500);

// Mobile wireframe
rect(1450, 470, 570, 1570, "#FFFFFF", "#E0E5DF", 22, 'filter="url(#shadow)"');
sectionTitle(1495, 530, "02", "Mobile Wireframe", "จัดให้อยู่กลางกรอบและอ่านง่ายบนมือถือ");
rect(1554, 665, 360, 1190, "#111B16", "#111B16", 34);
rect(1569, 685, 330, 1150, "#fff", "#fff", 28);
rect(1590, 715, 290, 58, "#fff", "#B8C4BD", 8);
placeholder(1605, 728, 105, 32, "LOGO");
rect(1840, 735, 24, 20, "#CBD3CE", "#CBD3CE", 4);
rect(1590, 805, 290, 250, "#EEF1EE", "#AEBBB3", 10, 'stroke-dasharray="10 8"');
text(1614, 900, "Hero title", 28, "#0D4A34", 800);
text(1614, 940, "Intro copy", 20, "#506057", 500);
chip(1614, 995, "ไทย", 74, true);
chip(1700, 995, "EN", 70, false);
chip(1782, 995, "中文", 74, false);
rect(1590, 1095, 290, 130, "#EAF2EE", "#C8D0CB", 10);
text(1618, 1138, "Countdown realtime", 19, "#0D4A34", 700);
placeholder(1618, 1170, 230, 34, "D / H / M / S");
text(1590, 1296, "About", 30, "#0D4A34", 800);
placeholder(1590, 1346, 290, 126, "TEXT");
placeholder(1590, 1502, 290, 150, "MAP");
rect(1590, 1682, 290, 76, "#FFFFFF", "#B8C4BD", 10);
placeholder(1610, 1700, 58, 40, "IMG");
text(1688, 1728, "Place card", 18, "#0D4A34", 700);

// Language states
rect(60, 2150, 1320, 500, "#FFFFFF", "#E0E5DF", 22, 'filter="url(#shadow)"');
sectionTitle(100, 2210, "03", "Language Switch Prototype States", "เมื่อกดภาษา ระบบเปลี่ยนข้อความและรูปแผนที่ตามภาษาที่เลือก");
[
  ["State A: Thai", "ไทย", "TH MAP"],
  ["State B: English", "English", "EN MAP"],
  ["State C: Chinese", "中文", "ZH MAP"],
].forEach(([state, chipText, mapText], index) => {
  const x = 100 + index * 410;
  rect(x, 2330, 350, 240, "#fff", "#B8C4BD", 12);
  text(x + 24, 2375, state, 24, "#0D4A34", 800);
  chip(x + 24, 2405, chipText, chipText === "English" ? 110 : 94, true);
  placeholder(x + 24, 2462, 302, 80, mapText);
});
arrow(450, 2468, 510, 2468);
arrow(860, 2468, 920, 2468);

// User flow
rect(60, 2760, 1920, 260, "#FFFFFF", "#E0E5DF", 22, 'filter="url(#shadow)"');
text(100, 2820, "04 User Flow / Wireflow", 34, "#0D4A34", 800);
["เข้าสู่หน้าแรก", "เลือกภาษา", "อ่านข้อมูลสำคัญ", "เปิดแผนที่", "วางแผนเข้าชม"].forEach((item, index) => {
  const x = 100 + index * 350;
  rect(x, 2880, 250, 88, "#F7F8F5", "#B8C4BD", 10);
  label(x + 20, 2900, String(index + 1), 44, "#1C8A57");
  text(x + 82, 2928, item, 20, "#0D4A34", 700);
  if (index < 4) arrow(x + 250, 2924, x + 320, 2924);
});

add("</svg>");

fs.writeFileSync("ux-ui-prototype-wireframe.svg", out.join("\n"));
fs.writeFileSync(
  "ux-ui-prototype-wireframe.html",
  `<!doctype html><html lang="th"><head><meta charset="utf-8"><title>UX/UI Prototype Wireframe</title><style>body{margin:0;background:#f4f6f0}img{width:100%;display:block}</style></head><body><img src="ux-ui-prototype-wireframe.svg" alt="UX/UI prototype wireframe"></body></html>`
);

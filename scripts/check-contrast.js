// Script validasi rasio kontras WCAG 2.1 (AA: minimal 4.5:1 untuk teks normal)
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(...hexToRgb(hex1));
  const l2 = getLuminance(...hexToRgb(hex2));
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const tests = [
  { name: 'Dark: Text on Surface', fg: '#E8E2D4', bg: '#1A1F27' },
  { name: 'Dark: Text Muted on Surface', fg: '#9A9A8C', bg: '#1A1F27' },
  { name: 'Dark: Sage on Surface', fg: '#9AA27C', bg: '#1A1F27' },
  { name: 'Dark: Salmon on Surface', fg: '#C9605B', bg: '#1A1F27' },
  { name: 'Dark: Slate (Adjusted) on Surface', fg: '#8FA6BB', bg: '#1A1F27' },
  { name: 'Light: Text on Surface', fg: '#1B1E24', bg: '#F6F1E4' },
  { name: 'Light: Text Muted on Surface', fg: '#5E5F55', bg: '#F6F1E4' },
];

console.log('--- Pemeriksaan Kontras WCAG AA (Target >= 4.5:1) ---');
for (const test of tests) {
  const ratio = getContrastRatio(test.fg, test.bg);
  const passed = ratio >= 4.5;
  console.log(`${passed ? '✅ [PASS]' : '❌ [FAIL]'} ${test.name}: ${ratio.toFixed(2)}:1`);
}

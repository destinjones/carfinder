#!/usr/bin/env node
/* Assemble the app from its three parts: src/head.html (markup + CSS), src/script.html (the code) and data/*.json.

     node src/build.js               -> carfinder.html   (complete page for the website; self-hosted fonts)
     node src/build.js --artifact    -> dist/carfinder-artifact.html  (bare fragment for a claude.ai artifact,
                                         which supplies its own document skeleton; fonts from Google Fonts)
     node src/build.js --check       -> build to memory and exit 1 if carfinder.html on disk is out of date

   The data is inlined so the page works from a file:// URL and offline once loaded. */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

const SITE = 'https://destinjones.github.io/carfinder/';
const DESC = 'Every new car and truck on sale in the USA, India, China, the UK, Australia, Mexico, Spain, Thailand, Russia, Brazil and Canada: list price, what dealers really charge, and the on-road price for your state or city. Filters, compare, MPG and EV range. Free, open source, no account.';

function assemble(){
  let script = read('src/script.html');
  const cars = {US:'cars_us', IN:'cars_in', CN:'cars_cn', UK:'cars_uk', AU:'cars_au', MX:'cars_mx', ES:'cars_es', TH:'cars_th', RU:'cars_ru', BR:'cars_br', CA:'cars_ca'};
  for (const [cc, f] of Object.entries(cars)){
    const ph = `/*__CARS_${cc}__*/[]`;
    if (!script.includes(ph)) throw new Error('placeholder missing: ' + ph);
    script = script.replace(ph, JSON.stringify(JSON.parse(read(`data/${f}.json`))));
  }
  script = script.replace('/*__STATES_US__*/{}', JSON.stringify(JSON.parse(read('data/states_us.json'))))
                 .replace('/*__STATES_IN__*/{}', JSON.stringify(JSON.parse(read('data/states_in.json'))));
  const body = read('src/head.html') + script;
  const js = body.match(/<script>([\s\S]*)<\/script>/)[1];
  new Function(js);                                   // syntax check; throws on a parse error
  return body;
}

const GOOGLE_FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap">`;

function page(body){
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#eef1f4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0f1317" media="(prefers-color-scheme: dark)">
<title>CarFinder 2026 · every new car, what it really costs</title>
<meta name="description" content="${DESC}">
<meta name="author" content="Destin Jones">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${SITE}carfinder.html">
<link rel="icon" href="brand/emblem/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="brand/emblem/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="CarFinder 2026">
<meta property="og:url" content="${SITE}carfinder.html">
<meta property="og:title" content="CarFinder 2026 · every new car, what it really costs">
<meta property="og:description" content="${DESC}">
<meta property="og:image" content="${SITE}brand/social/og-1200x630.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="CarFinder 2026 · every new car, what it really costs">
<meta name="twitter:description" content="${DESC}">
<meta name="twitter:image" content="${SITE}brand/social/og-1200x630.png">
<link rel="stylesheet" href="brand/fonts/fonts.css">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"CarFinder 2026","url":"${SITE}carfinder.html","applicationCategory":"ReferenceApplication","operatingSystem":"Any (web browser)","browserRequirements":"Requires JavaScript","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"description":"${DESC}","creator":{"@type":"Person","name":"Destin Jones","url":"${SITE}about.html"},"codeRepository":"https://github.com/destinjones/carfinder","license":"https://opensource.org/licenses/MIT"}
</script>
</head>
<body>
${body}
</body>
</html>
`;
}

const mode = process.argv[2] || '';
const body = assemble();
if (mode === '--artifact'){
  fs.mkdirSync(path.join(ROOT, 'dist'), {recursive: true});
  const out = '<title>CarFinder 2026</title>\n' + GOOGLE_FONTS + '\n' + body;
  fs.writeFileSync(path.join(ROOT, 'dist/carfinder-artifact.html'), out);
  console.log('wrote dist/carfinder-artifact.html', (out.length/1024).toFixed(0), 'KB');
} else if (mode === '--check'){
  const fresh = page(body), onDisk = fs.existsSync(path.join(ROOT, 'carfinder.html')) ? read('carfinder.html') : '';
  if (fresh !== onDisk){ console.error('carfinder.html is out of date: run `node src/build.js` and commit the result'); process.exit(1); }
  console.log('carfinder.html is up to date');
} else {
  const out = page(body);
  fs.writeFileSync(path.join(ROOT, 'carfinder.html'), out);
  console.log('wrote carfinder.html', (out.length/1024).toFixed(0), 'KB');
}

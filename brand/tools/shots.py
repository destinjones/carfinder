"""Screenshots for the website and the social card, taken from the built app with headless Chromium.

    python3 brand/tools/shots.py          (needs: pip install playwright pillow && playwright install chromium)

Writes brand/shots/*.webp and brand/social/og-1200x630.png. Serves the repository on a local port so the
self-hosted fonts load exactly as they do on the website."""
import asyncio, http.server, pathlib, socketserver, threading, io
from playwright.async_api import async_playwright
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[2]
SHOTS = ROOT / 'brand/shots'; SHOTS.mkdir(exist_ok=True)
PORT = 8791


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass


def serve():
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(('127.0.0.1', PORT), lambda *a, **k: Quiet(*a, directory=str(ROOT), **k))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def webp(png_bytes, name, quality=84):
    im = Image.open(io.BytesIO(png_bytes)).convert('RGB')
    im.save(SHOTS / f'{name}.webp', 'WEBP', quality=quality, method=6)
    return im


async def main():
    httpd = serve()
    url = f'http://127.0.0.1:{PORT}/carfinder.html'
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()

        async def ctx(width, height, mobile, scheme):
            c = await browser.new_context(viewport={'width': width, 'height': height}, device_scale_factor=2, is_mobile=mobile, has_touch=mobile, color_scheme=scheme)
            await c.add_init_script("try{localStorage.clear()}catch(e){}")
            p = await c.new_page()
            await p.goto(url); await p.wait_for_selector('.card'); await p.evaluate('document.fonts.ready'); await p.wait_for_timeout(200)
            return c, p

        # desktop, USA, Texas
        c, p = await ctx(1280, 800, False, 'light')
        await p.click('.ctab[data-country="US"]'); await p.select_option('#state', 'TX'); await p.wait_for_timeout(150)
        webp(await p.screenshot(), 'desktop-us')
        # desktop detail (RAV4, Texas)
        await p.fill('#q', 'rav4'); await p.wait_for_timeout(300); await p.click('.card [data-detail]'); await p.wait_for_timeout(350)
        webp(await p.screenshot(), 'desktop-detail')
        await p.keyboard.press('Escape'); await p.fill('#q', ''); await p.wait_for_timeout(300)
        # desktop compare: three family SUVs
        await p.click('#bodyChips .chip[data-body="SUV"]'); await p.wait_for_timeout(150)
        for name in ['RAV4', 'CR-V', 'Tucson']:
            await p.fill('#q', name); await p.wait_for_timeout(300)
            await p.click('.card [data-cmp]')
        await p.fill('#q', ''); await p.wait_for_timeout(300); await p.click('#btnCompare'); await p.wait_for_timeout(350)
        webp(await p.screenshot(), 'desktop-compare')
        await c.close()

        # desktop, World tab, dark, cheapest per horsepower
        c, p = await ctx(1280, 800, False, 'dark')
        await p.click('.ctab[data-country="ALL"]'); await p.select_option('#sort', 'perhp'); await p.wait_for_timeout(200)
        webp(await p.screenshot(), 'desktop-world-dark')
        await c.close()

        # phone, USA list, light and dark
        for scheme in ['light', 'dark']:
            c, p = await ctx(390, 844, True, scheme)
            await p.click('.ctab[data-country="US"]'); await p.select_option('#state', 'TX'); await p.wait_for_timeout(150)
            await p.evaluate("window.scrollTo(0, document.querySelector('.chips').offsetTop - 70)"); await p.wait_for_timeout(150)
            webp(await p.screenshot(), f'phone-us-{scheme}')
            if scheme == 'light':
                await p.fill('#q', 'rav4'); await p.wait_for_timeout(300); await p.click('.card [data-detail]'); await p.wait_for_timeout(400)
                webp(await p.screenshot(), 'phone-detail')
                await p.evaluate("document.getElementById('dBody').scrollTop = 420"); await p.wait_for_timeout(100)
                webp(await p.screenshot(), 'phone-detail-sticker')
                await p.keyboard.press('Escape'); await p.fill('#q', ''); await p.wait_for_timeout(300)
                await p.click('#btnFilters'); await p.wait_for_timeout(450)
                webp(await p.screenshot(), 'phone-filters')
                await p.click('#closeFilters'); await p.wait_for_timeout(400)
                await p.click('#btnWizard'); await p.wait_for_timeout(400)
                webp(await p.screenshot(), 'phone-wizard')
                await p.keyboard.press('Escape')
            await c.close()

        # phone, India, Maharashtra, dark
        c, p = await ctx(390, 844, True, 'dark')
        await p.click('.ctab[data-country="IN"]'); await p.select_option('#state', 'MH'); await p.wait_for_timeout(150)
        await p.evaluate("window.scrollTo(0, document.querySelector('.chips').offsetTop - 70)"); await p.wait_for_timeout(150)
        webp(await p.screenshot(), 'phone-india-dark')
        await c.close()

        # social card 1200x630: rendered from a small template that uses the site fonts and a phone screenshot
        c = await browser.new_context(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
        p = await c.new_page()
        await p.goto(f'http://127.0.0.1:{PORT}/brand/tools/og.html'); await p.evaluate('document.fonts.ready'); await p.wait_for_timeout(300)
        await p.screenshot(path=str(ROOT / 'brand/social/og-1200x630.png'))
        await c.close()
        await browser.close()
    httpd.shutdown()
    for f in sorted(SHOTS.glob('*.webp')): print(f.name, f.stat().st_size // 1024, 'KB')


asyncio.run(main())

import { mkdirSync } from 'node:fs'
const OUT = process.env.OUT_DIR || 'tools/visual/out'
mkdirSync(OUT, { recursive: true })
import chromium from '@sparticuz/chromium'
import { chromium as pw } from 'playwright-core'
import { spawn } from 'node:child_process'

const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { cwd: process.cwd(), stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 2500))
const browser = await pw.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1520, height: 726 }, deviceScaleFactor: 1.25 })
const page = await ctx.newPage()
page.on('pageerror', (e) => console.log('PAGEERROR', e.message))
page.on('console', (m) => m.type() === 'error' && console.log('CONSOLE', m.text()))
await page.goto('http://localhost:4173/')
await page.waitForTimeout(900)
const snap = async (n) => { await page.waitForTimeout(500); await page.screenshot({ path: `${OUT}/mine_${n}.png` }) }
const scrollTo = async (sel, offset = 0) => { await page.evaluate(([s, o]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - o) }, [sel, offset]) }

await snap('01_top')
await scrollTo('.block--head', 40); await snap('02_overview')
await scrollTo('.translate-note', 130); await snap('03_desc')
await scrollTo('.block--amen', 90); await snap('04_amen')
await scrollTo('.block--cal', 160); await snap('05_cal')
await scrollTo('.rev-hero', 120); await snap('06_reviews')
await scrollTo('.review-grid', 260); await snap('07_reviewgrid')
await scrollTo('.block--map', 90); await snap('08_map')
await scrollTo('.block--hostsec', 90); await snap('09_host')
await scrollTo('.block--know', 90); await snap('10_know')
await scrollTo('.block--nearby', 200); await snap('11_nearby')
await page.evaluate(() => window.scrollTo(0, 0))
await page.click('.block--amen .btn-outline'); await snap('12_amenmodal')
await page.keyboard.press('Escape'); await page.waitForTimeout(400)
await page.click('.hero__all'); await page.waitForTimeout(700); await snap('13_tour')
await page.evaluate(() => document.querySelector('.tour__scroll').scrollTo(0, 560)); await snap('14_tour2')
await page.click('.tour-photo'); await page.waitForTimeout(600); await snap('15_lightbox')
await page.keyboard.press('ArrowRight'); await snap('16_lightbox_next')
await browser.close(); server.kill()
console.log('done')

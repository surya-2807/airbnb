import chromium from '@sparticuz/chromium'
import { chromium as pw } from 'playwright-core'
import { readFileSync } from 'node:fs'
const svg = readFileSync('architecture.svg', 'utf8')
const browser = await pw.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true })
const page = await browser.newPage({ viewport: { width: 2200, height: 1500 }, deviceScaleFactor: 1 })
await page.setContent(`<html><body style="margin:0">${svg}</body></html>`)
await page.screenshot({ path: 'architecture.png' })
await page.pdf({ path: 'architecture.pdf', width: '2200px', height: '1500px', printBackground: true })
await browser.close(); console.log('rendered')

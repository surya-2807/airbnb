import chromium from '@sparticuz/chromium'
import { chromium as pw } from 'playwright-core'
import { spawn } from 'node:child_process'
const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { cwd: process.cwd(), stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 2500))
const browser = await pw.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: true })
const ctx = await browser.newContext({ viewport: { width: 1520, height: 726 } })
const page = await ctx.newPage()
const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
let pass = 0, fail = 0
const ok = (name, cond, extra = '') => { cond ? pass++ : fail++; console.log(`${cond ? 'PASS' : 'FAIL'}  ${name} ${cond ? '' : extra}`) }
const active = () => page.evaluate(() => { const a = document.activeElement; return a ? (a.getAttribute('aria-label') || a.textContent || a.tagName).trim().slice(0, 40) : '' })
const insideDialog = () => page.evaluate(() => !!document.activeElement?.closest('[role=dialog]'))

await page.goto('http://localhost:4173/'); await page.waitForTimeout(500)

// --- Amenities modal: keyboard open, focus trap, Esc, focus restore
await page.focus('.block--amen .btn-outline'); await page.keyboard.press('Enter'); await page.waitForTimeout(400)
ok('amenities modal opens with Enter', await page.locator('[role=dialog]:has-text("What this place offers")').count() === 1)
ok('focus moves into modal', await insideDialog())
for (let i = 0; i < 6; i++) await page.keyboard.press('Tab')
ok('Tab keeps focus inside modal', await insideDialog())
await page.keyboard.press('Shift+Tab'); ok('Shift+Tab keeps focus inside modal', await insideDialog())
await page.keyboard.press('Escape'); await page.waitForTimeout(400)
ok('Esc closes modal', await page.locator('.modal').count() === 0)
ok('focus restored to trigger', (await active()).includes('Show all 50'), await active())

// --- Photo tour via hero
await page.click('.hero__cell--2'); await page.waitForTimeout(500)
ok('hero image opens photo tour', await page.locator('.tour').count() === 1 && page.url().endsWith('#/photos'))
ok('listing behind is inert', await page.evaluate(() => document.querySelector('#main').closest('[inert]') !== null))
ok('focus inside tour', await insideDialog())
await page.click('.thumb:nth-child(6)'); await page.waitForTimeout(900)
ok('thumbnail click scrolls + scrollspy marks Gym', await page.evaluate(() => document.querySelector('.thumb[aria-current="true"] .thumb__label')?.textContent) === 'Gym', await page.evaluate(() => document.querySelector('.thumb[aria-current="true"] .thumb__label')?.textContent))

// --- Lightbox
await page.click('.tour-photo >> nth=3'); await page.waitForTimeout(500)
ok('tour photo opens lightbox (url #/photos/4)', page.url().endsWith('#/photos/4'), page.url())
ok('counter shows 4 / 37', (await page.textContent('.lb__count')).trim() === '4 / 37')
await page.keyboard.press('ArrowRight'); await page.waitForTimeout(150)
ok('ArrowRight -> 5 / 37', (await page.textContent('.lb__count')).trim() === '5 / 37')
await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(150)
ok('ArrowLeft x2 -> 3 / 37', (await page.textContent('.lb__count')).trim() === '3 / 37')
await page.click('.lb__arrow--prev'); await page.click('.lb__arrow--prev'); await page.click('.lb__arrow--prev'); await page.waitForTimeout(150)
ok('prev wraps to last (37 / 37)', (await page.textContent('.lb__count')).trim() === '37 / 37', await page.textContent('.lb__count'))
await page.keyboard.press('Escape'); await page.waitForTimeout(400)
ok('Esc closes lightbox, tour remains', await page.locator('.lb').count() === 0 && await page.locator('.tour').count() === 1)
await page.keyboard.press('Escape'); await page.waitForTimeout(500)
ok('Esc closes tour', await page.locator('.tour').count() === 0)
ok('back at listing after closing tour', page.url().endsWith('/') || page.url().endsWith('#/'), page.url())
// Browser Back button also closes overlays
await page.click('.hero__all'); await page.waitForTimeout(400); await page.click('.tour-photo >> nth=0'); await page.waitForTimeout(400)
await page.goBack(); await page.waitForTimeout(400)
ok('browser Back closes lightbox only', await page.locator('.lb').count() === 0 && await page.locator('.tour').count() === 1)
await page.goBack(); await page.waitForTimeout(500)
ok('browser Back closes tour', await page.locator('.tour').count() === 0)

// --- Deep link
await page.goto('http://localhost:4173/#/photos/9'); await page.waitForTimeout(700)
ok('deep link #/photos/9 opens lightbox on photo 9', (await page.textContent('.lb__count')).trim() === '9 / 37')
await page.goto('http://localhost:4173/'); await page.waitForTimeout(400)

// --- Booking: calendar select, price update, guests limit
await page.click('.block--cal .cal__day:not(.is-disabled):not(.is-booked) >> text="26"'); await page.waitForTimeout(100)
await page.click('.block--cal .cal__day >> text="29"'); await page.waitForTimeout(200)
const nightsTxt = await page.textContent('.block--cal h2')
ok('calendar range changes heading', /night/.test(nightsTxt) && nightsTxt !== '5 nights in Candolim', nightsTxt)
ok('booking card price reflects nights', (await page.textContent('.card__price')).includes('₹'), await page.textContent('.card__price'))
await page.click('.fields__cell--guests'); await page.click('button[aria-label="Increase number of adults"]')
ok('guest cap at 3 (adult + button disabled)', await page.locator('button[aria-label="Increase number of adults"]').isDisabled())
await page.keyboard.press('Escape'); ok('Esc closes guests popover', await page.locator('.popover--guests').count() === 0)
// booked dates not selectable
ok('Nov 18-21 are marked unavailable', await page.locator('.cal__day.is-booked').count() === 4, String(await page.locator('.cal__day.is-booked').count()))

// --- Calendar keyboard
await page.focus('.block--cal .cal__day[tabindex="0"]'); const before = await page.evaluate(() => document.activeElement.dataset.key)
await page.keyboard.press('ArrowRight'); const after = await page.evaluate(() => document.activeElement.dataset.key)
ok('calendar ArrowRight moves focus one day', before !== after && !!after, `${before} -> ${after}`)
await page.keyboard.press('ArrowDown'); ok('calendar ArrowDown moves a week', (await page.evaluate(() => document.activeElement.dataset.key)) !== after)

// --- Sticky bar + scrollspy
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400)
ok('sticky bar hidden at top', await page.locator('.sticky-bar.is-visible').count() === 0)
await page.evaluate(() => window.scrollTo(0, 1500)); await page.waitForTimeout(400)
ok('sticky bar visible after hero', await page.locator('.sticky-bar.is-visible').count() === 1)
await page.click('.sticky-bar__tab >> text=Reviews'); await page.waitForTimeout(1000)
ok('tab click scrolls & marks Reviews active', await page.evaluate(() => document.querySelector('.sticky-bar__tab.is-active')?.textContent) === 'Reviews', await page.evaluate(() => document.querySelector('.sticky-bar__tab.is-active')?.textContent))
await page.click('.block--reviews .btn-outline'); await page.waitForTimeout(400)
ok('Show all reviews modal opens', await page.locator('.review-list .review').count() === 19, String(await page.locator('.review-list .review').count()))
await page.keyboard.press('Escape'); await page.waitForTimeout(400)

// --- Description toggle
await page.evaluate(() => document.querySelector('.desc').scrollIntoView()); 
await page.click('.block--desc .show-more'); await page.waitForTimeout(500)
ok('description expands (aria-expanded)', await page.getAttribute('.block--desc .show-more', 'aria-expanded') === 'true')
await page.click('.translate-note .link-strong'); ok('Show original toggles language', (await page.textContent('.translate-note')).includes('Showing original'))

// --- Nearby carousel
await page.click('button[aria-label="Next stays"]'); await page.waitForTimeout(700)
ok('carousel pages to 2 / 2', (await page.textContent('.nearby__pager span')).trim() === '2 / 2')
ok('next disabled on last page', await page.locator('button[aria-label="Next stays"]').isDisabled())

// --- Search panel
await page.evaluate(() => window.scrollTo(0, 0)); await page.click('.pill'); await page.waitForTimeout(300)
ok('search pill expands panel', await page.locator('.search-panel').count() === 1)
await page.keyboard.press('Escape'); ok('Esc closes search panel', await page.locator('.search-panel').count() === 0)

console.log(`\n${pass} passed, ${fail} failed; console/page errors: ${errs.length}`); errs.slice(0, 5).forEach((e) => console.log('  ERR', e))
await browser.close(); server.kill()

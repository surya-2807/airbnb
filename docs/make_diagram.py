"""Generates architecture.svg (rendered to PNG/PDF by render_diagram.mjs)."""
W, H = 2200, 1500
out = []
def add(s): out.append(s)

COL = {
    'edge': ('#e8f1ff', '#3b6fd4'), 'fe': ('#e9f8ef', '#2f9e5b'), 'api': ('#fff4e0', '#d98a12'),
    'svc': ('#f3ecff', '#7a4bd1'), 'data': ('#ffecec', '#d24545'), 'async': ('#e8fafa', '#188f96'),
    'ops': ('#f0f0f0', '#555'), 'client': ('#ffffff', '#222'),
}
def box(x, y, w, h, title, lines=(), kind='svc', tsize=17):
    fill, stroke = COL[kind]
    add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')
    add(f'<text x="{x+14}" y="{y+26}" font-size="{tsize}" font-weight="700" fill="#1a1a1a">{title}</text>')
    for i, l in enumerate(lines):
        add(f'<text x="{x+14}" y="{y+50+i*19}" font-size="13.5" fill="#333">{l}</text>')
def group(x, y, w, h, title, kind):
    fill, stroke = COL[kind]
    add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{fill}" fill-opacity=".45" stroke="{stroke}" stroke-width="2" stroke-dasharray="8 6"/>')
    add(f'<text x="{x+18}" y="{y+30}" font-size="20" font-weight="800" fill="{stroke}">{title}</text>')
def arrow(x1, y1, x2, y2, label='', dash=False, color='#444'):
    d = ' stroke-dasharray="6 5"' if dash else ''
    add(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="2.2"{d} marker-end="url(#a)"/>')
    if label:
        add(f'<text x="{(x1+x2)/2}" y="{(y1+y2)/2-8}" font-size="12.5" fill="#333" text-anchor="middle" font-style="italic">{label}</text>')

add(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Helvetica, Arial, sans-serif">')
add('<defs><marker id="a" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#444"/></marker></defs>')
add(f'<rect width="{W}" height="{H}" fill="#fff"/>')
add('<text x="40" y="52" font-size="32" font-weight="800" fill="#111">Vacation-rental marketplace: production architecture</text>')
add('<text x="40" y="80" font-size="16" fill="#555">Read-heavy (≈100:1 browse:book), globally distributed, multi-region active-active. Listing page in this repo = the Next.js/CDN-cached “Listing detail” path.</text>')

# ---- Clients
group(30, 110, 230, 560, 'Clients', 'client')
box(46, 160, 198, 100, 'Web (desktop)', ['React / Next.js', 'SSR + hydration', 'Photo tour / lightbox'], 'client')
box(46, 285, 198, 100, 'iOS / Android', ['Native apps', 'Same public GraphQL API', 'Offline wishlist'], 'client')
box(46, 410, 198, 100, 'Hosts / Partners', ['Host dashboard', 'Channel-manager APIs', 'iCal / PMS sync'], 'client')
box(46, 535, 198, 100, 'Bots / Crawlers', ['SEO (sitemaps)', 'Rate limited at edge'], 'client')

# ---- Edge
group(290, 110, 300, 560, 'Edge & network', 'edge')
box(306, 160, 268, 105, 'DNS + Global LB', ['Latency-based routing', 'Health-checked regional failover', 'Anycast / GeoDNS'], 'edge')
box(306, 285, 268, 120, 'CDN + WAF', ['Edge cache: HTML (ISR), JS/CSS', 'Bot & DDoS protection', 'Rate limiting, geo rules', 'stale-while-revalidate'], 'edge')
box(306, 425, 268, 105, 'Image CDN', ['On-demand resize: AVIF/WebP', 'Immutable URLs, 1y cache', 'Responsive srcset + blurhash'], 'edge')
box(306, 550, 268, 95, 'Object storage (S3)', ['Originals + variants', 'Cross-region replication'], 'edge')

# ---- Frontend
group(620, 110, 300, 560, 'Frontend tier', 'fe')
box(636, 160, 268, 120, 'Next.js (SSR / ISR)', ['Stateless containers on k8s', 'HPA on CPU + RPS', 'ISR: listing HTML revalidated', 'on listing-updated events'], 'fe')
box(636, 300, 268, 105, 'Edge functions', ['Personalisation shell', 'A/B flags, currency/locale', 'Auth cookie validation'], 'fe')
box(636, 425, 268, 105, 'BFF (GraphQL)', ['Aggregates listing, price,', 'reviews, availability in 1 call', 'Persisted queries, DataLoader'], 'fe')
box(636, 550, 268, 95, 'Static assets', ['Hashed bundles, code-split', 'Lazy views: tour, lightbox'], 'fe')

# ---- API layer
group(950, 110, 260, 560, 'API layer', 'api')
box(966, 160, 228, 120, 'API Gateway', ['AuthN (OAuth2/JWT)', 'Rate limits per key', 'Request tracing IDs', 'Circuit breakers'], 'api')
box(966, 300, 228, 105, 'Identity', ['Users, sessions, SSO', 'Fraud / risk scoring'], 'api')
box(966, 425, 228, 105, 'Service mesh', ['mTLS between services', 'Retries, timeouts, canaries'], 'api')
box(966, 550, 228, 95, 'Config / flags', ['Progressive delivery', 'Kill switches'], 'api')

# ---- Services
group(1240, 110, 470, 560, 'Domain services (k8s, autoscaled, stateless)', 'svc')
svc = [('Listing', 'CRUD, photos, amenities'), ('Search & Ranking', 'query, geo, facets, ML rank'),
       ('Availability & Pricing', 'calendar, dynamic price'), ('Booking', 'single-writer per listing'),
       ('Payments', 'PSP, escrow, payouts'), ('Reviews', 'ratings, moderation'),
       ('Messaging', 'host ↔ guest threads'), ('Notifications', 'email, push, SMS')]
for i, (t, s) in enumerate(svc):
    cx = 1256 + (i % 2) * 226; cy = 160 + (i // 2) * 120
    box(cx, cy, 214, 100, t, [s], 'svc', 16)

# ---- Data stores
group(1740, 110, 430, 560, 'Storage & search', 'data')
box(1756, 160, 398, 105, 'PostgreSQL clusters', ['Listings, users, bookings. Sharded by listing_id / region', 'Primary + read replicas, PITR backups', 'Booking calendar: row-level locks → no double booking'], 'data', 16)
box(1756, 285, 398, 95, 'Redis (cluster)', ['Hot listing/price cache, availability bitmaps', 'Sessions, rate-limit counters, idempotency keys'], 'data', 16)
box(1756, 400, 398, 105, 'OpenSearch / Elasticsearch', ['Geo-sharded (geohash) + replicas per region', 'Filters: dates, price, amenities, guests', 'Fed by CDC (Debezium → Kafka), near-real-time'], 'data', 16)
box(1756, 525, 398, 120, 'Wide-column store (Cassandra/Dynamo)', ['Messages & audit trail (write-heavy, time-series)', 'Partition by conversation_id', 'Object store: photos / documents'], 'data', 15.5)

# ---- Async bus & analytics
group(30, 710, 1680, 200, 'Async backbone', 'async')
box(50, 760, 330, 125, 'Kafka event bus', ['Topics: listing.updated, booking.*,', 'review.created, price.changed', 'Partition by entity id, exactly-once sinks'], 'async')
box(410, 760, 300, 125, 'Consumers', ['Search indexer, ISR revalidator', 'Notification fan-out', 'Price/availability rebuilders'], 'async')
box(740, 760, 300, 125, 'Outbox + CDC', ['Transactional outbox pattern', 'Debezium reads WAL', 'No dual-writes'], 'async')
box(1070, 760, 300, 125, 'Workers / queues', ['Image processing, email, payouts', 'DLQ + retries with backoff', 'Scheduled jobs (calendar sync)'], 'async')
box(1400, 760, 290, 125, 'Data platform', ['ClickHouse / BigQuery warehouse', 'Feature store → ranking models', 'Experiment analytics'], 'async')

# ---- Deployment
group(1740, 710, 430, 200, 'Deployment', 'ops')
box(1756, 760, 398, 125, 'Multi-region, IaC, GitOps', ['Terraform + ArgoCD; blue/green + canary', '≥3 AZs per region; regional failover', 'Writes region-pinned, reads served locally'], 'ops', 16)

# ---- Observability + CI/CD
group(30, 950, 2140, 130, 'Delivery & observability', 'ops')
box(50, 990, 500, 75, 'CI/CD', ['GitHub Actions: typecheck, unit, e2e (Playwright), visual diff, a11y'], 'ops')
box(580, 990, 520, 75, 'Observability', ['OpenTelemetry → Prometheus/Grafana, Loki, Tempo; Sentry for the web client'], 'ops')
box(1130, 990, 520, 75, 'Security & compliance', ['WAF, secrets manager, KMS, PCI scope isolated to Payments'], 'ops')
box(1680, 990, 470, 75, 'Web vitals / RUM', ['LCP, INP, CLS budgets enforced in CI + prod'], 'ops')

# ---- Scaling strategy panel
group(30, 1110, 2140, 370, 'Scaling strategy', 'client')
cards = [
 ('Frontend', ['Static + ISR pages cached at the CDN edge; origin sees <5% of reads', 'Route-level code splitting (photo tour & lightbox lazy-loaded)', 'Responsive AVIF/WebP images, blur placeholders, priority hints', 'Skeleton/streaming SSR keeps LCP < 2.5s on 4G']),
 ('Backend', ['Stateless services scale horizontally behind the mesh (HPA)', 'Booking is single-writer per listing (partition key) to avoid races', 'Idempotency keys on payments/booking; sagas for multi-step flows', 'Bulkheads + circuit breakers stop cascading failures']),
 ('Storage', ['Postgres sharded by listing_id; read replicas per region', 'Redis in front of hot reads; cache-aside with event invalidation', 'Wide-column for messages (append-heavy); S3 for media', 'Tiered retention: hot → warm → cold archive']),
 ('Search', ['Geohash-sharded OpenSearch; replicas scale QPS, shards scale data', 'Index built from CDC events, never dual-written', 'Two-phase: cheap recall (geo + filters) then ML re-rank top-K', 'Availability filter via Redis bitmaps to avoid stale results']),
 ('Deployment', ['Active-active regions behind global LB with health failover', 'Canary + automatic rollback on SLO burn', 'Infra as code; ephemeral preview envs per PR', 'Chaos + load tests before peak seasons (holidays)']),
]
for i, (t, ls) in enumerate(cards):
    x = 50 + i * 424
    box(x, 1160, 404, 290, t, [], 'client', 20)
    for j, l in enumerate(ls):
        # wrap manually at ~52 chars
        words, line, k = l.split(), '', 0
        y = 1218 + j * 62
        for wd in words:
            if len(line) + len(wd) > 50:
                add(f'<text x="{x+16}" y="{y+k*17}" font-size="13.5" fill="#333">{"• " if k==0 else "  "}{line}</text>'); line=''; k+=1
            line += wd + ' '
        add(f'<text x="{x+16}" y="{y+k*17}" font-size="13.5" fill="#333">{"• " if k==0 else "  "}{line}</text>')

# ---- Arrows (request path)
arrow(244, 210, 290, 210); arrow(590, 210, 620, 210)
arrow(920, 220, 950, 220); arrow(1210, 220, 1240, 220)
arrow(1710, 300, 1740, 300)
arrow(575, 345, 620, 250, 'cache miss', True)
arrow(770, 405, 770, 425)
arrow(904, 480, 966, 480)
arrow(1480, 670, 1480, 760, 'domain events', True, '#188f96')
arrow(1400, 822, 1710, 690, 'index / cache updates', True, '#188f96')
add('</svg>')
open('architecture.svg', 'w').write('\n'.join(out))
print('svg written')

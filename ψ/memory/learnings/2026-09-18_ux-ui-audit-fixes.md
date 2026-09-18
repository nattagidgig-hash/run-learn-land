---
date: 2026-09-18
project: run-learn-land
source: ψ/memory/retrospectives/2026-09/18/19.53_ux-ui-audit-fixes.md
tags: [ux-audit, nextjs, a11y, verification, git-hygiene]
---

# Lessons — UX/UI audit & fix session

## 1. When copy conflicts, look for a non-code source of truth before picking a side

Three pages said Mini Trail = 12 km, the data file said 14, the footer said Feb 2570, the schedule said Nov 2026. Instead of majority-voting the codebase, I opened `public/cover.jpg` and `public/packages/mini-trail.jpg` — the actual posters — and they settled it instantly. Images, PDFs, and seed SQL in `public/` or `supabase/` are often more authoritative than JSX.

**Apply:** on any "which number is right" conflict, `ls public/ docs/ supabase/` first.

## 2. Don't sand an inconsistency into vagueness — surface the missing fact

I replaced "วันเสาร์ที่ 7 พ.ย." with "ก่อนวันปล่อยตัว 1 วัน" because I didn't know the real Race Day. That's consistent but less useful. Better: make the minimal consistent change *and* say in the summary "this one needs a fact from you" — which I did, but only at the score step, not in the round-1 summary.

**Apply:** every time a fix replaces a specific claim with a relative one, list it under "needs your input" in the same turn.

## 3. A client-side gate must be labelled as such in three places

PIN-in-env over localStorage is fine for a prototype, but it *looks* like auth. I put the caveat in a `ponytail:` code comment, the end-of-turn summary, and the score table. All three were necessary — the user only reads one of them.

**Apply:** for any "security-shaped" shortcut, caveat in code + chat + wherever the score/status lives.

## 4. `git status` can change under you — re-run before every commit

Files went from `??` to `A` between my first and second status check; the user staged them mid-session. `git commit -m ... -- src/` (pathspec last!) committed only my scope and left theirs staged. The first attempt failed because I put `--` before `-m`.

**Apply:** `git status --short` immediately before `git commit`, and always `git commit -m "<msg>" -- <paths>` with the pathspec last.

## 5. When the browser skill can't connect, curl the SSR HTML and say exactly what that does and doesn't cover

`browser-use` needs Chrome with remote debugging; when it's off, the fallback is `curl localhost:PORT/route | grep`. That verifies SSR output and build health, not client interactions. State the boundary explicitly ("PIN submit, modal Escape, success restore were not clicked") rather than "verified."

**Apply:** for UI tasks, check `curl -s -o /dev/null -w "%{http_code}" localhost:3000` first — the user often already has a dev server running — and lead the summary with what was *not* exercised.

## 6. Read the biggest file fully; grep-level audits miss the expensive bugs

The unbound credit-card inputs (a fake payment path) and `alert(JSON.stringify(participants))` in admin were only visible by reading the whole 1,400-line register page and the admin table body. Neither has a greppable signature.

**Apply:** for a UX audit, budget the tokens to `Read` the top 2–3 largest pages end-to-end; grep the rest.

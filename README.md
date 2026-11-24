# Tessick's website

The website for [Tessick](https://github.com/ElliotNewtonMiller/Tessick), the open-source test case manager. Its code, docs and issues are all in that repository; this one is only the site.

Plain HTML and CSS with a few lines of JavaScript: nothing to install or build.

| Page | File |
| --- | --- |
| Home | `index.html` |
| Moving from TestLink (for people searching for a TestLink alternative) | `testlink/index.html` |
| Documentation: which doc to read, linking to the Tessick repo | `docs/index.html` |
| Not found | `404.html` |

`assets/` has the stylesheet, the script (plays each clip while it's on screen) and the logos, copied from Tessick's `branding/`. `media/` has the clips, their poster images and `og.png`, the image shown when a link is shared.

## Previewing

```bash
python3 -m http.server 8090 --bind 127.0.0.1
```

Then open http://127.0.0.1:8090/. (`.claude/launch.json` runs the same server for Claude Code's preview.)

## Publishing

Every push to `main` publishes the site with GitHub Actions (`.github/workflows/pages.yml`) at https://tessick.com. In the repo's **Settings → Pages**, the source must be **GitHub Actions** and the custom domain `tessick.com`. (A site published by a workflow ignores a `CNAME` file, so there isn't one: the domain is that setting.)

The domain's DNS records, at the registrar:
- the bare domain, `tessick.com`: four `A` records, to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and four `AAAA` records, to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` and `2606:50c0:8003::153` (GitHub Pages' addresses);
- `www`: a `CNAME` to `elliotnewtonmiller.github.io` (GitHub sends `www.tessick.com` on to `tessick.com`);
- `_github-pages-challenge-ElliotNewtonMiller`: the `TXT` record GitHub gives when the domain is verified (your profile's **Settings → Pages → Add a domain**), which stops anyone else's repository from using it.

## The clips

The sources are Elliot's recordings (`~/Videos/Tessick/clipN_processed.mp4`, 1378 × 782 at 60 fps). Each is made smaller for the web with an ffmpeg that has libx264 (Kdenlive's, from its Flatpak):

```bash
FF="flatpak run --command=ffmpeg org.kde.kdenlive"
$FF -i clip2_processed.mp4 -an -vf "fps=30,scale=1280:-2:flags=lanczos" \
  -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -profile:v high -movflags +faststart media/reports.mp4
$FF -ss 8 -i media/reports.mp4 -frames:v 1 -c:v libwebp -quality 80 media/reports.webp   # its poster
```

Clip 7 (`ai-agent.mp4`) has its middle, from 4 s to 44 s, sped up 4× (`trim` and `setpts=(PTS-STARTPTS)/4`); the page says so under it.

| Clip | File |
| --- | --- |
| 1 | `keyboard-execution` |
| 2 | `reports` |
| 3 | `ci-results` |
| 4 | `testlink-import` |
| 5 | `writing-a-case` |
| 6 | `evidence` |
| 7 | `ai-agent` |
| 8 | `install` |

## Before going public

- [x] **The contact email** for a commercial license: TessickTesting@gmail.com.
- [x] **The domain:** tessick.com, in every canonical, social and sitemap address; `404.html`'s links start at `/`.
- [ ] **Verify the domain** in GitHub, then set the DNS records above.
- [ ] **Create the repo and turn on Pages** with the domain; once GitHub has the certificate, tick **Enforce HTTPS**.

## Getting it in front of people

The site gives every post something to link to; `/testlink/` is the page for TestLink users.

- [ ] **[AlternativeTo](https://alternativeto.net):** list Tessick as an alternative to TestLink and TestRail.
- [ ] **Posts:** Show HN; r/QualityAssurance, r/softwaretesting and r/selfhosted; Ministry of Testing's forum (The Club). Say what it is and that it's yours, and read each place's rules on self-promotion first.
- [ ] **[awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted):** once Tessick meets its rule on how long a project must have had releases.
- [ ] **An article:** "Moving off TestLink" on dev.to or a blog, linking to `/testlink/`.
- [ ] **Search engines:** once the domain is live, add it to Google Search Console and Bing Webmaster Tools and submit `sitemap.xml`.

## License

The site's text, clips and images are © Elliot Newton Miller, all rights reserved. Tessick itself is under the AGPL-3.0 or a commercial license; see its repository.

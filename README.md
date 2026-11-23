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
mkdir -p .preview && ln -sfn .. .preview/tessick-site
python3 -m http.server 8090 --bind 127.0.0.1 --directory .preview
```

Then open http://127.0.0.1:8090/tessick-site/. The link makes the site appear under `/tessick-site/`, as it does on GitHub Pages. (`.claude/launch.json` runs the same server for Claude Code's preview.)

## Publishing

Every push to `main` publishes the site with GitHub Actions (`.github/workflows/pages.yml`). In the repo's **Settings → Pages**, the source must be **GitHub Actions**.

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

- [ ] **The contact email** for a commercial license: replace every `EMAIL_TBD` (`grep -rn EMAIL_TBD .`). Until then it shows highlighted.
- [ ] **The domain.** Once it's bought:
  1. Add a `CNAME` file holding it (e.g. `tessick.dev`).
  2. Replace `https://elliotnewtonmiller.github.io/tessick-site` with `https://<domain>` everywhere (`grep -rln elliotnewtonmiller.github.io/tessick-site . | xargs sed -i 's#https://elliotnewtonmiller.github.io/tessick-site#https://<domain>#g'`).
  3. In `404.html`, change `/tessick-site/` to `/`. At a domain the site sits at the root.
  4. Set the DNS records:
     - for the bare domain, `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and `AAAA` records to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` and `2606:50c0:8003::153`;
     - `www`, a `CNAME` to `elliotnewtonmiller.github.io`.
  5. In GitHub, verify the domain (your profile's **Settings → Pages**), so no one else can use it. Then set it in the repo's **Settings → Pages** and tick **Enforce HTTPS**.

## Getting it in front of people

The site gives every post something to link to; `/testlink/` is the page for TestLink users.

- [ ] **[AlternativeTo](https://alternativeto.net):** list Tessick as an alternative to TestLink and TestRail.
- [ ] **Posts:** Show HN; r/QualityAssurance, r/softwaretesting and r/selfhosted; Ministry of Testing's forum (The Club). Say what it is and that it's yours, and read each place's rules on self-promotion first.
- [ ] **[awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted):** once Tessick meets its rule on how long a project must have had releases.
- [ ] **An article:** "Moving off TestLink" on dev.to or a blog, linking to `/testlink/`.
- [ ] **Search engines:** once the domain is live, add it to Google Search Console and Bing Webmaster Tools and submit `sitemap.xml`.

## License

The site's text, clips and images are © Elliot Newton Miller, all rights reserved. Tessick itself is under the AGPL-3.0 or a commercial license; see its repository.

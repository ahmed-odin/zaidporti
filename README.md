# Zaid Ali — Retro Video Portfolio

A responsive, single-page portfolio built with plain HTML, CSS and vanilla JavaScript. No build step or framework required.

## 1. Run it locally

1. Download and unzip the project.
2. Open `index.html` in a browser, or use a local static server (recommended for video playback and form testing).
   - VS Code: install **Live Server**, right-click `index.html`, choose **Open with Live Server**.
   - Python: run `python -m http.server 8000` from the project folder, then visit `http://localhost:8000`.
3. Replace the demo content and media with your own.

## 2. Replace the hero background video

1. Put your video in `assets/videos/`, for example `assets/videos/hero.mp4`.
2. Open `content.js`.
3. Change `heroVideo` to the path of your file and, if needed, change `heroPoster` to a still image path.
4. The video is muted, looping, autoplaying and inline. Keep it compressed and preferably short (e.g. a subtle 5–15 second loop) so the page loads quickly.
5. If the video cannot load, the poster image and gradient background remain visible.

## 3. Add, remove or replace portfolio videos

All portfolio items live in the `videos` array in `content.js`. Each item has:

```js
{
  title: "Project title",
  category: "Reels", // "Reels", "Edits", or "Other"
  description: "A short description.",
  thumbnail: "assets/thumbnails/project-cover.jpg",
  video: "assets/videos/project.mp4",
  alt: "Describe what appears in the thumbnail"
}
```

- **Add:** copy an object, update its fields, and add it inside the `videos` array.
- **Remove:** delete that object's entry from the array.
- **Replace:** update its `title`, `category`, `thumbnail` and `video`.
- Categories power the filter buttons and counts automatically.
- `video` accepts local paths, direct MP4/WebM URLs, YouTube watch/short links, and Vimeo links.
- For local files, put media under `assets/` and use a relative path.
- Thumbnails use lazy loading. Use compressed WebP/JPG images and consistent 16:9 or 4:3 crops.
- `description` is available for your content notes; the current card layout keeps the display minimal.

The included portfolio entries are **demo samples**. Replace them with your own work before publishing.

## 4. Change text, links and profile details

Edit the values near the top of `content.js`:
- `siteName`, `tagline`
- `bioShort`, `bio`, `aboutPhoto`
- `instagram`, `email`, and `socials`
- `skills` and `stats`

You can replace `assets/about-placeholder.svg` with your own portrait and update `aboutPhoto`.

## 5. Change colors and fonts

At the very top of `styles.css`, edit the variables inside `:root`:
- `--bg`, `--bg-soft`, `--panel`, `--text`, `--muted`
- `--purple`, `--blue`, `--pink`, `--cyan`, `--magenta`
- `--display-font`, `--body-font`

The Google Fonts import is in `index.html`. Change the font URL and the two font variables if you choose another typeface.

## 6. Connect the contact form

The form validates name, email and message in the browser. To receive submissions:

1. Create a free form at [Formspree](https://formspree.io/).
2. Copy the endpoint, which looks like `https://formspree.io/f/xxxxxxxx`.
3. Paste it into `formEndpoint` in `content.js`.
4. Deploy and send a test message.

Until an endpoint is configured, the form displays a clear setup message and does not pretend that a message was sent. For EmailJS, replace the submit handler in `script.js` with your EmailJS integration and keep your public key/configuration in the appropriate place.

## 7. Publish

- **GitHub Pages:** push the folder to a repository, then enable Pages for the branch containing `index.html`.
- **Netlify:** drag the project folder into Netlify Drop or connect the repository.
- No build command is needed; publish directory is the project root.

Before launch, update the canonical `og:url` in `index.html`, replace demo videos and thumbnails, connect the contact form, and test the site on a phone.

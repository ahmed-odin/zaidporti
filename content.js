/*
  EDIT THIS FILE to update the portfolio.
  Keep all site copy, links and video entries here.
  Video source types supported by script.js:
  - Local/direct MP4: "assets/videos/my-video.mp4" or "https://.../video.mp4"
  - YouTube: "https://www.youtube.com/watch?v=VIDEO_ID" or youtu.be link
  - Vimeo: "https://vimeo.com/VIDEO_ID"
*/
window.PORTFOLIO_CONTENT = {
  siteName: "Zaid Ali",
  tagline: "Turning moments into moving stories.",
  heroVideo: "assets/videos/hero.mp4",
  heroPoster: "assets/hero-poster.svg",
  bioShort: "I'm a content creator who loves turning ideas into visuals that make people feel something.",
  bio: "From quick social-first videos to carefully crafted edits, I focus on rhythm, mood and the little details that make a story stick. Replace this paragraph with your own story, your creative approach and the kind of projects you love working on.",
  aboutPhoto: "assets/about-placeholder.svg",
  instagram: "https://www.instagram.com/zaidali.x/",
  email: "hello@example.com",
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/zaidali.x/", handle: "@zaidali.x" },
    { label: "Email", url: "mailto:hello@example.com", handle: "hello@example.com" },
    { label: "TikTok", url: "https://www.tiktok.com/@yourusername", handle: "@yourusername" }
  ],
  skills: ["Video editing", "Reels & short-form", "Storytelling", "Color grading", "Camera work", "Creative direction"],
  stats: [
    { value: "01+", label: "Years creating" },
    { value: "20+", label: "Projects made" },
    { value: "∞", label: "Ideas in motion" }
  ],
  /*
    Replace these demo entries with your own videos.
    category must be exactly: "Reels", "Edits", or "Other".
    thumbnail: image path or URL. video: local file, MP4, YouTube or Vimeo URL.
    Add/remove objects in this array — the cards, filters and player update automatically.
  */
  videos: [
    {
      title: "Neon Nights",
      category: "Reels",
      description: "A short-form visual experiment.",
      thumbnail: "assets/thumbnails/neon-nights.svg",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      alt: "Purple and pink neon city thumbnail"
    },
    {
      title: "Motion Study 01",
      category: "Edits",
      description: "Cuts, rhythm and a little atmosphere.",
      thumbnail: "assets/thumbnails/motion-study.svg",
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      alt: "Abstract blue motion study thumbnail"
    },
    {
      title: "A Different Angle",
      category: "Other",
      description: "A small story told in moving frames.",
      thumbnail: "assets/thumbnails/different-angle.svg",
      video: "https://www.w3schools.com/html/movie.mp4",
      alt: "Retro sunset and horizon thumbnail"
    }
  ],
  // Formspree: create a form at https://formspree.io/ and paste its endpoint here.
  // Example: "https://formspree.io/f/xxxxxxxx"
  formEndpoint: ""
};

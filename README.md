# Ellis landing page

A modern, static marketing landing page for Ellis, the AI-native operating layer for immigration. No app or software is exposed here. Every call to action sends visitors to a calendar to request a demo.

## Structure

```
index.html      Page markup
styles.css      Design system and layout
main.js         Demo links, scroll reveals, mobile nav
assets/         Immigration-themed imagery
```

## Change the demo calendar link

Open `main.js` and edit the first line:

```js
const DEMO_CALENDAR_URL = "https://calendly.com/ellis-immigration/demo";
```

Every "Request a demo" button uses this URL.

## Run locally

It is a static site, so just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Hosting

- GitHub Pages: enabled from the repository Settings > Pages (branch `main`, root).
- Cloudflare Pages: connect this repository in the Cloudflare dashboard, framework preset "None", build command empty, output directory `/`.

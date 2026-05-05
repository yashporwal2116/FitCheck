# FitCheck

## Local setup

1. Run `npm install`.
2. Run `npm run dev`.

## Deploy on Netlify

1. Push this project to GitHub.
2. In Netlify, create a new site from that repository.
3. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add this environment variable in Netlify:
   - `REPLICATE_API_TOKEN`
5. Deploy the site.

The virtual try-on API runs through `netlify/functions/generate.js`, so the Replicate token stays server-side.

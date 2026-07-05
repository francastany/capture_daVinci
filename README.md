# Capture daVinci

Static marketing site for **Capture**, a photography agency specializing in interior, commercial, and location photography, and design projects based in Buenos Aires.

Live site: https://capture-davinci.vercel.app

## Project Structure

- `index.html` — main landing page.
- `articulo.html` — article/blog page.
- `css/` — global and vendored stylesheets.
- `js/` — vendored JavaScript libraries (LightGallery for the image gallery).
- `fonts/` — icon fonts used by LightGallery.
- `assets/` — responsive media, split into `desktop/`, `tablet/`, and `mobile/`, plus shared `SVG/` assets.
- `recursos/` — contact form handling (`enviar_formulario.php`) and the post-submit success page (`enviado.html`).
- `robots.txt` / `sitemap.xml` — SEO configuration.

## Development

This is a dependency-free static site — no build step required. Open `index.html` directly in a browser, or serve the folder with any static file server.

## Deployment

Deployed on [Vercel](https://vercel.com/), connected to this GitHub repository. Pushes to `master` trigger automatic production deployments.

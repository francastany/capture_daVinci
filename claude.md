# Capture daVinci Project Notes

## Project Shape

- Static marketing site for Capture Fotografía.
- Main entry point: `index.html`.
- Global styles: `style.css` and files under `css/`.
- JavaScript libraries are vendored under `js/`.
- Responsive assets live under `assets/desktop/`, `assets/tablet/`, and `assets/mobile/`.
- SVG and other shared media live under `assets/SVG/`.
- Form submission flow uses `recursos/enviar_formulario.php` and `recursos/enviado.html`.

## Working Rules

- Keep edits focused and minimal.
- Preserve existing IDs, class names, and section structure unless a change requires otherwise.
- Maintain responsive behavior across desktop, tablet, and mobile breakpoints.
- Prefer editing the existing HTML, CSS, and vendored JS structure over introducing new tooling.
- When changing media or gallery content, verify the matching asset exists for each target size.
- When touching the contact form, keep the PHP endpoint and success page flow intact.

## Practical Checks

- Review `index.html` and `style.css` first before making layout changes.
- Use the current asset names and folder structure instead of renaming files casually.
- Keep the site dependency-free unless the user explicitly asks for a new library or build step.

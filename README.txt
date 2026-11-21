GOLDEN HOME - WEBSITE UPDATE

Files to upload to the ROOT of the GitHub repository:
- index.html
- style.css
- script.js
- golden-home-logo.png

Features in this update:
- Arabic RTL responsive quotation portal inspired by the reference screenshots.
- Customer and project details.
- Add multiple door/window line items.
- Width, height, quantity, minimum chargeable area.
- Profile, opening type, inner panel, glass, and optional add-ons.
- Automatic area and line-item calculations.
- Discount by fixed amount or percentage.
- Detailed print layout (choose Save as PDF in the print dialog).
- Save quote locally in the current browser.
- Admin price panel to edit profiles, glass, opening options, inner options, add-ons, and minimum area.
- Export/import settings backup.

IMPORTANT LIMITATION:
This website is static and hosted on GitHub Pages. The admin panel currently saves its changes in the current browser's localStorage only. It is not a secure server-side admin system and changes do not automatically sync to other devices or customers. The default local admin PIN is 1234; change it after opening the panel. Do not treat this PIN as secure authentication. To support secure login and shared price updates across devices, connect a backend such as Supabase or Firebase in a separate deployment step.

Calculation:
Chargeable area per piece = max(minimum area, width_cm * height_cm / 10000).
Line total = chargeable area * (profile rate + selected glass rate + selected add-on rates) * quantity.
This is an editable initial pricing model; confirm the rates and whether each add-on should be per-square-meter or fixed before using it for customer quotations.

Upload/replace these four files at the repository root, then wait for GitHub Pages to rebuild.

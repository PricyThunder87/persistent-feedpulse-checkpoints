# Feedpulse Textarea Saver (Firefox Extension)

This extension saves textarea content on Feedpulse pages to `localStorage` and restores it after refresh.
Saved content expires automatically after 2 days.

## Install (Temporary in Firefox)

1. Open Firefox and go to `about:debugging`.
2. Click **This Firefox**.
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.json` file in this folder.

## Install Permanently (Personal Use in Firefox)

Firefox stable only allows **signed** extensions to stay installed permanently.

### Recommended: Sign it as an unlisted add-on (private use)

1. Zip this extension folder so the archive contains `manifest.json` at the root.
2. Go to the Mozilla Add-on Developer Hub: `https://addons.mozilla.org/developers/`.
3. Submit the zip as an **Unlisted** add-on for signing.
4. Download the signed `.xpi` file.
5. Open Firefox → `about:addons` → gear icon → **Install Add-on From File...**.
6. Select the signed `.xpi`.

This keeps the extension installed across browser restarts for your own use.

### Alternative (dev-only)

Use Firefox Developer Edition/Nightly with signature checks disabled for local testing. This is not recommended for normal browsing.

## What it does

- Watches Feedpulse pages for `<textarea>` elements.
- Saves content whenever text changes.
- Restores content when the page is reloaded.
- Handles dynamically added textareas too.
- Auto clears saved data after 2 days.

## Notes

- Storage is scoped by page path and textarea identity.
- Clearing a textarea removes its saved value.
- Includes your Canvas external tool URL pattern:
  `https://fhict.instructure.com/courses/*/external_tools/1067*`

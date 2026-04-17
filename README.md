# Feedpulse Textarea Saver (Firefox Extension)

This extension saves textarea content on Feedpulse pages to `localStorage` and restores it after refresh.
Saved content expires automatically after 2 days.

## Install (Temporary in Firefox)

1. Open Firefox and go to `about:debugging`.
2. Click **This Firefox**.
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.json` file in this folder.

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

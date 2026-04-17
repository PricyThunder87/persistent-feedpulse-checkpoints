# Feedpulse Textarea Saver (Chrome Extension)

Chrome version of the extension that saves textarea content and restores it after refresh.

Includes:

- Canvas tool URL support: `https://fhict.instructure.com/courses/*/external_tools/1067*`
- Dynamic textarea detection
- 2-day auto-expiry of saved content

## Install in Chrome (Developer Mode)

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this folder: `chrome/`

## Keep It Installed Permanently (Personal Use)

For personal use, Chrome can keep an unpacked extension installed across browser restarts.

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select `chrome/`.
4. Keep **Developer mode** enabled.

The extension will remain installed in your profile after restart unless you remove it manually.

### Important note

Unpacked extensions are local/dev installs. For distribution to others, publish the extension package through the Chrome Web Store.

## Test

1. Open your Canvas Feedpulse tool page.
2. Type into the textbox.
3. Refresh the page.
4. The text should restore automatically.

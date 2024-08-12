# Faction Chain Tracker UserScript

## Overview

The Faction Chain Tracker is a UserScript designed to display data about faction chains from the Torn.com API in a user-friendly format. It fetches data from the API and opens it in a new window, allowing users to refresh the data with a simple button click.

## Features

- Fetches faction chain data from the Torn.com API.
- Displays data in a new, styled window.
- Includes a refresh button to update the data without reloading the entire page.

## Installation

1. **Install a UserScript Manager:**
   - If you don’t have a UserScript manager installed, you'll need one. Popular options include [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).

2. **Add the UserScript:**
   - Create a new script in your UserScript manager and paste the contents of the `chain.js` script into it.
   - Save the script.

3. **Allow Pop-Ups:**
   - Allow pop-ups for Torn.com to ensure that the new window can open. You can usually adjust this in your browser's settings:
     - **Chrome:** Go to `Settings` > `Privacy and security` > `Site settings` > `Pop-ups and redirects`, and add `torn.com` to the allowed sites.
     - **Firefox:** Go to `Options` > `Privacy & Security` > `Permissions` and ensure that pop-ups are allowed for `torn.com`.
     - **Edge:** Go to `Settings` > `Cookies and site permissions` > `Pop-ups and redirects`, and add `torn.com` to the allowed sites.

## Usage

1. **Navigate to Torn.com:**
   - Go to the Torn.com homepage.

2. **Activate the Script:**
   - Once on the appropriate page, the script will automatically check if it's the correct page and then display the faction chain data in a new window.

3. **Refresh Data:**
   - Use the "Refresh" button in the new window to reload the data from the API.

## Troubleshooting

- **Pop-Up Blocked:**
  - If the new window does not open, check your browser's pop-up settings and ensure that pop-ups are allowed for `torn.com`.

- **API Key Issues:**
  - Ensure that you have replaced `yourAPIKey` in the script with your actual Torn.com API key.

- **Data Not Displaying:**
  - Make sure that the Torn.com API is returning data correctly and that your API key is valid.

## License

None

## Contributing

If you have suggestions or improvements for this script, feel free to open an issue or submit a pull request.

---

For more information, visit the [Torn.com API Documentation](https://www.torn.com/).

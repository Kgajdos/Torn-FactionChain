// ==UserScript==
// @name Faction Chain Tracker
// @match https://www.torn.com/index.php*
// @grant none
// @version Alpha-v3
// @author Kdragondev [3382032]
// @description 08/11/2024 8:22 PM
// ==/UserScript==

/* =============================================================================
 * EDIT HERE
 * Put your Public API Key here
 * =============================================================================
 */
const yourAPIKey = "XXXXXX";
const match = "https://www.torn.com/index.php"
const currentPage = $(location).attr("href")


/* =============================================================================
 * Do not change things under this line!
 *
 * Section: API call function
 * =============================================================================
 */

async function getChain(chain){
    return await
$.getJSON(`https://api.torn.com/faction/?selections=chain&key=${yourAPIKey}`).then(function(data){
    return data.chain;
    });
}

/* =============================================================================
 * Section: Inserting text functions
 * =============================================================================
 */

function setDisplay(_display) {
    // Try to open a new window
    let displayWindow = window.open("", "Chain Data", "width=400,height=400");

    // Check if the window was successfully created
    if (displayWindow) {
        // Convert JSON to JavaScript object
        let dataObject = JSON.parse(_display);

        // Create a list of items to display
        let listItems = '';
        for (let key in dataObject) {
            if (dataObject.hasOwnProperty(key)) {
                listItems += `<li><strong>${key}:</strong> ${dataObject[key]}</li>`;
            }
        }

        // Set the document content of the new window
        displayWindow.document.write(`
            <html>
                <head>
                    <title>Chain Data</title>
                    <style>
                        body {
                            background-color: #2E2E2E; /* Dark Gray Background */
                            color: #D3D3D3; /* Light Gray Text */
                            font-family: Arial, sans-serif;
                        }
                        h1 {
                            color: #00BFFF; /* Electric Blue */
                        }
                        ul {
                            color: #FFFFFF; /* White Text */
                        }
                        button {
                            background-color: #39FF14; /* Neon Green */
                            color: #000000; /* Black Text */
                            border: none;
                            padding: 10px 20px;
                            font-size: 16px;
                            cursor: pointer;
                            border-radius: 5px;
                        }
                        button:hover {
                            background-color: #00FFFF; /* Bright Cyan */
                        }
                    </style>
                </head>
                <body>
                    <h1>Chain Information</h1>
                    <ul id="chainData">
                        ${listItems}
                    </ul>
                    <button id="refreshButton">Refresh</button>

                    <script>
                        // Refresh button just calls the getChain() function
                        document.getElementById('refreshButton').onclick = async function() {
                            let updatedChain = await window.opener.getChain();
                            // Update the list with new data
                            let updatedListItems = '';
                            for (let key in updatedChain) {
                                if (updatedChain.hasOwnProperty(key)) {
                                    updatedListItems += '<li><strong>' + key + ':</strong> ' + updatedChain[key] + '</li>';
                                }
                            }
                            document.getElementById('chainData').innerHTML = updatedListItems;
                        };
                    </script>
                </body>
            </html>
        `);

        displayWindow.document.close(); // Close the document to ensure all content is rendered
    } else {
        // Handle the error or provide a fallback
        console.error("Failed to open new window. Displaying data within the current window instead.");
        document.body.innerHTML += `
            <div style="background-color: #2E2E2E; color: #D3D3D3; font-family: Arial, sans-serif; padding: 20px;">
                <h1 style="color: #00BFFF;">Chain Information</h1>
                <ul id="chainData">
                    ${listItems}
                </ul>
                <button id="refreshButton" style="
                    background-color: #39FF14; color: #000000; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">
                    Refresh
                </button>
            </div>
        `;

        // Attach the refresh function to the button in the current window
        document.getElementById('refreshButton').onclick = async function() {
            let updatedChain = await getChain();
            // Update the list with new data
            let updatedListItems = '';
            for (let key in updatedChain) {
                if (updatedChain.hasOwnProperty(key)) {
                    updatedListItems += '<li><strong>' + key + ':</strong> ' + updatedChain[key] + '</li>';
                }
            }
            document.getElementById('chainData').innerHTML = updatedListItems;
        };
    }
}



/* =============================================================================
 * Section: Main logic
 * =============================================================================
 */

async function CEE_main(){
    //Checks to make sure current page is the homepage
    if(currentPage != match){
        return
    }else{
        var chain = await getChain();
        // Call the setDisplay function to open a new window and display the data
        setDisplay(JSON.stringify(chain));
    }
}

CEE_main();
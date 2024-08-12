// ==UserScript==
// @name Faction Chain Tracker
// @match https://www.torn.com/index.php*
// @grant none
// @version Alpha-v2
// @author Kdragondev [3382032]
// @description 08/11/2024 4:36 PM
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
        // Set the document content of the new window
        displayWindow.document.write(`
            <html>
                <head>
                    <title>Chain Data</title>
                    <style>
                        button {
                            margin-top: 10px;
                            padding: 5px 10px;
                            font-size: 16px;
                        }
                    </style>
                </head>
                <body>
                    <h1>Chain Information</h1>
                    <p id="chainData">${_display}</p>
                    <button id="refreshButton">Refresh</button>

                    <script>
                        // Refresh button just calls the getChain() function
                        document.getElementById('refreshButton').onclick = async function() {
                            let updatedChain = await window.opener.getChain();
                            document.getElementById('chainData').innerText = JSON.stringify(updatedChain);
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
            <div>
                <h1>Chain Information</h1>
                <p id="chainData">${_display}</p>
                <button id="refreshButton">Refresh</button>
            </div>
        `;

        // Attach the refresh function to the button in the current window
        document.getElementById('refreshButton').onclick = async function() {
            let updatedChain = await getChain();
            document.getElementById('chainData').innerText = JSON.stringify(updatedChain);
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
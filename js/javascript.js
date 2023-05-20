console.log("Hello World!");


// HAMBURGER
const hamburgerIcon = document.querySelector("header > div.hamburger-icon");
hamburgerIcon.addEventListener("click", () => {
    let hamburger = document.createElement("div");
    hamburger.classList.add("hamburger"); // <!--  https://alvarotrigo.com/blog/hamburger-menu-css/  -->
    
    hamburger.innerHTML = `
        <div class="hamburger-void"></div>
        <div class="hamburger-menu">
            <div class="hamburger-container">
                <h1>KSP 2</h1>
                <a href="./index.html"><h2>Home</h2></a>
                <a href="./about.html"><h2>About</h2></a>
                <a href="./contact.html"><h2>Contact</h2></a>
            </div>
        </div>
    `;
    document.querySelector("header").appendChild(hamburger);

    let hamburgerVoid = document.querySelector("header > div.hamburger > div.hamburger-void");
    //console.log(hamburgerVoid);
    hamburgerVoid.addEventListener("click", () => {
        hamburger.remove();
    });
}); //  https://stackoverflow.com/questions/584751/inserting-html-into-a-div  https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript


// CHAT
let chatExpanded = false;
const chatIcon = document.querySelector("main > img.chat-icon");
const chat = document.querySelector("main > div.chat");

const chatContentContainer = document.querySelector("main > div.chat > section.content");
chatSetup();

chatIcon.addEventListener("click", () => {
    if (chatExpanded) {
        chat.style.display = "none";
        chatExpanded = false;
        return;
    }
    chat.style.display = "flex";
    chatExpanded = true;
});

const chatExit = document.querySelector("main > div.chat > section.content > div.chat-reset");
chatExit.addEventListener("click", () => {
    chatContentCleanup();
});

const chatInput = document.querySelector(`main > div.chat > textarea[name="chat"]`);
chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        chatEnteredCommand(event);
    }
});

let terminalMode = false;
//controlling chat via textbox (commands)
function chatEnteredCommand(event) {
    if (terminalMode) {
        event.preventDefault();
        terminalCommand();
    }
}


function appendChatContent(content) {
    const chatContentArticle = document.querySelector("main > div.chat > section.content > article");
    if (!chatContentArticle) return;
    if (chatContentArticle.innerHTML) {
        chatContentArticle.innerHTML += content;
    } else {
        chatContentArticle.innerHTML = content;
    }
}
function terminalCommand() {
    const command = chatInput.value.trim().split(' ')[0]; // https://stackoverflow.com/questions/14939010/get-value-from-text-area  https://www.w3schools.com/jsref/jsref_trim_string.asp
    switch (command.toLowerCase()) // https://www.w3schools.com/jsref/jsref_tolowercase.asp
    {
        case "echo":
            appendChatContent("<p>" +chatInput.value.substring(command.length).trim() + "<br></p>");
            break;
        case "exit":
            terminalMode = false;
            chatContentCleanup();
            break;
        case "help":
            appendChatContent(`
            <p>
            Commands:<br>
            help //shows available commands<br>
            echo [text] //outputs text to terminal<br>
            exit //exits terminal<br>
            random //outputs number between 0 and 100<br>
            </p>
            `);
            break;
        case "random":
            appendChatContent(Math.round((Math.random()*100))+"<br>");
        break;
        default:
            appendChatContent("Command 404.");
            break;
    }
    chatInput.value = "";
}



const terminalModeButton = document.querySelector("main > div.chat > section.content > p#chat-terminal");
const faqModeButton = document.querySelector("main > div.chat > section.content > p#chat-faq");
const agiModeButton = document.querySelector("main > div.chat > section.content > p#chat-agi");

terminalModeButton.addEventListener("click", () => {
    chatContentCleanup();
    chatHideModeButtons();
    let terminalContent = document.createElement("article");
    chatContentContainer.appendChild(terminalContent);
    terminalMode = true;
});
faqModeButton.addEventListener("click", () => {
    chatContentCleanup();
    chatHideModeButtons();
    let faqContent = document.createElement("article");
    faqContent.innerHTML = `
        <div class="xcenter-content">
            <h1>FAQ</h1>
        </div>
        <div class="image ksp2-iconic" style="height: 3.5em;"></div>
        <div class="chat-infobox">
            <h2>Who is the main protagonist?</h2>
            <hr>
            <p>Ah, yes.. The green guy, the incredible...<br><i>Jebediah Kerman!</i></p>
            </div>
        </div>
        <div class="chat-infobox">
            <h2>Who are his teammates?</h2>
            <hr>
            <p>That would be <i>Bob, Bill and Valentina Kerman</i>.<br>All of them are amazing kerbonauts and they make up the legendary quartet.</p>
            </div>
        </div>
        <div class="chat-infobox">
            <h2>What's the goal of the game?</h2>
            <hr>
            <p><i>Winning of course!</i><br><br>jk<br>you can do whatever you want, explore the Kerbol system, build, test and crash the greatest spacecraft ever made or simply wander around and collect some science points.</p>
            </div>
        </div>
    `; // https://www.quora.com/What-is-a-group-of-four-people-called  https://wiki.kerbalspaceprogram.com/wiki/Kerbonaut
    chatContentContainer.appendChild(faqContent);
});
agiModeButton.addEventListener("click", () => {
    chatContentCleanup();
    let agiIncoming = document.createElement("p");
    agiIncoming.innerHTML = `
        <i>Incoming</i>
    `;
    chatContentContainer.appendChild(agiIncoming);
});

const modeButtons = [chatExit, terminalModeButton, faqModeButton, agiModeButton];
///deletes all section.content children which aren't modeButtons
function chatContentCleanup() {
    for (let child of chatContentContainer.children) { // https://stackoverflow.com/questions/17094230/how-do-i-loop-through-children-objects-in-javascript
        let deleteChild = true;
        //child.style.display = "none";
        for (let button of modeButtons) {
            if (child == button) { //leaving essential mode-buttons there
                deleteChild = false;
                child.style.display = "block"; 
            }
        }
        if (deleteChild) {
            child.remove();
        }
    }
    //console.log("chatContentCleanup");
}

///sets display="none" to all modeButtons except chatExit
function chatHideModeButtons() {
    for (let child of chatContentContainer.children) {
        for (let button of modeButtons) {
            if (child == button && child != chatExit) {
                child.style.display = "none"; //hiding mode-buttons
            }
        }
    }
}

function chatSetup() {
    chatContentContainer.innerHTML = `
        <div class="chat-reset"></div>
        <h2><u>Mode</u></h2>
        <p id="chat-terminal">Terminal</p>
        <p id="chat-faq">FAQ</p>
        <p id="chat-agi">AGI</p>
    `;
}

const currentWebpage = window.location.pathname.split('/').pop();
//webpage-specific javascript
if (currentWebpage == "index.html") { // optimization, https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
    //buyButton hover/mouseover animation
    const buyButtonAnchor = document.querySelector("main > section.full-width:first-child article.ksp2-iconic a.buyButton");
    const buyButtonDiv = document.querySelector("main > section.full-width:first-child article.ksp2-iconic a.buyButton div.buyButton");
    const buyButtonHeader = document.querySelector("main > section.full-width:first-child article.ksp2-iconic a.buyButton div.buyButton h1");
    const anchorWidthBackup = buyButtonAnchor.style.width;
    const divColorBackup = buyButtonDiv.style.backgroundColor;
    const headerSizeBackup = buyButtonHeader.style.fontSize;
    const headerColorBackup = buyButtonHeader.style;
    
    buyButtonAnchor.addEventListener("mouseover", () => {
        buyButtonAnchor.style.width = `${parseInt(anchorWidthBackup,10)+(window.width*0.2)}px`; // https://stackoverflow.com/questions/3530127/convert-css-width-string-to-regular-number  https://stackoverflow.com/questions/3304014/how-to-interpolate-variables-in-strings-in-javascript-without-concatenation
        buyButtonDiv.style.backgroundColor = "rgba(255,0,0,.2)";
        buyButtonHeader.style.fontSize = "5em";
        buyButtonHeader.style.color = "rgb(23, 212, 13)";
    });
    buyButtonAnchor.addEventListener("mouseout", () => { // https://www.w3schools.com/jsref/event_onmouseout.asp
        buyButtonAnchor.style.width = anchorWidthBackup;
        buyButtonDiv.style.backgroundColor = divColorBackup;
        buyButtonHeader.style.fontSize = headerSizeBackup;
        buyButtonHeader.style.color = headerColorBackup;
    });
}
else if (currentWebpage == "about.html") {
    const fadeElements = document.querySelectorAll('.fade-in');

    //https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const fadeOptions = {
    threshold: 0.5 //50% in viewport
    };

    const fadeInCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
        }
    });
    };

    const fadeObserver = new IntersectionObserver(fadeInCallback, fadeOptions); // https://stackoverflow.com/questions/68441473/how-can-i-trigger-this-animation-to-start-once-in-viewport

    fadeElements.forEach(element => {
    fadeObserver.observe(element);
    });
}
console.log("this web page filename: "+currentWebpage);

//console.log("js done");
// 
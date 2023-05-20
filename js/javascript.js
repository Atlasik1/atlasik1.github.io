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
const chatIcon = document.querySelector("main > div.chat-icon");
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

const chatExit = document.querySelector("main > div.chat > section.content > div.chat-exit");
chatExit.addEventListener("click", () => {
    chatContentCleanup();
});

const terminalModeButton = document.querySelector("main > div.chat > section.content > p#chat-terminal");
const faqModeButton = document.querySelector("main > div.chat > section.content > p#chat-faq");
const agiModeButton = document.querySelector("main > div.chat > section.content > p#chat-agi");
const modeButtons = [chatExit, terminalModeButton, faqModeButton, agiModeButton];

terminalModeButton.addEventListener("click", () => {
    chatContentCleanup();


});
faqModeButton.addEventListener("click", () => {
    chatContentCleanup();
    chatHideModeButtons();
    let faqContent = document.createElement("article");
    faqContent.innerHTML = `
        <div class="chat-infobox">
            <h2>Question</h2>
            <hr>
            <p>Answering the question.</p>
            </div>
            <div>
                <h1>George</h1>
            </div>
        </div>
    `;
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
    console.log("contentCleanup");
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
        <div class="chat-exit"></div>
        <h2>Mode</h2>
        <p id="chat-terminal">Terminal</p>
        <p id="chat-faq">FAQ</p>
        <p id="chat-agi">AGI</p>
    `;
}
//console.log("js done");
// 
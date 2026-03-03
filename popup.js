const themeBtn = document.getElementById("theme-toggle");
const resetBtn = document.getElementById("reset-btn");
let resetConfirm = false;

async function init() {
    let { theme } = await browser.storage.local.get("theme"); //
    applyThemeUI(theme || "dark"); //
    refresh(); //
}

function applyThemeUI(theme) {
    document.body.className = theme === "light" ? "light" : ""; //
    themeBtn.innerText = theme === "light" ? "Dark Mode" : "Light Mode"; //
}

themeBtn.addEventListener("click", async () => {
    let { theme } = await browser.storage.local.get("theme"); //
    let newTheme = theme === "light" ? "dark" : "light"; //
    await browser.storage.local.set({ theme: newTheme }); //
    applyThemeUI(newTheme); //
});

resetBtn.addEventListener("click", async () => {
    if (!resetConfirm) {
        resetConfirm = true;
        resetBtn.innerText = "Sure?"; //
        resetBtn.style.color = "#ef4444"; //
        resetBtn.style.borderColor = "#ef4444"; //

        setTimeout(() => {
            resetConfirm = false;
            resetBtn.innerText = "Reset Time";
            resetBtn.style.color = "";
            resetBtn.style.borderColor = "";
        }, 3000); //
    } else {
        let data = await browser.storage.local.get(); //
        for (let key in data) {
            if (typeof data[key] === 'number') { //
                await browser.storage.local.remove(key); //
            }
        }
        resetConfirm = false;
        resetBtn.innerText = "Reset Time";
        resetBtn.style.color = "";
        resetBtn.style.borderColor = "";
        refresh(); //
    }
});

async function refresh() {
    let data = await browser.storage.local.get(); //
    let totalMs = Object.values(data).reduce((acc, val) => 
        typeof val === 'number' ? acc + val : acc, 0
    ); //

    let s = Math.floor(totalMs / 1000);
    let h = Math.floor(s / 3600);
    let m = Math.floor((s % 3600) / 60);
    let sec = s % 60;

    const pad = (n) => n.toString().padStart(2, '0');
    document.getElementById("total-time").innerText = `${pad(h)}:${pad(m)}:${pad(sec)}`; //
}

init();
setInterval(refresh, 1000); //
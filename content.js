(function() {
    if (document.getElementById("focus-pill")) return;
    const pill = document.createElement("div");
    pill.id = "focus-pill";
    const style = document.createElement("style");
    style.textContent = `
        #focus-pill {
            position: fixed; 
            bottom: 30px; 
            right: 30px; 
            z-index: 2147483647;
            padding: 14px 24px;
            border-radius: 100px; 
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 28px; 
            font-weight: 800; 
            display: flex; 
            align-items: center;
            gap: 14px; 
            box-shadow: 0 12px 40px rgba(0,0,0,0.4); 
            pointer-events: none;
            transition: all 0.3s ease; 
            backdrop-filter: blur(12px);
        }
        .live-dot { 
            width: 12px; 
            height: 12px; 
            background: #10b981; 
            border-radius: 50%; 
            position: relative; 
        }
        .live-dot::after {
            content: ''; position: absolute; width: 100%; height: 100%;
            background: #10b981; border-radius: 50%; animation: pulse 2s infinite;
        }
        @keyframes pulse { 
            0% { transform: scale(1); opacity: 0.8; } 
            100% { transform: scale(3.5); opacity: 0; } 
        }
    `;
    document.head.appendChild(style);
    pill.innerHTML = `<div class="live-dot"></div><span id="pill-timer">00:00</span>`;
    document.body.appendChild(pill);

    function applyTheme(theme) {
        if (theme === 'light') {
            pill.style.background = "rgba(255, 255, 255, 0.95)";
            pill.style.color = "#1e293b";
            pill.style.border = "2px solid rgba(0, 0, 0, 0.1)";
        } else {
            pill.style.background = "rgba(15, 23, 42, 0.9)";
            pill.style.color = "#ffffff";
            pill.style.border = "2px solid rgba(255, 255, 255, 0.15)";
        }
    }
    browser.storage.local.get("theme").then(res => applyTheme(res.theme || 'dark'));
    browser.storage.onChanged.addListener(changes => { if (changes.theme) applyTheme(changes.theme.newValue); });

    let sessionSeconds = 0;
    let alertShown = false; 

    setInterval(() => {
        sessionSeconds++;
        
        // Triggers at 10 seconds for testing with your new requested text
        if (sessionSeconds === 600 && !alertShown) {
            alert("10 minutes have passed, take a break !!!");
            alertShown = true; 
        }

        let m = Math.floor(sessionSeconds / 60).toString().padStart(2, '0');
        let s = (sessionSeconds % 60).toString().padStart(2, '0');
        document.getElementById("pill-timer").innerText = `${m}:${s}`;
    }, 1000);
})();
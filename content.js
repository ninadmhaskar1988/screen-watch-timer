(function() {
    if (document.getElementById("focus-pill")) return;

    // 1. Create UI Elements & Styles
    const pill = document.createElement("div");
    pill.id = "focus-pill";
    
    const style = document.createElement("style");
    style.textContent = `
        #focus-pill {
            position: fixed; bottom: 30px; right: 30px; z-index: 2147483647;
            padding: 14px 24px; border-radius: 100px; 
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 28px; font-weight: 800; display: flex; 
            align-items: center; gap: 14px; box-shadow: 0 12px 40px rgba(0,0,0,0.4); 
            pointer-events: none; transition: all 0.3s ease; backdrop-filter: blur(12px);
        }
        .live-dot { width: 12px; height: 12px; background: #10b981; border-radius: 50%; position: relative; }
        .live-dot::after { 
            content: ''; position: absolute; width: 100%; height: 100%; 
            background: #10b981; border-radius: 50%; animation: pulse 2s infinite; 
        }
        @keyframes pulse { 
            0% { transform: scale(1); opacity: 0.8; } 
            100% { transform: scale(3.5); opacity: 0; } 
        }
        
        /* Modern Alert Styles */
        #break-alert {
            position: fixed; top: 20px; right: 20px; z-index: 2147483647;
            padding: 24px; border-radius: 24px; width: 320px;
            background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(16px);
            color: white; font-family: system-ui, sans-serif;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
            text-align: center; animation: slideIn 0.5s ease-out;
        }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        #close-alert {
            margin-top: 15px; padding: 10px 20px; border-radius: 12px;
            border: none; cursor: pointer; background: #10b981; color: white;
            font-weight: 700; width: 100%; transition: background 0.2s;
        }
        #close-alert:hover { background: #059669; }
    `;
    document.head.appendChild(style);
    
    pill.innerHTML = `<div class="live-dot"></div><span id="pill-timer">00:00</span>`;
    document.body.appendChild(pill);

    // 2. Modern Alert Function
    function showModernAlert() {
        if (document.getElementById("break-alert")) return;
        const alertCard = document.createElement("div");
        alertCard.id = "break-alert";
        alertCard.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 10px;">👁️</div>
            <h3 style="margin: 0 0 8px 0; font-size: 20px;">Eye Break Time!</h3>
            <p style="margin: 0; font-size: 14px; opacity: 0.8; line-height: 1.5;">
                10 minutes have passed. Look 20 feet away for 20 seconds to protect your vision.
            </p>
            <button id="close-alert">Got it, thanks!</button>
        `;
        document.body.appendChild(alertCard);
        document.getElementById("close-alert").onclick = () => alertCard.remove();
    }

    // 3. Theme & Timer Logic
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

    setInterval(() => {
        sessionSeconds++;
        
        // REPEATING ALERT: Triggers every 600 seconds (10 minutes)
        if (sessionSeconds % 600 === 0 && sessionSeconds !== 0) {
            showModernAlert();
        }

        let m = Math.floor(sessionSeconds / 60).toString().padStart(2, '0');
        let s = (sessionSeconds % 60).toString().padStart(2, '0');
        document.getElementById("pill-timer").innerText = `${m}:${s}`;
    }, 1000);
})();
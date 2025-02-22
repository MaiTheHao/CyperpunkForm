document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------
    // THEME SWITCHER
    // -------------------------------
    const applyTheme = (theme) => {
        document.body.className = `theme-${theme}`;
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
        localStorage.setItem('selectedTheme', theme);
    };

    // Lấy theme đã lưu trong localStorage hoặc mặc định là neon-oasis
    const savedTheme = localStorage.getItem('selectedTheme') || 'neon-oasis';
    applyTheme(savedTheme);

    // Theme nút chọn
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            applyTheme(option.dataset.theme);
        });
    });

    // Chuyển đổi theme
    const themeToggle = document.getElementById('themeToggle');
    const themeSelector = document.querySelector('.theme-selector');
    
    themeToggle.addEventListener('click', () => {
        themeSelector.classList.toggle('active');
        themeToggle.classList.toggle('active');
    });

    // Đóng theme selector khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (!themeSelector.contains(e.target) && 
            !themeToggle.contains(e.target) && 
            themeSelector.classList.contains('active')) {
            themeSelector.classList.remove('active');
            themeToggle.classList.remove('active');
        }
    });

    // -------------------------------
    // UTILITY FUNCTIONS
    // -------------------------------
    function showMessage(formElement, messageId, messageText) {
        let messageSpan = document.getElementById(messageId) || document.createElement("span");
        messageSpan.id = messageId;
        messageSpan.className = "form-message";
        messageSpan.textContent = messageText;
        formElement.insertAdjacentElement("afterend", messageSpan);
    }

    // -------------------------------
    // NEON BUTTON EFFECTS
    // -------------------------------

    document.querySelectorAll('.neon-btn').forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.boxShadow = `0 0 20px var(--neon-primary)`;
            const text = btn.querySelector('.btn-text');
            if (text) text.style.textShadow = '0 0 5px rgba(255,255,255,0.8)';
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.boxShadow = 'none';
            const text = btn.querySelector('.btn-text');
            if (text) text.style.textShadow = 'none';
        });
    });

    // -------------------------------
    // LOGIN FORM HANDLING
    // -------------------------------
    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const loginData = {
                username: formData.get("username"),
                password: formData.get("password"),
            };

            try {
                const response = await fetch("fetchAPI", {
                    method: "POST",
                    body: JSON.stringify(loginData),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer haoyeuem",
                    },
                });
                const data = await response.json();

                showMessage(
                    this,
                    "login-message",
                    response.ok ? `Login successful - Welcome ${data.user.username}!` : data.message || "Login failed"
                );
            } catch (error) {
                showMessage(this, "login-message", "Network error occurred");
            }
        });
    }

    // -------------------------------
    // SIGNUP FORM HANDLING
    // -------------------------------
    if (document.getElementById("signup-form")) {
        document.getElementById("signup-form").addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const signupData = {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                username: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword"),
            };

            try {
                const response = await fetch("fetchAPI", {
                    method: "POST",
                    body: JSON.stringify(signupData),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer haoyeuem",
                    },
                });
                const data = await response.json();

                showMessage(
                    this,
                    "signup-message",
                    response.ok ? `Signup successful - Welcome ${data.user.username}!` : data.message || "Signup failed"
                );
            } catch (error) {
                showMessage(this, "signup-message", "Network error occurred");
            }
        });
    }

    // -------------------------------
    // MATRIX RAIN EFFECT
    // -------------------------------
    const canvas = document.createElement('canvas');
    canvas.classList.add('matrix-canvas');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const setSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setSize();

    const chars = "0123456789ABCDEFｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ";
    const size = 16;
    const cols = Array(Math.ceil(canvas.width/size)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--neon-primary');
        ctx.font = `${size}px Iceland`;

        cols.forEach((col, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * size, col * size);
            
            if(col * size > canvas.height && Math.random() > 0.975) {
                cols[i] = 0;
            }
            cols[i]++;
        });
    }

    window.addEventListener('resize', setSize);
    setInterval(draw, 33);
});

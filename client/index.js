document.addEventListener('DOMContentLoaded', () => {
    // Theme Switching Logic
    const applyTheme = (theme) => {
        document.body.className = `theme-${theme}`;
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
        localStorage.setItem('selectedTheme', theme);
    };

    // Initialize theme from localStorage or default to neon-oasis
    const savedTheme = localStorage.getItem('selectedTheme') || 'neon-oasis';
    applyTheme(savedTheme);

    // Theme switcher event listeners
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            applyTheme(option.dataset.theme);
        });
    });

    // Theme Sidebar Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeSelector = document.querySelector('.theme-selector');
    
    themeToggle.addEventListener('click', () => {
        themeSelector.classList.toggle('active');
        themeToggle.classList.toggle('active');
    });

    // Close theme selector when clicking outside
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
        
        btn.addEventListener('click', () => {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = 'scale(1)', 100);
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
                const response = await fetch("https://cyperpunkform-backend.vercel.app/login", {
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
                const response = await fetch("https://cyperpunkform-backend.vercel.app/signup", {
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
});

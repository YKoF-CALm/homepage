const statusEl = document.getElementById('status');

function setStatus(text) {
    statusEl.textContent = text;
}

// Map each data-action to a handler
const actions = {
    greet() {
        setStatus('👋 Hello! Nice to see you.');
    },

    download() {
        // Trigger a real download of a file in the repo
        const a = document.createElement('a');
        a.href = 'files/resume.pdf';
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setStatus('📄 Download started (if the file exists).');
    },

    toggle() {
        document.body.classList.toggle('light');
        const isLight = document.body.classList.contains('light');
        setStatus(isLight ? '🌗 Switched to light theme.' : '🌗 Switched to dark theme.');
    },

    async copy() {
        try {
        await navigator.clipboard.writeText(window.location.href);
        setStatus('📋 Link copied to clipboard.');
        } catch {
            setStatus('📋 Could not copy — your browser blocked it.');
        }
    },

    reset() {
        document.body.classList.remove('light');
        setStatus('♻️ Everything reset.');
    },
};

// Single delegated listener for all buttons
document.querySelector('.button-list').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    if (actions[action]) {
        actions[action]();
    } else {
        setStatus(`No handler for "${action}".`);
    }
});
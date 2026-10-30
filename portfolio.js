// Grab all tab buttons and all panels once
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels  = document.querySelectorAll('.tab-panel');

// Activate the tab whose id matches the given button's aria-controls
function activateTab(button) {
    const targetId = button.getAttribute('aria-controls');

    // Update every button
    tabButtons.forEach(btn => {
        const isActive = btn === button;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update every panel
    tabPanels.forEach(panel => {
        const isActive = panel.id === targetId;
        if (!isActive) {
            panel.querySelectorAll('audio').forEach(a => a.pause());
        }
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
    });
}

// Attach click handlers
tabButtons.forEach(button => {
    button.addEventListener('click', () => activateTab(button));
});

// Optional: arrow-key navigation between tabs (nice accessibility touch)
document.querySelector('.tab-list').addEventListener('keydown', e => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;

    const buttons = [...tabButtons];
    const current = buttons.findIndex(btn => btn.classList.contains('active'));
    let next = current;

    if (e.key === 'ArrowRight') next = (current + 1) % buttons.length;
    if (e.key === 'ArrowLeft')  next = (current - 1 + buttons.length) % buttons.length;
    if (e.key === 'Home')       next = 0;
    if (e.key === 'End')        next = buttons.length - 1;

    e.preventDefault();
    buttons[next].focus();
    activateTab(buttons[next]);
});
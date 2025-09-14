document.addEventListener("DOMContentLoaded", () => {
    const userSettings = { userId: 1 };
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
});


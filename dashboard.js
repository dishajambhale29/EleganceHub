const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("sidebarBackdrop");
const todayLabel = document.querySelector(".hero-card p");

function toggleSidebar(forceOpen) {
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !sidebar.classList.contains("open");
  sidebar.classList.toggle("open", shouldOpen);
  backdrop.classList.toggle("show", shouldOpen);
  document.body.classList.toggle("sidebar-open", shouldOpen);
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => toggleSidebar(true));
}

if (closeSidebar) {
  closeSidebar.addEventListener("click", () => toggleSidebar(false));
}

if (backdrop) {
  backdrop.addEventListener("click", () => toggleSidebar(false));
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    toggleSidebar(false);
  }
});

if (todayLabel) {
  const today = new Date();
  todayLabel.textContent = `Today · ${today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  })}`;
}


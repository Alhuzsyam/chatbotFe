export function SideBarJs() {
  document.addEventListener('DOMContentLoaded', () => { // Make sure the DOM is loaded before accessing elements
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange();
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange();
      });
    }

    // Following are the code to change sidebar button
    function menuBtnChange() {
      if (sidebar) {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
          closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
      }
    }
  });
}

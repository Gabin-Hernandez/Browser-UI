const data = [
  {
    logo: "./assets/images/logo-devlens.svg",
    title: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isActive: 1,
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    title: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: 1,
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    title: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: 0,
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    title: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: 1,
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    title: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: 1,
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    title: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isActive: 0,
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    title: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: 1,
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    title: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isActive: 0,
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    title: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: 1,
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    title: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: 1,
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    title: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: 0,
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    title: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isActive: 1,
  },
];
const modeBtn = document.querySelector(".mode");
const allBtn = document.querySelector(".btn-all");
const activeBtn = document.querySelector(".btn-active");
const inactiveBtn = document.querySelector(".btn-inactive");
const template = document.getElementById("item-template");
const container = document.querySelector(".cards");

function renderCards(filterFn = () => true) {
  // Limpiar contenedor de cards
  container.innerHTML = "";

  // Iterar sobre data filtrada
  data.forEach((item, index) => { 
    // el index es la posicion del elemento actual del objeto
    if (filterFn(item)) {
      // Clonar plantilla
      const clone = template.content.cloneNode(true);

      // Asignar datos de la card
      clone.querySelector(".logo").src = item.logo;
      clone.querySelector(".title").textContent = item.title;
      clone.querySelector(".description").textContent = item.description;

      // Configurar el estado del switch según isActive:
      const switchInput = clone.querySelector(".switch input");
      // Si el valor es 1, el switch se marcará; de lo contrario quedará desmarcado.
      switchInput.checked = item.isActive === 1;

      // Agregar listener al switch para actualizar isActive
      switchInput.addEventListener("change", (e) => {
        data[index].isActive = e.target.checked ? 1 : 0;
        // esto es un if, que se puede leer de esta manera:
        //  if (e.target.checked) {
        //   data[index].isActive = 1;
        // } else {
        //   data[index].isActive = 0;
        // }
      });

      // Listener para el botón Remove que cambia isActive a inactivo (0)
      const removeBtn = clone.querySelector(".remove");
      removeBtn.addEventListener("click", () => {
        data[index].isActive = 0;
        // Opcionalmente, puedes quitar la card del DOM:
        removeBtn.closest('.card-one').remove();
      });

      // Insertar la card en el contenedor
      container.appendChild(clone);
    }
  });
}

// Variable para mantener el filtro actual (por defecto, mostrar todas)
let currentFilter = () => true;

// Listeners para los botones de filtrado
allBtn.addEventListener("click", () => {
  currentFilter = () => true;
  renderCards();
});

activeBtn.addEventListener("click", () => {
  currentFilter = (item) => item.isActive === 1;
  renderCards(currentFilter);
});

inactiveBtn.addEventListener("click", () => {
  currentFilter = (item) => item.isActive === 0;
  renderCards(currentFilter);
});
renderCards();


modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const modeImage = modeBtn.querySelector("img");
  if (document.body.classList.contains("light-mode")) {
    modeImage.src = "./assets/images/icon-moon.svg";
  } else {
    modeImage.src = "./assets/images/icon-sun.svg";
  }
});

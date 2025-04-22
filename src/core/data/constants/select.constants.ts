export const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "#F5F5F6",
    border: "none",
    boxShadow: "none",
    padding: "8px 12px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#666",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#666",
  }),
  // Añadir estilo para los elementos del menú
  option: (base: any, state: any) => ({
    ...base,
    color: state.isSelected ? "#000" : base.color,
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#d4d4d8" : base.backgroundColor,
    "&:hover": {
      backgroundColor: "rgba(59, 130, 246, 0.1)", // Azul claro con transparencia
      color: "#3B82F6", // Color azul para el texto
    },
  }),
  // Añadir estilo para el texto seleccionado
  singleValue: (base: any) => ({
    ...base,
    color: "#000",
  }),
  // Estilos para el contenedor del menú desplegable
  menu: (base: any) => ({
    ...base,
    borderRadius: "8px",
    overflow: "hidden",
  }),

  // Estilos para la lista de opciones
  menuList: (base: any) => ({
    ...base,
    padding: 0,
    borderRadius: "8px",
  }),
};

export const customSelectTheme = (theme: any) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: "#d4d4d8",
    primary: "#d4d4d8",
    color: "#FFF",
    neutral80: "#000",
    text: "#000",
  },
});

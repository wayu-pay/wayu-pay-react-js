import { addons } from '@storybook/manager-api';

// Configuración del manager de Storybook
addons.setConfig({
  // Configurar la URL inicial para que cargue el componente Checkout
  initialPath: '/story/components-checkout--default',
  // Mostrar la barra lateral
  sidebar: {
    showRoots: true,
  },
  // Expandir automáticamente todas las categorías al abrir
  expandAll: true,
  // Establecer el modo de pantalla completa por defecto
  isFullscreen: false,
  // No mostrar panel de herramientas por defecto
  showToolbar: true,
}); 
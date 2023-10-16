import { defineMessages } from 'react-intl'

const messages = defineMessages({
  app_name: 'Awesome Dog Finder',
  cancel: 'Cancel',
  sign_in: 'Iniciar sesión',
  sign_out: 'Cerrar sesión',
  sign_up: 'Registrarse',
  email: 'Email',
  name: 'Nombre',
  // deepcode ignore NoHardcodedPasswords: intended
  password: 'Contraseña',
  about: 'Acerca de',
  aboutPageHeader: "Adopta un perro!",
  aboutPageMarkdown: `
  # Esta aplicación te permite

  * **Encontrar el perro perfecto para ti.**
      * Busca entre una gran selección de perros.
      * Filtra por raza.
      * Agrega tus favoritos a una lista.
      * Genera una coincidencia en función de tus favoritos.
  * **Mantenerte organizado y productivo.**
      * Realiza un seguimiento de tus perros y coincidencias favoritos en un solo lugar.
  * **Diviértete y encuentra a tu mejor amigo peludo.**
      * Nuestra aplicación hace que sea fácil encontrar el perro perfecto para ti.
      * Comienza a vivir tu mejor vida juntos.  
  `,
  home: 'Adopta un perro',
  page_not_found: 'Página no encontrada',
  settings: 'Configuraciones',
  theme: 'Tema',
  default: 'Default',
  red: 'Rojo',
  green: 'Verde',
  language: 'Idioma',
  en: 'English',
  es: 'Español',
  menu: 'Menu',
  menu_mini_mode: "Menú en modo mini",
  offline: "Desconectado",
  demos: "Demos",
  dialog_demo: "Demo de diálogo",
  dialog_title: "Título del diálogo",
  dialog_action: "Sí, eliminar",
  dialog_message: `
    Mensaje de diálogo. Puedes colocar aquí todo el texto que quieras.
    Haz una pregunta o muestra una advertencia antes de eliminar algo.
    También puedes establecer el texto de la acción a algo como "Sí, eliminar", y ejecutar esta acción pasando la propiedad "handleAction".
    Recibe la devolución de llamada "handleClose", con la que puedes cerrar el diálogo cuando tu acción se haya realizado.
  `,
  toast_demo: "Demo de toast",
  filter_demo: "Demo de filtro",
  list_page_demo: "Demo de página de lista con {count} filas",
  my_account: "Mi cuenta"
})

export default messages

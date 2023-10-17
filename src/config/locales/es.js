import { flattenMessages } from 'components/DogFinder/utils'
import { defineMessages } from 'react-intl'

const messages = defineMessages(flattenMessages({
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
  my_account: "Mi cuenta",
  components: {
    dogMatch: {
      loading: {
        title: 'Cargando tu perro perfecto...',
      },
      cardHeader: '¡Tu perro perfecto está aquí!',
      cardContent: {
        dogDescription: 'Un hermoso <b>{breed}</b>, de <b>{age}</b> años de edad te está esperando.',
        zipCode: 'Ubicado en el código postal <b>{zipCode}</b>.',
      },
    },
    dogMatcher: {
      button: 'Encuentra a mi perro perfecto!',
      modal: {
        title: 'Buscando tu perro perfecto...',
      },
    },
    dogAgeSelector: {
      ageRange: 'Rango de edad',
    },
    dogCard: {
      content: {
        breed: 'Raza: <b>{breed}</b>',
        age: 'Edad: <b>{age}</b>',
        zipCode: 'Código postal: <b>{zipCode}</b>',
      },
      actions: {
        remove: 'Eliminar',
        add: 'Agregar',
      },
    },
    dogFilterer: {
      breedSelector: {
        label: 'Raza',
        placeholder: 'Busca una raza',
      },
    },
    dogSorter: {
      label: 'Ordenar por',
      sortBy: {
        breed: 'Raza',
        name: 'Nombre',
        age: 'Edad',
      },
      tooltipSetAscMode: 'Establecer modo de orden ascendente',
      tooltipSetDescMode: 'Establecer modo de orden descendente',
    },
    favoriteDogs: {
      title: 'Perros favoritos',
      empty: 'Agrega algunos perros para encontrar una increíble coincidencia de adopción!',
      tooltipRemoveFromFavorites: 'Eliminar {dogName} de favoritos',
    },
  }
}))

export default messages

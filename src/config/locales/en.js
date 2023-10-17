import { flattenMessages } from 'components/DogFinder/utils'
import { defineMessages } from 'react-intl'

const messages = defineMessages(flattenMessages({
  app_name: 'Dog matcher',
  sign_in: 'Sign in',
  sign_out: 'Sign out',
  email: 'Email',
  name: 'Name',
  // deepcode ignore NoHardcodedPasswords: intended
  password: 'Password',
  about: 'About',
  aboutPageHeader: "Amazing dog finder",
  aboutPageMarkdown: `
# This app lets you

* **Find the perfect dog for you.**
    * Browse through a large selection of dogs.
    * Filter by breed.
    * Add your favorites to a list.
    * Generate a match based on your favorites.
* **Stay organized and productive.**
    * Keep track of your favorite dogs and matches in one place.
* **Have fun and find your furry best friend.**
    * Our app makes it easy to find the perfect dog for you.
    * Start living your best life together.
  `,
  home: 'Amazing dog finder',
  page_not_found: 'Page not found',
  settings: 'Settings',
  theme: 'Theme',
  default: 'Default',
  red: 'Red',
  green: 'Green',
  language: 'Language',
  en: 'English',
  es: 'Spanish',
  menu: 'Menu',
  menu_mini_mode: 'Mini menu',
  offline: 'Offline',
  demos: 'Demos',
  dialog_demo: 'Demo dialog',
  dialog_title: 'Dialog title',
  dialog_action: 'YES, Delete',
  dialog_message: `Dialog message. You can put as much text as you want here. 
  Ask a question or show a warning before deleting something. 
  You can also set the action text to something like "YES, Delete" and run that action by passing a "handleAction" prop. 
  This receives a "handleClose" callback with which you can close the dialog when your action is done.`,
  toast_demo: 'Demo toast',
  filter_demo: 'Demo filter',
  list_page_demo: 'List Page demo with {count} rows',
  my_account: 'My account',
  components: {
    dogMatch: {
      loading: {
        title: 'Loading your perfecto dog!',
      },
      cardHeader: 'Your perfecto dog is here!',
      cardContent: {
        dogDescription: 'A beautiful <b>{breed}</b>, <b>{age}</b> years old is waiting for you!',
        zipCode: 'Located at Zip Code <b>{zipCode}</b>.',
      },
    },
    dogMatcher: {
      button: 'Find my perfecto dog!',
      modal: {
        title: 'Looking for you perfecto dog...',
      },
    },
    dogAgeSelector: {
      ageRange: 'Age range',
    },
    dogCard: {
      content: {
        breed: 'Breed: <b>{breed}</b>',
        age: 'Age: <b>{age}</b>',
        zipCode: 'Zip Code: <b>{zipCode}</b>',
      },
      actions: {
        remove: 'Remove',
        add: 'Add',
      },
    },
    dogFilterer: {
      breedSelector: {
        label: 'Breed',
        placeholder: 'Search for a breed',
      },
    },
    dogSorter: {
      label: 'Sort by',
      sortBy: {
        breed: 'Breed',
        name: 'Name',
        age: 'Age',
      },
      tooltipSetAscMode: 'Set sort mode to ascending',
      tooltipSetDescMode: 'Set sort mode to descending',
    },
    favoriteDogs: {
      empty: 'Add some dogs to find you an amazing adoption match!',
      tooltipRemoveFromFavorites: 'Remove {dogName} from favorites',
    },
  }
}))

export default messages

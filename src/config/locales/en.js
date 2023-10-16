import { defineMessages } from 'react-intl'

const messages = defineMessages({
  app_name: 'React Most Wanted',
  sign_in: 'Sign in',
  sign_out: 'Sign out',
  sign_up: 'Sign up',
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
  home: 'Amaing dog finder',
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
})

export default messages

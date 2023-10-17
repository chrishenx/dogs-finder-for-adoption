/**
 * 
 * @param {Object} dog
 * @param {string} dog.breed
 * @param {number} dog.age
 * @param {string} dog.name
 * @returns {string} - The alt text for a dog image.
 */
export function getDogImgAltText(dog) {
  return `Image of a ${dog.breed} dog, ${dog.age} years old, named ${dog.name}`;
}

/**
 * Flattens a nested object of messages into a single-level object with dot-separated keys.
 * @param {Object} nestedMessages - The nested object of messages to flatten.
 * @param {string} [prefix=''] - The prefix to add to the keys of the flattened object.
 * @returns {Object} - The flattened object of messages.
 */
export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key]
    let prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

export function intlBoldify(chunks) {
  return <b>{chunks}</b>
}
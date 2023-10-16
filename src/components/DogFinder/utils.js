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
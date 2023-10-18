import config from "../config";


export function createEventTargetValueExtractor(valueSetter) {
  return (event) => {
    valueSetter(event.target.value);
  };
}

export function createEventTargetCheckedMapper(valueSetter, valueIfTrue, valueIfFalse) {
  return (event) => {
    valueSetter(event.target.checked ? valueIfTrue : valueIfFalse);
  };
}

/**
 * @param {string} path
 * @param {Object} params
 * @param {Object.<string, any>} params.search
 * @param {Object} params.body
 * @param {('GET' | 'POST' | 'PUT')} params.method
 */
export async function request(path, params = {}) {
  const url = new URL(path, config.baseUrl);
  if (params.search) {
    url.search = new URLSearchParams(params.search).toString();
  }
  const response = await fetch(url, {
    body: JSON.stringify(params.body),
    credentials: "include",
    headers: {"Content-Type": "application/json",},
    method: params.method,
  });
  return response;
}

/**
 * Extracts the first two letters of the words in a string.
 * @param {string} string - The input string to extract the first letters from.
 * @returns {string} The first two letters of the input string.
 */
export function extractFirstLetters(string) {
  const words = string.split(" ");
  if (words.length < 1) {
    return "";
  }

  const firstLetters = words.map((word) => word[0]);
  return firstLetters.slice(0, 2).join("");
}
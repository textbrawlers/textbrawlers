/* global localStorage */

export function storeKey (key) {
  localStorage.setItem('key', key)
}

export function getKey (key) {
  return localStorage.getItem('key')
}


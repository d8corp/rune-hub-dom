export function getHTML (element = document.body) {
  return element.innerHTML.replace('<!---->', '')
}

window.onload = function () {
  window.addEventListener('hashchange', () => {
    window.utils.router()
  })
  window.utils.router()
}
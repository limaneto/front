window.onload = function () {
  window.addEventListener('hashchange', () => {
    window.easyInvest.utils.router()
  })
  window.easyInvest.utils.router()
}
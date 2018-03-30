(function () {
  window.utils = window.utils || {}
  window.utils.router = window.utils.router || {}

  let router = () => {
    let page = window.location.hash.slice(1)
    if (page === '') {
      window.views.registerUser.render()
    } else {
      let urlAndQueryString = page.split('?')
      page = urlAndQueryString[0];
      if (urlAndQueryString.length > 1) {
        let queryString = getParams(urlAndQueryString[1])
        window.views[page].render(queryString)
      } else {
        window.views[page].render()
      }
    }
  }

  let getParams = (queryString) => {
    let params = {}
    let paramsArray = queryString.split('&')
    paramsArray.forEach(item => {
      item = item.split('=')
      params[item[0]] = item[1]
    })

    return params
  }

  window.utils = window.utils || { }
  window.utils.router = router
})()
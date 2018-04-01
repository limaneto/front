window.easyInvest.utils =
(function () {
  this.router = () => {
    let page = window.location.hash.slice(1)
    if (page === '') {
      window.easyInvest.views.registerUser.init()
    } else {
      let urlAndQueryString = page.split('?')
      page = urlAndQueryString[0];
      if (urlAndQueryString.length > 1) {
        let queryString = getParams(urlAndQueryString[1])
        window.easyInvest.views[page].init(queryString)
      } else {
        window.easyInvest.views[page].init()
      }
    }
  }

  this.getParams = (queryString) => {
    let params = {}
    let paramsArray = queryString.split('&')
    paramsArray.forEach(item => {
      item = item.split('=')
      params[item[0]] = item[1]
    })

    return params
  }

  return {
    router, getParams
  }
})()
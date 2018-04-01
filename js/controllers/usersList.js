(function () {
    let render = function () {
      let users = window.easyInvest.db.getUsers()
      document.getElementById('container').innerHTML = window.templates.userListTemplate(users)

      registerEventListeners()
    }

    function registerEventListeners () {
      document.getElementById('user-list').addEventListener('click', userDetail)
    }

    let userDetail = (e) => {
      if (e.target.nodeName === 'LABEL') {
        window.location.hash = 'editProfile?email=' + e.target.parent2Element.getAttribute('data-id')
      }
    }


    window.views = window.views || {}
    window.views.usersList = { render }
})()
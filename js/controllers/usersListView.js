(function () {
    let render = function () {
      let users = window.easyInvest.db.getUsers()
      let userListViewTemplate = window.templates.userListTemplate(users)
      document.getElementById('container').innerHTML = userListViewTemplate

      registerEventListeners()
    }

    function registerEventListeners () {
      document.getElementById('user-list').addEventListener('click', userDetail)
    }

    let userDetail = (e) => {
      if (e.target.nodeName === 'LABEL') {
        window.location.hash = 'editProfile?email=' + e.target.parentElement.getAttribute('data-id')
      }
    }


    window.views = window.views || {}
    window.views.usersList = { render }
})()
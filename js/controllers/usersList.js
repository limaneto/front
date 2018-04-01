window.easyInvest.views = window.easyInvest.views || {}
window.easyInvest.views.usersList =
(() => {
  let UsersList = function (){
    this.render = () => {
        console.log(this.a)
        let users = window.easyInvest.db.getUsers()
        document.getElementById('container').innerHTML = window.templates.userListTemplate(users)

        this.registerEventListener()
      }

    this.registerEventListener = () => {
        document.getElementById('user-list').addEventListener('click', this.userDetail)
      }

    this.userDetail = (e) => {
        if (e.target.nodeName === 'LABEL') {
          window.location.hash = 'editProfile?email=' + e.target.parentElement.getAttribute('data-id')
        }
      }
  }

    return {
      init: function () {
        let usersList = new UsersList()
        usersList.render()
      }
    }
})()
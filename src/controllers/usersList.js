import * as db from '../utils/db'
import * as templates from  '../templates'

let UsersList = function () {
  this.render = () => {
    let users = db.getUsers()
    document.getElementById('container').innerHTML = templates.usersList(users)

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

let init = () => {
  let usersList = new UsersList()
  usersList.render()
}

export { init }
export default (usersArray) => {
  let temp = `<div id="user-list">`
  usersArray.forEach((user) => {
    temp += `<div data-id="` + user.email + `"><label>` + user.name + `</label></div>`
  })
  temp += `<a href="#registerUser">Register User</a>`

  return temp
}
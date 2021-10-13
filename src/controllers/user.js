const client = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    client.exists(user.username, (reply) => {
      if(reply === 1) return callback(new Error("User already in DB"), 'User exists');
      else client.hmset(user.username, userObj, (err) => {
        if (err) return callback(err, null)
      })
    })
    return callback(null, 'OK'); // Return callback
  },
  get: (username, callback) => {
    // TODO create this method
    client.hmget(username, (err, res) => {
      if(err) return callback(err,null)
      else if(res[0] == username) return callback(null,'OK');
    })
  }
}

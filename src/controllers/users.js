const user = require('../models/User');

exports.adduser = async (req, res) => {
  console.log(req.body);
  res.send('User route');
};

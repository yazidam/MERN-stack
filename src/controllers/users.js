const user = require('../models/User');

exports.adduser = async (req, res) => {
  const us = new user(req.body);
  await us.save();
  res.send({ info: us });
  // console.log(req.body);
  // res.send('User route');
};

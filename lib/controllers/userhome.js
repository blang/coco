'use strict';

exports.index = function (req, res) {
  if (req.session.username) {
    res.json({'username': req.session.username});
  } else {
    res.status(401).send({});
  }
};

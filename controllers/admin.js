const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const targetAdmin = await db.Admin.findOne({ where: { username: username } });

    if (targetAdmin) {
      res.status(400).send({ message: 'User has already taken' });
    } else {
      const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPW = bcryptjs.hashSync(password, salt);

      await db.Admin.create({
        username,
        password: hashedPW,
      });

      res.status(201).send({ message: 'Admin created' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  register,
};

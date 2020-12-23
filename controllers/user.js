const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, firstname, surname, gender, birthDate, phoneNumber, email } = req.body;
    const targetUser = await db.User.findOne({ where: { username: username } });

    if (targetUser) {
      res.status(400).send({ message: 'User has already taken' });
    } else {
      const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPW = bcryptjs.hashSync(password, salt);

      await db.User.create({
        username,
        firstname,
        surname,
        gender,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        phoneNumber,
        email,
        password: hashedPW,
      });

      res.status(201).send({ message: 'User created' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username: username } });
    const targetAdmin = await db.Admin.findOne({ where: { username: username } });
    let role = 'GUEST';
    if (!targetUser && !targetAdmin) {
      return res.status(400).send({ message: 'Not found username' });
    }

    if (targetUser) {
      if (bcryptjs.compareSync(password, targetUser.password)) {
        role = 'USER';
        const token = jwt.sign({ id: targetUser.id, username: targetUser.username, role: 'user' }, process.env.SECRET, {
          expiresIn: 3600,
        });
        res.status(200).send({ token, role });
      } else {
        res.status(400).send({ message: 'Wrong password' });
      }
    }

    if (targetAdmin) {
      if (bcryptjs.compareSync(password, targetAdmin.password)) {
        role = 'ADMIN';
        const token = jwt.sign(
          { id: targetAdmin.id, username: targetAdmin.username, role: 'Admin' },
          process.env.SECRET,
          { expiresIn: 3600 }
        );
        res.status(200).send({ token, role });
      } else {
        res.status(400).send({ message: 'Wrong password' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.User.findAll({
      attributes: ['id', 'firstname', 'surname', 'point'],
    });
    res.status(200).send(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  getAllUsers,
};

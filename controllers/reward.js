const db = require('../models');

const getAllProducts = async (req, res) => {
  const allProducts = await db.Reward.findAll({
    attributes: ['id', 'name', 'description', 'picture', 'pointForExchanging'],
  });
  res.status(200).send(allProducts);
};

const getProductById = async (req, res) => {
  const targetProducts = await db.Reward.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'name', 'description', 'picture', 'pointForExchanging'],
  });
  if (targetProducts) {
    res.status(200).send(targetProducts);
  } else {
    res.status(404).send({ message: 'Not found products' });
  }
};

const createProducts = async (req, res) => {
  const { name, description, picture, pointForExchanging } = req.body;
  console.log(req.body);
  const newProducts = await db.Reward.create({
    name: name,
    description: description,
    picture: picture,
    pointForExchanging: pointForExchanging,
  });

  res.status(201).send(newProducts);
};

const updateProducts = async (req, res) => {
  const targetProducts = await db.Reward.findOne({ where: { id: req.params.id } });

  if (targetProducts) {
    await targetProducts.update({
      name: req.body.name,
      description: req.body.description,
      picture: req.body.picture,
      pointForExchanging: req.body.pointForExchanging,
    });
    res.status(200).send({ message: 'Already updated' });
  } else {
    res.status(404).send({ message: 'Not found' });
  }
};

const deleteProducts = async (req, res) => {
  const targetProducts = await db.Reward.findOne({ where: { id: req.params.id } });

  if (targetProducts) {
    await targetProducts.destroy();
    res.status(200).send({ message: ' already delete' });
  } else {
    res.status(404).send({ message: 'Not found' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProducts,
  updateProducts,
  deleteProducts,
};

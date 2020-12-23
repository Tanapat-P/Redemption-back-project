const db = require('../models');

const redeem = async (req, res) => {
  const { reward_id } = req.body;
  const targetReward = await db.Reward.findOne({ where: { id: reward_id } });
  if (!targetReward) {
    return res.status(404).send({ message: 'Reward Not Found' });
  }

  if (req.user.point < targetReward.pointForExchanging) {
    return res.status(400).send({ message: 'Your point is not enough' });
  }
  const currentPoint = req.user.point;
  req.user.point = req.user.point - targetReward.pointForExchanging;
  await req.user.save();

  const newPoint = await db.Point.create({
    type: 'subtract',
    currentPoint: currentPoint,
    totalPoint: req.user.point,
    date: new Date(),
    user_id: req.user.id,
    reward_id: reward_id,
  });
  res.status(200).send({ message: 'redeem complete' });
};

const addPoint = async (req, res) => {
  const { user_id, point } = req.body;
  const targetPoint = await db.User.findOne({ where: { id: user_id } });
  const currentPoint = targetPoint.point;
  targetPoint.point = point;
  console.log(targetPoint.point);
  await targetPoint.save();

  const newPoint = await db.Point.create({
    type: 'ADD',
    currentPoint: currentPoint,
    totalPoint: targetPoint.point,
    date: new Date(),
    user_id: targetPoint.id,
  });
  res.status(200).send({ message: 'add point complete' });
};

module.exports = {
  redeem,
  addPoint,
};

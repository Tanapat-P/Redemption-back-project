const rewardControllers = require('../controllers/reward');
const router = require('express').Router();

router.get('/', rewardControllers.getAllProducts);
router.get('/:id', rewardControllers.getProductById);
router.post('/', rewardControllers.createProducts);
router.put('/:id', rewardControllers.updateProducts);
router.delete('/:id', rewardControllers.deleteProducts);

module.exports = router;

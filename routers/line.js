const express = require('express');
const router = express.Router();
const controller = require('../controllers/line');

// LINE Bot TEST
router.route('/').post(controller.returnMessage);

module.exports = router;
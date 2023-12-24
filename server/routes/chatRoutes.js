const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

router.post('/conversation', conversationController.newConversation);
router.post('/conversation/seen/:firstUserId/:secondUserId', conversationController.messageSeen)
router.get('/conversation/:userId', conversationController.getAllConversations);
router.get('/conversation/find/:firstUserId/:secondUserId', conversationController.getConversationOfTwoUsers);

module.exports = router;
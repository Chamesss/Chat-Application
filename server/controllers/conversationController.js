const Conversation = require('../models/conversation');
const User = require('../models/user')
const mongoose = require('mongoose');

exports.newConversation = async (req, res) => {
    const conversation = await Conversation.findOne({
        'participant.user': { $all: [req.params.firstUserId, req.params.secondUserId] }
    });
    if (conversation) return res.status(403).json('Conversation already exists')
    const newConversation = new Conversation({
        participant: [
            { user: req.body.senderId, sockets: [] },
            { user: req.body.receiverId, sockets: [] },
        ],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.addMessage = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.body.conversationId);
        const message = {
            to: req.body.receiver_Id,
            from: req.body.senderId,
            text: req.body.text
        }
        conversation.messages.push(message)
        await conversation.save();
    } catch (error) {
        console.log(error)
    }
}

exports.getAllConversations = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId)
        const conversations = await Conversation.aggregate([
            {
                $match: {
                    'participant.user': { $in: [userId] }
                }
            },
            {
                $project: {
                    participant: '$participant',
                    messages: {
                        $slice: ['$messages', -11]
                    }
                }
            }
        ]);
        if (!conversations?.length) {
            return res.status(204).json('No Content');
        }
        const extractedIds = conversations.flatMap((conversation) =>
            conversation.participant[0].user.toString() !== req.params.userId
                ? [conversation.participant[0].user]
                : [conversation.participant[1].user]
        );
        const users = await Promise.all(extractedIds.map(async (id) => {
            return await User.findById(id, '_id firstName lastName avatar status');
        }))
        const combined = conversations.map((conversation, index) => {
            return {
                ...conversation,
                user: users[index],
            };
        })
        res.status(200).json(combined);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

exports.getConversationOfTwoUsers = async (req, res) => {
    try {
        if (req.params.firstUserId !== req.params.secondUserId) {
            const conversation = await Conversation.findOne({
                'participant.user': { $all: [req.params.firstUserId, req.params.secondUserId] }
            });
            res.status(200).json(conversation);
        } else {
            const conversation = await Conversation.aggregate([
                {
                    $project: {
                        participant: {
                            $slice: ['$participant', 2]
                        }
                    }
                },
                {
                    $match: {
                        'participant.user': { $all: [req.params.firstUserId, req.params.secondUserId] }
                    }
                }
            ]);
            res.status(200).json(conversation[0]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
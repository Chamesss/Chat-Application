const Conversation = require('../models/conversation');
const User = require('../models/user')
const mongoose = require('mongoose');

exports.newConversation = async (req, res) => {
    const newConversation = new Conversation({
        users: [req.body.senderId, req.body.receiverId]
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
                    users: { $in: [userId] }
                }
            },
            {
                $project: {
                    users: '$users',
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
            conversation.users[0].toString() !== req.params.userId
                ? [conversation.users[0]]
                : [conversation.users[1]]
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
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

exports.getConversationOfTwoUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        console.log(page)
        const limit = 20;
        const firstUserId = new mongoose.Types.ObjectId(req.params.firstUserId);
        const secondUserId = new mongoose.Types.ObjectId(req.params.secondUserId);
        if (req.params.firstUserId !== req.params.secondUserId) {
            const conversation = await Conversation.aggregate([
                {
                    $match: {
                        users: { $all: [firstUserId, secondUserId] }
                    }
                },

                { $project: { _id: 1, users: 1, messages: 1 } },
                { $unwind: '$messages' },
                { $sort: { 'messages.created_at': -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                { $group: { _id: '$_id', users: { $first: '$users' }, messages: { $push: '$messages' } } },
                { $project: { _id: 1, users: 1, messages: { $reverseArray: '$messages' } } }
            ]);
            if (conversation.length === 0) {
                return res.status(204).json()
            }
            return res.status(200).json(conversation[0]);
        }
        // } else {
        //     const conversation = await Conversation.aggregate([
        //         {
        //             $project: {
        //                 participant: {
        //                     $slice: ['$participant', 2]
        //                 }
        //             }
        //         },
        //         {
        //             $match: {
        //                 'participant.user': { $all: [req.params.firstUserId, req.params.secondUserId] }
        //             }
        //         }
        //     ]).skip((page - 1) * limit).limit(limit);
        //     res.status(200).json(conversation[0]);
        // }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

exports.messageSeen = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            users: { $all: [req.params.firstUserId, req.params.secondUserId] }
        });
        if (conversation) {
            const messages = conversation.messages;
            if (messages && messages.length > 0) {
                const lastMessage = messages[messages.length - 1];
                if (lastMessage && lastMessage.seen) {
                    lastMessage.seen.status = true;
                    await conversation.save();
                    return res.status(200).json({ message: 'Message seen updated successfully.' });
                }
            }
        } else {
            return res.status(404).json({ message: 'Conversation not found.' });
        }
    } catch (error) {
        res.status(500).json(err);
    }
};
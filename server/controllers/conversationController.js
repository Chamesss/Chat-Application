const Conversation = require('../models/conversation');

exports.newConversation = async (req, res) => {
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
        const conversations = await Conversation.find({
            'participant.user': { $in: [req.params.userId] }
        })
        if (conversations.length === 0) {
            res.status(204).json('No Content')
            return
        }
        res.status(200).json(conversations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
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
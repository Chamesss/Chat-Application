const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    users: {
        type: [mongoose.Types.ObjectId],
        default: [],
    },
    messages: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: function () {
                    return new mongoose.Types.ObjectId();
                }
            },
            to: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            from: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            created_at: {
                type: Date,
                default: Date.now(),
            },
            text: {
                type: String,
            },
            status: {
                type: Boolean,
            },
            seen: {
                date: {
                    type: Date,
                    default: null,
                },
                status: {
                    type: Boolean,
                    default: false,
                },
            },
        }
    ]
})

ConversationSchema.pre('save', function (next) {
    const messages = this.messages;
    if (messages && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.seen && lastMessage.seen.status) {
            lastMessage.seen.date = new Date();
        }
    }
    next();
});

module.exports = mongoose.model("Conversation", ConversationSchema);
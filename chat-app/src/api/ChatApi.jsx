import axios from "./axios";

const getConversation = async ({ queryKey }) => {
    try {
        const [_, data] = queryKey
        const response = await axios.get(`/chat/conversation/find/${data.sender_Id}/${data.receiver_Id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch Conversation.');
    }
};

const addConversation = async (data) => {
    try {
        const response = await axios.post('/chat/conversation', {
            senderId: data.senderId,
            receiverId: data.receiver_id,
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

const getConversations = async({queryKey}) => {
    try {
        const [_, data] = queryKey
        const response = await axios.get(`/chat/conversation/${data.myId}`)
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch Conversations.');
    }
}

export { getConversation, addConversation, getConversations };
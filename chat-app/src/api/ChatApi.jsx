import axios from "./axios";

const getConversation = async (sender_Id, receiver_Id) => {
    try {
        const response = await axios.get(`/chat/conversation/find/${sender_Id}/${receiver_Id}`);
        return { data: response.data, success: true }
    } catch (error) {
        if (error.response.status === 404) {
            await addConversation({ senderId: sender_Id, receiver_id: receiver_Id })
            return getConversation(sender_Id, receiver_Id)
        }
        throw error
    }
};

const addConversation = async (data) => {
    try {
        const response = await axios.post('/chat/conversation', {
            senderId: data.senderId,
            receiverId: data.receiver_id,
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}

const getConversations = async (id) => {
    try {
        const response = await axios.get(`/chat/conversation/${id}`)
        return ({ data: response.data, success: true })
    } catch (error) {
        throw new Error(error.response.data)
    }
}

const messageSeen = async (data) => {
    try {
        const response = await axios.post(`/chat/conversation/seen/${data.firstId}/${data.secondId}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data)
    }
}
export { getConversation, addConversation, getConversations, messageSeen };
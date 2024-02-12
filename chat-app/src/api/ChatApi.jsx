import axios from "./axios";

const getConversation = async (sender_Id, receiver_Id, page, limit = 20) => {
    try {
        const response = await axios.get(`/chat/conversation/find/${sender_Id}/${receiver_Id}?page=${page}&limit=${limit}`);
        if (response.status === 204) {
            return { data: null, success: false }
        }
        return { data: response.data, success: true }
    } catch (error) {
        throw new Error(error.response.data)
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
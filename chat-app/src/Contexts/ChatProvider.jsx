import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [selectedConversationId, setSelectedConversation] = useState(null)
    const [selectedReceiverData, setSelectedReceiverData] = useState(null)
    return (
        <ChatContext.Provider value={{ selectedConversationId, setSelectedConversation, selectedReceiverData, setSelectedReceiverData }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext)
}


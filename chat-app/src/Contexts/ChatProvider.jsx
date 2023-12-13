import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [selectedReceiverData, setSelectedReceiverData] = useState(null)
    return (
        <ChatContext.Provider value={{ selectedReceiverData, setSelectedReceiverData }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext)
}


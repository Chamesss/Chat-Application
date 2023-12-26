import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [selectedReceiverData, setSelectedReceiverData] = useState(null)
    const [opened, setOpened] = useState(Boolean)
    return (
        <ChatContext.Provider value={{ selectedReceiverData, setSelectedReceiverData, opened, setOpened }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext)
}


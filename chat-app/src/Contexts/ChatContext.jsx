import React, {createContext, useContext, useState} from 'react'

const ChatContext = createContext()

export const ChatProvider = ({children}) => {
    const [selectedConversationId, setSelectedConversation] = useState(null)
    return (
        <ChatContext.Provider value={{ selectedConversationId, setSelectedConversation }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext)
}


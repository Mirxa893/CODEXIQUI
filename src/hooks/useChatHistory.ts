import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ChatSession {
  id: string;
  title: string;
  messages: { role: string; content: string }[];
}

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
    };
    setChatHistory((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const updateChat = (chatId: string, messages: { role: string; content: string }[]) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages, title: messages[0]?.content.slice(0, 30) || 'New Chat' }
          : chat
      )
    );
  };

  return {
    chatHistory,
    currentChatId,
    createNewChat,
    selectChat,
    updateChat,
  };
};
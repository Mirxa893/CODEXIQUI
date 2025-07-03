import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ScrollShadow } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useChatHistory } from '../hooks/useChatHistory';

const Sidebar: React.FC = () => {
  const { chatHistory, createNewChat, selectChat } = useChatHistory();

  return (
    <div className="flex flex-col h-full">
      <Button color="primary" className="mb-4" onPress={createNewChat}>
        <Icon icon="lucide:plus" className="mr-2" />
        New Chat
      </Button>
      <ScrollShadow className="flex-grow">
        {chatHistory.map((chat) => (
          <Button
            key={chat.id}
            variant="light"
            color="default"
            className="w-full justify-start mb-2"
            onPress={() => selectChat(chat.id)}
          >
            <Icon icon="lucide:message-circle" className="mr-2" />
            {chat.title}
          </Button>
        ))}
      </ScrollShadow>
    </div>
  );
};

export default Sidebar;
import React, { useState, useRef } from 'react';
import { Button, Input, Card, CardBody, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import CodePreview from '../components/CodePreview';
import FileUpload from '../components/FileUpload';
import { useOpenRouter } from '../hooks/useOpenRouter';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('preview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { generateResponse } = useOpenRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await generateResponse(input);
      const botMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
    }

    if (input.startsWith('/')) {
      setIsRightPanelOpen(true);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      console.log('File uploaded:', files[0].name);
    }
  };

  return (
    <div className="flex h-full p-4">
      <div className="flex-grow mr-4">
        <Card className="h-full flex flex-col">
          <CardBody className="flex-grow overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.role === 'user' ? 'bg-primary text-white' : 'bg-default-100'
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </CardBody>
          <form onSubmit={handleSubmit} className="mt-4 flex items-center">
            <FileUpload onFileSelect={handleFileUpload} />
            <Input
              fullWidth
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
            />
            <Button isIconOnly type="submit" className="ml-2">
              <Icon icon="lucide:send" />
            </Button>
          </form>
        </Card>
      </div>

      <motion.div
        className="w-1/3"
        initial={{ x: 500 }} // Fixed: use number not string
        animate={{ x: isRightPanelOpen ? 0 : 500 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Card className="h-full">
          <CardBody>
            <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab as any}>
              <Tab key="preview" title="Preview">
                <CodePreview code="// Your code here" />
              </Tab>
              <Tab key="console" title="Console">
                <div className="bg-black text-white p-4 rounded">
                  <p>Console output will be displayed here</p>
                </div>
              </Tab>
              <Tab key="code" title="Code">
                <div className="bg-gray-100 p-4 rounded">
                  <pre>
                    <code>// Editable code will be here</code>
                  </pre>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Chat;

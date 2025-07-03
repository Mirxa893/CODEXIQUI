import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface DownloadButtonProps {
  chatHistory: { id: string; title: string; messages: { role: string; content: string }[] }[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ chatHistory }) => {
  const handleDownload = async () => {
    const zip = new JSZip();

    chatHistory.forEach((chat) => {
      const chatContent = chat.messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join('\n\n');
      zip.file(`${chat.title}.txt`, chatContent);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'chat_history.zip');
  };

  return (
    <Button color="primary" variant="ghost" onPress={handleDownload}>
      <Icon icon="lucide:download" className="mr-2" />
      Download Chat History
    </Button>
  );
};

export default DownloadButton;
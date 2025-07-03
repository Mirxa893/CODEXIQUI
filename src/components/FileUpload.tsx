import React, { useRef } from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface FileUploadProps {
  onFileSelect: (files: FileList | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(event.target.files);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        multiple
      />
      <Button isIconOnly onClick={handleClick} className="mr-2">
        <Icon icon="lucide:paperclip" />
      </Button>
    </>
  );
};

export default FileUpload;
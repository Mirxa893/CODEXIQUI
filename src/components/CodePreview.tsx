import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodePreviewProps {
  code: string;
  language?: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code, language = 'javascript' }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodePreview;
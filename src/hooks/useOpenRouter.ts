import { useState } from 'react';

export const useOpenRouter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (prompt: string): Promise<string> => {
    setIsLoading(true);
    try {
      // Replace this with actual OpenRouter API call
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'moonshotai/kimi-dev-72b:free',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateResponse, isLoading };
};
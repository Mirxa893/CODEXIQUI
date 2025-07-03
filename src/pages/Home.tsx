import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold">Welcome to HeroUI Clone</h1>
        </CardHeader>
        <CardBody>
          <p className="mb-4">This is a clone of HeroUI Chat using the OpenRouter API for generating responses.</p>
          <Button asChild color="primary">
            <Link to="/chat">Start Chatting</Link>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;

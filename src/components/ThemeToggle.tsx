import React from 'react';
import { Switch } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      <Icon icon="lucide:sun" className={theme === 'light' ? 'text-warning' : 'text-default-500'} />
      <Switch
        checked={theme === 'dark'}
        onChange={toggleTheme}
        size="sm"
        color="secondary"
        className="mx-2"
      />
      <Icon icon="lucide:moon" className={theme === 'dark' ? 'text-primary' : 'text-default-500'} />
    </div>
  );
};

export default ThemeToggle;
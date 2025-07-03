import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Drawer, DrawerContent, DrawerHeader, DrawerBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import DownloadButton from './DownloadButton';
import { useAuth } from '../contexts/AuthContext';
import { useChatHistory } from '../hooks/useChatHistory';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { chatHistory } = useChatHistory();

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Drawer open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Menu</h2>
          </DrawerHeader>
          <DrawerBody>
            <Sidebar />
            <DownloadButton chatHistory={chatHistory} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Navbar isBordered>
        <NavbarContent>
          <NavbarBrand>
            <Button isIconOnly variant="light" onClick={() => setIsSidebarOpen(true)}>
              <Icon icon="lucide:menu" width={24} height={24} />
            </Button>
            <Link to="/" className="font-bold text-inherit">HeroUI Clone</Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
          <NavbarItem>
            {user ? (
              <Button color="danger" variant="flat" onClick={logout}>Logout</Button>
            ) : (
              <Button as={Link} color="primary" href="/login" variant="flat">Login</Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="flex-grow overflow-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
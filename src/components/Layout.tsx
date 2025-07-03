import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Sheet, // <-- use Sheet instead of Drawer
  SheetContent,
  SheetHeader,
  SheetBody,
} from '@heroui/react';
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
      {/* ✅ Replace Drawer with Sheet for compatibility */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <h2 className="text-lg font-semibold">Menu</h2>
          </SheetHeader>
          <SheetBody className="space-y-4 mt-4">
            <Sidebar />
            <DownloadButton chatHistory={chatHistory} />
          </SheetBody>
        </SheetContent>
      </Sheet>

      <Navbar isBordered className="w-full fixed top-0 z-50">
        <NavbarContent>
          <NavbarBrand>
            <Button isIconOnly variant="light" onClick={() => setIsSidebarOpen(true)}>
              <Icon icon="lucide:menu" width={24} height={24} />
            </Button>
            <Link to="/" className="ml-2 font-bold text-inherit">HeroUI Clone</Link>
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
              <Link to="/login">
                <Button color="primary" variant="flat">Login</Button>
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Push content below fixed navbar */}
      <main className="flex-grow overflow-auto pt-16 p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;

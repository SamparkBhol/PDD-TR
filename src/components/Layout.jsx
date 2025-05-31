import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Leaf, Home, Info, CheckSquare, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Product', path: '/product', icon: CheckSquare },
  { name: 'Reports', path: '/reports', icon: BookOpen },
  { name: 'About Us', path: '/about', icon: Users },
];

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-primary/95 dark:bg-primary/95 text-primary-foreground shadow-lg backdrop-blur-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <Leaf size={36} className="text-green-300 animate-pulse-subtle" />
            <span className="text-3xl font-bold tracking-tight">LeafGuard</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild className="text-primary-foreground hover:bg-primary-foreground/10">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-primary-foreground/20' : ''
                    }`
                  }
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </NavLink>
              </Button>
            ))}
          </nav>
          {/* Mobile menu button can be added here */}
        </div>
      </motion.header>
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>

      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="bg-secondary/80 dark:bg-secondary/90 text-secondary-foreground py-8 text-center backdrop-blur-sm border-t border-border"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-left md:text-center">
            <div>
              <span className="font-semibold text-foreground">LeafGuard</span>
              <p className="text-xs mt-1">Advanced AI for crop protection.</p>
            </div>
            <div>
              <span className="font-semibold text-foreground">Quick Links</span>
              <ul className="text-xs mt-1 space-y-1">
                <li><Link to="/product" className="hover:text-primary transition-colors">Product Features</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Our Team</Link></li>
                <li><Link to="/reports" className="hover:text-primary transition-colors">My Saved Reports</Link></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-foreground">Contact</span>
              <p className="text-xs mt-1">info@leafguard.dev</p>
              <p className="text-xs">+1 (555) 123-4567</p>
            </div>
          </div>
          <Separator className="my-4 bg-border/50" />
          <p className="text-sm">
            &copy; {new Date().getFullYear()} LeafGuard. All rights reserved.
          </p>
          <p className="text-xs mt-1">
            Empowering Agriculture with AI for a Healthier Tomorrow.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Layout;
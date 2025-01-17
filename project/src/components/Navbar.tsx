import React, { useState } from 'react';
import { BookOpen, User, ShoppingCart as CartIcon, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ShoppingCart from './ShoppingCart';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">ร้านหนังสือออนไลน์</span>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <CartIcon size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-800 dark:text-white">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  เข้าสู่ระบบ
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  สมัครสมาชิก
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      {showCart && <ShoppingCart onClose={() => setShowCart(false)} />}
    </header>
  );
}

export default Navbar;
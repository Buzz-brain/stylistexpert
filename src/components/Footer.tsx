import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              AI Fashion Stylist
            </h3>
          </motion.div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Empowering everyone to look and feel their best with intelligent, personalized fashion advice powered by expert knowledge and AI technology.
          </p>
          
          <div className="flex items-center justify-center space-x-6 mb-6">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="w-6 h-6" />
            </motion.a>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>for fashion lovers everywhere</span>
          </div>
          
          <div className="mt-4 text-sm text-gray-400 dark:text-gray-500">
            © 2024 AI Fashion Stylist. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
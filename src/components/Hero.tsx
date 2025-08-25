import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-10 dark:opacity-20"
        animate={{ 
          background: [
            "linear-gradient(to bottom right, rgb(79 70 229), rgb(147 51 234), rgb(236 72 153))",
            "linear-gradient(to bottom right, rgb(147 51 234), rgb(236 72 153), rgb(79 70 229))",
            "linear-gradient(to bottom right, rgb(236 72 153), rgb(79 70 229), rgb(147 51 234))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl mb-6"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Your AI Fashion
            </span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Stylist
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Discover your perfect style with our intelligent fashion expert system. 
            Get personalized outfit recommendations tailored to your preferences, occasion, and body type.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { icon: Zap, label: "Instant Results", desc: "Get styled in seconds" },
            { icon: Users, label: "Expert Knowledge", desc: "Rule-based AI system" },
            { icon: Sparkles, label: "Personalized", desc: "Tailored to you" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl max-w-xs"
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <feature.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-gray-400 dark:text-gray-500"
          >
            Scroll down to get started
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
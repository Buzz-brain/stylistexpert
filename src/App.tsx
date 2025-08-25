import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import InputForm from './components/InputForm';
import RecommendationCards from './components/RecommendationCards';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserInput, Recommendation } from './types';

function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleGetRecommendations = async (userInput: UserInput) => {
    setIsLoading(true);
    setShowRecommendations(false);
    
    try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }
      
      const data = await response.json();
      setRecommendations(data.recommendations);
      setShowRecommendations(true);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Fallback recommendations for demo
      setRecommendations([
        {
          title: "Classic Style Fallback",
          items: ["Well-fitted basics", "Neutral colors", "Quality shoes"],
          explanation: "Unable to connect to styling service. Here's a safe, classic recommendation that works for most occasions.",
          images: ["https://source.unsplash.com/800x600/?fashion,classic"],
          confidence: 0.7,
          matched_rules: ["DEMO"]
        }
      ]);
      setShowRecommendations(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
        <Header />
        
        <main>
          <Hero />
          
          <motion.section 
            className="py-16 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl mx-auto">
              <InputForm 
                onSubmit={handleGetRecommendations}
                isLoading={isLoading}
              />
              
              {(showRecommendations || isLoading) && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-16"
                >
                  <RecommendationCards 
                    recommendations={recommendations}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}
            </div>
          </motion.section>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
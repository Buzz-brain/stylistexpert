import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Heart, Star, ChevronDown, ChevronUp, Save, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Recommendation } from '../types';

interface RecommendationCardsProps {
  recommendations: Recommendation[];
  isLoading: boolean;
}

const RecommendationCards: React.FC<RecommendationCardsProps> = ({ recommendations, isLoading }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [savedLooks, setSavedLooks] = useState<Set<number>>(new Set());

  const handleSaveLook = (index: number) => {
    const newSaved = new Set(savedLooks);
    if (savedLooks.has(index)) {
      newSaved.delete(index);
    } else {
      newSaved.add(index);
    }
    setSavedLooks(newSaved);
    
    // Save to localStorage
    const saved = Array.from(newSaved).map(i => recommendations[i]);
    localStorage.setItem('savedLooks', JSON.stringify(saved));
  };

  const handleDownloadCard = async (recommendation: Recommendation, index: number) => {
    const element = document.getElementById(`recommendation-${index}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false
        });
        
        const link = document.createElement('a');
        link.download = `${recommendation.title.replace(/\s+/g, '_')}_outfit.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <motion.h2 
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Crafting your perfect looks...
        </motion.h2>
        
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="animate-pulse">
              <div className="flex items-start space-x-6">
                <div className="w-48 h-64 bg-gray-300 dark:bg-gray-600 rounded-2xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.h2 
        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Personalized Style Recommendations
      </motion.h2>

      <div className="space-y-6">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={index}
            id={`recommendation-${index}`}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="p-8">
              <div className="flex items-start space-x-6">
                {/* Image */}
                <motion.div
                  className="relative flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={recommendation.images[0]}
                    alt={recommendation.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {recommendation.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <motion.div
                          className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white text-sm font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: (index * 0.2) + 0.3, type: "spring", stiffness: 500 }}
                        >
                          <Star className="w-4 h-4 fill-current" />
                          <span>{(recommendation.confidence * 100).toFixed(0)}% Match</span>
                        </motion.div>
                        <div className="flex space-x-1">
                          {recommendation.matched_rules.map((rule, ruleIndex) => (
                            <motion.span
                              key={rule}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 rounded-lg"
                              initial={{ scale: 0, x: 20 }}
                              animate={{ scale: 1, x: 0 }}
                              transition={{ 
                                delay: (index * 0.2) + 0.5 + (ruleIndex * 0.1),
                                type: "spring",
                                stiffness: 500 
                              }}
                            >
                              {rule}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleSaveLook(index)}
                        className={`p-2 rounded-xl transition-colors ${
                          savedLooks.has(index)
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-5 h-5 ${savedLooks.has(index) ? 'fill-current' : ''}`} />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleDownloadCard(recommendation, index)}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {recommendation.explanation}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Style Items:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.items.map((item, itemIndex) => (
                        <motion.span
                          key={itemIndex}
                          className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            delay: (index * 0.2) + 0.7 + (itemIndex * 0.05),
                            type: "spring",
                            stiffness: 400 
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <span>Style Details</span>
                    {expandedCard === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl"
                      >
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Styling Tips:
                        </h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <li>• Mix textures and fabrics for visual interest</li>
                          <li>• Pay attention to fit and proportions</li>
                          <li>• Accessorize thoughtfully to complete the look</li>
                          <li>• Consider the color palette that flatters you most</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCards;
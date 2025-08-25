import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Calendar, Cloud, Users, Palette, Ruler } from 'lucide-react';
import { UserInput } from '../types';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    gender: '',
    occasion: '',
    weather: '',
    body_type: '',
    preferred_style: '',
    color_preference: '',
    height: ''
  });

  const [currentStep, setCurrentStep] = useState(0);

  const formFields = [
    {
      key: 'gender' as keyof UserInput,
      label: 'Gender',
      icon: User,
      options: ['male', 'female', 'non-binary'],
      required: true
    },
    {
      key: 'occasion' as keyof UserInput,
      label: 'Occasion',
      icon: Calendar,
      options: ['casual', 'formal', 'party', 'wedding', 'sports', 'work', 'date'],
      required: true
    },
    {
      key: 'weather' as keyof UserInput,
      label: 'Weather',
      icon: Cloud,
      options: ['hot', 'mild', 'cold', 'rainy'],
      required: true
    },
    {
      key: 'body_type' as keyof UserInput,
      label: 'Body Type',
      icon: Users,
      options: ['slim', 'athletic', 'pear', 'apple', 'plus-size'],
      required: true
    },
    {
      key: 'preferred_style' as keyof UserInput,
      label: 'Style Preference',
      icon: Sparkles,
      options: ['modern', 'classic', 'sporty', 'boho', 'flashy', 'minimalist', 'fitted', 'traditional'],
      required: true
    },
    {
      key: 'color_preference' as keyof UserInput,
      label: 'Color Preference',
      icon: Palette,
      options: ['neutral', 'bright', 'dark', 'pastels', 'earth-tones'],
      required: false
    },
    {
      key: 'height' as keyof UserInput,
      label: 'Height',
      icon: Ruler,
      options: ['short', 'average', 'tall'],
      required: false
    }
  ];

  const handleFieldChange = (key: keyof UserInput, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < formFields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = formFields.filter(field => field.required);
    const isValid = requiredFields.every(field => formData[field.key]);
    
    if (isValid) {
      onSubmit(formData);
    }
  };

  const isFormValid = () => {
    const requiredFields = formFields.filter(field => field.required);
    return requiredFields.every(field => formData[field.key]);
  };

  const currentField = formFields[currentStep];
  const progress = ((currentStep + 1) / formFields.length) * 100;

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tell us about your style
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Step {currentStep + 1} of {formFields.length}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mr-4">
                <currentField.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentField.label}
                {currentField.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentField.options.map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => handleFieldChange(currentField.key, option)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left font-medium ${
                    formData[currentField.key] === option
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
          >
            Previous
          </motion.button>

          {currentStep < formFields.length - 1 ? (
            <motion.button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg disabled:opacity-50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: isFormValid() && !isLoading ? 1.05 : 1 }}
              whileTap={{ scale: isFormValid() && !isLoading ? 0.95 : 1 }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>{isLoading ? 'Styling...' : 'Get My Style'}</span>
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default InputForm;
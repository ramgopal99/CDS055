"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import aslDictionary from './aslDictionary';

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl ${className}`}>
    {children}
  </div>
);

const ASL = () => {
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [error] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              ASL Translator
            </h1>
            <p className="text-gray-600 text-lg">
              Transform your text into American Sign Language signs
            </p>
          </div>
          
          <Card className="mb-8 backdrop-blur-sm bg-white/80 p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Type something to translate..."
                  value={text}
                  onChange={handleInputChange}
                  className="flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-white/50 text-black"
                />
                
                <button 
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Translate
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                  {error}
                </div>
              )}
            </form>
          </Card>

          <ASLTranslator text={submittedText} />
        </div>
      </div>
    </div>
  );
};

const ASLTranslator = ({ text }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [processedItems, setProcessedItems] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const isWord = useCallback((str) => {
    return aslDictionary[str.toLowerCase()] || false;
  }, []);

  const processText = useCallback((inputText) => {
    if (!inputText) return [];

    const chars = inputText.toLowerCase().split('');
    const result = [];
    let currentWord = '';

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      if (/[a-z0-9]/.test(char)) {
        currentWord += char;
        if (isWord(currentWord)) {
          if (i + 1 < chars.length && isWord(currentWord + chars[i + 1])) {
            continue;
          }
          result.push({ type: 'word', value: currentWord });
          currentWord = '';
        } else if (i === chars.length - 1 || !/[a-z0-9]/.test(chars[i + 1])) {
          currentWord.split('').forEach(letter => {
            result.push({ type: 'letter', value: letter });
          });
          currentWord = '';
        }
      } else {
        if (currentWord) {
          currentWord.split('').forEach(letter => {
            result.push({ type: 'letter', value: letter });
          });
          currentWord = '';
        }
        result.push({ type: 'space', value: char });
      }
    }

    return result;
  }, [isWord]);

  useEffect(() => {
    if (text) {
      const items = processText(text);
      setProcessedItems(items);
      setCurrentIndex(0);
      setIsPlaying(true);
    } else {
      setProcessedItems([]);
      setCurrentIndex(0);
      setIsPlaying(false);
    }
  }, [text, processText]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentIndex < processedItems.length - 1) {
      timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 1000);
    } else if (currentIndex >= processedItems.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, processedItems.length]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderItem = useCallback((item) => {
    if (item.type === 'word') {
      return (
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <img
              src={`/asl/words/${item.value}.jpg`}
              alt={`ASL sign for ${item.value}`}
              className="relative w-72 h-72 object-contain p-4 bg-white rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="mt-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {item.value}
          </span>
        </div>
      );
    } else if (item.type === 'letter' && /[a-z0-9]/.test(item.value)) {
      return (
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <img
              src={`/asl/${item.value}.jpg`}
              alt={`ASL sign for ${item.value}`}
              className="relative w-60 h-60 object-contain p-4 bg-white rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="mt-4 text-xl font-semibold text-gray-600">
            {item.value}
          </span>
        </div>
      );
    } else {
      return (
        <div className="w-24 h-60 flex items-center justify-center">
          <span className="text-3xl text-gray-400">{item.value}</span>
        </div>
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      {processedItems.length > 0 && (
        <div className="flex gap-4 mb-4">
          <button
            onClick={handlePlayPause}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <RotateCcw className="w-5 h-5" />
            Restart
          </button>
        </div>
      )}
      
      <Card className="w-full backdrop-blur-sm bg-white/80 p-8 shadow-xl">
        <div className="flex flex-wrap justify-center gap-4">
          {processedItems.length > 0 && renderItem(processedItems[currentIndex])}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {processedItems.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ASL;
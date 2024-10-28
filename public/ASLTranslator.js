import React, { useState } from 'react';

const ASL = () => {
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedText(text);
  };

  const startSpeechRecognition = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error('Speech recognition is not supported in this browser.');
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setError('');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setSubmittedText(transcript);
      };

      recognition.onerror = (event) => {
        setError('Error recording audio: ' + event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      setError(err.message);
      setIsRecording(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Text to ASL Translator
      </h1>
      
      <form onSubmit={handleSubmit} style={{ width: '100%', marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px',
          marginBottom: '1rem'
        }}>
          <input
            type="text"
            placeholder="Enter text or use microphone"
            value={text}
            onChange={handleInputChange}
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          
          <button 
            type="button"
            onClick={startSpeechRecognition}
            style={{
              padding: '8px 16px',
              backgroundColor: isRecording ? '#ef4444' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isRecording ? '⏹️ Stop' : '🎤 Record'}
          </button>

          <button 
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '4px',
            marginTop: '8px'
          }}>
            {error}
          </div>
        )}
      </form>

      <ASLTranslator text={submittedText} />
    </div>
  );
};

const ASLTranslator = ({ text }) => {
  const aslDictionary = {
    'hello': true,
    'hi': true,
    'goodbye': true,
    'thank': true,
    'you': true,
    'please': true,
    'sorry': true,
    'love': true,
    'good': true,
    'bad': true,
    'yes': true,
    'no': true,
    'what': true,
    'who': true,
    'where': true,
    'when': true,
    'why': true,
    'how': true,
    'want': true,
    'need': true,
    'can': true,
    'help': true,
    'time': true,
    'home': true,
    'work': true,
    'school': true,
    'food': true,
    'water': true,
    'friend': true,
    'family': true,
    'mother': true,
    'father': true,
    'sister': true,
    'brother': true,
    'like':true,
    'dance':true,
  };
  const isWord = (str) => {
    return aslDictionary[str.toLowerCase()] || false;
  };

  const processText = (inputText) => {
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
          result.push({
            type: 'word',
            value: currentWord
          });
          currentWord = '';
        } else if (i === chars.length - 1 || !/[a-z0-9]/.test(chars[i + 1])) {
          currentWord.split('').forEach(letter => {
            result.push({
              type: 'letter',
              value: letter
            });
          });
          currentWord = '';
        }
      } else {
        if (currentWord) {
          currentWord.split('').forEach(letter => {
            result.push({
              type: 'letter',
              value: letter
            });
          });
          currentWord = '';
        }
        result.push({
          type: 'space',
          value: char
        });
      }
    }

    return result;
  };

  const processedText = processText(text);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      marginTop: '2rem'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px'
      }}>
        {processedText.map((item, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            {item.type === 'word' ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <img
                  src={`/asl/words/${item.value}.png`}
                  alt={`ASL sign for ${item.value}`}
                  style={{
                    width: '240px',
                    height: '240px',
                    objectFit: 'contain',
                    marginBottom: '8px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <span style={{ 
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#4b5563'
                }}>
                  {item.value}
                </span>
              </div>
            ) : item.type === 'letter' && /[a-z0-9]/.test(item.value) ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <img
                  src={`/asl/${item.value}.png`}
                  alt={`ASL sign for ${item.value}`}
                  style={{
                    width: '192px',
                    height: '192px',
                    objectFit: 'contain',
                    marginBottom: '8px'
                  }}
                />
                <span style={{ fontSize: '1.125rem' }}>{item.value}</span>
              </div>
            ) : (
              <div style={{
                width: '96px',
                height: '192px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ 
                  fontSize: '1.5rem',
                  color: '#9ca3af'
                }}>
                  {item.value}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ASL;
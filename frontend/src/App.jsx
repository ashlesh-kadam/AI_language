import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Book, 
  Users, 
  Play, 
  Mic, 
  MessageCircle, 
  HelpCircle, 
  Settings, 
  Globe, 
  AudioLines,
  Video 
} from 'lucide-react';

// Navigation Component
const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { icon: <Camera />, name: 'Translator', section: 'translator' },
    { icon: <Book />, name: 'Learn', section: 'learn' },
    { icon: <Users />, name: 'Community', section: 'community' },
    { icon: <MessageCircle />, name: 'Chat', section: 'chat' },
    { icon: <HelpCircle />, name: 'Resources', section: 'resources' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white shadow-lg flex flex-col items-center py-6">
      <div className="mb-10">
        <img 
          src="/api/placeholder/60/60" 
          alt="SignSpeak Logo" 
          className="w-12 h-12 rounded-full"
        />
      </div>
      {navItems.map((item) => (
        <button
          key={item.section}
          onClick={() => setActiveSection(item.section)}
          className={`p-3 mb-4 rounded-lg ${
            activeSection === item.section 
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

// Translator Section
const TranslatorSection = () => {
  const [translationMode, setTranslationMode] = useState('sign-to-text');
  const videoRef = useRef(null);
  const [translatedText, setTranslatedText] = useState('');

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Webcam access error:", error);
    }
  };

  return (
    <div className="p-8 ml-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">
          Sign Language Translator
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-1 flex items-center">
              <button 
                onClick={() => setTranslationMode('sign-to-text')}
                className={`px-4 py-2 rounded-full ${
                  translationMode === 'sign-to-text' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600'
                }`}
              >
                Sign to Text
              </button>
              <button 
                onClick={() => setTranslationMode('text-to-sign')}
                className={`px-4 py-2 rounded-full ${
                  translationMode === 'text-to-sign' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600'
                }`}
              >
                Text to Sign
              </button>
            </div>
          </div>

          {translationMode === 'sign-to-text' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Webcam Input</h2>
                {videoRef.current ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <button 
                      onClick={startWebcam}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                    >
                      Start Webcam
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Translation</h2>
                <div className="bg-white p-4 rounded-lg min-h-[200px]">
                  <p className="text-gray-600">
                    {translatedText || 'Translation will appear here'}
                  </p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    <Mic size={20} />
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    <AudioLines size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {translationMode === 'text-to-sign' && (
            <div className="bg-gray-100 rounded-lg p-6">
              <textarea 
                placeholder="Enter text to translate to sign language"
                className="w-full p-4 rounded-lg border mb-4"
                rows={4}
              />
              <div className="flex justify-center">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                  Translate to Sign
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Learn Section
const LearnSection = () => {
  const signLanguageCategories = [
    { name: 'Alphabet', signs: 26, icon: <Book /> },
    { name: 'Numbers', signs: 10, icon: <Globe /> },
    { name: 'Emotions', signs: 15, icon: <MessageCircle /> },
    { name: 'Conversation', signs: 20, icon: <Users /> }
  ];

  return (
    <div className="p-8 ml-20 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Learn Sign Language</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {signLanguageCategories.map((category) => (
          <div 
            key={category.name} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all"
          >
            <div className="text-blue-500 mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4">{category.signs} Signs to Learn</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('translator');

  return (
    <div className="flex">
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      {activeSection === 'translator' && <TranslatorSection />}
      {activeSection === 'learn' && <LearnSection />}
    </div>
  );
}

export default App;
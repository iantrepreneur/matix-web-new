import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Mic, Minus } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Salut ! Je suis MataMart Bot. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentButtons, setCurrentButtons] = useState([
    { id: 'products', text: 'Voir les produits' },
    { id: 'help', text: 'Aide' },
    { id: 'contact', text: 'Contact' }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, type = 'bot') => {
    const newMessage = {
      type,
      text,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleButtonClick = (button) => {
    // Add user message
    addMessage(button.text, 'user');
    
    // Clear current buttons
    setCurrentButtons([]);

    // Simulate bot response
    simulateTyping(() => {
      switch (button.id) {
        case 'products':
          addMessage('Voici nos catégories de produits disponibles :');
          setCurrentButtons([
            { id: 'electronics', text: 'Électronique' },
            { id: 'clothing', text: 'Vêtements' },
            { id: 'home', text: 'Maison & Jardin' },
            { id: 'back', text: 'Retour' }
          ]);
          break;
        case 'help':
          addMessage('Je peux vous aider avec : la navigation sur le site, les informations produits, les commandes, et bien plus !');
          setCurrentButtons([
            { id: 'navigation', text: 'Navigation' },
            { id: 'orders', text: 'Commandes' },
            { id: 'back', text: 'Retour' }
          ]);
          break;
        case 'contact':
          addMessage('Vous pouvez nous contacter :\n📞 +221 77 123 45 67\n📧 contact@matamart.sn\n🕒 Lun-Ven 8h-18h');
          setCurrentButtons([
            { id: 'back', text: 'Retour' }
          ]);
          break;
        case 'back':
          addMessage('Comment puis-je vous aider ?');
          setCurrentButtons([
            { id: 'products', text: 'Voir les produits' },
            { id: 'help', text: 'Aide' },
            { id: 'contact', text: 'Contact' }
          ]);
          break;
        default:
          addMessage('Merci pour votre intérêt ! Notre équipe vous contactera bientôt.');
          setCurrentButtons([
            { id: 'back', text: 'Retour' }
          ]);
      }
    });
  };

  const restartChat = () => {
    setMessages([
      {
        type: 'bot',
        text: 'Salut ! Je suis MataMart Bot. Comment puis-je vous aider aujourd\'hui ?',
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setCurrentButtons([
      { id: 'products', text: 'Voir les produits' },
      { id: 'help', text: 'Aide' },
      { id: 'contact', text: 'Contact' }
    ]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-matix-green-medium hover:bg-matix-green-dark text-white rounded-full h-14 w-14 shadow-matix-lg transition-all"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6 animate-bounce" />
        </Button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-2xl w-80 h-96 relative shadow-matix-lg flex flex-col border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-matix-green-medium text-white rounded-t-2xl relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-matix-green-medium" />
                </div>
                <div>
                  <h3 className="font-semibold">MataMart Bot</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-90">En ligne</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-1"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 p-1"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content - Only show if not minimized */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message, index) => (
                    <div key={index}>
                      {message.type === 'bot' ? (
                        <div className="flex items-start gap-2">
                          <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs border">
                            <p className="text-sm text-gray-800">{message.text}</p>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {message.timestamp}
                            </span>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-gray-600 transition-colors mt-2"
                            title="Audio wolof (bientôt disponible)"
                            disabled
                          >
                            <Mic className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <div className="bg-matix-green-medium text-white rounded-lg p-3 max-w-xs">
                            <p className="text-sm">{message.text}</p>
                            <span className="text-xs opacity-75 mt-1 block">
                              {message.timestamp}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <div className="flex items-center gap-1">
                          <div className="typing-dot"></div>
                          <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                          <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {currentButtons.length > 0 && !isTyping && (
                    <div className="flex flex-wrap gap-2 animate-fade-in">
                      {currentButtons.map((button) => (
                        <Button
                          key={button.id}
                          onClick={() => handleButtonClick(button)}
                          className="bg-matix-yellow hover:bg-yellow-500 text-black text-xs px-3 py-2 rounded-full transition-all"
                        >
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={restartChat}
                      className="text-matix-green-medium border-matix-green-medium hover:bg-matix-green-pale"
                    >
                      Recommencer
                    </Button>
                    <span className="text-xs text-gray-500">
                      Powered by Matix AI
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #9CA3AF;
          animation: typing 1.4s infinite ease-in-out;
        }

        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
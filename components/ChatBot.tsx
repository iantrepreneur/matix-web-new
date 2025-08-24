'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  text: string;
  type: 'user' | 'bot';
  timestamp: string;
}

interface ChatOption {
  id: string;
  text: string;
  audioUrl?: string;
  next?: string;
}

interface ChatStep {
  message: string;
  options: ChatOption[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const chatFlow: Record<string, ChatStep> = {
    welcome: {
      message: "Bonjour ! Bienvenue sur MataMart, votre marketplace avicole. Que voulez-vous faire ?",
      options: [
        { id: "sell", text: "1 - Vendre mes produits", next: "sell_category" },
        { id: "buy", text: "2 - Acheter des produits", next: "buy_category" }
      ]
    },
    sell_category: {
      message: "Que voulez-vous vendre ?",
      options: [
        { id: "poultry", text: "1 - Poulets/Poussins", next: "poultry_type" },
        { id: "equipment", text: "2 - Matériel & équipements", next: "equipment_type" },
        { id: "medicine", text: "3 - Vaccins & médicaments", next: "medicine_type" }
      ]
    },
    buy_category: {
      message: "Que voulez-vous acheter ?",
      options: [
        { id: "poultry", text: "1 - Poulets/Poussins", next: "poultry_type" },
        { id: "equipment", text: "2 - Matériel & équipements", next: "equipment_type" },
        { id: "medicine", text: "3 - Vaccins & médicaments", next: "medicine_type" }
      ]
    },
    poultry_type: {
      message: "Quel type de volaille ?",
      options: [
        { id: "chicks", text: "1 - Poussins 1 jour", next: "quantity" },
        { id: "broilers", text: "2 - Poulets de chair", next: "quantity" },
        { id: "layers", text: "3 - Poules pondeuses", next: "quantity" },
        { id: "local", text: "4 - Poulets fermiers", next: "quantity" }
      ]
    },
    equipment_type: {
      message: "Quel matériel ?",
      options: [
        { id: "cages", text: "1 - Cages & poulaillers", next: "quantity" },
        { id: "feeders", text: "2 - Mangeoires & abreuvoirs", next: "quantity" },
        { id: "incubators", text: "3 - Couveuses & incubateurs", next: "quantity" },
        { id: "heating", text: "4 - Chauffage & éclairage", next: "quantity" }
      ]
    },
    medicine_type: {
      message: "Quels produits vétérinaires ?",
      options: [
        { id: "vaccines", text: "1 - Vaccins", next: "quantity" },
        { id: "antibiotics", text: "2 - Antibiotiques", next: "quantity" },
        { id: "vitamins", text: "3 - Vitamines & compléments", next: "quantity" },
        { id: "disinfectants", text: "4 - Désinfectants", next: "quantity" }
      ]
    },
    quantity: {
      message: "Combien en avez-vous ?",
      options: [
        { id: "small", text: "1 - Moins de 10", next: "location" },
        { id: "medium", text: "2 - 10 à 50", next: "location" },
        { id: "large", text: "3 - 50 à 100", next: "location" },
        { id: "xlarge", text: "4 - Plus de 100", next: "location" }
      ]
    },
    location: {
      message: "Où êtes-vous situé ?",
      options: [
        { id: "dakar", text: "1 - Dakar", next: "price" },
        { id: "thies", text: "2 - Thiès", next: "price" },
        { id: "kaolack", text: "3 - Kaolack", next: "price" },
        { id: "other", text: "4 - Autre ville", next: "price" }
      ]
    },
    price: {
      message: "Quel est votre prix de vente en FCFA par unité ?",
      options: [
        { id: "low", text: "1 - Moins de 1000 FCFA", next: "availability" },
        { id: "medium", text: "2 - 1000 à 5000 FCFA", next: "availability" },
        { id: "high", text: "3 - 5000 à 20000 FCFA", next: "availability" },
        { id: "premium", text: "4 - Plus de 20000 FCFA", next: "availability" }
      ]
    },
    availability: {
      message: "Quand c'est disponible ?",
      options: [
        { id: "now", text: "1 - Immédiatement", next: "photo" },
        { id: "week", text: "2 - Dans la semaine", next: "photo" },
        { id: "month", text: "3 - Dans le mois", next: "photo" }
      ]
    },
    photo: {
      message: "Voulez-vous ajouter une photo de votre produit ?",
      options: [
        { id: "yes", text: "1 - Oui, ajouter une photo", next: "end" },
        { id: "no", text: "2 - Non, continuer sans photo", next: "end" }
      ]
    },
    end: {
      message: "Parfait ! Votre annonce sera bientôt publiée. Un de nos agents vous contactera sous 24h pour finaliser.",
      options: []
    }
  };

  const addMessage = (text: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      text,
      type,
      timestamp: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (callback: () => void) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);
    callback();
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = () => {
    if (!selectedOption) return;

    const currentStepData = chatFlow[currentStep];
    const selectedOptionData = currentStepData.options.find(opt => opt.id === selectedOption);
    
    if (selectedOptionData) {
      // Add user message
      addMessage(selectedOptionData.text, 'user');
      setShowOptions(false);
      setSelectedOption(null);

      // Move to next step
      if (selectedOptionData.next) {
        simulateTyping(() => {
          const nextStepData = chatFlow[selectedOptionData.next!];
          addMessage(nextStepData.message, 'bot');
          setCurrentStep(selectedOptionData.next!);
          if (nextStepData.options.length > 0) {
            setTimeout(() => setShowOptions(true), 500);
          }
        });
      }
    }
  };

  const playAudio = (audioUrl?: string) => {
    // Simulation audio wolof
    console.log('Playing audio:', audioUrl);
  };

  const restartChat = () => {
    setMessages([]);
    setCurrentStep('welcome');
    setSelectedOption(null);
    setShowOptions(false);
    setIsTyping(false);
    
    // Start fresh conversation
    setTimeout(() => {
      simulateTyping(() => {
        const welcomeStep = chatFlow.welcome;
        addMessage(welcomeStep.message, 'bot');
        setTimeout(() => setShowOptions(true), 500);
      });
    }, 500);
  };

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        simulateTyping(() => {
          const welcomeStep = chatFlow.welcome;
          addMessage(welcomeStep.message, 'bot');
          setTimeout(() => setShowOptions(true), 500);
        });
      }, 500);
    }
  }, [isOpen, messages.length]);

  const currentStepData = chatFlow[currentStep];

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 left-6 z-50">
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
        <div className="fixed bottom-6 left-6 z-50">
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
                            <p className="text-sm text-gray-800 whitespace-pre-line">{message.text}</p>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {message.timestamp}
                            </span>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-matix-green-medium transition-colors mt-2"
                            title="Audio wolof (bientôt disponible)"
                            onClick={() => playAudio()}
                          >
                            🎤
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

                  {/* Options avec checkboxes */}
                  {showOptions && currentStepData.options.length > 0 && !isTyping && (
                    <div className="bg-gray-50 rounded-lg p-3 ml-8 animate-fade-in">
                      <div className="space-y-2">
                        {currentStepData.options.map((option) => (
                          <div key={option.id} className="flex items-center justify-between py-2 px-3 hover:bg-white rounded-lg transition-colors">
                            <label className="flex items-center cursor-pointer flex-1">
                              <input
                                type="radio"
                                name="chatOption"
                                checked={selectedOption === option.id}
                                onChange={() => handleOptionSelect(option.id)}
                                className="w-4 h-4 text-matix-green-medium border-2 border-gray-300 focus:ring-matix-green-medium"
                              />
                              <span className="ml-3 text-sm text-gray-900">
                                {option.text}
                              </span>
                            </label>
                            <button
                              onClick={() => playAudio(option.audioUrl)}
                              className="ml-2 p-1 text-gray-400 hover:text-matix-green-medium transition-colors"
                              title="Écouter en wolof"
                            >
                              🎤
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {selectedOption && (
                        <Button
                          onClick={handleContinue}
                          className="mt-3 w-full bg-matix-green-medium hover:bg-matix-green-dark text-white transition-all"
                        >
                          Continuer
                        </Button>
                      )}
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
          background-color: #9ca3af;
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
          animation: fadeIn 0.3s ease-in-out;
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
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentButtons, setCurrentButtons] = useState<ActionButton[]>([]);

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

  const handleButtonClick = (button: ActionButton) => {
    addMessage(button.text, 'user');
    setCurrentButtons([]);
    
    simulateTyping(() => {
      if (button.action) {
        button.action();
      }
    });
  };

  const restartChat = () => {
    setMessages([]);
    setCurrentButtons([]);
    setIsTyping(false);
    
    // Start fresh conversation
    setTimeout(() => {
      simulateTyping(() => {
        addMessage("Salut ! Je suis MataMart Bot 🤖 Comment puis-je t'aider aujourd'hui ?", 'bot');
        setCurrentButtons(initialButtons);
      });
    }, 500);
  };

  const showProductInfo = () => {
    addMessage("Voici nos catégories principales :", 'bot');
    setCurrentButtons([
      { id: 'electronics', text: '📱 Électronique', action: () => showElectronics() },
      { id: 'fashion', text: '👕 Mode', action: () => showFashion() },
      { id: 'home', text: '🏠 Maison', action: () => showHome() },
      { id: 'back', text: '← Retour', action: () => showMainMenu() }
    ]);
  };

  const showElectronics = () => {
    addMessage("📱 Nos produits électroniques populaires :\n• Smartphones Samsung & iPhone\n• Ordinateurs portables\n• Écouteurs sans fil\n• Accessoires tech", 'bot');
    setCurrentButtons([
      { id: 'back', text: '← Retour aux catégories', action: () => showProductInfo() }
    ]);
  };

  const showFashion = () => {
    addMessage("👕 Mode & Style :\n• Vêtements hommes & femmes\n• Chaussures tendance\n• Accessoires de mode\n• Bijoux", 'bot');
    setCurrentButtons([
      { id: 'back', text: '← Retour aux catégories', action: () => showProductInfo() }
    ]);
  };

  const showHome = () => {
    addMessage("🏠 Articles pour la maison :\n• Décoration intérieure\n• Électroménager\n• Meubles\n• Jardinage", 'bot');
    setCurrentButtons([
      { id: 'back', text: '← Retour aux catégories', action: () => showProductInfo() }
    ]);
  };

  const showOrderStatus = () => {
    addMessage("Pour vérifier votre commande, j'aurais besoin de votre numéro de commande. Vous pouvez aussi :", 'bot');
    setCurrentButtons([
      { id: 'login', text: '🔐 Me connecter', action: () => showLogin() },
      { id: 'contact', text: '📞 Contacter le support', action: () => showContact() },
      { id: 'back', text: '← Retour', action: () => showMainMenu() }
    ]);
  };

  const showLogin = () => {
    addMessage("Connectez-vous à votre compte MataMart pour accéder à vos commandes et profiter d'une expérience personnalisée !", 'bot');
    setCurrentButtons([
      { id: 'back', text: '← Retour', action: () => showOrderStatus() }
    ]);
  };

  const showContact = () => {
    addMessage("📞 Contactez notre équipe :\n• WhatsApp: +221 XX XXX XX XX\n• Email: support@matamart.sn\n• Horaires: 8h-20h (Lun-Sam)", 'bot');
    setCurrentButtons([
      { id: 'back', text: '← Retour', action: () => showMainMenu() }
    ]);
  };

  const showHelp = () => {
    addMessage("❓ Comment puis-je vous aider ?\n• Navigation sur le site\n• Processus de commande\n• Modes de paiement\n• Livraison", 'bot');
    setCurrentButtons([
      { id: 'navigation', text: '🧭 Navigation', action: () => showNavigation() },
      { id: 'payment', text: '💳 Paiement', action: () => showPayment() },
      { id: 'delivery', text: '🚚 Livraison', action: () => showDelivery() },
      { id: 'back', text: '← Retour', action: () => showMainMenu() }
    ]);
  };

  const showNavigation = () => {
    addMessage("🧭 Navigation facile :\n• Utilisez la barre de recherche\n• Parcourez par catégories\n• Filtrez par prix et marque\n• Consultez les avis clients", 'bot');
    setCurrentButtons([
      { id: 'back', text: '← Retour à l\'aide', action: () => showHelp() }
    ]);
  };

  const showPayment = () => {
    addMessage("💳 Modes de paiement acceptés :\n• Orange Money\n• Wave\n• Cartes bancaires\n• Paiement à la livraison", 'bot');
    setCurrentButtons([
      { id: 'back', text: '← Retour à l\'aide', action: () => showHelp() }
    ]);
  };

  const showDelivery = () => {
    addMessage("🚚 Livraison :\n• Dakar: 24-48h (gratuite dès 25 000 FCFA)\n• Régions: 2-5 jours\n• Suivi en temps réel\n• Livraison sécurisée", 'bot');
    setCurrentButtons([
      { id: 'back', text: '← Retour à l\'aide', action: () => showHelp() }
    ]);
  };

  const showMainMenu = () => {
    addMessage("Comment puis-je vous aider ?", 'bot');
    setCurrentButtons(initialButtons);
  };

  const initialButtons: ActionButton[] = [
    { id: 'products', text: '🛍️ Voir les produits', action: showProductInfo },
    { id: 'orders', text: '📦 Mes commandes', action: showOrderStatus },
    { id: 'help', text: '❓ Aide', action: showHelp },
    { id: 'contact', text: '📞 Contact', action: showContact }
  ];

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        simulateTyping(() => {
          addMessage("Salut ! Je suis MataMart Bot 🤖 Comment puis-je t'aider aujourd'hui ?", 'bot');
          setCurrentButtons(initialButtons);
        });
      }, 500);
    }
  }, [isOpen, messages.length]);

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
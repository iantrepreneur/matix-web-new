@@ .. @@
   return (
     <>
       {/* Floating Chat Button */}
-      <div className="fixed bottom-6 left-6 z-50">
+      <div className="fixed bottom-6 right-6 z-50">
         <Button
           size="lg"
-          className="bg-matix-button hover:bg-matix-yellow text-black rounded-full h-14 w-14 shadow-matix-lg animate-pulse-yellow transition-all"
+          className="bg-matix-green-medium hover:bg-matix-green-dark text-white rounded-full h-14 w-14 shadow-matix-lg transition-all"
           onClick={() => setIsOpen(true)}
         >
-          <MessageCircle className="h-6 w-6" />
+          <MessageCircle className="h-6 w-6 animate-bounce" />
         </Button>
       </div>

@@ .. @@
       {/* Chat Modal */}
       {isOpen && (
-        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
-          <div className="bg-white rounded-2xl w-full max-w-md h-96 relative shadow-matix-lg flex flex-col">
+        <div className="fixed bottom-6 right-6 z-50">
+          <div className="bg-white rounded-2xl w-80 h-96 relative shadow-matix-lg flex flex-col border border-gray-200">
             {/* Header */}
-            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-matix-green-medium text-white rounded-t-2xl">
+            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-matix-green-medium text-white rounded-t-2xl relative">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                   <MessageCircle className="h-6 w-6 text-matix-green-medium" />
@@ .. @@
                 <div>
                   <h3 className="font-semibold">MataMart Bot</h3>
                   <div className="flex items-center gap-1">
-                    <div className="w-2 h-2 bg-matix-yellow rounded-full"></div>
+                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                     <span className="text-xs opacity-90">En ligne</span>
                   </div>
                 </div>
               </div>
               
-              <Button
-                variant="ghost"
-                size="sm"
-                className="text-white hover:bg-white/20"
-                onClick={() => setIsOpen(false)}
-              >
-                <X className="h-4 w-4" />
-              </Button>
+              <div className="flex items-center gap-2">
+                <Button
+                  variant="ghost"
+                  size="sm"
+                  className="text-white hover:bg-white/20 p-1"
+                  onClick={() => setIsMinimized(!isMinimized)}
+                >
+                  <Minus className="h-4 w-4" />
+                </Button>
+                <Button
+                  variant="ghost"
+                  size="sm"
+                  className="text-white hover:bg-white/20 p-1"
+                  onClick={() => setIsOpen(false)}
+                >
+                  <X className="h-4 w-4" />
+                </Button>
+              </div>
             </div>

-            {/* Messages */}
-            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
-              {messages.map((message, index) => (
-                <div key={index}>
-                  {message.type === 'bot' ? (
-                    <div className="flex items-start gap-2">
-                      <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs border">
-                        <p className="text-sm text-gray-800">{message.text}</p>
-                        <span className="text-xs text-gray-500 mt-1 block">
-                          {message.timestamp}
-                        </span>
-                      </div>
-                      <button 
-                        className="text-gray-400 hover:text-gray-600 transition-colors mt-2"
-                        title="Audio wolof (bientôt disponible)"
-                        disabled
-                      >
-                        <Mic className="h-4 w-4" />
-                      </button>
-                    </div>
-                  ) : (
-                    <div className="flex justify-end">
-                      <div className="bg-matix-green-medium text-white rounded-lg p-3 max-w-xs">
-                        <p className="text-sm">{message.text}</p>
-                        <span className="text-xs opacity-75 mt-1 block">
-                          {message.timestamp}
-                        </span>
+            {/* Chat Content - Only show if not minimized */}
+            {!isMinimized && (
+              <>
+                {/* Messages */}
+                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
+                  {messages.map((message, index) => (
+                    <div key={index}>
+                      {message.type === 'bot' ? (
+                        <div className="flex items-start gap-2">
+                          <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs border">
+                            <p className="text-sm text-gray-800">{message.text}</p>
+                            <span className="text-xs text-gray-500 mt-1 block">
+                              {message.timestamp}
+                            </span>
+                          </div>
+                          <button 
+                            className="text-gray-400 hover:text-gray-600 transition-colors mt-2"
+                            title="Audio wolof (bientôt disponible)"
+                            disabled
+                          >
+                            <Mic className="h-4 w-4" />
+                          </button>
+                        </div>
+                      ) : (
+                        <div className="flex justify-end">
+                          <div className="bg-matix-green-medium text-white rounded-lg p-3 max-w-xs">
+                            <p className="text-sm">{message.text}</p>
+                            <span className="text-xs opacity-75 mt-1 block">
+                              {message.timestamp}
+                            </span>
+                          </div>
+                        </div>
+                      )}
+                    </div>
+                  ))}
+
+                  {/* Typing Indicator */}
+                  {isTyping && (
+                    <div className="flex items-start gap-2">
+                      <div className="bg-white rounded-lg p-3 shadow-sm border">
+                        <div className="flex items-center gap-1">
+                          <div className="typing-dot"></div>
+                          <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
+                          <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
+                        </div>
                       </div>
                     </div>
                   )}
-                </div>
-              ))}
-
-              {/* Typing Indicator */}
-              {isTyping && (
-                <div className="flex items-start gap-2">
-                  <div className="bg-white rounded-lg p-3 shadow-sm border">
-                    <div className="flex items-center gap-1">
-                      <div className="typing-dot"></div>
-                      <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
-                      <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
-                    </div>
-                  </div>
-                </div>
-              )}
-
-              {/* Action Buttons */}
-              {currentButtons.length > 0 && !isTyping && (
-                <div className="flex flex-wrap gap-2 animate-fade-in">
-                  {currentButtons.map((button) => (
-                    <Button
-                      key={button.id}
-                      onClick={() => handleButtonClick(button)}
-                      className="bg-matix-yellow hover:bg-yellow-500 text-black text-xs px-3 py-2 rounded-full transition-all"
-                    >
-                      {button.text}
-                    </Button>
-                  ))}
+
+                  {/* Action Buttons */}
+                  {currentButtons.length > 0 && !isTyping && (
+                    <div className="flex flex-wrap gap-2 animate-fade-in">
+                      {currentButtons.map((button) => (
+                        <Button
+                          key={button.id}
+                          onClick={() => handleButtonClick(button)}
+                          className="bg-matix-yellow hover:bg-yellow-500 text-black text-xs px-3 py-2 rounded-full transition-all"
+                        >
+                          {button.text}
+                        </Button>
+                      ))}
+                    </div>
+                  )}
                 </div>
-              )}
-            </div>
 
-            {/* Footer */}
-            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
-              <div className="flex items-center justify-between">
-                <Button
-                  variant="outline"
-                  size="sm"
-                  onClick={restartChat}
-                  className="text-matix-green-medium border-matix-green-medium hover:bg-matix-green-pale"
-                >
-                  Recommencer
-                </Button>
-                <span className="text-xs text-gray-500">
-                  Powered by Matix AI
-                </span>
-              </div>
-            </div>
+                {/* Footer */}
+                <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
+                  <div className="flex items-center justify-between">
+                    <Button
+                      variant="outline"
+                      size="sm"
+                      onClick={restartChat}
+                      className="text-matix-green-medium border-matix-green-medium hover:bg-matix-green-pale"
+                    >
+                      Recommencer
+                    </Button>
+                    <span className="text-xs text-gray-500">
+                      Powered by Matix AI
+                    </span>
+                  </div>
+                </div>
+              </>
+            )}
           </div>
         </div>
       )}
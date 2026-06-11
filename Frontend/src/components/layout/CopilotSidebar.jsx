import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAssistantStore } from '../../store/assistantStore';
import { useUiStore } from '../../store/uiStore';
import { CONTEXTUAL_PROMPTS } from '../../utils/mockData';
import ChatMessage from '../shared/ChatMessage';
import VoiceButton from '../shared/VoiceButton';
import AgentStatus from '../shared/AgentStatus';
import Button from '../ui/button';
import { Send, Sparkles, X, MessageSquare, Trash2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CopilotSidebar = () => {
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const [inputText, setInputText] = useState('');

  const {
    messages,
    isThinking,
    agentState,
    voiceActive,
    toggleVoice,
    sendMessage,
    clearHistory
  } = useAssistantStore();

  const { copilotOpen, setCopilotOpen } = useUiStore();

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Contextual suggested prompts based on active page route
  const currentPrompts = CONTEXTUAL_PROMPTS[location.pathname] || CONTEXTUAL_PROMPTS['/'];

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText, location.pathname);
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handlePromptClick = (prompt) => {
    sendMessage(prompt, location.pathname);
  };

  return (
    <>
      {/* Floating Global AI Button - Visible when closed */}
      <AnimatePresence>
        {!copilotOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.08, shadow: '0 0 20px rgba(124, 58, 237, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCopilotOpen(true)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-premium border border-border select-none group"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>AI Buddy</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Sidebar Drawer */}
      <AnimatePresence>
        {copilotOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] z-50 glass-panel-heavy border-l border-border flex flex-col justify-between shadow-premium"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex justify-between items-center bg-background/40">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 border border-border text-primary">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">Copilot Workspace</h3>
                  <span className="text-[9px] text-muted font-bold uppercase tracking-widest mt-1 block">Active Agent System</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={clearHistory}
                  className="p-1.5 text-muted hover:text-red-400 hover:bg-white/5 rounded-md transition-colors"
                  title="Clear chat history"
                >
                  <Trash2 size={15} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCopilotOpen(false)}
                  className="p-1.5 text-muted hover:text-primary hover:bg-white/5 rounded-md transition-colors"
                >
                  <X size={15} />
                </motion.button>
              </div>
            </div>

            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 grid-overlay bg-background/20">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              
              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex justify-start mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-border flex items-center justify-center text-primary shadow-glow animate-pulse">
                    <Sparkles size={16} />
                  </div>
                  <div className="max-w-[82%] rounded-xl px-4 py-3 border border-border bg-surface/60 ml-3">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.3s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* AI Action Telemetry Panel */}
            <div className="px-4 py-2 border-y border-border bg-background/30 flex justify-between items-center">
              <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Agent State</span>
              <AgentStatus state={isThinking ? agentState : 'Idle'} />
            </div>

            {/* Footer Workspace (Input and Suggestions) */}
            <div className="p-4 bg-background/40 space-y-3">
              {/* Contextual Suggestions */}
              {currentPrompts && currentPrompts.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[9px] text-muted font-bold uppercase tracking-widest block">Suggested Prompts</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPrompts.map((prompt, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01, border: '1px solid rgba(124, 58, 237, 0.3)' }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handlePromptClick(prompt)}
                        className="text-[10px] text-text bg-surface/50 hover:bg-surface border border-border rounded-md px-2.5 py-1.5 text-left flex items-center justify-between w-full select-none cursor-pointer"
                      >
                        <span className="truncate pr-2">{prompt}</span>
                        <ArrowUpRight size={10} className="text-muted flex-shrink-0" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Text Box and Controls */}
              <div className="flex items-center gap-2 mt-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask AI Buddy anything..."
                    className="w-full glass-input pr-10 py-2 text-xs"
                    disabled={isThinking}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isThinking || !inputText.trim()}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-muted"
                  >
                    <Send size={14} />
                  </button>
                </div>
                
                {/* Voice Input */}
                <VoiceButton isActive={voiceActive} onClick={toggleVoice} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CopilotSidebar;

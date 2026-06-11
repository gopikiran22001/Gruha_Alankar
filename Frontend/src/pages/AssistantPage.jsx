import React, { useState, useEffect, useRef } from 'react';
import { useAssistantStore } from '../store/assistantStore';
import ChatMessage from '../components/shared/ChatMessage';
import VoiceButton from '../components/shared/VoiceButton';
import AgentStatus from '../components/shared/AgentStatus';
import Button from '../components/ui/button';
import { Send, Sparkles, Image, RefreshCw, Paperclip, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const AssistantPage = () => {
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText, '/assistant');
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const promptSuggestions = [
    'Design my compact bedroom layout',
    'Compare luxury velvet sofas with scandinavian oak',
    'Help me fix a lighting warning rating',
    'Switch language options to Hindi'
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col justify-between max-w-4xl mx-auto p-4 md:p-6 select-none relative">
      
      {/* Header telemetry HUD */}
      <div className="flex justify-between items-center border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 border border-border text-primary">
            <Sparkles size={16} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none">Copilot Full Workspace</h3>
            <span className="text-[9px] text-muted font-bold uppercase tracking-widest block mt-0.5">High-Precision Generative Agent</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="glass" size="sm" onClick={clearHistory}>
            Reset Feed
          </Button>
          <AgentStatus state={isThinking ? agentState : 'Idle'} />
        </div>
      </div>

      {/* Main chat window feed */}
      <div className="flex-1 overflow-y-auto my-4 pr-2 space-y-4 grid-overlay">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

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

      {/* Suggestion prompt nodes */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {promptSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(sug, '/assistant')}
              className="glass-card p-4 text-left border border-border hover:border-border hover:bg-surface/50 rounded-xl transition-all duration-300 text-xs text-text flex items-center justify-between select-none cursor-pointer"
            >
              <span>{sug}</span>
              <MessageSquare size={13} className="text-muted" />
            </button>
          ))}
        </div>
      )}

      {/* Bottom controls panel */}
      <div className="bg-background/40 border border-border p-4 rounded-xl space-y-3">
        <div className="flex items-center gap-3">
          
          {/* File/Image Upload mockup triggers */}
          <div className="flex gap-1">
            <button
              onClick={() => alert('Media Attachment Mock Trigger:\nAttach layout blueprints, room JPGs, or JSON parameters.')}
              className="p-2.5 text-muted hover:text-primary rounded-lg border border-border hover:bg-white/5 transition-colors"
              title="Attach blueprint file"
            >
              <Paperclip size={14} />
            </button>
            <button
              onClick={() => alert('Room Snapshot Mock Trigger:\nAttach camera captures or room scan frames.')}
              className="p-2.5 text-muted hover:text-primary rounded-lg border border-border hover:bg-white/5 transition-colors"
              title="Attach room photo"
            >
              <Image size={14} />
            </button>
          </div>

          {/* Text input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Query design recommendations, layout styles, catalog pricing..."
              className="w-full glass-input pr-10 py-2.5 text-xs"
              disabled={isThinking}
            />
            <button
              onClick={handleSend}
              disabled={isThinking || !inputText.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors disabled:opacity-30"
            >
              <Send size={14} />
            </button>
          </div>

          {/* Voice button */}
          <VoiceButton isActive={voiceActive} onClick={toggleVoice} />
        </div>
      </div>
      
    </div>
  );
};

export default AssistantPage;

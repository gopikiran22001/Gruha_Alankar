import React from 'react';
import { Sparkles, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const ChatMessage = ({ message }) => {
  const isAssistant = message.sender === 'assistant';

  // Helper to parse basic markdown (**bold**, *italic*, - bullet points)
  const renderText = (rawText) => {
    if (!rawText) return '';
    
    // Split lines
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      let element = line;

      // Handle bullets
      const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
      if (isBullet) {
        element = line.replace(/^[\s*-]+/, '').trim();
      }

      // Handle Bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(element)) !== null) {
        if (match.index > lastIndex) {
          parts.push(element.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="text-white font-semibold">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < element.length) {
        parts.push(element.substring(lastIndex));
      }

      const parsedLine = parts.length > 0 ? parts : element;

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc pl-1 text-text text-xs mt-1">
            {parsedLine}
          </li>
        );
      }

      return (
        <p key={idx} className="text-text text-xs leading-relaxed mb-1.5">
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 mb-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      {/* Icon for Assistant */}
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-border flex items-center justify-center text-primary shadow-glow">
          <Sparkles size={16} />
        </div>
      )}

      {/* Message Balloon */}
      <div className={`max-w-[82%] rounded-xl px-4 py-3 border text-xs shadow-sm flex flex-col ${
        isAssistant
          ? 'bg-surface/60 border-border rounded-tl-none'
          : 'bg-primary/10 border-primary/30 rounded-tr-none text-right'
      }`}>
        {/* Header/Timestamp */}
        <div className="flex items-center gap-2 mb-1.5 justify-between">
          <span className="font-bold text-[10px] text-muted">
            {isAssistant ? 'Alankara Copilot' : 'You'}
          </span>
          <span className="text-[9px] text-muted">{message.timestamp}</span>
        </div>

        {/* Text Area */}
        <div className="text-left">
          {renderText(message.text)}
        </div>

        {/* Agent State Indicators if stream is ongoing */}
        {isAssistant && message.agentState && message.agentState !== 'Completed' && (
          <div className="mt-2.5 pt-1.5 border-t border-border flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <span className="text-[9px] text-muted uppercase font-bold tracking-wider">
              Agent State: {message.agentState}...
            </span>
          </div>
        )}
      </div>

      {/* Icon for User */}
      {!isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-800 border border-border flex items-center justify-center text-text">
          <User size={16} />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;

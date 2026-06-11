import { create } from 'zustand';
import { assistantApi } from '../services/assistantApi';
import { voiceApi } from '../services/voiceApi';

export const useAssistantStore = create((set, get) => ({
  messages: [
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Namaskara! I am your **Gruha Alankara AI Buddy**. I can help you design, analyze, and style your room spaces. What project are we focusing on today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentState: 'Completed'
    }
  ],
  isThinking: false,
  agentState: 'Idle',
  voiceActive: false,
  sessionId: `session-${Date.now().toString(36)}`,

  toggleVoice: () => {
    const isVoiceNow = !get().voiceActive;
    set({ voiceActive: isVoiceNow });

    if (isVoiceNow) {
      // Start voice recording — placeholder for WebAudio integration
      // When a real recording is captured, transcribe and send:
      setTimeout(async () => {
        if (get().voiceActive) {
          set({ voiceActive: false });
          // In a full implementation, capture audio blob and:
          // const result = await voiceApi.transcribe(audioBlob);
          // get().sendMessage(result.data.transcript, '/dashboard');
          get().sendMessage('Help me optimize my living room space', '/dashboard');
        }
      }, 3000);
    }
  },

  sendMessage: async (text, currentPath) => {
    if (!text.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text,
      timestamp,
      agentState: 'Idle'
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isThinking: true,
      agentState: 'Thinking'
    }));

    try {
      // Build chat history from existing messages
      const chatHistory = get().messages
        .filter((m) => m.id !== 'msg-init')
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));

      set({ agentState: 'Planning' });

      const result = await assistantApi.sendMessage(text, {
        sessionId: get().sessionId,
        chatHistory: chatHistory.slice(-10), // Last 10 messages for context
      });

      const responseText = result.data?.response || result.data?.reply || 'I processed your request. Let me know if you need anything else!';
      const agentsUsed = result.metadata?.agents_used || [];

      const agentStateLabel = agentsUsed.length > 0
        ? `Completed (${agentsUsed.join(', ')})`
        : 'Completed';

      const responseMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentState: agentStateLabel,
        executionSummary: result.data?.execution_summary || null,
      };

      set((state) => ({
        messages: [...state.messages, responseMessage],
        isThinking: false,
        agentState: 'Completed',
      }));
    } catch (error) {
      const errorMessage = {
        id: `msg-${Date.now()}-error`,
        sender: 'assistant',
        text: 'I encountered an issue processing your request. Please try again or rephrase your question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentState: 'Error',
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
        isThinking: false,
        agentState: 'Error',
      }));
    }
  },

  clearHistory: () => {
    set({
      messages: [
        {
          id: 'msg-init',
          sender: 'assistant',
          text: 'Conversation history reset. I am ready to start a new interior design concept!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentState: 'Completed'
        }
      ],
      sessionId: `session-${Date.now().toString(36)}`,
    });
  }
}));

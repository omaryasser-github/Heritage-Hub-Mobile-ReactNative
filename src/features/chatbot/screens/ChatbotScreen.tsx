import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

import { AvatarHeader } from '../components/AvatarHeader';
import { ChatBubble } from '../components/ChatBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { SuggestionPill } from '../components/SuggestionPill';
import { useChatbotStore } from '../store/useChatbotStore';
import { sendChatMessage, ChatMessage } from '../api/chatService';

export const ChatbotScreen = () => {
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([
    "Learn about ancient history",
    "Who built the Sphinx?",
    "What are the Pyramids?"
  ]);

  const messages = useChatbotStore((state) => state.messages);
  const addMessage = useChatbotStore((state) => state.addMessage);
  const clearMessages = useChatbotStore((state) => state.clearMessages);

  const flashListRef = useRef<any>(null);

  const [isPending, setIsPending] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messages.length > 0 && flashListRef.current) {
      setTimeout(() => {
        flashListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isPending]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setInputText('');
    Keyboard.dismiss();

    // Hide suggestions when typing starts
    setSuggestions([]);

    addMessage({
      id: Date.now().toString() + '-user',
      role: 'user',
      text: trimmed,
      timestamp: Date.now(),
    });

    setIsPending(true);
    try {
      const data = await sendChatMessage({
        agentId: "explorer",
        message: trimmed,
        history: messages,
      });

      addMessage({
        id: Date.now().toString() + '-bot',
        role: 'bot',
        text: data.reply,
        timestamp: Date.now(),
      });
      setSuggestions(data.suggestions);
    } catch (error) {
      addMessage({
        id: Date.now().toString() + '-error',
        role: 'bot',
        text: "**Error:** Failed to connect to AI. Please try again.",
        timestamp: Date.now(),
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleReset = () => {
    clearMessages();
    setSuggestions([
      "Learn about ancient history",
      "Who built the Sphinx?",
      "What are the Pyramids?"
    ]);
  };

  return (
    <ImageBackground
      source={require('../../../../assets/Chatbot/chatbotBackground.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={{ paddingTop: insets.top }}>
        <AvatarHeader onReset={handleReset} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.chatArea}>
          <FlashList
            ref={flashListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            // estimatedItemSize={80}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={() => (
              <View>
                {isPending && <TypingIndicator />}
                {messages.length === 0 && suggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    {suggestions.map((s, i) => (
                      <SuggestionPill key={i} title={s} onPress={handleSend} />
                    ))}
                  </View>
                )}
              </View>
            )}
          />
        </View>

        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          <TextInput
            style={styles.input}
            placeholder="Ask about Egyptian history..."
            placeholderTextColor="#8E8E93"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSend(inputText)}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && { opacity: 0.7 }]}
            onPress={() => handleSend(inputText)}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: 'transparent',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: -3 },
    // shadowRadius: 10,
    // elevation: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#333333',
  },
  sendButton: {
    width: 50,
    height: 50,
    backgroundColor: '#CCB27B',
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
});

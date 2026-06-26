import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';
import { AvatarHeader } from '../components/AvatarHeader';
import { ChatBubble } from '../components/ChatBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { SuggestionPill } from '../components/SuggestionPill';
import { useChatbotStore } from '../store/useChatbotStore';
import { sendChatMessage } from '../api/chatService';

export const ChatbotScreen = () => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { sWidth, sHeight, sFont } = useResponsive();
  const { t } = useTranslation();

  const defaultSuggestions = useMemo(
    () => [t('chatbot.suggestion1'), t('chatbot.suggestion2'), t('chatbot.suggestion3')],
    [t]
  );

  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);

  const messages = useChatbotStore((state) => state.messages);
  const addMessage = useChatbotStore((state) => state.addMessage);
  const clearMessages = useChatbotStore((state) => state.clearMessages);
  const consumePendingHotspotContext = useChatbotStore((state) => state.consumePendingHotspotContext);
  const activeHotspotContext = useChatbotStore((state) => state.activeHotspotContext);

  const hotspotSuggestions = useMemo(
    () => [
      t('chatbot.hotspotFollowUp1'),
      t('chatbot.hotspotFollowUp2'),
      t('chatbot.hotspotFollowUp3'),
    ],
    [t]
  );

  const flashListRef = useRef<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [inputHeight, setInputHeight] = useState(sHeight(50));

  useFocusEffect(
    useCallback(() => {
      const context = consumePendingHotspotContext();
      if (!context) return;

      const opener = t('chatbot.hotspotOpener', {
        hotspot: context.hotspotTitle,
        monument: context.monumentName,
      });
      const detail = t('chatbot.hotspotDetail', { summary: context.summary });
      const now = Date.now();

      addMessage({
        id: `${now}-hotspot-bot`,
        role: 'bot',
        text: `${opener}\n\n${detail}`,
        timestamp: now,
      });
      setSuggestions(hotspotSuggestions);
    }, [addMessage, consumePendingHotspotContext, hotspotSuggestions, t])
  );

  useEffect(() => {
    setSuggestions(defaultSuggestions);
  }, [defaultSuggestions]);

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
        agentId: 'explorer',
        message: trimmed,
        history: messages,
        hotspotContext: activeHotspotContext,
      });

      addMessage({
        id: Date.now().toString() + '-bot',
        role: 'bot',
        text: t(data.replyKey, data.replyParams),
        timestamp: Date.now(),
      });
      setSuggestions(data.suggestionKeys.map((key) => t(key)));
    } catch {
      addMessage({
        id: Date.now().toString() + '-error',
        role: 'bot',
        text: t('chatbot.connectionError'),
        timestamp: Date.now(),
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleReset = useCallback(() => {
    clearMessages();
    setSuggestions(defaultSuggestions);
  }, [clearMessages, defaultSuggestions]);

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? tabBarHeight : 0}
      >
        <View style={styles.chatArea}>
          <FlashList
            ref={flashListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={[
              styles.listContent,
              { paddingHorizontal: sWidth(20), paddingTop: sHeight(20), paddingBottom: sHeight(20) },
            ]}
            ListFooterComponent={() => (
              <View>
                {isPending && <TypingIndicator />}
                {suggestions.length > 0 && !isPending && (
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

        <View
          style={[
            styles.inputContainer,
            { paddingHorizontal: sWidth(20), paddingTop: sHeight(10), paddingBottom: sHeight(10) },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                height: Math.min(sHeight(120), Math.max(sHeight(50), inputHeight)),
                borderRadius: sWidth(25),
                paddingHorizontal: sWidth(20),
                paddingVertical: Platform.OS === 'ios' ? sHeight(10) : sHeight(12),
                fontSize: sFont(15),
              },
            ]}
            placeholder={t('chatbot.sendPlaceholder')}
            placeholderTextColor={Colors.textSubtle}
            value={inputText}
            onChangeText={setInputText}
            onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
            onSubmitEditing={() => handleSend(inputText)}
            returnKeyType="send"
            multiline
            textAlignVertical="center"
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && { opacity: 0.7 },
              {
                width: sWidth(50),
                height: sWidth(50),
                borderRadius: sWidth(22.5),
                marginStart: sWidth(5),
              },
            ]}
            onPress={() => handleSend(inputText)}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={sWidth(20)} color={Colors.textOnDark} />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.chatInputBackground,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 15,
    color: Colors.textSecondary,
  },
  sendButton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primarySend,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
});

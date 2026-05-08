import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../api/chatService';

interface ChatBubbleProps {
  message: ChatMessage;
}

// A simple custom Markdown parser since we shouldn't assume third-party libs are installed.
// It handles basic **bold** and *italic* and simple \n list bullets.
const renderMarkdown = (text: string) => {
  const parts = text.split('\n').map((line, index) => {
    const isBullet = line.trim().startsWith('*');
    const content = isBullet ? line.replace('*', '').trim() : line;
    
    // Simplistic bold matcher `**bold**`
    const boldParts = content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <Text key={i} style={styles.bold}>{part.slice(2, -2)}</Text>;
      }
      return <Text key={i}>{part}</Text>;
    });

    return (
      <View key={index} style={isBullet ? styles.bulletRow : null}>
        {isBullet && <Text style={styles.bulletPoint}>• </Text>}
        <Text style={[styles.messageText, isBullet && styles.bulletText]}>{boldParts}</Text>
      </View>
    );
  });

  return parts;
};

export const ChatBubble = React.memo(({ message }: ChatBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.botContainer]}>
      {isUser ? (
        <Text style={[styles.messageText, styles.userText]}>{message.text}</Text>
      ) : (
        <View style={styles.botTextContainer}>
          {renderMarkdown(message.text)}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 20,
    marginVertical: 4,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#8B6914',
    borderBottomRightRadius: 4,
  },
  botContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FDF6EC',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A3728',
  },
  userText: {
    color: '#FFFFFF',
  },
  botTextContainer: {
    flexDirection: 'column',
  },
  bold: {
    fontWeight: 'bold',
  },
  bulletRow: {
    flexDirection: 'row',
    paddingLeft: 8,
    marginTop: 4,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A3728',
    fontWeight: 'bold',
    marginRight: 4,
  },
  bulletText: {
    flex: 1,
  }
});

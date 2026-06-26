import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../api/chatService';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';


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
  const { sWidth, sHeight, sFont } = useResponsive();
  const isUser = message.role === 'user';


  return (
    <View style={[
      styles.container, 
      isUser ? styles.userContainer : styles.botContainer,
      { 
        maxWidth: '80%', 
        padding: sWidth(14), 
        borderRadius: sWidth(20), 
        marginVertical: sHeight(4) 
      }
    ]}>
      {isUser ? (
        <Text style={[styles.messageText, styles.userText, { fontSize: sFont(15), lineHeight: sFont(22) }]}>{message.text}</Text>
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
    backgroundColor: Colors.chatUserBubble,
    borderBottomRightRadius: 4,
  },
  botContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.chatBotBubble,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.chatBotText,
  },
  userText: {
    color: Colors.chatUserText,
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
    color: Colors.chatBotText,
    fontWeight: 'bold',
    marginRight: 4,
  },
  bulletText: {
    flex: 1,
  }
});

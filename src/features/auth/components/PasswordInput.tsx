import React, { useState } from 'react';
import { AuthInput } from './AuthInput';
import { Ionicons } from '@expo/vector-icons';

interface PasswordInputProps extends React.ComponentProps<typeof AuthInput> {}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AuthInput
      {...props}
      secureTextEntry={!isVisible}
      rightIcon={
        <Ionicons
          name={isVisible ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="rgba(255, 255, 255, 0.6)"
        />
      }
      onRightIconPress={() => setIsVisible(!isVisible)}
    />
  );
};

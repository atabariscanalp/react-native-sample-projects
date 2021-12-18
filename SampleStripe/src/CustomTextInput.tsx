import React, {useState} from 'react';
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

type Props = {
  width: number;
  title: string;
  value: string;
  placeholder: string;
  setText: any;
  keyboardType?: KeyboardTypeOptions;
  flip?: any;
  maxLength?: number;
  mask?: string;
};

export const CustomTextInput: React.FC<Props> = ({
  width,
  title,
  value,
  placeholder,
  setText,
  keyboardType = 'numeric',
  flip,
  maxLength,
  mask,
}) => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
    if (typeof flip !== 'undefined') {
      flip();
    }
  };
  const onBlur = () => {
    setFocused(false);
    if (typeof flip !== 'undefined') {
      flip();
    }
  };

  const onChange = (formatted: string, raw?: string) => {
    setText[0](formatted.toUpperCase());
    if (raw) {
      setText[1](raw.toUpperCase());
    }
  };

  const containerStyle: ViewStyle = {
    width,
    height: 40,
    marginBottom: 40,
  };

  const titleStyle: TextStyle = {
    color: focused ? 'blue' : '#777',
    fontSize: 12,
  };

  const cardInputStyle: TextStyle = {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: focused ? 'blue' : '#777',
  };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <TextInputMask
        maxLength={maxLength ?? 30}
        multiline={false}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        style={cardInputStyle}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        mask={mask ?? ''}
      />
    </View>
  );
};

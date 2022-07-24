import {Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useTheme} from '../../../theme/colors';

type Props = {
  title: string;
  onPress?(): void;
  variant?: 'sideBtn' | 'filterBtn';
  style?: any;
  textColor?: any;
  bdColor?: string;
};

const ThemeButton = ({
  title,
  bdColor,
  onPress,
  style,
  textColor,
  variant = 'sideBtn',
}: Props) => {
  const colors = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        {
          borderColor: bdColor ?? colors.text,
        },
        styles[variant],
        style,
      ]}>
      <Text style={{color: textColor ?? colors.text}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;

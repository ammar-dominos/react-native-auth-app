import React from 'react';
import { 
  MaterialIcons, 
  MaterialCommunityIcons, 
  Feather, 
  Ionicons,
  FontAwesome5 
} from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../../styles/theme';

export type IconName = 
  // Authentication & Security
  | 'lock'
  | 'eye'
  | 'eye-off'
  | 'shield'
  
  // User & Profile
  | 'user'
  | 'person'
  | 'account'
  
  // Communication
  | 'email'
  | 'mail'
  
  // Navigation & Actions
  | 'home'
  | 'dashboard'
  | 'logout'
  | 'sign-out'
  
  // General
  | 'check'
  | 'checkmark'
  | 'close'
  | 'menu';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const iconMap: Record<IconName, { library: string; iconName: string }> = {
  // Authentication & Security
  'lock': { library: 'MaterialIcons', iconName: 'lock' },
  'eye': { library: 'Feather', iconName: 'eye' },
  'eye-off': { library: 'Feather', iconName: 'eye-off' },
  'shield': { library: 'MaterialIcons', iconName: 'security' },
  
  // User & Profile
  'user': { library: 'Feather', iconName: 'user' },
  'person': { library: 'MaterialIcons', iconName: 'person' },
  'account': { library: 'MaterialCommunityIcons', iconName: 'account' },
  
  // Communication
  'email': { library: 'MaterialIcons', iconName: 'email' },
  'mail': { library: 'Feather', iconName: 'mail' },
  
  // Navigation & Actions
  'home': { library: 'Feather', iconName: 'home' },
  'dashboard': { library: 'MaterialIcons', iconName: 'dashboard' },
  'logout': { library: 'MaterialIcons', iconName: 'logout' },
  'sign-out': { library: 'Feather', iconName: 'log-out' },
  
  // General
  'check': { library: 'Feather', iconName: 'check' },
  'checkmark': { library: 'Ionicons', iconName: 'checkmark' },
  'close': { library: 'Feather', iconName: 'x' },
  'menu': { library: 'Feather', iconName: 'menu' },
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = colors.text.primary, 
  style 
}) => {
  const iconConfig = iconMap[name];
  
  if (!iconConfig) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  const { library, iconName } = iconConfig;

  const iconProps = {
    name: iconName as any,
    size,
    color,
    style,
  };

  switch (library) {
    case 'MaterialIcons':
      return <MaterialIcons {...iconProps} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...iconProps} />;
    case 'Feather':
      return <Feather {...iconProps} />;
    case 'Ionicons':
      return <Ionicons {...iconProps} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...iconProps} />;
    default:
      console.warn(`Icon library "${library}" not supported`);
      return null;
  }
};

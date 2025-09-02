// Mock AsyncStorage
const mockAsyncStorage = {
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock @expo/vector-icons with simple components
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  
  const createMockIcon = (iconSetName) => {
    return React.forwardRef((props, ref) => {
      const { name, size = 24, color = '#000', style, testID, ...otherProps } = props;
      return React.createElement(Text, {
        ref,
        style: [{ fontSize: size, color }, style],
        testID: testID || `${iconSetName}-${name}`,
        accessibilityLabel: `${iconSetName} ${name} icon`,
        ...otherProps
      }, `[${name}]`);
    });
  };
  
  return {
    MaterialIcons: createMockIcon('MaterialIcons'),
    Feather: createMockIcon('Feather'),
    MaterialCommunityIcons: createMockIcon('MaterialCommunityIcons'),
    Ionicons: createMockIcon('Ionicons'),
    FontAwesome5: createMockIcon('FontAwesome5'),
  };
});

// Mock the Icon component directly
jest.mock('./src/components/ui/Icon', () => {
  const React = require('react');
  const { Text } = require('react-native');
  
  return {
    Icon: React.forwardRef((props, ref) => {
      const { name, size = 24, color = '#000', style, ...otherProps } = props;
      return React.createElement(Text, {
        ref,
        style: [{ fontSize: size, color }, style],
        testID: `icon-${name}`,
        accessibilityLabel: `${name} icon`,
        ...otherProps
      }, `[${name}]`);
    }),
  };
});

// Mock the UI components index to ensure Icon is properly exported
jest.mock('./src/components/ui', () => {
  const React = require('react');
  const { Text, TextInput, TouchableOpacity, View, ActivityIndicator } = require('react-native');
  
  const Icon = React.forwardRef((props, ref) => {
    const { name, size = 24, color = '#000', style, ...otherProps } = props;
    return React.createElement(Text, {
      ref,
      style: [{ fontSize: size, color }, style],
      testID: `icon-${name}`,
      accessibilityLabel: `${name} icon`,
      ...otherProps
    }, `[${name}]`);
  });

  return {
    Icon,
    Input: (props) => React.createElement(TextInput, props),
    Button: (props) => React.createElement(TouchableOpacity, props),
    MessageCard: (props) => React.createElement(View, props),
    LoadingSpinner: (props) => React.createElement(ActivityIndicator, props),
    PasswordInput: (props) => React.createElement(TextInput, props),
    SimpleLoginTest: (props) => React.createElement(View, props),
  };
});

// Set up global test environment
global.__DEV__ = true;

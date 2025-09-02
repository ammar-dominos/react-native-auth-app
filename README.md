# React Native Auth App

A modern React Native authentication application built with Expo and TypeScript.

## 🚀 Quick Start

Follow these steps to run the project after cloning:

### 1. Prerequisites

Make sure you have these installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Yarn** - [Install guide](https://yarnpkg.com/getting-started/install)
- **Expo CLI** - Install globally:
  ```bash
  npm install -g @expo/cli
  ```

### 2. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/ammar-dominos/react-native-auth-app.git

# Navigate to project directory
cd auth-app

# Install dependencies
yarn install

# Fix any dependency compatibility issues
npx expo install --fix
```

### 3. Run the Project

Start the development server:

```bash
# Start Expo development server
yarn start
# or
npx expo start
```

This will open Metro bundler and display a QR code with options.

### 4. Choose Your Platform

#### 📱 Mobile Device (Easiest)
1. Install **Expo Go** app:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code from your terminal
3. App will load on your device

#### 💻 Web Browser
```bash
# Press 'w' in terminal, or run:
yarn web
# or
npx expo start --web
```

#### 📱 iOS Simulator (macOS only)
```bash
# Press 'i' in terminal, or run:
yarn ios
# or
npx expo start --ios
```

#### 🤖 Android Emulator
```bash
# Press 'a' in terminal, or run:
yarn android
# or
npx expo start --android
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `yarn start` | Start Expo development server |
| `yarn ios` | Open in iOS simulator |
| `yarn android` | Open in Android emulator |
| `yarn web` | Open in web browser |
| `yarn test` | Run test suite |
| `yarn test:watch` | Run tests in watch mode |

## 🔧 Troubleshooting

### Common Issues

**Metro cache issues:**
```bash
npx expo start --clear
```

**Dependency conflicts:**
```bash
yarn install --force
npx expo install --fix
```

**Can't start Metro:**
```bash
# Kill any running Metro processes
pkill -f metro
# Then try starting again
yarn start
```

### Platform-Specific Setup

#### iOS Development (macOS only)
- Install Xcode from Mac App Store
- Accept Xcode license: `sudo xcodebuild -license accept`

#### Android Development
- Install Android Studio
- Set up Android SDK and create an emulator
- Set ANDROID_HOME environment variable

## 📚 Project Features

- ✅ Complete authentication flow (Login/Signup)
- ✅ TypeScript for type safety
- ✅ Modern UI components
- ✅ Form validation
- ✅ Persistent user sessions
- ✅ Vector icons
- ✅ Comprehensive testing
- ✅ Cross-platform (iOS, Android, Web)

## 📁 Project Structure

```
src/
├── components/ui/     # Reusable UI components
├── contexts/          # React contexts
├── hooks/            # Custom hooks
├── screens/          # App screens
├── services/         # Business logic
├── utils/            # Helper functions
└── types/            # TypeScript types
```

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Clear Metro cache: `npx expo start --clear`
3. Reinstall dependencies: `rm -rf node_modules && yarn install`
4. Check [Expo Documentation](https://docs.expo.dev/)

---

**Happy coding! 🎉**

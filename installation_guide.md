# SOLAI Paper Trading App - Installation Guide

## Overview

This document provides instructions for installing and running the SOLAI Paper Trading App on your local development environment.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your iOS or Android device

## Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/solai-paper-trading.git
cd solai-paper-trading
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure Supabase**

Create a `.env` file in the project root with your Supabase credentials:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Alternatively, update the credentials directly in `src/lib/supabase.ts`.

4. **Start the development server**

```bash
npm start
# or
yarn start
```

5. **Run on a device**

- Scan the QR code with your device's camera (iOS) or the Expo Go app (Android)
- Or press 'a' to run on an Android emulator
- Or press 'i' to run on an iOS simulator

## Project Structure

```
solai/
├── app/                    # Expo Router app directory
│   ├── (tabs)/             # Tab-based navigation
│   ├── auth/               # Authentication screens
│   └── _layout.tsx         # Root layout
├── src/                    # Source code
│   ├── api/                # API integration
│   ├── components/         # Reusable UI components
│   │   └── charts/         # Chart components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Library code (Supabase)
│   ├── services/           # Business logic services
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── assets/                 # Static assets
├── __tests__/              # Test files
├── documentation/          # Documentation files
├── App.tsx                 # Main application component
├── app.json                # Expo configuration
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm test` - Run tests

## Troubleshooting

- **Module not found errors**: Try running `npm install` again
- **Expo connection issues**: Make sure your device is on the same network as your computer
- **Build errors**: Check that you have the latest version of Node.js and Expo CLI

## Next Steps

After installation, you can:

1. Create an account or sign in
2. Explore the dashboard with trending tokens
3. Try paper trading with virtual currency
4. View your portfolio performance
5. Learn about cryptocurrency trading through the educational content

## Support

For additional help, refer to:
- Expo documentation: https://docs.expo.dev/
- React Native documentation: https://reactnative.dev/docs/getting-started
- Project documentation in the `/documentation` directory

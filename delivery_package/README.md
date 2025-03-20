# SOLAI Paper Trading App - README

## Overview

SOLAI Paper Trading is a comprehensive mobile application for practicing cryptocurrency trading with zero risk. The app focuses on the Solana ecosystem and provides a realistic trading experience with AI-powered insights and feedback.

## Features

- **Authentication System**: Secure user authentication with Supabase
- **Modern Trading Interface**: Clean, responsive UI similar to TradingView/Dexscreener
- **Advanced Charting**: Candlestick, line, and volume charts with multiple timeframes
- **Paper Trading**: Simulate trades with realistic fees and slippage
- **Portfolio Tracking**: Monitor your paper trading performance
- **Market Overview**: View trending tokens and market statistics
- **AI-Powered Insights**: Get feedback on your trading decisions
- **Cross-Platform**: Works on both iOS and Android devices

## Technology Stack

- **Frontend**: React Native with TypeScript
- **UI Framework**: React Native Paper
- **Navigation**: Expo Router
- **State Management**: Context API
- **Charts**: Custom chart components
- **Authentication**: Supabase
- **Development Platform**: Expo

## Getting Started

See the [Installation Guide](./installation_guide.md) for setup instructions.

## Deployment

See the [Deployment Guide](./deployment_guide.md) for deployment instructions.

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TradingView and Dexscreener for UI inspiration
- Expo team for the excellent development platform
- Supabase for authentication and backend services

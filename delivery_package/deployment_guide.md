# SOLAI Paper Trading App - Deployment Guide

## Overview

This document provides instructions for deploying the SOLAI Paper Trading App using Expo. The app is built with React Native and Expo, and can be deployed to iOS and Android devices.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo account (create one at https://expo.dev/signup)
- For iOS builds: Apple Developer account
- For Android builds: Google Play Developer account

## Configuration Files

The app includes two main configuration files for deployment:

1. **app.json**: Contains app metadata, icons, splash screens, and platform-specific settings
2. **eas.json**: Contains build profiles for Expo Application Services (EAS)

## Deployment Options

### Option 1: Expo Go (Development/Testing)

The simplest way to test the app is using Expo Go:

1. Install Expo Go on your iOS or Android device
2. Run `npm start` in the project directory
3. Scan the QR code with your device

### Option 2: Development Builds

For testing native features:

1. Run `eas build --profile development --platform ios` or `eas build --profile development --platform android`
2. Install the resulting build on your device

### Option 3: Preview Builds

For internal testing:

1. Run `eas build --profile preview --platform ios` or `eas build --profile preview --platform android`
2. Share the resulting build with testers

### Option 4: Production Builds

For App Store/Play Store submission:

1. Update app.json with your app's information
2. Update eas.json with your Apple/Google credentials
3. Run `eas build --profile production --platform ios` or `eas build --profile production --platform android`
4. Submit the resulting build to the App Store/Play Store

## Supabase Configuration

Before deploying to production:

1. Create a production Supabase project
2. Update the Supabase URL and anon key in `src/lib/supabase.ts`
3. Configure authentication providers in the Supabase dashboard
4. Set up database tables and security rules

## Environment Variables

For production deployments, you should use environment variables:

1. Create a `.env` file with your environment variables
2. Use `expo-constants` to access them in your app

Example `.env` file:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## Troubleshooting

- **Build failures**: Check the EAS build logs for detailed error messages
- **Authentication issues**: Verify Supabase configuration and credentials
- **API integration problems**: Check network connectivity and API endpoints

## Support

For additional help, refer to:
- Expo documentation: https://docs.expo.dev/
- Supabase documentation: https://supabase.com/docs
- React Native documentation: https://reactnative.dev/docs/getting-started

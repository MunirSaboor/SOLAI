# Developer Guide

## Development Environment Setup

To set up the development environment for this iOS application:

1. **Prerequisites**:
   - Node.js (v14 or higher)
   - npm (v6 or higher)
   - Expo CLI (`npm install -g expo-cli`)

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd my-ios-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

## Project Structure

The project follows the Expo Router file-based routing structure:

```
my-ios-app/
├── app/                    # Main application screens
│   ├── (tabs)/             # Tab-based navigation
│   │   ├── _layout.tsx     # Tab navigation configuration
│   │   ├── index.tsx       # Home screen
│   │   ├── explore.tsx     # Explore screen
│   │   └── settings.tsx    # Settings screen
│   ├── test-components.tsx # Component testing
│   ├── test-features.tsx   # Feature testing
│   └── test-responsiveness.tsx # Responsiveness testing
├── assets/                 # Images, fonts, etc.
├── components/             # Reusable components
│   ├── ui/                 # Basic UI components
│   │   ├── Button.tsx      # Button component
│   │   ├── FormInput.tsx   # Form input component
│   │   └── Tabs.tsx        # Tabs component
│   ├── UserProfile.tsx     # User profile component
│   ├── ContentLibrary.tsx  # Content library component
│   ├── Notifications.tsx   # Notifications component
│   ├── ThemedText.tsx      # Themed text component
│   └── ThemedView.tsx      # Themed view component
├── constants/              # Application constants
│   ├── Colors.ts           # Base colors
│   ├── EnhancedColors.ts   # iOS-style colors
│   └── Typography.ts       # Text styles
└── hooks/                  # Custom React hooks
```

## Design System

### Colors

The application uses a comprehensive color system defined in `constants/EnhancedColors.ts`:

- Light and dark mode variants
- iOS-standard semantic colors (primary, secondary, success, etc.)
- Background, text, and border colors

To use the enhanced colors:

```typescript
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

function MyComponent() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  
  // Now use colors.primary, colors.background, etc.
}
```

### Typography

Text styles are defined in `constants/Typography.ts` following iOS guidelines:

- Large titles, titles, body text, footnotes, etc.
- Proper font weights and letter spacing

To use typography styles:

```typescript
import { useColorScheme } from '@/hooks/useColorScheme';
import { Typography } from '@/constants/Typography';

function MyComponent() {
  const colorScheme = useColorScheme();
  const typography = Typography[colorScheme ?? 'light'];
  
  // Now use typography.largeTitle, typography.body, etc.
}
```

### Components

#### ThemedText

```typescript
import { ThemedText } from '@/components/ThemedText';

<ThemedText type="title1">Heading</ThemedText>
<ThemedText type="body">Regular text</ThemedText>
<ThemedText type="footnote">Small text</ThemedText>
```

#### ThemedView

```typescript
import { ThemedView } from '@/components/ThemedView';

<ThemedView variant="default">Basic view</ThemedView>
<ThemedView variant="card">Card with shadow</ThemedView>
<ThemedView variant="grouped">Grouped content</ThemedView>
```

#### Button

```typescript
import { Button } from '@/components/ui/Button';

<Button variant="primary" onPress={handlePress}>Primary</Button>
<Button variant="outline" size="small" onPress={handlePress}>Small Outline</Button>
```

#### FormInput

```typescript
import { FormInput } from '@/components/ui/FormInput';

<FormInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  helper="Enter your email address"
/>
```

## Testing

The application includes dedicated test screens:

- `/app/test-components.tsx`: Test UI components
- `/app/test-features.tsx`: Test feature components
- `/app/test-responsiveness.tsx`: Test responsiveness and dark mode

## Building for Production

### Using Expo EAS Build

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build for iOS:
   ```bash
   eas build --platform ios
   ```

### Local Development Testing

For testing on iOS devices without building:

1. Install Expo Go app on your iOS device
2. Run `npm start` to start the development server
3. Scan the QR code with your iOS device camera

## Best Practices

1. **Component Structure**:
   - Keep components small and focused
   - Use composition for complex UIs
   - Follow the single responsibility principle

2. **State Management**:
   - Use React hooks for local state
   - Consider Context API for shared state
   - Keep state as close as possible to where it's used

3. **Performance**:
   - Memoize expensive calculations
   - Use `React.memo` for pure components
   - Avoid unnecessary re-renders

4. **Styling**:
   - Follow the design system
   - Use the themed components
   - Keep styles organized and consistent

5. **Testing**:
   - Test all components visually
   - Verify functionality works as expected
   - Test both light and dark modes

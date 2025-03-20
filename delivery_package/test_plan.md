# iOS Application Testing Plan

## Component Testing

### UI Components
- [ ] Test ThemedText component with different text types
- [ ] Test ThemedView component with different variants
- [ ] Test Button component with different variants and sizes
- [ ] Test FormInput component with validation

### Feature Components
- [ ] Test UserProfile component form validation
- [ ] Test ContentLibrary filtering and favorites functionality
- [ ] Test Notifications toggle settings

## Screen Testing

### Home Screen
- [ ] Verify layout and styling
- [ ] Test navigation to other screens

### Explore Screen
- [ ] Verify collapsible sections work correctly
- [ ] Test external links

### Settings Screen
- [ ] Test tab navigation between Profile, Content, and Notifications
- [ ] Verify form inputs and validation

## Cross-cutting Concerns
- [ ] Test dark mode / light mode switching
- [ ] Test responsive layout on different screen sizes
- [ ] Verify consistent styling across all screens
- [ ] Check for any console errors or warnings

## Manual Testing Notes
Since we're developing on Linux without direct iOS simulator access, we'll:
1. Use Expo's web preview for basic functionality testing
2. Document any iOS-specific features that would need additional testing on a real device

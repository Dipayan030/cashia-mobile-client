// app/index.tsx
import { Redirect } from 'expo-router';

export default function RootIndex() {
  // Failsafe catch: forwards absolute root root path hits to the auth layout check
  return <Redirect href="/(auth)/login" />;
}
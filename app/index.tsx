import { Redirect } from 'expo-router';

export default function AppLayout() {
  return <Redirect href="/artisan/profile/inventory" />;
  // return <Redirect href="/auth/onboarding" />;
}

import { Redirect } from 'expo-router';

export default function AppLayout() {

  return <Redirect href="/auth/onboarding" />;
  // return <Redirect href="/(tabs)/" />;

}

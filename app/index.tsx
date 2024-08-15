import { Redirect } from 'expo-router';

export default function AppLayout() {
  return <Redirect href="/auth/registerArtisan" />;
  // return <Redirect href="/artisan/workshop/all" />
}

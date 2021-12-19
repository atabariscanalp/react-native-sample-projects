import {Alert} from 'react-native';

export const API_URL = 'http://localhost:3000';

export async function fetchPublishableKey() {
  try {
    const res = await fetch(`${API_URL}/pkey`);
    const publishableKey = (await res.json()) as {publishableKey: string};
    return publishableKey.publishableKey;
  } catch (err: any) {
    console.error(err);
    Alert.alert(
      'ERROR',
      'Unable to fetch publishable key. Maybe you forgot to start the API?',
    );
  }
}

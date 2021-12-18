import {Alert} from 'react-native';

export async function fetchPublishableKey() {
  try {
    const res = await fetch('http://localhost:3000/pkey');
    const publishableKey = (await res.json()) as {publishableKey: string};
    return publishableKey.publishableKey;
  } catch (err: any) {
    console.error(err);
    Alert.alert('ERROR', 'unable to fetch publishable key.');
  }
}

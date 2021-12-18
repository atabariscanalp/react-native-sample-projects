import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StripeProvider} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {fetchPublishableKey} from './helpers';
import {HomeScreen} from './src/screens/HomeScreen';
import {OnboardingScreen} from './src/screens/OnboardingScreen';

const StackNav = createNativeStackNavigator();

const App = () => {
  const [publishableKey, setPublishableKey] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const pKey = await fetchPublishableKey();
      if (pKey) {
        setPublishableKey(pKey);
      }
    };

    init();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant_identifier">
      <NavigationContainer>
        <StackNav.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <StackNav.Screen name="Onboarding" component={OnboardingScreen} />
          <StackNav.Screen name="Home" component={HomeScreen} />
        </StackNav.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;

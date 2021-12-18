import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import image from '../../assets/onboarding.png';

const {width, height} = Dimensions.get('screen');

export const OnboardingScreen = ({navigation}: {navigation: any}) => {
  const onPress = () => {
    navigation.navigate('Home');
  };

  const WelcomeCard = () => (
    <View style={styles.welcomeCard}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>
        This is a sample Stripe Payment app. You can make a test payment with a
        test card.
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.startText}>Let's Start &nbsp; 🚀</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image} resizeMode="center">
        <WelcomeCard />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
  },
  image: {
    width: width,
    height: height,
  },
  welcomeCard: {
    backgroundColor: 'white',
    width: (width * 90) / 100,
    height: 200,
    borderRadius: 18,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: -5,
  },
  description: {
    color: '#777',
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    width: '75%',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E90FF',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    elevation: 3,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  startText: {
    color: 'white',
    fontWeight: '600',
  },
});

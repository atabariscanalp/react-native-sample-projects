import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import worldMap from '../../assets/worldmap.png';

type Props = {
  cardNumber: string;
  expiryDate: string;
  fullName: string;
};

const CardFront: React.FC<Props> = ({cardNumber, expiryDate, fullName}) => (
  <View style={styles.creditCard}>
    <Image source={worldMap} style={styles.image} resizeMode="cover" />
    <View style={styles.imageContainer}>
      <Text style={styles.cardNumberText}>{cardNumber}</Text>
      <Text style={styles.expiryDateText}>{expiryDate}</Text>
      <Text style={styles.fullNameText}>{fullName}</Text>
    </View>
  </View>
);

export const MemoizedCardFront = React.memo(CardFront);

const styles = StyleSheet.create({
  creditCard: {
    width: 300,
    height: 150,
    backgroundColor: 'black',
    position: 'absolute',
    top: 100,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    elevation: 3,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  image: {
    width: 300,
    height: 150,
    opacity: 0.6,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 40,
    position: 'absolute',
    top: 0,
    zIndex: 29,
  },
  cardNumberText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: 50,
    marginBottom: 7,
  },
  expiryDateText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: 14,
  },
  fullNameText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Iowan Old Style',
    position: 'relative',
    right: 20,
  },
});

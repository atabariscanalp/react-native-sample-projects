import React, {useRef, useState} from 'react';
import {Alert, View, StyleSheet, Text, Button, Image} from 'react-native';
import {CustomTextInput} from '../CustomTextInput';
import worldMap from '../../assets/worldmap.png';
import CardFlip from 'react-native-card-flip';

export const HomeScreen = () => {
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [maskedCardNumber, setMaskedCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [maskedExpiryDate, setMaskedExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const cardRef = useRef<any>();

  const charge = (tokenId: string) => {
    fetch('http://localhost:3000/charge', {
      method: 'POST',
      body: JSON.stringify({
        tokenId: tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        const status = (res as {status: string}).status;
        Alert.alert('Status', status);
      })
      .catch(() => Alert.alert('Error', 'error on charge!'));
  };

  const handlePayment = () => {
    fetch('http://localhost:3000/get-card-token', {
      method: 'POST',
      body: JSON.stringify({
        fullName: fullName,
        cardNumber: cardNumber,
        expMonth: expiryDate.substring(0, 2),
        expYear: '20' + expiryDate.substring(2),
        cvc: cvc,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        const tokenId = (res as {tokenId: string}).tokenId;
        charge(tokenId);
      })
      .catch(err => Alert.alert('Error', err.message));
  };

  const CardFront = () => (
    <View style={styles.creditCard}>
      <Image source={worldMap} style={styles.image} resizeMode="cover" />
      <View style={styles.imageContainer}>
        <Text style={styles.cardNumberText}>{maskedCardNumber}</Text>
        <Text style={styles.expiryDateText}>{maskedExpiryDate}</Text>
        <Text style={styles.fullNameText}>{fullName}</Text>
      </View>
    </View>
  );

  const CardBack = () => (
    <View style={styles.creditCard}>
      <View style={styles.cardBackContainer}>
        <View style={styles.cardBackRectangle} />
        <Text style={styles.cvcText}>{cvc}</Text>
      </View>
    </View>
  );

  const CreditCard = () => (
    <CardFlip flipDirection="y" ref={cardRef} style={styles.cardFlip}>
      <CardFront />
      <CardBack />
    </CardFlip>
  );

  const flip = () => {
    if (cardRef && cardRef.current) {
      cardRef.current.flip();
    }
  };

  const disabled =
    fullName.length > 0 &&
    cardNumber.length === 16 &&
    expiryDate.length === 4 &&
    cvc.length === 3;

  return (
    <View style={styles.container}>
      <CreditCard />
      <View>
        <CustomTextInput
          width={300}
          title="Full Name"
          placeholder="John Doe"
          setText={[setFullName]}
          value={fullName}
          keyboardType="default"
        />
        <CustomTextInput
          width={300}
          title="Card Number"
          placeholder="4242 4242 4242 4242"
          setText={[setMaskedCardNumber, setCardNumber]}
          value={cardNumber}
          maxLength={16}
          mask="[0000] [0000] [0000] [0000]"
        />
        <View style={styles.textFields}>
          <CustomTextInput
            width={100}
            title="Expiry Date"
            placeholder="MM/YY"
            setText={[setMaskedExpiryDate, setExpiryDate]}
            value={expiryDate}
            maxLength={4}
            mask="[00]/[00]"
          />
          <CustomTextInput
            width={100}
            title="CVC"
            placeholder="123"
            setText={[setCvc]}
            value={cvc}
            flip={flip}
            maxLength={3}
          />
        </View>
      </View>
      <Button title="Pay Now" onPress={handlePayment} disabled={!disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textFields: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  cardBackContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBackRectangle: {
    backgroundColor: 'grey',
    width: '75%',
    height: 20,
    marginRight: 15,
  },
  cvcText: {
    color: 'white',
  },
  cardFlip: {
    position: 'absolute',
    top: 10,
    width: 300,
    height: 150,
  },
});

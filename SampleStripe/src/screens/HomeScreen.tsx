import React, {useRef, useState} from 'react';
import {Alert, View, StyleSheet, Button} from 'react-native';
import {CustomTextInput} from '../CustomTextInput';
import {API_URL} from '../../helpers';
import {MemoizedCreditCard} from '../CreditCard/CreditCard';

export const HomeScreen = () => {
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [maskedCardNumber, setMaskedCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [maskedExpiryDate, setMaskedExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const cardRef = useRef<any>();

  const charge = (tokenId: string) => {
    fetch(`${API_URL}/charge`, {
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
    fetch(`${API_URL}/get-card-token`, {
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
      <MemoizedCreditCard
        ref={cardRef}
        cardNumber={maskedCardNumber}
        expiryDate={maskedExpiryDate}
        cvc={cvc}
        fullName={fullName}
      />
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
});

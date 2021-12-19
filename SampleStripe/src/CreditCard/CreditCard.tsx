import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import CardFlip from 'react-native-card-flip';
import {MemoizedCardBack} from './CardBack';
import {MemoizedCardFront} from './CardFront';

type Props = {
  cvc: string;
  cardNumber: string;
  expiryDate: string;
  fullName: string;
};

const CreditCard = forwardRef(
  ({cardNumber, cvc, expiryDate, fullName}: Props, ref: any) => (
    <CardFlip flipDirection="y" ref={ref} style={styles.cardFlip} key={3}>
      <MemoizedCardFront
        cardNumber={cardNumber}
        expiryDate={expiryDate}
        fullName={fullName}
      />
      <MemoizedCardBack cvc={cvc} />
    </CardFlip>
  ),
);

export const MemoizedCreditCard = React.memo(CreditCard);

const styles = StyleSheet.create({
  cardFlip: {
    position: 'absolute',
    top: 10,
    width: 300,
    height: 150,
  },
});

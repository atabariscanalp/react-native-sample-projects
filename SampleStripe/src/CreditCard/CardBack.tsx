import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  cvc: string;
};

const CardBack: React.FC<Props> = ({cvc}) => (
  <View style={styles.creditCard}>
    <View style={styles.cardBackContainer}>
      <View style={styles.cardBackRectangle} />
      <Text style={styles.cvcText}>{cvc}</Text>
    </View>
  </View>
);

export const MemoizedCardBack = React.memo(CardBack);

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
});

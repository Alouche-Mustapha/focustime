import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    //<> : wrapper to wrap all your elements inside it, it is same as react fragment <react.Fragment>
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="10"
          style={styles.roundedButtonBorder}
          textStyle={styles.roundedButtonText}
          onPress={() => onChangeTime(10)}
        />
      </View>

      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="15"
          style={styles.roundedButtonBorder}
          textStyle={styles.roundedButtonText}
          onPress={() => onChangeTime(15)}
        />
      </View>

      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="20"
          style={styles.roundedButtonBorder}
          textStyle={styles.roundedButtonText}
          onPress={() => onChangeTime(20)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'black',
  },
  roundedButtonBorder: {
    borderColor: 'black',
  },
  roundedButtonText: {
    color: 'black',
  },
});

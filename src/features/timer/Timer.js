import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake(); //Keep awake the app during runtime

  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const [isStarted, setIsStarted] = useState(false);

  const [progress, setProgress] = useState(1);

  //This methode is going to set the progress (track the progress bar with a useState function) 
  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'iso') {
      //This code is the solution for IOS but it also works on android
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      //This works only on Android : platform's specificity
      Vibration.vibrate(1000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View>
        <Text style={styles.title}>Focusing on :</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <ProgressBar
        style={{ height: 10, marginTop: 20 }}
        color="black"
        progress={progress}
      />

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            size={100}
            style={styles.roundedButtonBorder}
            textStyle={styles.roundedButtonText}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="Start"
            size={100}
            style={styles.roundedButtonBorder}
            textStyle={styles.roundedButtonText}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton
          title="Clear"
          size={60}
          style={styles.roundedButtonBorder}
          textStyle={styles.roundedButtonText}
          onPress={() => clearSubject()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  task: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedButtonBorder: {
    borderColor: 'black',
  },
  roundedButtonText: {
    color: 'black',
  },
  buttonWrapper: {
    flexDirection: 'row',
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingLeft: 30,
    paddingBottom: 15
  },
});

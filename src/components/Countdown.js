import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const minutesToMillis = (min) => min * 60 * 1000;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);

  const [millis, setMillis] = useState(null);

  /*
  This function is going to be called every second in an interval, it is going to change the amount of milliseconds 
  we have left (setMillis) by the use of "useState" function. Every time we change the milliseconds we are calling 
  "onProgress" function that also will change the progress by the use of "useState".
  Conclusion : setState inside a setState is forbidden : react component should not cause side effects in other 
  components during rendering, because it can cause memoty leak.
  */
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current); //To not to keep couting
        // onEnd(); (better not to use it here because it sets multi states of multi components)
        return time;
      }
      const timeLeft = time - 1000;
      // onProgress(timeLeft / minutesToMillis(minutes)); (useEffect instead of doing it like that)
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd(); //Ending the FocusTime on this countdown
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current); // clean up the reference
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'gray',
    borderRadius: 50,
  },
});

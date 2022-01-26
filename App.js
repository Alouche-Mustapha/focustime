import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus as F } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Object to define a focus object state
const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
//The main show for the app
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null); //Add a state on what we are focusing on (focus subject)

  const [focusHistory, setFocusHistory] = useState([]); //Empty array to store history of all focus subjects

  //Subject : to store the subject // Status : to store object's status
  //Key : flatList going to look for that key. The key can be an UID (import a library to do that)
  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]); //JS object as {subject : focusSubject}
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  //Async methode that store the focus history (array of JS objects) with the specific key (focusHistory)
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  //Async methode that load the focus history from the storage by specifying the wanted key
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Load the focus history any time we launch the app for the first moment
  useEffect(() => {
    loadFocusHistory();
  }, []);

  //Save focus history every time we add a new focus subject
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  //If we had a focus subject, let's show the timer (part 1). If not let's add one (part 2)
  return (
    <View style={styles.container}>
      {focusSubject ? (
        //Create Timer
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }} //Clear the focus subject and go to part 2 (create Focus)
        />
      ) : (
        //Ask for a Focus subject and show all the list
        <>
          <F addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'android' ? 20 : 60,
    backgroundColor: 'darkgray',
  },
});

/*
useState : si la valeur change alors un rendu est provoqué (se produit)
useRef : la valeur change mais le rendu ne va pas être provoqué
useEffect : s'exécute sur chaque rendu. Lorsque une valeur change par useState un rendu se produit ce qui déclanche
  alors un autre rendu. le premier arg est une fonction qui s'exécute. le deuxième arg est conçu pour controller les
  moments oû il faut exécuter la méthode
setTimeout() : elle s'exécute une seule fois et elle fait un appel à une fonction après un nbr de milliseconds
setInterval() : exécuter une fontion jusqu'à ce que la méthode clearInterval() soit appelée
<></> : se sont les fragments. ils peuvent être remplacés par des <View></View> mais les fargements gaspillent moins 
d'espace mémoire que les Views
*/

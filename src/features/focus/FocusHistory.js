import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        {focusHistory.length ? (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={styles.flatListContentContainer}
              data={focusHistory} //Array of items (here we have an array of objects)
              renderItem={HistoryItem}
            />
            <View style={styles.clearCoantainer}>
              <RoundedButton
                size={70}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        ) : null}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
  },
  flatListContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: 20,
  }),
  title: {
    color: 'white',
    fontSize: 20,
  },
  clearCoantainer: {
    alignItems: 'center',
    padding: 20,
  },
});

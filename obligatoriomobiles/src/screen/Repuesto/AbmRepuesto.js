import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar } from 'react-native';
import AltaRepuesto from './AltaRepuesto';
import AllRepuesto from './AllRepuesto';
import DelRepuesto from './DelRepuesto';
import UpdateRepuesto from './UpdateRepuesto';
const DATA = [];

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

const getItemCount = (data) => 1;

const Item = () => (
  //Componentes de Repuesto
 <><AltaRepuesto />
 <AllRepuesto />
 <DelRepuesto/>
 <UpdateRepuesto/>
 </>
 
);

export const AbmRepuesto = () => {
  //poder exportart el abm repuesto
  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={() => <Item  />}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
}
export default AbmRepuesto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 2
  }
}
)
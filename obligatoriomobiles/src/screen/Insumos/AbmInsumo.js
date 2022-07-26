import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar } from 'react-native';
import AltaInsumo from './AltaInsumo';
import AllInsumo from './AllInsumo'
import DelInsumo from './DelInsumo';
import UpdateInsumo from './UpdateInsumo';
const DATA = [];

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

const getItemCount = (data) => 1;

const Item = () => (
  //Componentes de Insumo
 <><AltaInsumo />
<AllInsumo />
<DelInsumo/>
<UpdateInsumo/>
 </>
 
);

export const AbmInsumo = () => {
  //poder exportart el abm Insumo
  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={1}
        renderItem={() => <Item  />}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
}
export default AbmInsumo;

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
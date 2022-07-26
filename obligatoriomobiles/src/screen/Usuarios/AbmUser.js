import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar } from 'react-native';
import AltaUser from './AltaUser';
import AllUser from './AllUser';
import DelUser from './DelUser';
import UpdateUser from './UpdateUser';
const DATA = [];

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

const getItemCount = (data) => 1;

const Item = () => (
  //Componentes de usuarios
 <><AltaUser />
 <AllUser />
 <DelUser/>
 <UpdateUser/>
 </>
 
);

export const AbmUser = () => {
  //poder exportart el abm user
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
export default AbmUser;

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
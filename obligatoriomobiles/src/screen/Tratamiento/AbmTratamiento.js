import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar } from 'react-native';
import AltaTratamiento from './AltaTratamiento';
import AllTratamientos from './AllTratamiento'
import DelTratamiento from './DelTratamiento';
import InsumoATrat from './InsumoATrat';
import UpdateTratamiento from './UpdateTratamiento';
import AllIns_Trat from './AllIns_Trat';
import RepuestoATrat from './RepuestoATrat';
import AllRep_Trat from './AllRep_Trat';
const DATA = [];

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index+1}`
});

const getItemCount = (data) => 1;

const Item = () => (
  //Componentes de Tratamiento
 <><AltaTratamiento />
 <RepuestoATrat/>
 <AllRep_Trat/>
 <InsumoATrat/>
 <AllIns_Trat/>
<AllTratamientos />
<DelTratamiento/>
<UpdateTratamiento/>
 </>
 
);

export const AbmTratamiento = () => {
  //poder exportart el abm Tratamiento
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
export default AbmTratamiento;

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
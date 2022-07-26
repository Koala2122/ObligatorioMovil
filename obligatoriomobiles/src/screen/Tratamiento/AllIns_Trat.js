
import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";
import MyInputText from "../../components/MyInputText";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();



const AllIns_Trat = ({navigation}) => {
  // permite guardar una variable de Tratamiento

  const [Nomsearch, setNomSearch] = useState("");
  const [Tratamiento, setTratamiento] = useState([]);

  



  // Secuencia sql que devuelve todos los tratamientos
  const searchTratamiento = () => {
    console.log("searchTratamiento");

    // Valida que el campo tenga algun dato
    if (!Nomsearch.trim()) {
      Alert.alert("El nombre del Tratamiento es requerido");
      return;
    }
    // Secuencia SQL que permite buscar el Tratamiento ingresado y guardar sus datos
    db.transaction((tx) => {
      tx.executeSql(
       
        "SELECT * FROM Trat_insumo WHERE T_name = ?",
        [Nomsearch],
        (tx, results) => {
            if (results.rows.length > 0) {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                  setTratamiento(temp);
              } else {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                  setTratamiento(temp);
                Alert.alert(
                  
                  "Mensaje",
                  "No hay Insumo para este Tratamiento!!!",
                  [
                    {
                      text: "Ok",
                   
                    },
                  ],
                  { cancelable: false }
                );
              }
            });
          }),
        [] } ;



 
// por cada tratamiento se guarda una lista con sus datos que es llamada en un contendor
  const listItemView = (item) => {
    return (
//Trat_insumo(id INTEGER PRIMARY KEY AUTOINCREMENT, T_name VARCHAR(50) references tratamiento(name), I_name VARCHAR(50) references insumo(name), cantidad varchar(10), unique(T_name, I_name))',
      <View key={item.id} style={styles.listItemView}>
        <MyText text="Tratamiento:"   style={styles.text}>   </MyText>
        <MyText text={item.T_name}   style={styles.text}>   </MyText>

        <MyText text="Insumo:"   style={styles.text}>   </MyText>
        <MyText text={item.I_name}   style={styles.text}>   </MyText>

        <MyText text="Cantidad:" style={styles.text}/>
        <MyText text={item.cantidad } style={styles.text}/>



      </View>
    );
  };

  //Contenedor donde se muestran todos los tratamiento
  return (
    <><MyText text="Buscar los Insumos utilizados en el Tratamiento" style={styles.Title} /><SafeAreaView style={styles.container}>
      <View>
        <View>
   
                          <MyInputText
                              placeholder="Ingrese el nombre del Tratamiento"
                              style={styles.inputStyle}
                              onChangeText={(text) => setNomSearch(text)} />
                          <MySingleButton title="Buscar" customPress={searchTratamiento} />
            


          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={Tratamiento}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)} />


        </View>

      </View>


      
    </SafeAreaView></>
//El boton para actualizar los tratamiento y mostrarlos en el contenedor 
  );
};

export default AllIns_Trat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  Title:{
    fontSize: 20,
alignSelf: "center",
marginTop : 50,
marginBottom : 10
  },

  TextDrop: {
    fontSize: 15,
    padding: 5,
    marginLeft: 25,
  
  },
  
});

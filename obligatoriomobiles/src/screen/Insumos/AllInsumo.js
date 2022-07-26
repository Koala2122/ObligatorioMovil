import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();



const AllInsumo = ({navigation}) => {
  // permite guardar una variable de Insumo
  const [Insumo, setInsumo] = useState([]);

  
  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM insumo`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setInsumo(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Insumo!!!",
            [
              {
                text: "Ok",
             
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);


  // Secuencia sql que devuelve todos los Insumos
   const ActualizarIsnumo = () =>{
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Insumo`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setInsumo(temp);
        } else {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setInsumo(temp);
          Alert.alert(
            
            "Mensaje",
            "No hay Insumo!!!",
            [
              {
                text: "Ok",
             
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  [] } ;

 
// por cada Insumo se guarda una lista con sus datos que es llamada en un contendor
  const listItemView = (item) => {
    return (

      <View key={item.id} style={styles.listItemView}>
        <MyText text="Isumo:"   style={styles.text}>   </MyText>
        <MyText text={item.name}   style={styles.text}>   </MyText>


     

      </View>
    );
  };

  //Contenedor donde se muestran todos los Insumo
  return (
    <><MyText text="Todos los insumos" style={styles.Title} /><SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={Insumo}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)} />
        </View>

      </View>

      <MySingleButton title="Actualizar Insumo" customPress={ActualizarIsnumo} />
      
    </SafeAreaView></>
//El boton para actualizar los Insumo y mostrarlos en el contenedor 
  );
};

export default AllInsumo;

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
  }
});

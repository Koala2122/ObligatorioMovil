import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();



const AllAutos = ({navigation}) => {
  // permite guardar una variable de usario
  const [Auto, setAuto] = useState([]);

  
  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM auto`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setAuto(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Autos!!!",
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


  // Secuencia sql que devuelve todos los usuarios
   const ActualizarAuto = () =>{
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM auto`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setAuto(temp);
        } else {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setAuto(temp);
          Alert.alert(
            
            "Mensaje",
            "No hay Autos!!!",
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

 
// por cada usario se guarda una lista con sus datos que es llamada en un contendor
  const listItemView = (item) => {
    return (

      <View key={item.id} style={styles.listItemView}>
        <MyText text="Matricula de auto:"   style={styles.text}>   </MyText>
        <MyText text={item.matricula}   style={styles.text}>   </MyText>

        <MyText text="Marca:" style={styles.text}/>
        <MyText text={item.marca } style={styles.text}/>

        <MyText text="Color:" style={styles.text}/>
        <MyText text={item.color } style={styles.text}/>

        <MyText text="Serial de motor:" style={styles.text}/>
        <MyText text={item.motorSr } style={styles.text}/>

      </View>
    );
  };

  //Contenedor donde se muestran todos los usaurios
  return (
    <><MyText text="Todos los Usuario" style={styles.Title} /><SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={Auto}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)} />
        </View>

      </View>

      <MySingleButton title="Actualizar Auto" customPress={ActualizarAuto} />
      
    </SafeAreaView></>
//El boton para actualizar los usuarios y mostrarlos en el contenedor 
  );
};

export default AllAutos;

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

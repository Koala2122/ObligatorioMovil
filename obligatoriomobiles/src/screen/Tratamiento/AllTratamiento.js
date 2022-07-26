import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();



const AllTratamiento = ({navigation}) => {
  // permite guardar una variable de Tratamiento
  const [Tratamiento, setTratamiento] = useState([]);

  
  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM tratamiento`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            setTratamiento(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay Tratamiento!!!",
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


  // Secuencia sql que devuelve todos los tratamientos
   const ActualizarTratamiento = () =>{
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM tratamiento`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
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
            "No hay Tratamiento!!!",
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

      <View key={item.id} style={styles.listItemView}>
        <MyText text="Tratamiento:"   style={styles.text}>   </MyText>
        <MyText text={item.name}   style={styles.text}>   </MyText>


        <MyText text="Matricula de auto:"   style={styles.text}>   </MyText>
        <MyText text={item.matricula}   style={styles.text}>   </MyText>

        
        <MyText text="Costo:" style={styles.text}/>
        <MyText text={item.costo } style={styles.text}/>

        <MyText text="Fecha ingreso:" style={styles.text}/>
        <MyText text={item.fechaIni } style={styles.text}/>

        <MyText text="Fecha salida:" style={styles.text}/>
        <MyText text={item.fechaFin } style={styles.text}/>

      </View>
    );
  };

  //Contenedor donde se muestran todos los tratamiento
  return (
    <><MyText text="Todos los Trataminetos" style={styles.Title} /><SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={Tratamiento}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)} />
        </View>

      </View>

      <MySingleButton title="Actualizar Tratamiento" customPress={ActualizarTratamiento} />
      
    </SafeAreaView></>
//El boton para actualizar los tratamiento y mostrarlos en el contenedor 
  );
};

export default AllTratamiento;

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

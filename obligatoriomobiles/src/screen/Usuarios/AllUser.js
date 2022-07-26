import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";
import MySingleButton from "../../components/MySingleButton";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();



const AllUser = ({navigation}) => {
  // permite guardar una variable de usario
  const [users, setUsers] = useState([]);
  
  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM users`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setUsers(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay usuarios!!!",
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
  

  function ActualizarUser() {

  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM users`, [], (tx, results) => {
      console.log("results", results);
      // validar resultado
      if (results.rows.length > 0) {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setUsers(temp);
      } else {
        Alert.alert(

          "Mensaje",
          "No hay usuarios!!!",
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
    [];
}

 
// por cada usario se guarda una lista con sus datos que es llamada en un contendor
  const listItemView = (item) => {
    return (
      <View key={item.user_id} style={styles.listItemView}>
        <MyText text="Nombre de Usuario:"   style={styles.text}>   </MyText>
        <MyText text={item.user_name}   style={styles.text}>   </MyText>

        <MyText text="Apellido:" style={styles.text}/>
        <MyText text={item.user_app } style={styles.text}/>

        <MyText text="Ci :" style={styles.text}/>
        <MyText text={item.ci } style={styles.text}/>

        <MyText text="Auto:" style={styles.text}/>
        <MyText text={item.auto } style={styles.text}/>

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
            data={users}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)} />
        </View>

      </View>

      <MySingleButton title="Actualizar Usuario" customPress={ActualizarUser} />
      
    </SafeAreaView></>
//El boton para actualizar los usuarios y mostrarlos en el contenedor 
  );
};

export default AllUser;





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

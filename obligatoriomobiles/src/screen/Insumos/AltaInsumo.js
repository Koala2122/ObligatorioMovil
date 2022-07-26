import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  DevSettings,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";


import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();


const AltaInsumo =() => {
  // Permite guardar diferentes variables 
  const [id, setId] = useState('');
  const [Name, setName] = useState('');




  const clearData = () => {
    // Permite limpiar los datos del formulario 

    setName("");
  };


  const registerInsumo = () => {
  console.log("states", id, Name);
  // validaciones estados

  
  debugger;

    //Validar si los campos de formularios tienen datos
    if (!Name.trim()) {
      Alert.alert("Ingrese nombre");
      return;
    }

    // Secuencia Sql que ingresa el usuario nuevo 
    db.transaction((tx) => {
      tx.executeSql(
     
      `INSERT INTO insumo (name) VALUES (?)`,
        [Name],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Usuario registrado!!!",
              
              [
                {
                  text: "Ok",
              
                },
              ],
              { cancelable: false }
              
            );
          } else {
            Alert.alert("Error al registrar el insumo ");
          }

        },
        Alert.alert("Ya existe este insumo ")
      );
    });
    //ActualizarUser()
  };
  return (
// Formulario para ingresar los datos del nuevo Ususario
    <><MyText  text="Alta Insumo" style={styles.Title} /><View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardView}>
            <MyInputText
              placeholder="id del insumo"
              onChangeText={setName}
              style={styles.nameInput}
              value={Name} />


            <MySingleButton
              title="Guardar Insumo"
              customPress={registerInsumo} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View></>
 
 
 
    
    )

}
export default AltaInsumo

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
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  nameInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  passwordInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  emailInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  Title:{
    fontSize: 20,
alignSelf: "center",
marginTop : 10,
marginBottom: 20,
  }
});

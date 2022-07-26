import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";


import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();


const AltaRepuesto =() => {
  // Permite guardar diferentes variables 
  const [RepuestoName, setNameRepuesto] = useState('');




  const clearData = () => {
    // Permite limpiar los datos del formulario 
    setNameRepuesto("");
   
  };


  const registerRepuesto = () => {
  console.log("states", RepuestoName);
  // validaciones estados

  
  debugger;

    //Validar si los campos de formularios tienen datos
    if (!RepuestoName.trim()) {
      Alert.alert("Ingrese el nombre del repuesto");
      return;
    }

 
    // Secuencia Sql que ingresa el usuario nuevo 
    db.transaction((tx) => {
      tx.executeSql(
     
      `INSERT INTO repuesto (name ) VALUES (?)`,
        [RepuestoName],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
      
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Repuesto registrado!!!",
              
              [
                {
                  text: "Ok",
              
                },
              ],
              { cancelable: false }
              
            );
          } 
          else {
        
            Alert.alert("Error al registrar repuesto");
          }

        },
        Alert.alert("El nombre del repuesto ya existe")
      );
    });
    //ActualizarRepuesto()
  };
  return (
// Formulario para ingresar los datos del nuevo Ususario
    <><MyText  text="Alta Repuesto" style={styles.Title} /><View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardView}>
            <MyInputText
              placeholder="Nombre de Repueston"
              onChangeText={setNameRepuesto}
              style={styles.nameInput}
              value={RepuestoName} />

        

            <MySingleButton
              title="Guardar Repuesto"
              customPress={registerRepuesto} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View></>
 
 
 
    
    )

}
export default AltaRepuesto

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

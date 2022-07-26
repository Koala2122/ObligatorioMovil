import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();

const UpdateRepuesto = () => {
// Permite guardar diferentes variables
  const [RepuestoNameSearch, setRepuestoNameSearch] = useState("");
  const [RepuestoNombre, setRepuestoNombre] = useState('');
  const [Id, setId] = useState('');

  // Permite buscar al usuario dado su nombre
  const searchRepuesto = () => {
    console.log("searchRepuesto");

    // Valida que el campo tenga algun dato
    if (!RepuestoNameSearch.trim()) {
      Alert.alert("El nombre del repuesto es requerido");
      return;
    }
    // Secuencia SQL que permite buscar el usuario ingresado y guardar sus datos
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM repuesto WHERE name = ?",
        [RepuestoNameSearch],
        (tx, results) => {
          if (results.rows.length > 0) {

            setId(results.rows.item(0).id),
            setRepuestoNombre(results.rows.item(0).name);
       
          } else {
            Alert.alert("Repuesto no encontrado");
          }
        }
      );
    });
  };

  const UpdateRepuesto = () => {
    console.log("states", RepuestoNombre);
 
// Valida que los Campos tengan datos 
    if (!RepuestoNombre.trim()) {
      Alert.alert("El nombre del repuesto no puede estar vacio");
      return;
    }

  

    // Secuencia SQL que permite actualizar un usuario con los nuevos datos

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE repuesto SET name = ? WHERE id = ?",
        [RepuestoNombre, Id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto actualizado");
          } else {
            Alert.alert("No se pudo actualizar el repuesto");
          }
        }
      );
    });
  };

  return (
    //Formulario de Buscar al usuario y actualizar el usuario
    <><MyText text="Update Repuesto" style={styles.Title} /><SafeAreaView style={styles.container}>
          <View style={styles.viewContainer}>
              <View style={styles.generalView}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                      <KeyboardAvoidingView
                          behavior="padding"
                          style={styles.keyboardView}
                      >
                          <MyText text="Buscar Repuesto" style={styles.text} />
                          <MyInputText
                              placeholder="Ingrese el nombre del repuesto"
                              style={styles.inputStyle}
                              onChangeText={(text) => setRepuestoNameSearch(text)} />
                          <MySingleButton title="Buscar" customPress={searchRepuesto } />


                          <MyInputText
                              placeholder="Ingrese el Nombre del repuesto:"
                              value={RepuestoNombre}
                              onChangeText={(text) =>setRepuestoNombre(text)} />
            
                        

                          <MySingleButton title="Actualizar" customPress={UpdateRepuesto} />
                      </KeyboardAvoidingView>
                  </ScrollView>
              </View>
          </View>
      </SafeAreaView></>
  );
};

export default UpdateRepuesto;

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
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  inputStyle: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  Title:{
    fontSize: 20,
alignSelf: "center",
marginTop : 50,
marginBottom: 20,
  }
});



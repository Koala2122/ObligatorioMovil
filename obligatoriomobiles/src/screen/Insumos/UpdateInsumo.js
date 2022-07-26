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

const UpdateInsumo = () => {
// Permite guardar diferentes variables
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState('');
  const [nombreSearch, setNombreSearch] = useState('');


  // Permite buscar al usuario dado su nombre

  const searchInsumo = () => {
    console.log("searchInsumo");
    
    // Valida que el campo tenga algun dato
    if (!nombreSearch.trim()) {
      Alert.alert("El nombre del insumo es requerido");
      return;
    }
    // Secuencia SQL que permite buscar el usuario ingresado y guardar sus datos
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumo WHERE name = ?",
        [nombreSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setId(results.rows.item(0).id);
            setNombre(results.rows.item(0).name);
     
          } else {
            Alert.alert("Insumo no encontrado");
          }
        }
      );
    });
  };

  const updateInsumo = () => {
    console.log("states", id, nombre);
 
// Valida que los Campos tengan datos 

    if (!nombre.trim()) {
      Alert.alert("El nombre del producto no puede estar vacio");
      return;
    }


    // Secuencia SQL que permite actualizar un usuario con los nuevos datos

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE insumo SET name = ? where id = ?",
        [nombre, id ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Insumo actualizado");
          } else {
            Alert.alert("No se pudo actualizar el insumo");
          }
        }
      );
    });
  };

  return (
    //Formulario de Buscar al usuario y actualizar el usuario
    <><MyText text="Update Insumo" style={styles.Title} /><SafeAreaView style={styles.container}>
          <View style={styles.viewContainer}>
              <View style={styles.generalView}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                      <KeyboardAvoidingView
                          behavior="padding"
                          style={styles.keyboardView}
                      >
                          <MyText text="Buscar Insumo" style={styles.text} />
                          <MyInputText
                              placeholder="Ingrese el id del insumo"
                              style={styles.inputStyle}
                              onChangeText={(text) => setNombreSearch(text)} />

                          <MySingleButton title="Buscar" customPress={searchInsumo} />
            
                          <MyInputText
                              placeholder="Ingrese el nombre del producto"
                              value={nombre}
                              onChangeText={(text) => setNombre(text)} />
         

                          <MySingleButton title="Actualizar" customPress={updateInsumo} />
                      </KeyboardAvoidingView>
                  </ScrollView>
              </View>
          </View>
      </SafeAreaView></>
  );
};

export default UpdateInsumo;

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

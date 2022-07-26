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

const UpdateAuto = () => {
// Permite guardar diferentes variables
  const [Matsearch, setMatSearch] = useState("");
  const [Id, setId] = useState('');
  const [Mat, setMat] = useState('');
  const [Marca, setMarca] = useState('');
  const [Color, setCol] = useState('');
  const [MotorSr, setMotsr] = useState('');

  // Permite buscar al Auto dado su matricula
  const searchAuto = () => {
    console.log("searchAuto");

    // Valida que el campo tenga algun dato
    if (!Matsearch.trim()) {
      Alert.alert("El nombre del Auto es requerido");
      return;
    }
    // Secuencia SQL que permite buscar el Auto ingresado y guardar sus datos
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM auto WHERE matricula = ?",
        [Matsearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            
            setId(results.rows.item(0).auto_id);
            setMat(results.rows.item(0).matricula);
            setMarca(results.rows.item(0).marca);
            setCol(results.rows.item(0).color);
            setMotsr(results.rows.item(0).motorSr);
          } else {
            Alert.alert("Auto no encontrado");
          }
        }
      );
    });
  };

  const updateAuto = () => {
    console.log("states", Mat, Marca,  Color, MotorSr);
 
// Valida que los Campos tengan datos 
    if (!Mat.trim()) {
      Alert.alert("La matricula del auto no puede estar vacio");
      return;
    }

    if (!Marca.trim()) {
      Alert.alert("La marca no puede estar vacio");
      return;
    }
    if (!Color.trim()) {
        Alert.alert("La Color no puede estar vacio");
        return;
    }
    if (!MotorSr.trim()) {
        Alert.alert("La Serie del motor no puede estar vacio");
        return;
    }

    // Secuencia SQL que permite actualizar el auto con los nuevos datos

    db.transaction((tx) => {
      tx.executeSql(
        //(auto_id INTEGER PRIMARY KEY AUTOINCREMENT, matricula VARCHAR(20), marca VARCHAR(20), color VARCHAR(20), motorSr VARCHAR(40))',
        "UPDATE auto SET matricula = ?, marca = ?, color = ?, motorSr = ?  WHERE auto_id = ?",
        [Mat, Marca, Color, MotorSr, Id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Auto actualizado");
          } else {
            Alert.alert("No se pudo actualizar el Auto");
          }
        }
      );
    });
  };

  return (
    //Formulario de Buscar al Auto y actualizar el Auto
    <><MyText text="Update Auto" style={styles.Title} />
    <SafeAreaView style={styles.container}>
          <View style={styles.viewContainer}>
              <View style={styles.generalView}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                      <KeyboardAvoidingView
                          behavior="padding"
                          style={styles.keyboardView}
                      >
                          <MyText text="Buscar Auto" style={styles.text} />
                          <MyInputText
                              placeholder="Ingrese la matricula del Auto"
                              style={styles.inputStyle}
                              onChangeText={(text) => setMatSearch(text)} />
                          <MySingleButton title="Buscar" customPress={searchAuto} />
            
                          <MyInputText
                              placeholder="Ingrese la matricula del Auto"
                              value={Mat}
                              onChangeText={(text) => setMat(text)} />
                          <MyInputText
                              placeholder="Ingrese la marca"
                              value={Marca}
                              onChangeText={(text) => setMarca(text)} />
                          <MyInputText
                              placeholder="Ingrese el Color"
                              value={Color}
                              onChangeText={(text) => setCol(text)} />
                          <MyInputText
                              placeholder="Ingrese la Serie del motor"
                              value={MotorSr}
                              onChangeText={(text) => setMotsr(text)} />

                          <MySingleButton title="Actualizar" customPress={updateAuto} />
                      </KeyboardAvoidingView>
                  </ScrollView>
              </View>
          </View>
      </SafeAreaView></>
  );
  }

export default UpdateAuto;

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

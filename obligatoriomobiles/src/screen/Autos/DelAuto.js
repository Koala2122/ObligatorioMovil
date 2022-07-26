import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();

const DelAuto = () => {
  //Permite guardar una variable de auto
  const [Auto, setAuto] = useState("");

  // Secuencia SQL que permite borrar un auto
  const deleteAuto = () => {
    console.log("deletAuto");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM auto WHERE matricula = ?`,
        [Auto],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Auto eliminado");
        
          } else {
            Alert.alert("El Auto no existe");
          }
        }
      );
    });
  };
  return (
    // Formulario para eliminar un Auto
    <><MyText text="Eliminar Auto" style={styles.Title} />
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Busqueda de auto" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Matricula del auto"
                onChangeText={(text) => setAuto(text)} />
              <MySingleButton title="Borrar Auto" customPress={deleteAuto} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView></>
  );
};

export default DelAuto;

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
  inputStyle: {
    padding: 15,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  Title:{
    fontSize: 20,
alignSelf: "center",
marginTop : 50,
marginBottom: 20,
  }
});

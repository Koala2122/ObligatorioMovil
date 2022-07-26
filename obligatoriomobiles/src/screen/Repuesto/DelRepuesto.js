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

const DelRepuesto = () => {
  //Permite guardar una variable de usario
  const [RepuestoName, setRepuName] = useState("");

  // Secuencia SQL que permite borrar un repuesto
  const DelRepuesto = () => {
    console.log("deleteRepu");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM repuesto WHERE name = ?`,
        [RepuestoName],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("repuesto eliminado");
        
          } else {
            Alert.alert("El repuesto no esta resgitrado");
          }
        }
      );
    });
  };
  return (
    // Formulario para eliminar un usuario
    <><MyText text="Delete Repuesto" style={styles.Title} />
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Busqueda de Repuesto" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre de Repuesto"
                onChangeText={(text) => setRepuName(text)} />
              <MySingleButton title="Borrar Repuesto" customPress={DelRepuesto} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView></>
  );
};

export default DelRepuesto;

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

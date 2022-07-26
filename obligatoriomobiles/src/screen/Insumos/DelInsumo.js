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

const DelInsumo = () => {
  //Permite guardar una variable de usario
  const [insumo, setInsumo] = useState("");

  // Secuencia SQL que permite borrar un usuario
  const deleteInsumo = () => {
    console.log("deleteInsumo");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM insumo WHERE name = ?`,
        [insumo],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("insumo eliminado");
        
          } else {
            Alert.alert("El insumo que quiere borrar no existe");
          }
        }
      );
    });
  };
  return (
    // Formulario para eliminar un usuario
    <><MyText text="Delete Insumo" style={styles.Title} />
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Busqueda de Insumo" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre de Insumo"
                onChangeText={(text) => setInsumo(text)} />
              <MySingleButton title="Borrar Insumo" customPress={deleteInsumo} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView></>
  );
};

export default DelInsumo;

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

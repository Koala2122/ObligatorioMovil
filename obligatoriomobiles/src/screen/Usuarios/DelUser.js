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

const DelUser = () => {
  //Permite guardar una variable de usario
  const [userName, setUserName] = useState("");

  // Secuencia SQL que permite borrar un usuario
  const deleteUser = () => {
    console.log("deleteUser");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM users WHERE user_name = ?`,
        [userName],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Usuario eliminado");
        
          } else {
            Alert.alert("El usuario no existe");
          }
        }
      );
    });
  };
  return (
    // Formulario para eliminar un usuario
    <><MyText text="Delete Usuario" style={styles.Title} />
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Busqueda de usuario" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre de usuario"
                onChangeText={(text) => setUserName(text)} />
              <MySingleButton title="Borrar Usuario" customPress={deleteUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView></>
  );
};

export default DelUser;

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

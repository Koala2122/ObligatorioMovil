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

const DelTratamiento = () => {
  //Permite guardar una variable de Tratamiento
  const [Tratamiento, setTratamiento] = useState("");

  // Secuencia SQL que permite borrar un Tratamiento
  const deleteTratamiento = () => {
    console.log("deletTratamiento");
    db.transaction((tx) => {
      tx.executeSql(
    
        `DELETE FROM tratamiento WHERE name= ?`,
    
        [Tratamiento],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento eliminado");
        
          } else {
            Alert.alert("El Tratamiento no existe");
          }
        }
      );

      tx.executeSql(
   
        `DELETE FROM Trat_repuesto WHERE T_name= ?`,
     
     
      );
      tx.executeSql(
   
        `DELETE FROM Trat_insumo WHERE T_name= ?`,
     
      );
    });
  };
  return (
    // Formulario para eliminar un Tratamiento
    <><MyText text="Eliminar Tratamiento" style={styles.Title} />
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Busqueda de Tratamiento" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Matricula del Tratamiento"
                onChangeText={(text) => setTratamiento(text)} />
              <MySingleButton title="Borrar Tratamiento" customPress={deleteTratamiento} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView></>
  );
};

export default DelTratamiento;

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

import React, { useState, useEffect } from "react";
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
import Dropdown from "../../components/Dropdown";
import {listItemView} from './AllUser'
import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();

const UpdateUser = () => {
// Permite guardar diferentes variables
  const [userNameSearch, setUserNameSearch] = useState("");
  const [Id, setId] = useState('');
  const [Name, setName] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Ci, setCi] = useState('');
  const [Matricula, setMat] = useState(undefined);
  const [Auto, setAuto] = useState([]);
  const [users, setUsers] = useState([]);


  // Permite buscar al usuario dado su nombre
  const searchUser = () => {
    console.log("searchUser");

    // Valida que el campo tenga algun dato
    if (!userNameSearch.trim()) {
      Alert.alert("El nombre de usuario es requerido");
      return;
    }
    // Secuencia SQL que permite buscar el usuario ingresado y guardar sus datos
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE user_name = ?",
        [userNameSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setId(results.rows.item(0).user_id);
            setName(results.rows.item(0).user_name);
            setApellido(results.rows.item(0).user_app);
            setCi(results.rows.item(0).ci);
            setMat(results.rows.item(0).auto);
       
          } else {
            Alert.alert("Usuario no encontrado");
          }
        }
      );
    });
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM auto`, [], (tx, results, rows) => {
        console.log("results", results);

        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
 
          for (let i = 0; i < results.rows.length; ++i)
          {
            let element = 

   
   
              {value:results.rows.item(i).matricula,
                label: results.rows.item(i).matricula
                  }
            
              
             temp.push(element)
             console.log(element)
         
      
   
          }
          setAuto(temp)
     

          console.log(Auto)
    
        } 
      });
    });
  },[] );



  const updateUser = () => {
    console.log("actulizaruser");
    console.log("states", Name, Apellido, Ci, Matricula);
 
// Valida que los Campos tengan datos 
    if (!Name.trim()) {
      Alert.alert("El nombre de usuario no puede estar vacio");
      return;
    }

    if (!Apellido.trim()) {
      Alert.alert("El Apellido no puede estar vacio");
      return;
    }
    if (!Ci.trim()) {
        Alert.alert("La Ci no puede estar vacio");
        return;
    }

    // Secuencia SQL que permite actualizar un usuario con los nuevos datos

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET user_name = ?, user_app = ?, ci = ?, auto = ?  WHERE user_id = ?",
        [Name, Apellido, Ci, Matricula, Id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            
            Alert.alert("Usuario actualizado");

          } else {
            Alert.alert("No se pudo actualizar el usuario");
          }
        }
      );
    });
  };

  return (
    //Formulario de Buscar al usuario y actualizar el usuario
    <><MyText text="Update Usuario" style={styles.Title} /><SafeAreaView style={styles.container}>
          <View style={styles.viewContainer}>
              <View style={styles.generalView}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                      <KeyboardAvoidingView
                          behavior="padding"
                          style={styles.keyboardView}
                      >
                          <MyText text="Buscar Usuario" style={styles.text} />
                          <MyInputText
                              placeholder="Ingrese el nombre de Usuario"
                              style={styles.inputStyle}
                              onChangeText={(text) => setUserNameSearch(text)} />
                          <MySingleButton title="Buscar" customPress={searchUser} />
            
                          <MyInputText
                              placeholder="Ingrese el nombre de Usuario"
                              value={Name}
                              onChangeText={(text) => setName(text)} />
                          <MyInputText
                              placeholder="Ingrese el Apellido"
                              value={Apellido}
                              onChangeText={(text) => setApellido(text)} />
                          <MyInputText
                              placeholder="Ingrese el C.I"
                              value={Ci}
                              onChangeText={(text) => setCi(text)} />


                         <Dropdown data={Auto} selected={setMat}  valueSelected ={Matricula}/>

                          <MySingleButton title="Actualizar" customPress={updateUser} />
                      </KeyboardAvoidingView>
                  </ScrollView>
              </View>
          </View>
      </SafeAreaView></>
  );
};

export default UpdateUser;

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

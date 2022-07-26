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
import Dropdown from "../../components/Dropdown";
//  import { ActualizarUser } from './AllUser';
//  ActualizarUser();
import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();


 function AltaUser() {
  // Permite guardar diferentes variables 

  const [Name, setName] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Ci, setCi] = useState('');
  const [Matricula, setMat] = useState(undefined);
  const [Auto, setAuto] = useState([]);
  const [users, setUsers] = useState([]);
  const [resultado, setRes] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM auto`, [], (tx, results) => {
        console.log("results", results);

        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
 
          for (let i = 0; i < results.rows.length; ++i)
          {
            let element = 

   
   
              {value:results.rows.item(i).matricula,
                label: results.rows.item(i).matricula}
            
              
             temp.push(element)
             console.log(element)
         
      
   
          }
          setAuto(temp)
     

          console.log(Auto)
    
        } 
      });
    });
  },[] );

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM users`,[], (tx, results) => {
        console.log("results", results);
    
        // validar resultado
        if (results.rows.length > 0) {
         
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setUsers(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay usuarios!!!",
            [
              {
                text: "Ok",
             
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);



  const clearData = () => {
    // Permite limpiar los datos del formulario 
    setName("");
    setApellido("");
    setCi("");
  };

 

function registerUser (){
  console.log("states", Name, Apellido, Ci, Matricula);
  // validaciones estados

  
  debugger;

    //Validar si los campos de formularios tienen datos
    if (!Name.trim()) {
      Alert.alert("Ingrese su nombre");
      return;
    }

    if (!Apellido.trim()) {
      Alert.alert("Ingrese su apellido");
      return;
    }

    if (!Ci.trim()) {
      Alert.alert("Ingrese su Cedula");
      return;
    }

    
   
    // Secuencia Sql que ingresa el usuario nuevo 
    db.transaction((tx) => {
      tx.executeSql(

      `INSERT INTO users (user_name, user_app, ci, auto) VALUES (?, ?, ?, ?)`,
        [Name, Apellido, Ci, Matricula],
       
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            setUsers(Name, Apellido, Ci, Matricula )
            Alert.alert(
              
              "Exito",
              "Usuario registrado!!!",
              
              [
                {
                  text: "Ok",
              
                },
              ],
              { cancelable: false }
              
            )
          }

         
        },
        Alert.alert("El vehiculo ya existe")
      );
    });

  };
  return (
// Formulario para ingresar los datos del nuevo Ususario
    <><MyText  text="Alta Usuario" style={styles.Title} /><View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardView}>
            <MyInputText
              placeholder="Nombre de Usuario"
              onChangeText={setName}
              style={styles.nameInput}
              value={Name} />

            <MyInputText
              placeholder="Apellido"

              onChangeText={setApellido}
              style={styles.passwordInput}
              value={Apellido} />

            <MyInputText
              placeholder="C.I."

              onChangeText={setCi}
              style={styles.emailInput}
              value={Ci} />

           
           <>
           
            <Dropdown data={Auto} selected={setMat}/>

            </>
     

            <MySingleButton
              title="Guardar Usuario"
              customPress={registerUser} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View></>
 
 
 
    
    )

}
export default AltaUser

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

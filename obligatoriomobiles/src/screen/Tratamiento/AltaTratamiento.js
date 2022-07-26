import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} 

from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";
import Dropdown from "../../components/Dropdown";


import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();



const AltaTratamiento =() => {
    // Permite guardar diferentes variables 
    const [NameTra, setNameTra] = useState('');
    const [Matricula, setMat] = useState(undefined);
    const [Costo, setCosto] = useState('');
    const [FechaIni, setFechaIni] = useState('');
    const [FechaFin, setFechaFin] = useState('');


  const [Auto, setAuto] = useState([]);
  
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
  

    const clearData = () => {
        // Permite limpiar los datos del formulario 
        setNameTra("");
        setCosto("");
        setFechaIni("");
        setFechaFin("");

      };

      const registerTratamineto = () => {
        console.log("states", NameTra, Matricula, FechaIni, FechaFin);
        // validaciones estados
      


         debugger;

    //Validar si los campos de formularios tienen datos
    if (!NameTra.trim()) {
      Alert.alert("Ingrese Trataminto");
      return;
    }

    if (!Matricula.trim()) {
      Alert.alert("Ingrese Matricula");
      return;
    }

    if (!FechaIni.trim()) {
      Alert.alert("Ingrese fecha de ingreso ");
      return;
    }

    
    if (!FechaFin.trim()) {
      Alert.alert("Ingrese fecha de salida");
      return;
    }

    if (!Costo.trim()) {
      Alert.alert("Ingrese Costo");
      return;
    }


       // Secuencia Sql que ingresa el Tratamiento nuevo 
    db.transaction((tx) => {
        tx.executeSql(
       
        `INSERT INTO tratamiento (name ,matricula, costo ,fechaIni, fechaFin) VALUES (?, ?, ?, ?, ?)`,
     
          [NameTra,Matricula, Costo ,FechaIni, FechaFin],
          (tx, results) => {
            console.log("results", results);
            // validar resultado
            if (results.rowsAffected > 0) {
              clearData();
              Alert.alert(
                "Exito",
                "Tratamiento registrado!!!",
                
                [
                  {
                    text: "Ok",
                
                  },
                ],
                { cancelable: false }
                
              );
            } else {
              Alert.alert("Error al registrar el tratamiento");
            }
  
          },
          Alert.alert("Ya existe este tratamiento")
        );
      });
      //ActualizarTratamiento()
    };
    return (
        // Formulario para ingresar los datos del nuevo tratamiento
            <><MyText  text="Alta Tratamiento" style={styles.Title} /><View style={styles.viewContainer}>
              <View style={styles.generalView}>
                <ScrollView>
                  <KeyboardAvoidingView style={styles.keyboardView}>
                    <MyInputText
                      placeholder="Nombre Tratamiento"
                      onChangeText={setNameTra}
                      style={styles.nameInput}
                      value={NameTra} />
        
        <MyText  text="Seleccionar Auto" style={styles.TextDrop}  />
              <Dropdown data={Auto} selected={setMat}/>
        
              <MyInputText
                      placeholder="Costo"
        
                      onChangeText={setCosto}
                      style={styles.emailInput}
                      value={Costo} />

                    <MyInputText
                      placeholder="Fecha Inicio"
        
                      onChangeText={setFechaIni}
                      style={styles.emailInput}
                      value={FechaIni} />
        
                    <MyInputText
                      placeholder="Fecha Final"
        
                      onChangeText={setFechaFin}
                      style={styles.emailInput}
                      value={FechaFin} />
        
    

                    <MySingleButton
                      title="Guardar Tratamiento"
                      customPress={registerTratamineto} />
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </View></>
         
         
         
            
            )
        
        }
        export default AltaTratamiento
        
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
        
          },

          TextDrop: {
            fontSize: 15,
            padding: 5,
            marginLeft: 25,
          
          },
        });

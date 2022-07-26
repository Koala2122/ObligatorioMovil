import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView,   Alert } from 'react-native'
import React, { useState, useEffect } from "react";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";
import Dropdown from "../../components/Dropdown";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();

export function InsumoATrat() {
  
  // Permite guardar diferentes variables 
  const [id, setId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [insumo, setInsumo] = useState([]);
  const [Selecinsumo, setSelecInsumo] = useState(undefined);

  const [Tratamiento, setTrat] = useState([]);
  const [SelectTrat, setSelectTrat] = useState(undefined);




  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM insumo`, [], (tx, results) => {
        console.log("results", results);
  
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
  
          for (let i = 0; i < results.rows.length; ++i)
          {
            let element = 
  
   
   
              {value:results.rows.item(i).name,
                label: results.rows.item(i).name}
            
              
             temp.push(element)
             console.log(element)
         
      
   
          }
          setInsumo(temp)
     
  
          console.log(insumo)
    
        } 
      });
      tx.executeSql(`SELECT * FROM tratamiento`, [], (tx, results) => {
        console.log("results", results);
  
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
  
          for (let i = 0; i < results.rows.length; ++i)
          {
            let element = 
  
   
   
              {value:results.rows.item(i).name,
                label: results.rows.item(i).name}
            
              
             temp.push(element)
             console.log(element)
         
      
   
          }
          setTrat(temp)
     
  
          console.log(Tratamiento)
    
        } 
      });


    });
  },[] );

const BuscarTratamiento = () => {

    db.transaction((tx) => {
    
        tx.executeSql(`SELECT * FROM tratamiento`, [], (tx, results) => {
          console.log("results", results);
    
          // validar resultado
          if (results.rows.length > 0) {
            var temp = [];
    
            for (let i = 0; i < results.rows.length; ++i)
            {
              let element = 
    
     
     
                {value:results.rows.item(i).name,
                  label: results.rows.item(i).name}
              
                
               temp.push(element)
               console.log(element)
           
        
     
            }
            setTrat(temp)
       
    
            console.log(Tratamiento)
      
          } 
        });
  
  
      });
    };
  

  const clearData = () => {
    // Permite limpiar los datos del formulario 

    setCantidad("");
  };


  const borrarInsumo = () => {
    console.log("deletTratamiento");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM Trat_insumo WHERE T_name= ? and I_name=?`,
        
        [SelectTrat, Selecinsumo],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Insumo eliminado");
        
          } else {
            Alert.alert("El Insumo no existe");
          }
        }
      );
    });
  };

  const registerInsumo = () => {
  console.log("states", cantidad, Selecinsumo, SelectTrat);
  // validaciones estados

  
  debugger;

    //Validar si los campos de formularios tienen datos
    if (!cantidad.trim()) {
      Alert.alert("Ingrese la cantidad");
      return;
    }

    // Secuencia Sql que ingresa el usuario nuevo 
    db.transaction((tx) => {
      tx.executeSql(


      `INSERT INTO Trat_insumo (T_name, I_name, cantidad ) VALUES (?, ?, ?)`,
        [SelectTrat, Selecinsumo, cantidad ],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "insumo Agregado!!!",
              
              [
                {
                  text: "Ok",
              
                },
              ],
              { cancelable: false }
              
            );
          } else {
            Alert.alert("Error al registrar el insumo ");
          }

        },
        Alert.alert("Ya existe este insumo ")
      );
    });
    //ActualizarUser()
  };
  return (
// Formulario para ingresar los datos del nuevo Ususario
    <><MyText  text="Agregar Insumos a tratamiento" style={styles.Title} /><View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.keyboardView}>

          <MyText  text="Seleccionar Tratamiento" style={styles.TextDrop}  />
          <Dropdown data={Tratamiento} selected={setSelectTrat}/>


          <MyText  text="Seleccionar insumo" style={styles.TextDrop}  />
          <Dropdown data={insumo} selected={setSelecInsumo}/>


         

          <MyInputText
                      placeholder="Cantidad"
        
                      onChangeText={setCantidad}
                      style={styles.emailInput}
                      value={cantidad} />
        
    



          <MySingleButton
              title="Buscar Tratamiento"
              customPress={BuscarTratamiento} />
            <MySingleButton
              title="Guardar Insumo"
              customPress={registerInsumo} />
            <MySingleButton
              title="Borrar Insumo"
              customPress={borrarInsumo} />

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View></>
 
 
 
    
    )

}
export default InsumoATrat





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
TextDrop: {
  fontSize: 15,
  padding: 5,
  marginLeft: 25,

},

    Title:{
      fontSize: 20,
  alignSelf: "center",
  marginTop : 10,
  marginBottom: 20,
    }
  });
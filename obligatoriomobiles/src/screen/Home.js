import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

import conectionDb from "../database/conectionDb";
const db = conectionDb.getConnection();


const Home = ({ navigation }) => {
    useEffect(() => {
        db.transaction( (txn) => {
          txn.executeSql(
        
            `SELECT name FROM sqlite_master WHERE type='table' AND name='users'`,
            [],
             (tx, res) =>{
              console.log('itemU:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS users', []);
                txn.executeSql(
                  'CREATE TABLE  users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_app VARCHAR(40), ci VARCHAR(40), auto varchar(50) references auto(matricula) UNIQUE, UNIQUE(user_name, auto))',
                  [],);
              }
            }
          );
          txn.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='auto'`,
            [],
             (tx, res) =>{
              console.log('itemA:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS auto', []);
                txn.executeSql(
                  'CREATE TABLE auto(auto_id INTEGER PRIMARY KEY AUTOINCREMENT, matricula varchar(50) unique, marca VARCHAR(20), color VARCHAR(20), motorSr VARCHAR(40))',
                  [],);
              }
            }
          );

          txn.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='tratamiento'`,
            [],
             (tx, res) =>{
              console.log('itemT :', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS tratamiento', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS tratamiento(Trat_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), matricula varchar(50) references auto(matricula),costo varchar(50) , fechaIni VARCHAR(20), fechaFin VARCHAR(40), Unique(name, matricula))',
                  [],);
              }
            }
          );

          txn.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='repuesto'`,
            [],
             (tx, res) =>{
              console.log('itemR:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS repuesto', []);
                txn.executeSql(
                  'CREATE TABLE repuesto(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) unique)',
                  [],);
              }
            }
          );

          txn.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='insumo'`,
            [],
             (tx, res) =>{
              console.log('itemI:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS insumo', []);
                txn.executeSql(
                  'CREATE TABLE insumo(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) unique)',
                  [],);
              }
            }
          );

          txn.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='Trat_insumo'`,
          [],
           (tx, res) =>{
            console.log('itemTI:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS Trat_insumo', []);
              txn.executeSql(
                'CREATE TABLE Trat_insumo(id INTEGER PRIMARY KEY AUTOINCREMENT, T_name VARCHAR(50) references tratamiento(name), I_name VARCHAR(50) references insumo(name), cantidad varchar(10), unique(T_name, I_name))',
                [],);
            }
          }
        );

        txn.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='Trat_repuesto'`,
          [],
           (tx, res) =>{
            console.log('itemTR:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS Trat_repuesto', []);
              txn.executeSql(
                'CREATE TABLE Trat_repuesto (id INTEGER PRIMARY KEY AUTOINCREMENT, T_name VARCHAR(50) references tratamiento(name), R_name VARCHAR(50) references repuesto(name), cantidad varchar(10), unique(T_name, R_name))',
                [],);
            }
          }
        );




        });
      }, []);

      const removeElementsOnDatabase = () => {
        db.transaction( (txn) => {
          txn.executeSql('Drop Table tratamiento ',[]);

      
        });
      }


  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.viewContainer}>
      <View style={styles.generalView}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyButton
              title="Abm de usuario"
              btnColor="#438c99"
              
              btnIcon="user-plus"
              customPress={() => navigation.navigate("AbmUser")}
            />
         

      
            <MyButton
              title="Abm de Autos"
              btnColor="#438c99"
              
              btnIcon="car"
              customPress={() => navigation.navigate("AbmAutos")}
            />

            <MyButton
              title="Abm de Tratamiento"
              btnColor="#438c99"
              
     
              customPress={() => navigation.navigate("AbmTratamiento")}

            
            />

            <MyButton
              title="Abm de Repuestos"
              btnColor="#438c99"
              
          
              customPress={() => navigation.navigate("AbmRepuestos")}

            
            />

<MyButton
              title="Abm de Insumos"
              btnColor="#438c99"
              
    
              customPress={() => navigation.navigate("AbmInsumos")}/>


<MyButton
              title="Estadisticas"
              btnColor="#438c99"
              
    
              customPress={() => navigation.navigate("Estadisticas")}/>



<MyButton
                title="Borrar DB"
                btnColor="red"
                btnIcon="remove"
                customPress={() => removeElementsOnDatabase()}
                  />
         </ScrollView>
        </View>
      </View>
    </View>
   

    
       
  
  
  </SafeAreaView>

  
);
};
  

export default Home


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    viewContainer: {
      flex: 1,
      backgroundColor: "black",
    },
    generalView: {
      flex: 1,
      justifyContent: "center",
    },
  });
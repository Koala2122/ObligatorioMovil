import { StyleSheet, View, SafeAreaView, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from "react"
import MyText from '../components/MyText';
import conectionDb from '../database/conectionDb';
const db = conectionDb.getConnection();

const Estadisticas = () => {
  const [Estadisticas, setEstadisticas] = useState('');


    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
        
            
            `SELECT U.user_name, A.matricula, T.name, T.fechaIni, T.costo, 
           Case when EXISTS(Select * from Trat_repuesto Tr where Tr.T_name = T.name) 
           then 'Si'
            Else  'No' END  AS R
                      FROM  auto A inner join users U on A.matricula = U.auto inner join tratamiento T on A.matricula = T.matricula `, [], (tx, results) => {
            console.log("results", results);
            // validar resultado
            if (results.rows.length > 0) {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                setEstadisticas(temp);
            } else {
              Alert.alert(
                "Mensaje",
                "No hay Tratamiento!!!",
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
    
      const listItemView = (item) => {
        return (
    
          <View key={item.id} style={styles.listItemView}>
            <MyText text="Nombre del Cliente:"   style={styles.text}>   </MyText>
            <MyText text={item.user_name}   style={styles.text}>   </MyText>
    
    
            <MyText text="Matricula de auto:"   style={styles.text}>   </MyText>
            <MyText text={item.matricula}   style={styles.text}>   </MyText>

            <MyText text="Tratamiento:"   style={styles.text}>   </MyText>
            <MyText text={item.name}   style={styles.text}>   </MyText>
    
            <MyText text="Fecha de Tratamiento:"   style={styles.text}>   </MyText>
            <MyText text={item.fechaIni}   style={styles.text}>   </MyText>

            <MyText text="Costo:"   style={styles.text}>   </MyText>
            <MyText text={item.costo}   style={styles.text}>   </MyText>

            <MyText text="Utilizo Repuesto:"   style={styles.text}>   </MyText>
            <MyText text={item.R}   style={styles.text}>   </MyText>
    
          </View>
        );
      };
    
      //Contenedor donde se muestran todos los tratamiento
      return (
        <><MyText text="Todos los Trataminetos" style={styles.Title} /><SafeAreaView style={styles.container}>
          <View>
            <View>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={Estadisticas}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item }) => listItemView(item)} />
            </View>
    
          </View>
    
          
          
        </SafeAreaView></>
    //El boton para actualizar los tratamiento y mostrarlos en el contenedor 
      );


}
export default Estadisticas

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
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  },
  Title:{
    fontSize: 20,
alignSelf: "center",
marginTop : 50,
  }
});
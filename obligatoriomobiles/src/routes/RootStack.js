import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

// vamos a importar los componentes que vamoar a crear

import Home from "../screen/Home";
import AbmUser from "../screen/Usuarios/AbmUser";
import AbmAutos from "../screen/Autos/AbmAutos";
import AbmTratamiento from "../screen/Tratamiento/AbmTratamiento";
import AbmRepuesto from "../screen/Repuesto/AbmRepuesto";
import AbmInsumo from "../screen/Insumos/AbmInsumo";
import Estadisticas from "../screen/Estadisticas";

const RootStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerStyle: {
                backgroundColor: "#2168c4",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="AbmUser"
            component={AbmUser}
            options={{
              title: "Abm Usuarios",
              headerStyle: {
                backgroundColor: "#2168c4",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
    <Stack.Screen
            name="AbmAutos"
            component={AbmAutos}
            options={{
              title: "Abm Autos",
              headerStyle: {
                backgroundColor: "#2168c4",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
     


      <Stack.Screen
            name="AbmTratamiento"  
            component={AbmTratamiento}
            options={{
              title: "Abm de Tratamiento",
              headerStyle: {
                backgroundColor: "#2168c4",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

        <Stack.Screen
            name="AbmRepuestos"  
            component={AbmRepuesto}
            options={{
              title: "Abm de Repuesto",
              headerStyle: {
                backgroundColor: "#2168c4",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

<Stack.Screen
            name="AbmInsumos"  
            component={AbmInsumo}
            options={{
              title: "Abm de Insumos",
              headerStyle: {
                backgroundColor: "#2168c4",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

<Stack.Screen
            name="Estadisticas"  
            component={Estadisticas}
            options={{
              title: "Estadisticas",
              headerStyle: {
                backgroundColor: "#2168c4",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// exportar componente
export default RootStack;



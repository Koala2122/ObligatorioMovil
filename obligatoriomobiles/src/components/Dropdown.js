import React, { useState, useEffect } from "react";
import { StyleSheet, View} from "react-native";
import {Picker} from '@react-native-picker/picker';


const Dropdown = ({ data, selected, valueSelected = null}) => {
  const [selectedValue, setSelectedValue] = useState("");


  useEffect(() => {
    setSelectedValue(valueSelected);
  }, 
  [valueSelected])

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
   
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          selected(itemValue);
        }}
      >
        {data.map((item) => {
          return <Picker.Item label={item.label} value={item.value} />;
        })}
      </Picker>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    padding: 2,
  },

});

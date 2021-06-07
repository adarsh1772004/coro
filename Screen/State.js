import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";

export default class Covid extends React.Component {
  constructor() {
    super()
    this.state = {
      HospitalGlobal:'',
      States:'',
      search:'',
      arData:[]
    };
  }
  Covid19Global = async () => {
    var link = "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";
    return fetch(link)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          States: responseJson.regionData,
        });
      });
  };
  componentDidMount = async () => {
    await this.Covid19Global();
    var array = [];
    for (var i in this.state.States) {
      array.push(this.state.States[i]);
    }
    await this.setState({
      arData: array,
    });
  };
  SearchFilterFunction = (text) => {
    const newData = this.state.arData.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.region
        ? item.region.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      States: newData,
      search: text,
    });
  };
  render() {
   
    return (
      <View>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.States}
          renderItem={({ item }) => {
          
            return (
              <View style={styles.container}>
                <View style={styles.subcontainer}>
                  
                  <Text style={styles.text}>{item.region}</Text>
                </View>
                <View style={styles.subcontainer2}>
                  <Text>Recovered Cases:{item.recovered}</Text>
                  <Text>Active Cases:{item.activeCases}</Text>
                  <Text>Deaths:{item.deceased}</Text>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subcontainer: {},
  text: {
    marginLeft: 10,
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    borderWidth: 7,
    width: 362,
    height: 100,
    borderRadius: 25,

    marginTop: 40,
  },
  subcontainer2: {},
});

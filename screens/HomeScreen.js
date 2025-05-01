import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getMenu } from "../services/ApiSerivce";

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const Item = ({ name, price, description, image }) => {
    const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`;

    return (
      <View style={style.listItemCont}>
        <View style={style.listTextCont}>
          <Text style={style.name}>{name}</Text>
          <Text
            style={style.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
          <Text style={style.price}>{"$" + price}</Text>
        </View>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 100,
            height: 100,
            marginTop: 10,
          }}
        />
      </View>
    );
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.category === category);
      setFilteredData(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      price={item.price}
      description={item.description}
      image={item.image}
      category={item.category}
    />
  );

  useEffect(() => {
    const fetchData = async () => {
      const menu = await getMenu();
      setData(menu);
      setFilteredData(menu);
      const uniqueCategories = [...new Set(menu.map((item) => item.category))];
      setCategories(["All", ...uniqueCategories]);
      setSelectedCategory("All");
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={style.headerCont}>
              <Text style={style.headerText}>Little Lemon</Text>
              <View style={style.infoHero}>
                <View style={style.infoHeroText}>
                  <Text style={style.miniHead}>Chicago</Text>
                  <Text style={style.infoText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                </View>
                <Image
                  style={style.heroImage}
                  source={require("../assets/hero.png")}
                />
              </View>
              <TextInput />
            </View>
            <View>
              <Text style={style.orderHeader}>ORDER FOR DELIVERY!</Text>
            </View>
            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text
                  onPress={() => handleCategoryPress(item)}
                  style={[
                    style.categories,
                    {
                      backgroundColor:
                        selectedCategory === item ? "#ddd" : "#f5f5f5",
                    },
                  ]}
                >
                  {item}
                </Text>
              )}
              contentContainerStyle={{ padding: 10 }}
            />
          </View>
        }
        data={filteredData}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "#ddd", margin: 10 }} />
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 50,
    color: "#F4CE14",
    fontWeight: "bold",
    padding: 10,
  },
  miniHead: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
    marginTop: -15
  },
  headerCont: {
    flex: 0.3,
    flexDirection: "column",
    backgroundColor: "#495E57",
  },
  infoHero: {
    flexDirection: "row",
  },
  infoHeroText: {
    flexDirection: "column",
  },
  infoText: {
    width: 250,
    fontSize: 18,
    padding: 10,
    color: 'white',
  },
  listItemCont: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  heroImage: {
    width: 130,
    height: 130,
    borderRadius: 12,
  },
  listTextCont: {
    flexDirection: "column",
    padding: 10,
    width: 300,
    justifyContent: "space-between",
  },
  description: {
    color: "#566A63",
    fontSize: 15,
    paddingBottom: 10,
  },
  name: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 10,
  },
  price: {
    color: "#73837D",
    fontWeight: "bold",
    fontSize: 16,
  },
  categories: {
    marginRight: 10,
    padding: 8,
    borderRadius: 12,
    fontWeight: "bold",
  },
  orderHeader: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HomeScreen;

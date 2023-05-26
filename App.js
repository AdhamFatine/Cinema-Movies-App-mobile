import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, Button, TextInput } from "react-native";
import GridView from "./components/GridView";
import axios from 'axios';

const URL_API = 'https://api.themoviedb.org/3/movie/popular?api_key=caf9b1f2ec887b6da5eaf69008da8b67';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';
const SEARCH_URL ='https://api.themoviedb.org/3/search/movie?api_key=caf9b1f2ec887b6da5eaf69008da8b67&query=';

const api = axios.create({
  baseURL: URL_API,
});
const api_search = axios.create({
  baseURL: SEARCH_URL,
});
const App = ()=>{
  const [films, setFilms] = useState([]);
  const [numPage, setNumPage] = useState(1);
  const [kw, setKw] = useState('');
  useEffect(
    ()=>{
      //-------------------------
      const getFilms = async ()=>{
        api.get('', {params: {
          page: numPage,
        }})
        .then(
          rep => setFilms(rep.data.results)
        )
      }
      //-------------------------
      if(kw == ''){
        getFilms();
      }

    },[films, numPage, kw]
    
  )

  //---------------------------
    const rechercher = async (motCle)=>{
      api_search.get(motCle)
      .then(
        rep => setFilms(rep.data.results)
      );
    };
  return(
    <SafeAreaView style={styles.MainContainer}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <TextInput
          style={{borderWidth:1, borderColor: '#FFD700', fontSize:20, width:'60%', height: 50, marginRight:5}}
          onChangeText={(value)=> setKw(value)}
        />
        <View style={{width:'35%', height:50, margin:5, }}>
          <Button
            onPress={()=>{rechercher(kw);}}
            title="SEARCH"
            color="#FFD700"
            borderRadius='10%'
            style={{
              borderRadius: '10%',}}/>
        </View>
      </View>
      <FlatList 
        data={films}
        renderItem={({item}) => <GridView title={item.title} pic={IMG_URL + item.poster_path} date={item.release_date} overview={item.overview}/>}
        numColumns={2}
        keyExtractor={item => item.id}
      />
      <View style={{flexDirection: 'row', marginRight:10}}>
        <View style={{width:'45%', height:50, margin:10}}>
          <Button
            onPress={()=>{setNumPage(numPage - 1)}}
            title="PREVIOUS"
            color="#FFD700"/>
        </View>
        <View style={{width:'45%', height:50, margin:10}}>
          <Button
            onPress={()=>{setNumPage(numPage + 1)}}
            title="NEXT"
            color="#FFD700"/>
        </View>
      </View>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },  
    BtnStyle: {
      borderRadius: 10,
      backgroundColor: '#FFD7000'
    }
  },
);


export default App;
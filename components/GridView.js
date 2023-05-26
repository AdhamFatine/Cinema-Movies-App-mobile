import React, { useState } from 'react';
import {View, StyleSheet, Text, Image, Alert, Modal, Pressable} from 'react-native';

const GridView = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style = {styles.gridBox}>
            <Pressable onPress={()=> setModalVisible(true)}>
                <Image 
                    style = {styles.stlImg}
                    source={{uri : props.pic}}
                />
            </Pressable>
            {/*----------------Modal---------------------- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextTitle}>{props.title}</Text>
                        <Text style={styles.modalText}>{props.date}</Text>
                        <Text style={styles.overview}>{props.overview}</Text>
                        <Image
                            style={styles.stlImg2}
                            source={{uri: props.pic}}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Fermer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* --------------------fin modal----------------*/}
        </View>
    );
}
const styles = StyleSheet.create({
    gridBox:{
        flex: 1,
        height: 350, 
        margin: 2,
        elevation: 5,
    },
    stlImg :{
        width: '100%',
        height: 350,
        borderRadius: 10,
    },
    stlImg2 :{
        width: 300,
        height: 400,
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#FDD700',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        color: 'black',
        fontStyle: 'italic',
        fontSize: 30,
        textAlign: 'center',
      },
      modalTextTitle: {
        marginBottom: 15,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
      },
      overview : {
        fontSize: 14,
        textAlign: 'justify',
      },
});
export default GridView;
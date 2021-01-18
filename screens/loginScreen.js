import * as React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,TextInput, Alert, Image, Modal, ScrollView, KeyboardAvoidingView,} from 'react-native';
import firebase from 'firebase';
import db from '../config';
//import SantaAnimation from '../SantaClaus';

export default class LoginScreen extends React.Component {

    constructor(){
        super();
        this.state={
            emailId:"",
            password:"",
            first_name:"",
            last_name:"",
            address:"",
            mobile_no:"",
            username:"",
            confirmPassword:"",
            isModalVisible:false,
        }
    }

    showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    first_name: text
                  })
                }}
              />
              <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              last_name: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              mobile_no: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'orange'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
)
}

userSignUp = (emailId, password,confirmPassword) =>{
  if(password !== confirmPassword){
      return alert("password doesn't match\nCheck your password.")
  }else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then(()=>{
      db.collection("Users").add({
        "first_name":this.state.first_name,
        "last_name":this.state.last_name,
        "mobile_no":this.state.mobile_no,
        "email_id":this.state.emailId,
        "address":this.state.address,
      })
      return  alert(
           'User Added Successfully',
           '',
           [
             {text: 'OK', onPress: () => this.setState({isModalVisible : false})},
           ]
       );
    })
    .catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage)
    });
  }
}

userLogin = (emailId, password)=>{
  firebase.auth().signInWithEmailAndPassword(emailId, password)
  .then(()=>{
    return alert("Successfully Login")
    this.props.navigation.navigate("Donate")
  })
  .catch((error)=> {
    var errorCode = error.code;
    var errorMessage = error.message;
    return alert(errorMessage)
  }) 
}
    render(){
        return(
          <View style={styles.container}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
    
            </View>
              {
                this.showModal()
              }
            <View>
                <TextInput
                style={styles.loginBox}
                placeholder="abc@example.com"
                keyboardType ='email-address'
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              />
              <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              placeholder="enter Password"
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
            <TouchableOpacity
               style={[styles.button,{marginBottom:20, marginTop:20}]}
               onPress = {()=>{
                 this.userLogin(this.state.emailId, this.state.password)
               }}
               >
               <Text style={styles.buttonText}>Login</Text>
             </TouchableOpacity>
    
             <TouchableOpacity
               style={styles.button}
               onPress={()=>this.setState({ isModalVisible:true})}
               >
               <Text style={styles.buttonText}>SignUp</Text>
             </TouchableOpacity>
          </View>
        </View>
        )
      }
    }

    const styles = StyleSheet.create({
        container:{
         flex:1,
         backgroundColor:'pink',
         alignItems: 'center',
         justifyContent: 'center'
       },
       profileContainer:{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
       },
       title :{
         fontSize:65,
         fontWeight:'300',
         paddingBottom:30,
         color : 'red'
       },
       loginBox:{
         width: 300,
         height: 40,
         borderBottomWidth: 1.5,
         borderColor : 'red',
         fontSize: 20,
         margin:10,
         paddingLeft:10
       },
       KeyboardAvoidingView:{
         flex:1,
         justifyContent:'center',
         alignItems:'center'
       },
       modalTitle :{
         justifyContent:'center',
         alignSelf:'center',
         fontSize:30,
         color:'orange',
         margin:50
       },
       modalContainer:{
         flex:1,
         borderRadius:20,
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:"green",
         marginRight:30,
         marginLeft : 30,
         marginTop:80,
         marginBottom:80,
       },
       formTextInput:{
         width:"75%",
         height:55,
         alignSelf:'center',
         borderColor:'red',
         borderRadius:10,
         borderWidth:1,
         marginTop:20,
         padding:10
       },
       registerButton:{
         width:200,
         height:40,
         alignItems:'center',
         justifyContent:'center',
         borderWidth:1,
         borderRadius:10,
         marginTop:30
       },
       registerButtonText:{
         color:'red',
         fontSize:15,
         fontWeight:'bold'
       },
       cancelButton:{
         width:200,
         height:30,
         justifyContent:'center',
         alignItems:'center',
         marginTop:5,
       },
      
       button:{
         width:300,
         height:50,
         justifyContent:'center',
         alignItems:'center',
         borderRadius:25,
         backgroundColor:"orange",
         shadowColor: "black",
         shadowOffset: {
            width: 0,
            height: 8,
         },
         shadowOpacity: 0.30,
         shadowRadius: 10.32,
         elevation: 16,
         padding: 10
       },
       buttonText:{
         color:'white',
         fontWeight:'200',
         fontSize:20
       }
      })
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const{width, height} = Dimensions.get('window');


const Styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0A0914',
    marginTop:SafeAreaView,
    width: width,
    height:height,
  },
  Header:{
    height:50,
    width:width-10,
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems:'left',
  },
  AppName:{
    width:'60%',
    height:50,
    resizeMode:'cover',
    marginLeft:5,
  },
  listas: {
    width: width-20,
    minHeight:50,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    textAlign: 'center',
    marginLeft:5,
    marginRight:5,
    padding:0,
    backgroundColor:'#0C1623',
    color:'#fff',
    borderRadius:5,
    marginBottom:5,

    
  },
  ListDescription:{
    flex:0.8,
    textAlign:'left',
    paddingLeft:1,
    maxWidth:'95%',
    margin:8,
    color:'#fff',
  },

  ListStatus:{
    flex:0.1
  },
  IconLogOut:{
    position:'absolute',
    top:5,
    right:5,
    color:'#D80606',
    fontSize:25,
    padding:9,
  },
  IconTrash:{
    color:'#D80606',
    fontSize:25,
  },
  IconAddTasksContainer:{
    position:'absolute',
    bottom:20,
    width:50,
    height:50,
    right:20,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:'white'
  },
  IconAddTasks:{
    color:'blue',
    fontSize:25,
    padding:12,
  },
  IconCheck:{
    fontSize:25,
    padding:10,
    
  },

});

export default Styles;

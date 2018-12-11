/**
 * 意见审批页面
 *
 *
 *  liqiang  2018-10-18
 */
import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    Modal, Dimensions,
    Alert, Platform, StyleSheet,

} from 'react-native';

//import { SearchBar,Toast } from 'antd-mobile';
import SearchBar from 'antd-mobile/lib/search-bar';
import Toast from 'antd-mobile/lib/toast';
import screen from "../../common/screen";
import Server from "../../server/Server";
import Cstyles from "../../common/Cstyles";
import SelectUsers from './selectingPersons/selectUsers';

import CommonSign from '../CommonSign';


const height = Dimensions.get('window').height;

class ApprovalScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state={
            visible:false,//暂时没用到
            opinion:'',//意见

            chosePerson:this.props.navigation.state.params.button.person.length===1
                ?
                this.props.navigation.state.params.button.person
                :[],//已经选择到的人；；当只有一个人的时候，默认选择，
            onlyOnePerson:this.props.navigation.state.params.button.person.length===1,//是否只有一人
            operation:this.props.navigation.state.params.button,//获取传过来的按钮
            item:this.props.navigation.state.params.data,//获取传过来的数据
            loading:false,//加载
            commonsign:false,//控制弹出常用标语 的 modal
            sign:["同意","同意审批意见！","不同意！","通过审批"],//常用标语

            isChosePerson:this.props.navigation.state.params.isChosePerson,//判断是否需要指派人的那行

        }


    }

    //提交按钮
    async submit(){
        let ID = this.state.item.SERVICE_ID;//item 为从上个页面传过来的这条数据的信息 data

        let NI_ID = this.state.item.NI_ID;

        let CODE=this.state.operation.CODE;
        let NAME=this.state.operation.NAME;
        let type=this.state.operation.type;

        let person=[];
        this.state.chosePerson.map((item)=>
            person.push({ID:item.USER_CODE})
        )

        let operation={CODE,NAME,type,person}; // 传给接口的 具体的操作
        let suggestion= this.state.opinion;//意见

        let updateInfo ={};

        try
        {
            Toast.loading('Loading...', 0, () => {});
            let result= await Server.Submit({ID, operation, suggestion , NI_ID,updateInfo});

            Toast.hide();

            if (result.ok === '0') {
                Toast.info(result._MSG_,3);
                this.props.navigation.navigate('MainScreen');
            } else {
                Toast.info(result._MSG_,3);
            }

        }catch (e){
            console.log(e);
            Toast.hide();
            Alert.alert('网络超时');
        }
    }

    //获取常用标语
    async getCypyList(){
        try{
            Toast.loading('Loading...', 0, () => {});
            let result = await Server.getCypyList();
            Toast.hide();
            if(result.ok==='0'){
                this.setState({sign:result.DATA,commonsign:true});
                if(result.DATA.length == 0){

                    Toast.info('暂无数据...',3);
                }
            }else{
                Toast.info(result._MSG_,3);
            }
        }catch(e){
            Toast.info(e)
            Toast.hide();
        }
    }
    //选人 跳转到选人页面
    chosePerson(){

        let screen = 'SingleSelect';
        if(this.state.operation.multiSelect==='true'){
            screen = 'SelectContact';
        }

        this.props.navigation.navigate(screen,
            {
                onlyOnePerson:this.state.onlyOnePerson,
                setUser : this.state.operation.person,
                types:false,
                selectedPeople:this.state.chosePerson,
                operation:this.state.operation,
                ID:this.state.item.SERVICE_ID,
                selected:this.selectedPerson.bind(this)})
    }
    //回调函数，将人存到choseperson
    selectedPerson(item,type){

        this.setState({chosePerson:item});
    }
    //判断是否可以提交
    judge(){
        if(this.state.opinion===''){
            Alert.alert('提示','请输入审批意见')
        }else if(this.state.isChosePerson&&this.state.chosePerson.length===0){
            Alert.alert('提示',"请选择指派人")
        }else {
            Alert.alert(
                '提示',
                '确定提交吗',
                [
                    {text: '取消',  style: 'cancel'},
                    {text: '确定', onPress: () => this.submit()},
                ],
                { cancelable: true }
            )}
    }

    //获取意见
    getOpinion(item){
        this.setState({opinion:item.TITLE,commonsign:false})
    }
    //取消获取常用标语modal
    cancelSignModal(){
        this.setState({commonsign:false})
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: '#fff'}}>


                {/*弹出常用批语的modal*/}
                {
                    this.state.commonsign&&
                    <CommonSign
                        sign={this.state.sign}
                        getOpinion={this.getOpinion.bind(this)}
                        commonsign={this.state.commonsign}
                        cancelSignModal={this.cancelSignModal.bind(this)}
                    />

                }

                <View  style = {Cstyles.navi}>
                    {/*导航栏*/}
                    <TouchableOpacity
                        onPress = {()=>{this.props.navigation.pop()}}
                        style = {{flex : 1}}>
                        <Image source = {require('./image/back.png')}/>
                    </TouchableOpacity>
                    <View style = {{flex:6,justifyContent :'center',flexDirection:'row'}}>
                        <Text numberOfLines={1} style = {{color : '#ffffff',textAlign :'center',fontSize:18}}>意见审批</Text>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent :'flex-end',flex:1,}}
                                      onPress = {()=>{this.judge()}}>
                        <Text numberOfLines={1} style = {{color : '#ffffff',textAlign :'center',fontSize:15}}>提交</Text>
                    </TouchableOpacity>
                </View>
                {/*内容*/}
                <View>
                    <View style={{height:150,width:screen.width,borderWidth:1,borderColor:'#e8e8e8'}}>
                        <TextInput
                            placeholder="请输入审批意见"
                            placeholderTextColor='#999'
                            underlineColorAndroid='transparent'
                            multiline={true}
                            onChangeText={(text) => this.setState({opinion:text})}
                            value={this.state.opinion}
                            style={{fontSize:15,height:100,textAlign:'left',textAlignVertical:'top'}}/>
                        <TouchableOpacity style={{height:50,width:screen.width,justifyContent:'center',paddingLeft:10,}}
                                          onPress = {()=>{this.getCypyList()}}>
                            <View>
                                <Image source={require('./image/commonsign.png')} style={{width:78,height:21}}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/*指派人*/}
                    {
                        this.state.isChosePerson&&

                        <TouchableOpacity
                            onPress = {()=>{this.chosePerson()}}
                        >
                            <SelectUsers leftTitle="指派给" data={this.state.chosePerson}/>
                            <View style={{height:1, backgroundColor: '#e8e8e8'}}/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

export default ApprovalScreen

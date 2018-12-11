/**
 * 个人信息页面-共用
 * 2018-9-12 李红媛
 * 使用示例： this.props.param.navigation.navigate('PersonalInfoScreen',{data:item});//data:{NAME:’张丹’,ID:’1234’}
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity, Alert
} from 'react-native';
import Cstyles from "../../common/Cstyles";
import Server from "../../server/Server";
import {Toast} from "antd-mobile/lib/index";
import ListEmpty from "../../view/ListEmpty";

import TitleOnlyTitle from '../../common/component/TitleOnlyTitle';

class PersonalInfoScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        debugger;
        this.state={
            data:{},
            loading:true,
        }
        this.item = this.props.navigation.state.params.ID;
        console.log("aaaa",this.item);
    }

    async componentDidMount() {
        Toast.loading('loading...',3,()=>{})
        //获取详情数据
        try {
            let ID = this.item;
            let result = await Server.getPersonalInfo({ID});
            if(result.ok === '0' && result.DATA.length > 0){
                this.setState({
                    data:result.DATA[0],
                });
            }
            Toast.hide();
        }catch (e){
            console.log(e);
            Toast.info(e);
            Toast.hide();
        }
    }


    render() {
        let nameShort = this.state.data.NAME;
        if(nameShort && nameShort.length >0) {
            let length = nameShort.length;
            if(length >1) {
                nameShort = nameShort.substring(length-2,length)
            }else if(length > 0){
                nameShort = nameShort.substring(0,length)
            }
        }

        return (
            <View style={{flex:1,backgroundColor:'#F5F5F5'}}>
                {/*导航栏*/}
                <TitleOnlyTitle title={"个人信息"} param={this.props}/>
                {/*信息*/}
                <View style={{ flexDirection: 'row',height:88,borderWidth: 0.5, borderColor: "#e8e8e8",backgroundColor:'#FFFFFF',alignItems: 'center'}}>
                    <View style={{ width: 54, height: 54, borderRadius: 27  ,margin:15,backgroundColor:'#208ff7',justifyContent: 'center'}}>
                        <Text style={{textAlign:'center',fontSize:18,color:'#fff'}}>{nameShort}</Text>
                    </View>
                    <View style={{flex: 1,marginLeft:15}}>
                        <Text style={{flex: 1 ,marginTop:20,fontSize:15,color:'#333333'}}>{this.state.data.NAME}</Text>
                        <Text style={{flex: 1 ,fontSize:13,color:'#666666'}}>{this.state.data.CMPY}</Text>
                    </View>
                </View>


                <View style={{height: 0.5, backgroundColor: '#e8e8e8',marginTop:13}}/>
                <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',minHeight:44,paddingLeft:15,paddingRight:15}}>
                    <View style={{flex:0.25,flexDirection:'row',alignItems :'center'}}>
                        <Text style={{fontSize:15,color:'#333333',}}>性别</Text>
                    </View>
                    <View style={{flex:0.75,marginLeft:20,justifyContent :'center'}}>
                        <Text style={{fontSize:15,color:'#999999',textAlign:'right'}}>{this.state.data.SEX}</Text>
                    </View>
                </View>
                <View style={{height:0.5, backgroundColor: '#e8e8e8'}}/>
                <View style={{height: 0.5, backgroundColor: '#e8e8e8',marginTop:13}}/>
                <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',minHeight:44,paddingLeft:15,paddingRight:15}}>
                    <View style={{flex:0.25,flexDirection:'row',alignItems :'center'}}>
                        <Text style={{fontSize:15,color:'#333333',}}>手机号</Text>
                    </View>
                    <View style={{flex:0.75,marginLeft:20,justifyContent :'center'}}>
                        <Text style={{fontSize:15,color:'#999999',textAlign:'right'}}>{this.state.data.MOBILE}</Text>
                    </View>
                </View>
                <View style={{height:0.5, backgroundColor: '#e8e8e8'}}/>
                <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',minHeight:44,paddingLeft:15,paddingRight:15}}>
                    <View style={{flex:0.25,flexDirection:'row',alignItems :'center'}}>
                        <Text style={{fontSize:15,color:'#333333',}}>办公电话</Text>
                    </View>
                    <View style={{flex:0.75,marginLeft:20,justifyContent :'center'}}>
                        <Text style={{fontSize:15,color:'#999999',textAlign:'right'}}>{this.state.data.OFFICEPHONE}</Text>
                    </View>
                </View>
                <View style={{height:0.5, backgroundColor: '#e8e8e8'}}/>
                <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',minHeight:44,paddingLeft:15,paddingRight:15}}>
                    <View style={{flex:0.25,flexDirection:'row',alignItems :'center'}}>
                        <Text style={{fontSize:15,color:'#333333',}}>邮箱</Text>
                    </View>
                    <View style={{flex:0.75,marginLeft:20,justifyContent :'center'}}>
                        <Text style={{fontSize:15,color:'#999999',textAlign:'right'}}>{this.state.data.EMAIL}</Text>
                    </View>
                </View>
                <View style={{height:0.5, backgroundColor: '#e8e8e8'}}/>
                <View style={{height: 0.5, backgroundColor: '#e8e8e8',marginTop:13}}/>
                <View style={{flexDirection:'row',backgroundColor:'#FFFFFF',minHeight:44,paddingLeft:15,paddingRight:15}}>
                    <View style={{flex:0.25,flexDirection:'row',alignItems :'center'}}>
                        <Text style={{fontSize:15,color:'#333333',}}>部门</Text>
                    </View>
                    <View style={{flex:0.75,marginLeft:20,justifyContent :'center'}}>
                        <Text style={{fontSize:15,color:'#999999',textAlign:'right'}}>{this.state.data.DEPT}</Text>
                    </View>
                </View>
                <View style={{height:0.5, backgroundColor: '#e8e8e8'}}/>
            </View>
        );
    }
}


export default PersonalInfoScreen;
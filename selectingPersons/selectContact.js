/*
*   开始选择员工页面---公司-部门-员工
* */

import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    Text,
    StyleSheet,
    View,TouchableOpacity,Image,ScrollView,
    Alert
} from 'react-native';
import PropTypes from 'prop-types';

import {screen} from '../../../common/index';
import Cstyles from '../../../common/Cstyles';

import SelectedPeopleItem from './selectedPeopleItem'
//import { List,WhiteSpace} from 'antd-mobile';
import List from 'antd-mobile/lib/list';
import WhiteSpace from 'antd-mobile/lib/white-space';
import  SelectedCD from './selectedCD';
import SelectedOrdeleteUser from  './selectedOrdeleteUser'
import  ScheduleUtil from  './ScheduleUtil';

// import  Server from  '../../common/Server';
// import  ErrorHandler from '../../common/ErrorHandler';



const { width, height } = Dimensions.get('window');
const now = new Date();

class SelectContactSrc extends Component {

    static navigationOptions = {
        header: null
    };
    static propTypes = {

        sureClicked:  PropTypes.func
    }

    static defaultProps = {
        sureClicked: function () { }
    }
    constructor(props) {
        super(props);
        this.state = {
            type : false,//true : 公司或部门,false:员工
            selectedData : [],//选中的公司或部门
            selectingData : [],//列表当前展示的数据
            selectedPeople : [],//已经选中的员工
            data: this.props.navigation.state.params.setUser,//所有的数据
            onlyOnePerson:this.props.navigation.state.params.onlyOnePerson,//是否只有一个人
        };
        this.state.selectedPeople = this.props.navigation.state.params.selectedPeople;
       this.state.selectingData = this.state.data;

       console.log("props",props);

    }
    componentWillMount() {
    }

    //点击了公司和部门的列表
    clickCompany1 = (data)=>{
        debugger
        let selectedArr = this.state.selectedData.concat([data])
         if (data.departments && data.departments != undefined && data.departments.length >0){
             //部门

             this.setState({
                 type: true,
                 selectingData : data.departments,
                 selectedData : selectedArr
             })
         }else if (data.employees && data.employees != undefined && data.employees.length >0){
             //人员
             this.setState({
                 type: false,
                 selectingData : data.employees,
                 selectedData : selectedArr
             })
         }
    }

    //点击了员工列表
    clickedPeople = (data,is)=>{
        debugger
          // is 此参数无用
          let  isContain = ScheduleUtil.contains(this.state.selectedPeople,data)

          if(!isContain){
              let  ar = this.state.selectedPeople.concat([data])
            this.setState({
                selectedPeople : ar
            })
          }else {
              let arr = this.state.selectedPeople;
              for (var i = 0; i < arr.length; i++) {
                  if (arr[i].USER_CODE === data.USER_CODE) {
                       arr.splice(i,1)
                  }
              }
              this.setState({
                  selectedPeople : arr.concat([]),
              })
              console.log("select",this.state.selectedPeople);

          }
    }
    //点击了选中的员工的标签
    clickOrDeletePeople = (data,index)=>{
        // data.Ref.setIsSelected()
        if(this.state.onlyOnePerson){
            Alert.alert('提示','默认选中，无法取消')
        }else{
            this.state.selectedPeople.splice(index,1)
            this.setState({
                selectedPeople : this.state.selectedPeople.concat([])
            })
        }


    }

    //点击了公司部门标签
    clickCD = (data,index)=>{

        if (index == -1){
            //点击了请选择

        }else if (index == 0){
            this.setState({
                type: true,
                selectingData : this.state.data,
                selectedData : [],
            })
        }else {
            this.setState({
                type: true,
                selectingData : this.state.selectedData[index-1].departments,
                selectedData : this.state.selectedData.slice(0,index),
            })
        }

    }
    //搜索员工并选定后返回
    searchPeopleBack = (item)=>{
        let  isContain = ScheduleUtil.contains(this.state.selectedPeople,item)
        if (!isContain){
            this.state.selectedPeople.push(item)
            this.setState({
                selectedPeople : this.state.selectedPeople.concat([])
            })
        }

    }

    refreshUI = ()=>{
        this.state.data.map((item,index)=>{

            return (
                <List.Item disabled extra="" arrow="horizontal" style={{height:46}} onClick={() => {
                    this.clickCompany1(item)
                }}>
                    <Text style={{fontSize: 15, color: "#333333"}}>{item.USER_NAME}</Text>
                </List.Item>
            )
        })
    }
    render() {
        let isPeoples = this.state.selectedPeople.length >0 ? true: false;

        return (
            <View style = {{flex:1,backgroundColor:'#f5f5f5'}}>
                <View  style = {Cstyles.navi}>
                     {/*导航栏*/}
                    <View style = {{flex : 1,}}>
                                <TouchableOpacity
                                    onPress = {()=>{this.props.navigation.goBack()}}
                                >
                                    <Image
                                        style={{}}
                                        source = {require('../image/back.png')}
                                    /></TouchableOpacity>
                    </View>
                    <View style = {{flex:2,justifyContent :'center'}}>
                        <Text style = {{color : '#fefefe',textAlign :'center',fontSize:18}}> 选择操作人</Text>
                    </View>
                    <View  style={{flexDirection:'row',justifyContent :'flex-end',flex:1,}}>
                        <Text style={{fontSize: 15,color: "#fefefe",opacity: 1}}
                            onPress = {()=>{
                                this.props.navigation.state.params.selected &&
                                this.props.navigation.state.params.selected(this.state.selectedPeople,this.props.navigation.state.params.types)
                                this.props.navigation.goBack()

                            }} >确定</Text>
                    </View>
                </View>

                {/*搜索*/}
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('SearchPeople',{searchPeopleBack :this.searchPeopleBack,operation:this.props.navigation.state.params.operation,ID:this.props.navigation.state.params.ID});
                        // this.props.navigation.navigate('SearchScreen');
                    }
                    }>
                    <View style={{ width : screen.width - 18, height : 29,  marginLeft : 9,
                        marginRight : 9,  flexDirection : 'row',justifyContent : 'center', alignItems : 'center',backgroundColor : '#FFFFFF',
                        borderRadius:4,marginTop:8
                    }}>
                        <Image source={require("../image/search.png")}
                               style={{ marginRight : 5}}/>
                        <Text style={{fontSize: 13,color: "#666666"}}>搜索</Text>
                    </View>
                </TouchableOpacity>
                {/*用户名字*/}
                <View style={{ width : screen.width,padding:9,backgroundColor:'#f5f5f5'}}>
                     {/*展示选中的员工*/}
                    { isPeoples ?
                        <View style={{ width : screen.width,padding:9,alignItems:'center'}}>


                            <View style={{ width : screen.width,marginLeft:15,marginRight:15,marginBottom:10,flexDirection:'row',flexWrap:'wrap',}}>
                                {
                                    this.state.selectedPeople.map((item,index)=>{

                                        return  <SelectedOrdeleteUser
                                                  style={{ marginRight: 10,marginBottom:10}}
                                                  data={item} index={index} cellClicked={this.clickOrDeletePeople} key={index}/>
                                    })
                                }
                            </View>
                            <Text style={{fontSize: 12,color: "#c5c5c5"}}>{this.state.onlyOnePerson&&this.state.onlyOnePerson?'默认选中，无法操作':'点击名字可删除'}</Text>
                        </View>
                    : null

                    }

                     {/*展示 公司 部门*/}
                    <View style={{ width : screen.width,padding:9,backgroundColor:'#f5f5f5',flexDirection:'row',flexWrap:'wrap'}}>
                          {
                             this.state.selectedData.map((item,index)=>{

                              return  <SelectedCD data={item} index={index} cellClicked={this.clickCD} key={index}/>
                           })
                           }
                             <Text style={{fontSize: 13,color: "#999999",marginTop:1,}}
                                      onPress = {()=>{ this.clickCD(null,-1)}}
                                     >请选择</Text>
                    </View>
                </View>


                <View style={{flex:1,}}>
                    <ScrollView
                        style={{ flex: 1, backgroundColor: '#f5f5f9' }}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <List >

                            {

                                this.state.selectingData.map((item,index)=>{
                                   if (this.state.type) {
                                       return (

                                           <List.Item  arrow="horizontal" style={{height: 46,width:screen.width}} key ={index}
                                                       onClick={() => {
                                                           this.clickCompany1(item)
                                                       }}>
                                               <View style = {{flex:1 ,justifyContent:'center'}}>
                                               <Text style={{fontSize: 15, color: "#333333"}}>{item.USER_NAME}</Text>
                                               </View>
                                           </List.Item>

                                       )
                                   }else {
                                       return (
                                           <SelectedPeopleItem
                                               onlyOnePerson={this.state.onlyOnePerson}
                                               param={this.props}
                                               data={item} key ={index}
                                               selectedP = {this.state.selectedPeople}
                                               cellClicked={(itemData,is) => {
                                                   this.clickedPeople(itemData,is)
                                               }}/>
                                       )
                                   }
                                })


                            }

                        </List>
                    </ScrollView>
                </View>


            </View>
        );
    }
}

export default SelectContactSrc;

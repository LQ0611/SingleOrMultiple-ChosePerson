/*
*
*  多选员工的 多选列表组件
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

//import { List } from 'antd-mobile';
import List from 'antd-mobile/lib/list';

import  ScheduleUtil from  './ScheduleUtil'


class SelectedPeopleItem extends Component {

    static propTypes = {


        data: PropTypes.object,
        cellClicked:  PropTypes.func

    }

    static defaultProps = {

        data: {},
        cellClicked: function () { },

    }
    constructor(props) {
        super(props);

        debugger
        this.state = {
             isSelected : false
        };
    };
    clickedItem = ()=>{
        // this.props.data.Ref = this.ref;
        // this.setState({
        //     isSelected: !this.state.isSelected
        // },()=>{
        //     this.props.cellClicked && this.props.cellClicked(this.props.data,this.state.isSelected)
        // })
        this.props.cellClicked && this.props.cellClicked(this.props.data,this.state.isSelected)

    }
    setIsSelected = ()=>{
        this.setState({
            isSelected: false
        })
    }
    handleRef = ref => {
        this.ref = ref;
    }

    showPersonDetail(data){
        console.log(data);
        let item ={ID:data.USER_CODE,NAME:data.USER_NAME} ;
        this.props.param.navigation.navigate('PersonalInfoScreen',{ID:data.USER_CODE})
    }

    render() {
         let imageU = ScheduleUtil.contains(this.props.selectedP,this.props.data) ? require('../image/checks_selected.png') : require('../image/checks.png')


        return (
            <List.Item disabled   align='middle' style={{height:50}}

                       onClick={() => {
                           this.props.onlyOnePerson&&this.props.onlyOnePerson?Alert.alert('提示','默认选中，无法取消'):
                         this.clickedItem()
                        }}>
                <View style={{ flexDirection:'row',alignItems:'center',flex:1}}

                  >
                    <TouchableOpacity
                        onPress={()=>{this.showPersonDetail(this.props.data)}}
                    >
                        <View style = {{justifyContent:'center',alignItems:'center',
                            width : 35,height:35,borderRadius: 17,backgroundColor :'#208ff7',
                            marginRight:7
                        }}>
                            <Text style ={{fontSize: 12, color: "#ffffff"}}>{this.props.data.USER_NAME.slice(this.props.data.USER_NAME.length-2)}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style ={{fontSize: 15, color: "#333333",marginLeft:10}}>{this.props.data.USER_NAME}</Text>
                    <View style ={{flex:1,alignItems:'flex-end'}}>
                        <Image
                            style={{}}
                            source = {imageU}
                        />
                    </View>
                </View>
            </List.Item>
        );
    }
}


const styles = StyleSheet.create({

});
export default SelectedPeopleItem;

/*
*  一行显示已选择的部门
*  guoxinlei 2018/9/11
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
import {screen} from '../../../common';


class SelectUsers extends Component {

    static propTypes = {

        leftTitle: PropTypes.string.isRequired,
        // rightTitle:PropTypes.number.isRequired,
        data: PropTypes.array,
        cellClicked:  PropTypes.func,

    }

    static defaultProps = {
        leftTitle: '',
        // rightTitle: 0,
        data: [],
        cellClicked: function () { },
        // key : "peop"
    }
    constructor(props) {
        super(props);
        this.num =   Math.floor((screen.width*0.5)/35)
        debugger
        this.state = {

        };
    };

    render() {
        return (

                <View style = {{width : screen.width,height:55,flexDirection:'row',backgroundColor:'#ffffff',borderBottomColor :'#e8e8e8',borderBottomWidth:0.5,justifyContent:'center',alignItems:'center'}}>
                    <View style = {{flex:2,justifyContent:'center',alignItems:'flex-start',}}>
                        <Text style = {{ fontSize: 15,marginLeft : 10,
                            color: "#333333"}}>{this.props.leftTitle}</Text>
                    </View>

                    <View style = {{flex:6,flexDirection:'row',backgroundColor:'#ffffff',justifyContent:'flex-end',marginRight:0}}>

                        {
                            this.props.data.map((item,index)=>{
                                if (index< this.num-1){
                                    return (
                                        <View key ={index} style = {{justifyContent:'center',alignItems:'center',
                                            width : 35,height:35,borderRadius: 17,backgroundColor :'#208ff7',
                                            marginRight:7
                                        }}>

                                                    <Text style ={{fontSize: 12, color: "#ffffff"}}>{item.USER_NAME.slice(item.USER_NAME.length-2)}</Text>

                                        </View>
                                    )
                                }else if (index == this.num-1){
                                    return (
                                        <View key ={index} style = {{justifyContent:'center',alignItems:'center',
                                            width : 35,height:35,borderRadius: 17,backgroundColor :'#208ff7',
                                            marginRight:7
                                        }}>
                                            <Text style ={{fontSize: 12, color: "#ffffff"}}>......</Text>

                                        </View>
                                    )
                                }else {
                                     return null;
                                }

                            })
                        }

                    </View>


                    <View style = {{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
                                <Text style = {{ fontSize: 15,marginRight:5,
                                    color: "#999999"}}>{this.props.data.length + '人'}</Text>

                        <Image
                            style={{marginRight:10}}
                            source = {require('../image/rightR.png')}
                        />
                    </View>

                </View>
        );
    }
}


const styles = StyleSheet.create({

});
export default SelectUsers;

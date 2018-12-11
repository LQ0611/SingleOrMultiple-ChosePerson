/*
*
*  选中的 公司 部门 标签
* */

import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    Text,
    StyleSheet,
    View,TouchableOpacity,Image,
    Alert
} from 'react-native';
import PropTypes from 'prop-types';


class SelectedCD extends Component {

    static propTypes = {

        index : PropTypes.number,
        data: PropTypes.object,
        cellClicked:  PropTypes.func
    }

    static defaultProps = {
        index : 0,
        data: {},
        cellClicked: function () { }
    }
    constructor(props) {
        super(props);

        this.state = {

        };
    };
    clickedItem = ()=>{
        this.setState({

        })

    }
    render() {
        return (
            <View
                style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10}}
            >
                <Text style={{fontSize: 13,
                    color: "#0083f1"}}
                    onPress = {()=>{this.props.cellClicked && this.props.cellClicked(this.props.data,this.props.index)}}
                >
                    {this.props.data.name}
                </Text>
                <Image
                    style={{marginLeft:5,marginRight:5}}
                    source = {require('../image/rightR.png')}
                />

            </View>
        );
    }
}


const styles = StyleSheet.create({

});
export default SelectedCD;

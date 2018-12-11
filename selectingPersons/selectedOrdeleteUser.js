/*
*
*  选中的 的员工 标签 点击删除,,在选择联系人的上部展示哦
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



class SelectedOrdeleteUser extends Component {

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
            <TouchableOpacity
                style={{...this.props.style}}
                onPress = {()=>{this.props.cellClicked && this.props.cellClicked(this.props.data,this.props.index)}}
            >
            <View
                style={{justifyContent:'center',alignItems:'center',
                    borderRadius: 2.5,height :22,
                    backgroundColor: "#d6efff",
                    borderStyle: "solid",
                    borderWidth: 1,paddingLeft:5,paddingRight:5,
                    borderColor: "#4dbaff"}}
            >
                <Text style={{fontSize: 12,
                    color: "#00a7ed",}}

                >
                    {this.props.data.USER_NAME}
                </Text>

            </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({

});
export default SelectedOrdeleteUser;

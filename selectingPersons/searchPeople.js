/**
 *
 *   通过人名,搜索该人
 *
 *   add by liqiang 18-9-11
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SectionList,
    Platform,
    NativeEventEmitter,
    NativeModules,
    FlatList,StatusBar
} from 'react-native';
import PropTypes from 'prop-types';

//import { SearchBar,Toast } from 'antd-mobile';
import SearchBar from 'antd-mobile/lib/search-bar';
import Toast from 'antd-mobile/lib/toast';
import {screen} from '../../../common';

import Cstyles from '../../../common/Cstyles';

import  Server from '../../../server/Server';
import  ErrorHandler from '../../../common/ErrorHandler';

class SearchPeople extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header : null
    });

    static propTypes = {
        cellClicked:  PropTypes.func
    }

    static defaultProps = {
        cellClicked: function () { }
    }

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            value : '',

        };
    }

    componentDidMount() {
        StatusBar.setBarStyle('dark-content',true);

    }

    componentWillUnmount() {
        //记得移除定时器
        StatusBar.setBarStyle('light-content',true);
    }


    // 搜索数据
    loadData = async (text)=>{
        try
        {
            let keyword = text;
            let ID = this.props.navigation.state.params.ID;
            let operation= this.props.navigation.state.params.operation;
            Toast.loading('Loading...', 0, () => {});
            let result = await Server.searchUser({ID,keyword,operation});
            Toast.hide();
            if (result.ok === "0") {
                this.setState({
                    dataList : result.DATA
                });
                if(result.DATA.length == 0){

                    Toast.info('暂无数据...',3);
                }
                // this.popmemuTimeout = setTimeout(() => {
                //
                // }, 20);
            }else{
                Toast.info(result._MSG_,3);
            }


        }catch (e){
            Toast.hide();
            ErrorHandler.alert(e);
        }

    }

    ItemClicked = (itemData)=>{

    }



    // 与列表有关的函数
    _keyExtractor = (item, index) => "index"+index;
    renderListItem = ({item, index}) => {

        return (
            <TouchableOpacity
                onPress = {()=>{
                    this.props.navigation.state.params.searchPeopleBack &&
                    this.props.navigation.state.params.searchPeopleBack(item)
                    this.props.navigation.goBack();

                }}
            >
                <View style = {{ flex : 2,backgroundColor : '#ffffff',flexDirection : 'row',
                    paddingLeft:10,paddingRight:5,paddingTop:15,paddingBottom:15,borderBottomColor:"#e8e8e8",borderBottomWidth:1}}>
                    <View style = {{justifyContent:'center',alignItems:'center',
                        width : 35,height:35,borderRadius: 17,backgroundColor :'#208ff7',
                        marginRight:7
                    }}>
                        <Text style ={{fontSize: 12, color: "#ffffff"}}>{item.USER_NAME.slice(item.USER_NAME.length-2)}</Text>
                    </View>
                    <View style = {{flex : 5,backgroundColor : '#ffffff',justifyContent : 'center'}}>
                        <Text numberOfLines ={1} style = {{
                            fontSize: 15,
                            color: "#333333" }}>{item.USER_NAME}</Text>
                        <Text style = {{ marginTop : 5, overflow : 'hidden',height: 19,
                            fontSize: 13,
                            color: "#999999"}}>{item.CMPY_NAME + '    ' + item.DEPT_NAME}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
    onSubmit = (value: any) =>{
        if (value === ''){
            Toast.info('请输入搜索内容', 1, null, false);
        }else {
            this.loadData((value))
        }
    }

    onChange = (value: any) => {
        debugger
        this.setState({ value });

    }

    clear = () => {
        debugger
        this.setState({ value: '' });
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{backgroundColor: '#ffffff',flex : 1}}>

                <View style={Cstyles.search_navi}>

                    <SearchBar
                        value={this.state.value}
                        placeholder="姓名"
                        onSubmit={(value: any) => this.onSubmit(value)}
                        onCancel={this.clear}
                        onChange={this.onChange}
                        showCancelButton
                        returnKeyType = {'search'}
                        autoFocus = {true}
                    />

                </View>

                <FlatList
                    data={this.state.dataList}
                    renderItem={this.renderListItem}
                    refreshing={this.state.loading}
                    style={{marginBottom:40}}
                />

            </View>
        );
    }
}


export default SearchPeople;

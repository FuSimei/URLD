import React, { Component } from 'react';
import areaData from '../untils/method';
import { Input, Cascader, DatePicker, Button } from 'antd';
const Search = Input.Search;
const {  RangePicker } = DatePicker;

console.log(areaData)

class SearchList extends Component {
    state = {
        valueInput: '',
        valuePlace: '',
        valueDate: undefined
    }

    onChangeInput = (e) => {
        this.setState({
            valueInput: e.target.value
        }, this.onClickValue)
    }

    onChangePlace = (valuePlace) => {
        this.setState({
            valuePlace
        })
    }

    onChangeDate = (valueDate) => {
        this.setState({
            valueDate
        })
    }

    onClickValue = () => {
        // console.log(valueInput, valuePlace, valueDate);
        if(this.props.onClickSearch){
            const { valueInput, valuePlace, valueDate } = this.state;
            this.props.onClickSearch({ valueInput, valuePlace, valueDate });
        }
    }

    onClickReset = () => {
        const { valueInput, valuePlace, valueDate } = this.state;
        this.setState({
            valueInput: '',
            valuePlace: '',
            valueDate: ''
        })
    }

    render () {
        const { valueInput, valuePlace, valueDate } = this.state;
        return(
            <div className="searchList">
                <div>
                    <Search
                        value={valueInput}
                        onChange={this.onChangeInput}
                    />
                </div>
                <div>
                    <Cascader 
                        options={areaData.children}
                        value={valuePlace} 
                        onChange={this.onChangePlace} 
                        placeholder="Please select" 
                    />
                </div>
                <div>
                    Createtime:
                    <RangePicker 
                        value={valueDate}
                        onChange={this.onChangeDate} 
                    />
                </div> 
                <div>
                    <Button 
                        type="primary"
                        onClick={this.onClickValue}
                    >
                        Search
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={this.onClickReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        )
    }
}

export default SearchList;
import React, { Component } from 'react';
import './App.css';
import SearchList from './components/search-list';
import TableMotion from './components/table-motion';
import CreateList from './components/create-list';
import RemoveItem from './components/remove-item';
import moment from 'moment';
import { Table, Avatar, Popconfirm, Button } from 'antd';

const colorData = () => (
  Math.ceil(Math.random()*255)
)

class App extends Component {
  state={
    dataValue: [],
    selectedRow: [],
    motion: true, // true 增大； false: 减小
    size: 'small',
    searchValue: {},
    updatePersonKey: -1,
    modalType: 'create',
    visible: false
  }

  columns = [{
    title: 'Avatar',
    dataIndex: 'avatarUrl',
    align: 'center',
    render: (text,value) => <Avatar style={{background: text}}>{value.name[0]}</Avatar>,
    // width: 90,
  },{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
    align: 'center',
    // width: 120
  },{
    title: 'NickName',
    dataIndex: 'nickname',
    align: 'center',
    // width: 150,
  },{
    title: 'Age',
    dataIndex: 'age',
    align: 'center',
    // width: 70
  },{
    title: 'Gender',
    dataIndex: 'gender',
    align: 'center',
    // width: 100,
  },{
    title: 'Phone',
    dataIndex: 'phone',
    align: 'center',
    // width: 200
  },{
    title: 'Email',
    dataIndex: 'email',
    align: 'center',
    // width: 200
  }, {
    title: 'Address',
    dataIndex: 'address',
    align: 'center',
    render: text => text.reduce((pre, item) => pre + JSON.parse(item).name, '')
    // width: 200
  },{
    title: 'CreateTime',
    dataIndex: 'createtime',
    align: 'center',
    // width: 200
  },{
    title: 'Option',
    dataIndex: 'option',
    align: 'center',
    render: (text, value) => {
      // console.log("text", text);
      // console.log("value", value);
        return (
          <div>
            <Popconfirm title="Are you sure delete this task?" onConfirm={()=>this.onConfirm(value)}  okText="Yes" cancelText="No">
                <a href="#">Delete / </a>
            </Popconfirm>
            <span onClick={() => this.onClickUpdate(value)}>
                <a href="#">UpDate</a>
            </span>
        </div>
        )
    },
   }
  ];

  onConfirm = (value) => {
    const dataValue = [...this.state.dataValue];
    const selectedRow = [...this.state.selectedRow];
    this.setState({
      dataValue: dataValue.filter(item => item.key !== value.key),
      selectedRow: selectedRow.filter(item => item.key !== value.key)
    })
  }

  onChangeSelect = (selectedRowKeys, selectedRows) => {
    const selectedRow = this.state.selectedRow;
    this.setState({
      selectedRow: selectedRows
    })
  }

  onClickRemove = () => {
    const dataValue = [...this.state.dataValue];
    const selectedRow = [...this.state.selectedRow];
    const selectKey = selectedRow.map(item => item.key);
    this.setState({
      dataValue: dataValue.filter(item => !selectKey.includes(item.key)),
      selectedRow: selectedRow.filter(item => !selectKey.includes(item.key)),
    })
  }

  onClickUpdate = (value) => {
    this.setState({
      modalType: 'update',
      updatePersonKey: value.key,
      visible: true,
    });
  }

  handleSubmit = (formData)=> {
    const { dataValue, modalType, updatePersonKey } = this.state;

    if (modalType === 'create') {
      formData.key = `${dataValue.length}`;
      formData.createtime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      // formData.avatarUrl = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
      formData.avatarUrl = `rgb(${colorData()},${colorData()},${colorData()})`
      this.setState({
        dataValue: [...dataValue, formData]
      })
    } else {
      this.setState({
        dataValue: dataValue.map(item => item.key === updatePersonKey ? 
          {...item, ...formData} : item),
        // visible: false,
      })
    }
  }

  onChangeTable = () => {
    const { motion,size } = this.state;
    if(motion) {
      this.setState({
        size: 'middle',
        motion: false,
      })
    }else{
      this.setState({
        size: 'small',
        motion: true,
      })
    }
  }

  onClickSearch = (searchValue) => {
    console.log("searchValue", searchValue)
    this.setState({
      searchValue
    })
  }

  computedData = () => {
    const { dataValue, searchValue} = this.state;
    const { valueInput, valuePlace, valueDate } = this.state.searchValue;
    return dataValue
      .filter(item => valueInput ? item.name.indexOf(valueInput) !== -1 : true)
      .filter(item => valuePlace ? item.address.toString() === valuePlace.toString() : true)
      .filter(item => valueDate ? moment(item.createTime).isBetween(...valueDate) : true)
  }

  getInitialFormValue() {
    const { modalType, updatePersonKey, dataValue } = this.state;
    return modalType === 'create' ? {} : dataValue.find(item => item.key === updatePersonKey) || {};
  }

  onShowModal = () => {
    this.setState({ 
      visible: true, 
      modalType: 'create',
      updatePersonKey: -1,
    })
  }
  onCancel = () => {
    const visible = this.state.visible;
    this.setState({
      visible: false
    })
  }
  
  render() {
    const { dataValue, size, selectedRow, modalType, visible } = this.state;
    const rowSelection = {
      onChange: this.onChangeSelect
    };
    return (
      <div className="App">
        <SearchList 
          onClickSearch={this.onClickSearch}
        />
        <TableMotion 
          onChangeTable={this.onChangeTable}
        />
        <div className="createList">
          <Button
            onClick={this.onShowModal}
          >
          Create
          </Button>
          <CreateList
              visible={visible}
              initialValue={this.getInitialFormValue()}
              formType={modalType}
              onCancel={this.onCancel}
              // onCreate={this.onCreate}
              handleSubmit={this.handleSubmit} 
          />
        </div>
        <RemoveItem
          itemNum= {selectedRow.length}
          onClickRemove={this.onClickRemove}
        />
        <Table className="tableList"
            columns={this.columns} 
            dataSource={this.computedData()}
            bordered
            rowSelection={rowSelection}
            onChange={this.onChangeSelect}
            size={size}
       />
      </div>
    );
  }
}

export default App;

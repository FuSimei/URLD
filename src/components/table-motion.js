import React, { Component } from 'react';
import { Switch } from 'antd';

class TableMotion extends Component{
    render () {
        const { onChangeTable } = this.props;
        return (
            <div className="tableMotion">
                <Switch 
                    checkedChildren="Motion" 
                    unCheckedChildren="Motion"
                    onChange={onChangeTable}
                />
            </div>
        )
    }
}

export default TableMotion;
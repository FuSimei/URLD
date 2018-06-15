import React, { Component } from 'react';
import { Button } from 'antd';

class RemoveItem extends Component{
    render() {
        const { onClickRemove, itemNum } = this.props;
        return (
            <div className={!itemNum ? "isShow" : ""} >
                <div className="show-style">
                    <span>Select { itemNum } items</span>
                    <Button 
                        type="primary"
                        onClick={onClickRemove}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        )
    }
}

export default RemoveItem;

import React, { Component } from 'react';
import { Form, Input, Checkbox, Modal, Cascader, Radio, InputNumber } from 'antd';
import areaData from '../untils/method';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
};

class DataForm extends Component{
    onCancel = () => {
        this.props.onCancel();
    }

    onCreate = () => {
        const { form, handleSubmit } = this.props;
        // const {handleSubmit} = this.props;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          handleSubmit(values);
          console.log('Received values of form: ', values);
          form.resetFields(); //清空表单里的值
          this.props.onCancel();  //模态框关闭
        });
    }
  
    render() {
        const { form, visible, initialValue, formType} = this.props;
        console.log(initialValue)
        
        const { getFieldDecorator} = form;
        return (
          <Modal
            visible={visible}
            title="Create User"
            okText={formType}
            onCancel={this.onCancel}
            onOk={this.onCreate}
          >
            <Form>            
                <FormItem {...formItemLayout} hasFeedback label="Name">
                    {getFieldDecorator('name', {
                        initialValue: initialValue.name || '',
                        rules: [{
                            required: true,
                            message: 'name is required',
                            }],
                        })(
                            <Input />
                        )}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback label="Nickname">
                    {getFieldDecorator('nickname', {
                        initialValue: initialValue.nickname,
                        rules: [{
                            required: true,
                            message: 'nickname is required',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback label="Gender">
                    {getFieldDecorator('gender', {
                        initialValue: initialValue.gender || '',
                        rules: [{
                            required: true,
                            message: 'isMale is required',
                        }],
                    })(
                        <RadioGroup >
                            <Radio value="male">male</Radio>
                            <Radio value="female">female</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback label="Age">
                    {getFieldDecorator('age', {
                        initialValue: initialValue.age || '',
                        rules: [{
                            required: true,
                            message: 'age is required',
                        }],
                    })(
                        <InputNumber min={1} max={120}  onChange={this.onChangeAge} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback label="Phone">
                    {getFieldDecorator('phone', {
                        initialValue: initialValue.phone || '',
                        rules: [{
                            pattern:"^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$",
                            required: true, 
                            message: 'The input is not valid phone!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    hasFeedback
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        initialValue: initialValue.email || '',
                        rules: [{
                        type: 'email',
                        pattern: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$", 
                        message: 'The input is not valid E-mail!',
                        }, {
                        required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    hasFeedback
                    label="Address"
                >
                    {getFieldDecorator('address', {
                        initialValue: initialValue.address || '',
                        rules: [{ 
                            required: true, 
                            message: 'address is required!' }],
                    })(
                        <Cascader options={areaData.children} />
                    )}
                </FormItem>
            </Form>
          </Modal>
        );
      }
}
const CreateList = Form.create()(DataForm);

export default CreateList;
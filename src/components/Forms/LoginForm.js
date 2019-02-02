import React from "react";
import { Form, Button } from "semantic-ui-react";
import validator from "validator";
import InlineError from "./InlineError";
 import PropTypes from 'prop-types';


class LoginForm extends React.Component{
 state = {
     data:{
         email:"",
         password:""

     },
     loading:false,
     errors:{}
 };
 onChange = e => this.setState({data:{...this.state.data,[e.target.name]:e.target.value}});
 onSubmit = () => {
const errors = this.validate(this.state.data);
this.setState({errors});
if(Object.keys(errors).length===0){
    this.props.submit(this.state.data);
}
 };
validate= (data) =>{
    const errors={};
    if (!data.password) errors.password="cant be blanket";
    if (!validator.isEmail(data.email) && ! data.email)errors.email="correct your email";
return errors;
};
render(){
    const{data,errors}=this.state;

    return (
       <Form onSubmit={this.onSubmit}>
           <Form.Field error = { !! errors.email } >
               <label htmlFor="email">  Email:</label>
            <input type="email" id="email" name="email" placeholder="yourname@exemple.com" value={data.email} onChange={this.onChange}/>
{ errors.email && <InlineError text={errors.email}/>}
           </Form.Field>
           <Form.Field error = { !!errors.password }>
               <label htmlFor="password"> Password:</label>
            <input type="password" id="password" name="password"placeholder="Make your password" value={data.password} onChange={this.onChange}/>
            { errors.password && <InlineError text={errors.password}/>}

           </Form.Field>

           <Button primary>login</Button>
       </Form>
    );
}


}
LoginForm.prototypes={
    submit: PropTypes.func.isRequired

};

export default LoginForm;
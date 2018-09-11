import * as React from 'react';
import * as Joi from 'joi-browser';
import Form from "./Form";
import {RegisterForm} from "./RegisterForm";
import './index.css';

interface IUser {
    username: string;
    password: string;
}

interface IState {
    data: IUser,
    errors: any
}

class LoginForm extends Form<any, IState> {
    constructor(props) {
        super(props);
        this.state = {
            data: {username: '', password: ''},
            errors: {}
        }
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    doSubmit = () => {
        // Call the server
        console.log("Submitted");
    };


    render() {
        const {data, errors} = this.state;
        return (
            <div>
                <div style={{height: "100%"}} className="d-flex justify-content-center align-middle">
                    <div className="d-flex flex-column bd-highlight mb-3">
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            {this.renderInput("username", "Username")}
                            {this.renderInput("password", "Password")}
                            {this.renderMaterialInput("password", "Password")}
                            {this.renderButton('Login')}
                        </form>
                    </div>
                </div>
                <RegisterForm/>
            </div>
        );
    }
}

export default LoginForm;

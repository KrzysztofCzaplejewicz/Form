import * as React from 'react';
import Form from "./Form";
import * as Joi from 'joi-browser';

export class RegisterForm extends Form<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: {username: '', password: '', name: ''},
            errors: {}
        }
    }

    schema = {
        username: Joi.string().email().label("Username"),
        password: Joi.string().min(5).label("Password").max(10),
        name: Joi.string().required().label("Name")
    };

    doSubmit = () => {
        console.log("DZIAŁA KURWA")
    };

    render() {
        return (
            <div>
                <div style={{height: "100%"}} className="d-flex justify-content-center align-middle">
                    <div className="d-flex flex-column bd-highlight mb-3">
                        <h1>Register</h1>
                        <form onSubmit={this.handleSubmit}>
                            {this.renderInput("username", "Username")}
                            {this.renderInput("password", "Password")}
                            {this.renderInput("name", "Name")}
                            {this.renderButton('Register')}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default (RegisterForm);
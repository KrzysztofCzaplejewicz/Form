import * as React from 'react';
import * as Joi from 'joi-browser';
import Input from "./Input";
import MaterialInput from "./materialInput";

class Form<P, S> extends React.Component<any, any> {
    [x: string]: any;

    constructor(props) {
        super(props);
        this.state = {}
    }

    validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;
        const errors: any = {};
        for (const item of error) {
            this.handleCheckErrors(item);
            errors[item.details.path[0]] = item.message.substring(error.message.lastIndexOf("[") + 1, error.message.lastIndexOf("]"));
        }
        return errors;
    };

    handleCheckErrors = (error) => {
        for (const errorDetail of error.details) {
            console.log(errorDetail);
            if (errorDetail.type === 'any.empty')
                return `${errorDetail.context.label} is required`;
            if (errorDetail.type === 'string.min')
                return `${errorDetail.context.label} must have at least ${errorDetail.context.limit} characters`;
            if (errorDetail.type === 'string.max')
                return `${errorDetail.context.label} must be less than ${errorDetail.context.limit} characters long`;
            if (errorDetail.type === 'string.email')
                return `${errorDetail.context.label} must be valid email`;
        }

    };

    validProperty = ({name, value}) => {
        const object = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(object, schema, {abortEarly: false});

        return error ? this.handleCheckErrors(error) : null;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        console.log(errors);
        this.setState({errors: errors || {}});
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors})
    };

    renderInput = (name, label, type = 'text') => {
        const {data, errors} = this.state;
        return (
            <Input
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
                type={type}
            />
        )

    };
    renderMaterialInput = (name, label, type = 'text') => {
        const {data, errors} = this.state;
        return (
            <MaterialInput
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
                type={type}
            />
        )

    };

    renderButton = (label: string) => {
        return (
            <button disabled={this.validate()} className="btn btn-primary">
                {label}
            </button>
        )
    }
}

export default Form;
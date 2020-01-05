import React from 'react';

import classes from './input.module.css'

const input = (props) => {
    const inputClasses = [classes.InputElement]
    const errsMsgs = []
    for (let [key, val] of Object.entries(props.errs)) {
        errsMsgs.push(<p key={key} className={classes.Invalid}>{val}</p>)
    }
    // console.log(props)
    if (!props.valid && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.vaule}
                onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.vaule}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (<select
                className={inputClasses.join(' ')}
                value={props.vaule}
                onChange={props.changed}>
                {props.elementConfig.options.map((option) => (
                    <option value={option.value} key={option.value}>{option.displayValue}</option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.vaule}
                onChange={props.changed} />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errsMsgs}
        </div>
    );
};
export default input;
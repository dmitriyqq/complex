import * as React from 'react';
import {Complex} from 'src/Lib/Complex';
import { Curve } from 'src/Model/Curve';

interface IProps {
    curve: Curve;
    onChange: (name: string, value: Complex) => void;
}

export class CurveView extends React.Component<IProps> {
    public render(): React.ReactChild {
        const functionList = this.props.curve.formulae.map((f, i) => <div key={i}>{f}</div>);
        const paramNames = [...this.props.curve.getParamNames()];

        const { params } = this.props.curve;

        const paramList = paramNames.map((text: string, i: number) => (
            <li key={i}>
                <label>{text}.re</label>
                <input
                    min="-2.0"
                    max='2.0'
                    step='0.1'
                    type="range"
                    name={text}
                    value={params[text] ? (params[text] as Complex).re : 0}
                    onChange={this.handleRealParamChange}
                />
                <span>{params[text] ? (params[text] as Complex).re : 0}</span>
                <label>{text}.im</label>
                <input
                    min="-2.0"
                    max='2.0'
                    step='0.1'
                    type="range"
                    name={text}
                    value={params[text] ? (params[text] as Complex).im : 0}
                    onChange={this.handleImaginaryParamChange}
                />
                <span>{params[text] ? (params[text] as Complex).im : 0}</span>
            </li>));


        return (
            <div>
                <h5>Functions y = </h5>
                <div>{functionList}</div>
                <ul>{paramList}</ul>
            </div>
        );
    }

    public handleRealParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = this.props.curve.params[(e.target.name)] || new Complex();
        value.re = Number(e.target.value);
        this.props.onChange(e.target.name, value);
    }

    public handleImaginaryParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = this.props.curve.params[(e.target.name)] || new Complex();
        value.im = Number(e.target.value);
        this.props.onChange(e.target.name, value);
    }
}
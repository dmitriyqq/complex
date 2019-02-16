import * as React from 'react';

interface IProps{
    default?: number;
    label: string;
    onChange: (label: string, value: number) => void;
}

interface IState {
    value: number
};

export class Parameter extends React.Component<IProps, IState>{
    public state: IState;

    constructor(props: IProps) {
      super(props);
      this.state = {
        value: this.props.default || 0
      };
    }
  
    public handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      this.setState({value});
      this.props.onChange(this.props.label, value);
    }
  
    public render() {
      return (
        <div style={{ display: "flex", justifyContent: "flex-end"}}>
          <div>{this.props.label + ":"}</div>
          <input
            style={{ marginLeft: "5px", width: "50px", height: "20px"}}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      );
    }
  }
  
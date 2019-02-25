import * as React from 'react';
import { CameraPosition, HorizontalPosition, VerticalPosition } from 'src/Lib/CameraPosition';

interface IProps {
    value: CameraPosition;
    onChange: (curve: CameraPosition) => void;
}

export class CameraPositionView extends React.Component<IProps> {
    public render(): React.ReactChild {
        const horizontalOptions = CameraPosition
            .getHorizontalOptions()
            .map((option: HorizontalPosition, i: number) => 
                <option key={i} value={option}>{option}</option>);

        const verticalOptions = CameraPosition
            .getVerticalOptions()
            .map((option: VerticalPosition, i: number) => 
                <option key={i} value={option}>{option}</option>);

        return (
            <div>
                <label htmlFor="horizontalPosition">HorizontalPosition</label>
                <select
                    name='horizontalPosition'
                    onChange={this.handleChange}
                    value={this.props.value.horizontalPosition}
                > 
                    {horizontalOptions}
                </select>
                <label htmlFor="verticalPosition">VerticalPosition</label>
                <select
                    name='verticalPosition'
                    onChange={this.handleChange}
                    value={this.props.value.verticalPosition}
                > 
                    {verticalOptions}
                </select>
            </div>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {horizontalPosition, verticalPosition} = this.props.value;
        const value = new CameraPosition(verticalPosition, horizontalPosition);
        value[e.target.name] = e.target.value;
        this.props.onChange(value);
    }
}
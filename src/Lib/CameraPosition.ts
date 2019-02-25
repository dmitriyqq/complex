import { VerticalPosition } from './CameraPosition';

export type VerticalPosition = 'down' | 'up' | 'middle';

export type HorizontalPosition = 'north' | 'south' | 'west' | 'east'
    | 'north-west' | 'north-east' | 'south-west' | 'south-east';

export class CameraPosition {
    public static getHorizontalOptions(): HorizontalPosition[] {
        return ['north', 'south', 'west', 'east', 'north-west', 'north-east', 'south-west', 'south-east']
    }

    public static getVerticalOptions(): VerticalPosition[] {
        return ['down', 'up', 'middle'];
    }

    constructor(public verticalPosition: VerticalPosition, public horizontalPosition: HorizontalPosition) {}

    public getValues(): [number, number] {
        let verticalPosition: number = 0.0;
        let horizontalPosition: number = 0.0;

        switch(this.verticalPosition) {
            case 'down':
                verticalPosition = -Math.PI / 3;
                break;
            case 'middle':
                verticalPosition = 0;
                break;
            case 'up':
                verticalPosition = Math.PI / 3;
                break;
        }

        switch(this.horizontalPosition) {
            case 'north':
                horizontalPosition = Math.PI;
                break;
            case 'south':
                horizontalPosition = 0;
                break;
            case 'east':
                horizontalPosition = Math.PI / 2;
                break;
            case 'west':
                horizontalPosition = -Math.PI / 2;
                break;

            case 'north-west':
                horizontalPosition = -3 * Math.PI / 4;
                
                break;
            case 'north-east':
                horizontalPosition = 3 * Math.PI / 4;
                break;
            case 'south-west':
                horizontalPosition = - Math.PI / 4;
                break;
            case 'south-east':
                horizontalPosition = Math.PI / 4;
                break;
        }

        return [verticalPosition, horizontalPosition];
    }
}
import * as React from "react";
import { CameraPosition } from 'src/Lib/CameraPosition';
import { Complex } from 'src/Lib/Complex';
import { Line } from 'src/Model/Curves/Line';
import { Model } from 'src/Model/Model';
import ThreeWrapper from "src/UI/Components/ThreeWrapper";
import { CameraPositionView } from 'src/UI/ViewComponents/CameraPositionView';
import { CurveView } from 'src/UI/ViewComponents/CurveView';
import CubicProgram from 'src/View/ThreePrograms/CubicProgram';
// import { PolygonProgram } from 'src/View/ThreePrograms/PolygonProgram';
// import CubicProgram from 'src/View/ThreePrograms/CubicProgram';
import { Program } from 'src/View/ThreePrograms/Program';

interface IState {
    cameraPosition: CameraPosition;
    model: Model;
}

export class Demo extends React.Component<{}, IState>{
    public state: IState = {
        cameraPosition: new CameraPosition('up', 'south-east'),
        model: new Model(),
    }

    private program: Program = new CubicProgram(this.state.model, {
        x: { inverted: false, label: "xr" },
        y: { inverted: false, label: "yr" },
        z: { inverted: false, label: "xi" },
    });

    constructor(props: any) {
        super(props);

        this.state.model.curves.push(new Line());
    }

    public componentDidUpdate() {
        this.program.setCameraPostion(...this.state.cameraPosition.getValues());
    }

    public componentDidMount() {
        setTimeout(() => {
            this.program.setCameraPostion(...this.state.cameraPosition.getValues());
            this.program.render();
        }, 100);
    }

    public render() {
        if ((this.program as any).ready) {
            this.program.render();
        }
        
        return (
            <div>
                <button onClick={this.renderProgram}>Render</button>
                <CameraPositionView
                    onChange={this.handleCameraPositionChange}
                    value={this.state.cameraPosition}
                />
                <ThreeWrapper
                    camera={null}
                    camType='Ortho'
                    width={400}
                    height={400}
                    program={this.program}
                />
                <CurveView
                    curve={this.state.model.curves[0]}
                    onChange={this.handleCurveChange}
                />
            </div>
        );
    }

    private renderProgram = () => {
        this.program.render();
    }

    private handleCurveChange = (name: string, value: Complex) => {
        this.state.model.curves[0].params[name] = value;
        this.setState((prev) => ({ model: prev.model }));
    }

    private handleCameraPositionChange = (cameraPosition: CameraPosition) => {
        this.program.setCameraPostion(...cameraPosition.getValues());
        this.setState({ cameraPosition });
    }
}

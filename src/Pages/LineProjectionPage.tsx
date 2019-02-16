import * as React from 'react'
import Complex from 'src/Lib/Complex';
import { ProjectionType } from 'src/Lib/TrackCam';
import { Line } from 'src/Model/Curves/Line';
import Model from 'src/Model/Model';
import ThreeWrapper from 'src/UI/Components/ThreeWrapper';
import { IMappings } from 'src/UI/ViewBoxHeader';
import CubicProgram from 'src/View/ThreePrograms/CubicProgram';
import { IProgram } from 'src/View/ThreePrograms/IProgram';

import 'src/assets/LineProjectionPage.css';
import { Curve } from 'src/Model/Curves';
import { Plane } from 'src/View/ThreePrograms/Plane';
import { PlaneProgram } from 'src/View/ThreePrograms/PlaneProgram';

interface IState {
    ar: number;
    ai: number;
    br: number;
    bi: number;
}

export class LineProjectionPage extends React.Component<{}, IState> {
    public state: IState = {
        ai: 1.0,
        ar: 1.0,
        bi: 1.0,
        br: 1.0,
    }

    // private camera: TrackCam;
    private cameraType: ProjectionType = 'Proj';
    // private cameraMount: React.RefObject<HTMLDivElement> = React.createRef();

    private width: number;
    private height: number;

    private programR: IProgram;
    private programI: IProgram;
    private programPlaneR: IProgram;
    private programPlaneI: IProgram;
    private model: Model;
    private line: Curve;

    private planeR: Plane;
    private planeI: Plane;


    constructor(props: {} = {}) {
        super(props);

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // this.camera = new TrackCam(this.width, this.height, this.cameraType, 0);
        this.model = new Model();
        this.line = new Line([{ name: 'A', value: new Complex(1, 0) }, { name: 'B', value: new Complex() }]);
        this.model.addCurve(this.line);

        const mappingsR: IMappings =
        {
            x: {
                inverted: false,
                label: "xr",
            },
            y: {
                inverted: false,
                label: "yr",
            },
            z: {
                inverted: false,
                label: "xi",
            }
        }

        const mappingsI: IMappings =
        {
            x: {
                inverted: false,
                label: "xr",
            },
            y: {
                inverted: false,
                label: "yi",
            },
            z: {
                inverted: false,
                label: "xi",
            }
        }

        // this.camera.setup(this.cameraMount as any);
        this.programR = new CubicProgram(this.model, mappingsR);
        this.programI = new CubicProgram(this.model, mappingsI);

        this.planeR =  {
            A: 2,
            B: 1,
            C: 1,
            D: 1,
        };

        this.planeI = {
            A: 2,
            B: 1,
            C: 1,
            D: 1,
        }

        this.programPlaneR = new PlaneProgram(this.model, this.planeR);
        this.programPlaneI = new PlaneProgram(this.model, this.planeI);
        this.calcValues();
    }

    public componentDidUpdate() {
        this.calcValues();
        this.programR.render();
        this.programI.render();
        this.programPlaneR.render();
        this.programPlaneI.render();
    }

    public calcValues() {
        const {ar, ai, br, bi} = this.state;

        this.planeR.A = Number(ar);
        this.planeR.B = Number(1);
        this.planeR.C = -Number(ai);
        this.planeR.D = Number(br);

        this.planeI.C = Number(ai) - Number(ar);
        this.planeI.B = Number(-1);
        this.planeI.A = 2 * Number(ai);
        this.planeI.D = Number(br) - Number(bi);

        // this.planeI.A = -Number(br) + Number(bi);

        // \subsection{$x_r = 1, x_i = 0, y_r = 0$}
        // $$ y_i = -A_r + A_i - B_r + B_i $$
        
        // \subsection{$x_r = 0, x_i = 1, y_r = 0$}
        // $$ y_i = A_r + A_i - B_r + B_i $$

        this.line.setParam('A', new Complex(+ar, +ai))
        this.line.setParam('B', new Complex(+br, +bi))
        this.model.rebuild();
    }

    public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) {
            return;
        }

        const { name, value } = e.target;
        this.setState((): any => ({ [name]: value }));
       
    }

    public render() {
        const {ar, ai, br, bi} = this.state;
        const {A, B, C, D} = this.planeR;
        return <div className='LineProjectionPage'>
            <div className="ComplexHeader">
                <div>Комп. прямая</div>
                <div>{`y = (${ar} + ${ai}i)*x + ${br} + ${bi}*i`}</div>
                <div>Плоскость</div>
                <div>{`${A}x + ${B}y + ${C}z + ${D}= 0`}</div>
            </div>
            <div className="PlaneHeader">
                Комплексная прямая
                <div>
                    <label>ar</label>
                    <input type="text" name='ar'onChange={this.handleChange} value={this.state.ar}/>
                </div>
                <div>
                    <label>ai</label>
                    <input type="text" name='ai' onChange={this.handleChange} value={this.state.ai}/>
                </div>
                <div>
                    <label>br</label>
                    <input type="text" name='br' onChange={this.handleChange} value={this.state.br}/>
                </div>
                <div>
                    <label>bi</label>
                    <input type="text" name='bi' onChange={this.handleChange} value={this.state.bi}/>
                </div>
            </div>
            <div className='ComplexXRYRXI'>
                <ThreeWrapper
                    camera={null}
                    camType={this.cameraType}
                    width={this.width / 2.0}
                    height={this.height / 2}
                    program={this.programR}
                />
            </div>
            <div className='PlaneXRYRXI'>
                <ThreeWrapper
                    camera={null}
                    camType={this.cameraType}
                    width={this.width / 2.0}
                    height={this.height / 2}
                    program={this.programPlaneR}
                />
            </div>
            <div className="AnotherComplexHeader">
                Комплексная проекция с yi
            </div>
            <div className='ComplexXRYIXI'>
                <ThreeWrapper
                    camera={null}
                    camType={this.cameraType}
                    width={this.width / 2.0}
                    height={this.height / 2}
                    program={this.programI}
                />
            </div>
            <div className="AnotherPlaneHeader">
                Плоскость второй проекции
                <div>Плоскость</div>
                <div>{`${this.planeI.A}x + ${this.planeI.B}y + ${this.planeI.C}z + ${this.planeI.D}= 0`}</div>
            </div>
            <div className='PlaneXRYIXI'>
                <ThreeWrapper
                    camera={null}
                    camType={this.cameraType}
                    width={this.width / 2.0}
                    height={this.height / 2}
                    program={this.programPlaneI}
                />
            </div>
        </div>;
    }
}
import * as React from 'react';
import Latex from 'react-latex';
import { Curve } from 'src/Model/Curve';

interface IProps {
    Curve: Curve;
    onChange: (curve: Curve) => void;
}

export class CurveViewComponent extends React.Component<IProps> {
    public render(): React.ReactChild {
        return (
            <div>
                <span>
                    <Latex>{'$\\int_{a}^{b} f(x)dx = F(b) - F(a)$'}</Latex>
                </span>
                <ul>
                    {/* {paramList} */}
                </ul>
            </div>
        );
    }
}
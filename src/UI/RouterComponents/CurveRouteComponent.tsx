import * as React from 'react';
import Latex from 'react-latex';
import { match as Match } from 'react-router';

interface IParams {
    text: string;
}

interface IProps {
    match: Match<IParams>
}

export class CurveViewComponent extends React.Component<IProps> {
    public render(): React.ReactChild {
        // const { params } = this.props.match;

        // const formulae = params.text.split(',');
        
        // for (const functionText of formulae) {
            
        // }


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
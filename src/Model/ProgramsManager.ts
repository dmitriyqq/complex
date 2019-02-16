import { IConfig } from 'src/UI/ViewBoxHeader';
import CubicProgram from "src/View/ThreePrograms/CubicProgram"
import PolygonProgram from "src/View/ThreePrograms/PolygonProgram"
import Model from './Model';

class ProgramsManager{
    private programs: Map<number, CubicProgram> = new Map()

    public getProgram(index: number){
        return this.programs.get(index);
    }

    public updateProgram(index: number, config: IConfig, model: Model){
        const oldProgram = this.getProgram(index);
        if(oldProgram){
            oldProgram.clearScene();
            this.programs.delete(index);
        }

        let newProgram: CubicProgram;
        if (config.renderMethod === "Cubes") {
            newProgram = new CubicProgram(
              model,
              config.mappings
            );
        } else {
            newProgram = new PolygonProgram(
                model,
                config.mappings
            );
        }

        this.programs.set(index, newProgram);
        return newProgram;
    }
}

export default new ProgramsManager();
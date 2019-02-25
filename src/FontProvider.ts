import * as THREE from 'three';

class FontProvider {
    private font: THREE.Font;

    constructor() {
        // tslint:disable-next-line:no-console
        console.log('constructor');
        const loader = new THREE.FontLoader();
        loader.load('helvetiker_regular.typeface.json', (font) => {
            // tslint:disable-next-line:no-console
            console.log('font loaded');
            this.font = font
        // tslint:disable-next-line:no-console
        }, (progress) => console.log(progress), (error: any) => console.log(error));
    }

    public getFont() {
        return this.font;
    }
}

export default new FontProvider();
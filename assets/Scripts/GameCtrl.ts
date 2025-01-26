import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class NewComponent extends Component {


    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 200;

    onLoad(){
        
    }

    initListener(){

    }

    startGame(){
        
    }
}



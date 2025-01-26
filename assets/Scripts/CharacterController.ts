import { _decorator, Component, Node, Vec3, input, Input, EventTouch, macro, view, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
   @property
   speed: number = 200; // Movement speed

   private direction: number = 0;

   start() {
       input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
       input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
       
       // Listen for window resize
       view.on('canvas-resize', this.onResize, this);
   }

   update(deltaTime: number) {
       if (this.direction !== 0) {
           let pos = this.node.position.clone();
           let newPosX = pos.x + this.direction * this.speed * deltaTime;
           
           const screenWidth = view.getVisibleSize().width;
           const halfWidth = this.node.getComponent(UITransform).contentSize.width / 2;

           // Ensure the character stays within screen boundaries
           newPosX = Math.max(-screenWidth / 2 + halfWidth, Math.min(screenWidth / 2 - halfWidth, newPosX));

           this.node.setPosition(new Vec3(newPosX, pos.y, pos.z));
       }
   }

   onResize() {
       const screenWidth = view.getVisibleSize().width;
       const halfWidth = this.node.getComponent(UITransform).contentSize.width / 2;

       // Ensure the character stays within bounds after resize
       let pos = this.node.position.clone();
       pos.x = Math.max(-screenWidth / 2 + halfWidth, Math.min(screenWidth / 2 - halfWidth, pos.x));
       this.node.setPosition(pos);
   }

   onTouchStart(event: EventTouch) {
       let touchLocation = event.getUILocation();
       
       const screenWidth = view.getVisibleSize().width;
       if (touchLocation.x < screenWidth / 2) {
           this.direction = -1;
       } else {
           this.direction = 1;
       }
   }

   onTouchEnd(event: EventTouch) {
       this.direction = 0;
   }
}

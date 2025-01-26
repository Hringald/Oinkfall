import { _decorator, Vec3, EventTouch, Component, Node, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export default class CharacterController extends Component {
    
    @property(Node)
    character: Node = null;  // Assign the character node in the Inspector

    private speed: number = 300;  // Speed in pixels per second
    private moveDirection: number = 0;  // -1 left, 1 right, 0 stop

    start() {
        // Attach touch event listeners
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    private onTouchStart(event: EventTouch) {
        console.log("Screen touched at:", event.getLocation());
        let touchPos = event.getLocation();
        let screenWidth = view.getVisibleSize().width;

        if (touchPos.x < screenWidth / 2) {
            console.log("Moving left");
            this.moveDirection = -1;  // Move left
        } else {
            console.log("Moving right");
            this.moveDirection = 1;   // Move right
        }
    }

    private onTouchEnd(event: EventTouch) {
        console.log("Touch ended");
        this.moveDirection = 0;  // Stop movement
    }

    update(dt: number) {
        console.log("Updating...");

        if (this.character && this.moveDirection !== 0) {
            let currentPos = this.character.getPosition();
            let newX = currentPos.x + this.moveDirection * this.speed * dt;

            let halfScreenWidth = view.getVisibleSize().width / 2;
            newX = Math.max(-halfScreenWidth, Math.min(halfScreenWidth, newX));

            this.character.setPosition(new Vec3(newX, currentPos.y, currentPos.z));
        }
    }
}
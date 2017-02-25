import Player from './player'
import { map1 } from './map1'
import { Camera, FollowCamera, PerspectiveCamera } from './camera'

class Main {
    constructor(){
        window.deltaTime = 0;
        window.lastUpdate = Date.now();
        this.camera = new Camera(300, 300);
        this.followCamera = new FollowCamera(300, 300);
        this.perspectiveCamera = new PerspectiveCamera(600, 600, 0, 0, 0);
        this.player = new Player(150, 150);
        this.map = map1;
        this.gameLoop();
    }

    updateDeltaTime(){
        let currentFrameTime = Date.now();
        window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
        window.lastUpdate = currentFrameTime;
    }

    gameLoop(){
        this.updateDeltaTime();
        
        // Draw Moving Player
        this.camera.render(this.map);
        this.camera.context.save();
        this.camera.context.translate(this.player.x, this.player.y);
        this.camera.context.rotate(this.player.radians);
        this.camera.context.fillRect(-2, -2, 4, 4);
        this.camera.context.fillStyle = 'red';
        this.camera.context.fillRect(2, -1, 8, 2);
        this.camera.context.restore();

        // Draw Stationary Player
        this.followCamera.x = this.player.x;
        this.followCamera.y = this.player.y;
        this.followCamera.rotation = this.player.rotation;
        this.followCamera.render(this.map);
        this.followCamera.context.save();
        this.followCamera.context.translate(this.followCamera.canvas.width / 2, this.followCamera.canvas.height / 2);
        this.followCamera.context.fillRect(-2, -2, 4, 4);
        this.followCamera.context.fillStyle = 'red';
        this.followCamera.context.fillRect(-1, -10, 2, 8);
        this.followCamera.context.restore();


        // Draw Player 3d Perspective
        this.perspectiveCamera.x = this.player.x;
        this.perspectiveCamera.y = this.player.y;
        this.perspectiveCamera.rotation = this.player.rotation;
        this.perspectiveCamera.render(this.map);

        window.requestAnimationFrame(() => this.gameLoop());
    }
}

new Main;
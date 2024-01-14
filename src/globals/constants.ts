namespace Flappy.Global {
    export class Constants {
        public static gameSpeed: number = 0.1;
        public static jumpSpeed: number = 500;
        public static gapSize: number = 155;
	// TODO testing cheat caps
        //public static gapSize: number = 155 * 3;
        public static gravity: number = 2000;
        public static pipeSpacing: number = 200;
        public static terminalVelocity: number = 700;

        public static get serverUrl(): string {
            if (window.location.href === 'http://127.0.0.1:8080/' || window.location.href === 'http://localhost:8080/') {
                return 'http://localhost:9001';
            } else {
		// TODO this needs to point to botze server
                return 'https://flappy-bird-server.glitch.me';
            }
        }

        public static gameHeight: number = 665;

        public static get gameWidth(): number {
            let ratio = this.gameHeight / window.innerHeight;
            return window.innerWidth * ratio;
        }

        public static worldOffset: number = -1000;
    }
}

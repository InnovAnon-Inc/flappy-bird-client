namespace Flappy {
    export class LevelRequester {

        private requesting: boolean;

        constructor(private scoreCounter: ScoreCounter, private pipePool: PipePool) {
            this.requesting = false;
        }

        public request(start: number, end: number, callback: (pipes: Array<IPipe>) => void): void {
            $.get(`${Global.Constants.serverUrl}/stage?start=${start}&end=${end}`, (data) => {
                callback(data);
            });
        }

        public update(callback: (pipes: Array<IPipe>) => void): void {
            if (this.requesting === true) {
                return;
            }

            if (Math.abs(this.scoreCounter.score - this.pipePool.length) <= 10) {
                let startIndex = this.pipePool.length;
		// TODO testing cheat cap
		//if(startIndex < 69) {
		//	startIndex = 69;
		//}

                this.request(startIndex, startIndex + 20, (pipes) => {
                    callback(pipes);
                    this.requesting = false;
                });
                this.requesting = true;
            }
        }
    }
}

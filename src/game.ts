namespace Flappy {
    export interface IConnectionDetails {
        name    : string;
        color   : number;
	password: string;
    }

    export interface IGame {
	    playerName : string;
    }

    export class Game extends Phaser.Game implements IGame {
	    public playerName : string;

        constructor(elementName: string) {
            let element = document.getElementById(elementName);

            super(Global.Constants.gameWidth, Global.Constants.gameHeight, Phaser.AUTO, element.id, Flappy.State.Blank, false, false);

            this.state.add('play', Flappy.State.Play);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(Global.Constants.gameWidth, Global.Constants.gameHeight);
            });
        }

        public connect(connectionDetails: IConnectionDetails, callback: (socket: SocketIOClient.Socket) => {}): void {
            Global.socket = io.connect(Global.Constants.serverUrl, { query: `name=${connectionDetails.name}&color=${connectionDetails.color}&password=${connectionDetails.password}` });
            Global.socket.on('connect', () => {
                this.state.start('play');
                callback(Global.socket);
            });
            Global.connectionDetails = connectionDetails;
	    this.playerName = connectionDetails.name
        }
    }
}

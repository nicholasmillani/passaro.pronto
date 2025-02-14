var i = 0; // para quando chegar a 6 ele se movimentar em Y
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('bg', 'assets/bg_space.png'); // imagem de fundo
    this.load.spritesheet('bird', 'assets/bird-purple.png', { frameWidth: 75, frameHeight: 75 }); // spritesheet do passaro
}

function create() {
    this.add.image(400, 300, 'bg').setScale(1.2); // imagem de fundo
    // armazena o passaro como propriedade da cena 
    this.passaro = this.add.sprite(100, 300, 'bird').setScale(1.3);

    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.passaro.anims.play('fly', true);
}

function update() {
    // mudar passaro para this.passaro(ajuda do chatgpt), pois o codigo nao estava funcionando
    
    if (i <= 4) { // vai parar o passaro apos algumas batidas nas quinas
        if (this.passaro.x === 100) {
            this.passaro.setFlip(false, false); // primeiro false/ true representa o lado que ele esta 'olhando'
            this.passaro.ida = true;
            i += 1;
        }
        if (this.passaro.x < 700 && this.passaro.ida === true) {
            this.passaro.x += 5; 
        }
        if (this.passaro.x === 700) {
            this.passaro.setFlip(true, false);
            this.passaro.ida = false;
            i += 1;
        }
        if (this.passaro.x > 100 && this.passaro.ida === false) {
            this.passaro.x -= 5;
        }
    }
    if(i > 4){
        if (this.passaro.x === 100 && this.passaro.y === 300) {
            this.passaro.setFlip(false, false); // primeiro false/ true representa o lado que ele esta 'olhando'
            this.passaro.ida = true;
        }
        if (this.passaro.x < 400 && this.passaro.ida === true) {
            this.passaro.x += 5;
        } else if (this.passaro.x === 400) {
            this.passaro.ida = false;
            i += 1;
        }
        if (i > 5) {
            if (this.passaro.y > 0 && !this.passaro.subindo) {
                this.passaro.y -= 5;
                if (this.passaro.y <= 0) {
                    this.passaro.subindo = true;
                }
            } else if (this.passaro.y < 300 && this.passaro.subindo) {
                this.passaro.y += 5;
                if (this.passaro.y >= 300) {
                    this.passaro.subindo = false;
                    i = 0;}
            }
        }
    }
    
}
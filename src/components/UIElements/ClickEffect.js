import { isBrowser } from "../../utils"

export const intializeClickEffect = (canvasRef, mouseClickPosition) => {
    if (!isBrowser()) return

    const canvas = canvasRef && canvasRef.current
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d");

    const colors = [
        `#f44336`, `#e91e63`, `#9c27b0`, `#673ab7`, `#3f51b5`,
        `#2196f3`, `#03a9f4`, `#00bcd4`, `#009688`, `#4CAF50`,
        `#8BC34A`, `#CDDC39`, `#FFEB3B`, `#FFC107`, `#FF9800`,
        `#FF5722`, `#795548`, `#9E9E9E`, `#607D8B`, `#777777`
    ];

    class Particle {
        constructor(x, y, radius) {
            this.x = x
            this.y = y
            this.radius = radius

            const xVel = 4
            const yVel = 14

            this.vx = (Math.random() * xVel) - (xVel / 2)
            this.vy = (Math.random() * yVel) - (yVel / 2)
            this.velocity = 0.05
            this.lineWidth = 5
            this.randomColor = Math.floor(Math.random() * colors.length)
            this.color = colors[this.randomColor]
        }

        update = () => {
            this.x += this.vx
            this.vy += 0.2
            this.y += this.vy
            this.draw()
        }

        draw = () => {
            c.beginPath()
            c.strokeStyle = this.color
            c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
            c.fillStyle = this.color
            c.fill()
            c.stroke()
            c.closePath()
        }
    }

    let particles = [];

    const init = () => {
        if (mouseClickPosition.x && mouseClickPosition.y) {
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(mouseClickPosition.x, mouseClickPosition.y, Math.random() * 10));
            }
        }
    }

    const animate = () => {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
        });
    }

    init();
    animate();
}
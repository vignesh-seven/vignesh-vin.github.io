canvas = document.querySelector("#bg")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx = canvas.getContext("2d")

// Color of the dots
let color = "#ce00ff"
// no of dots
let dotCount = 60
// declaring dot class
class Dot {
	constructor(x, y, radius) {
		this.x = x
		this.y = y
		this.radius = radius
	}
	draw() {
		ctx.beginPath()
		//ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fill()
	}
	update() {
		this.draw()
		this.y += 1
	}
}

// spawning dots
dots = []
function spawnDots(count, onTop) {
	for (let i = 0; i < count; i++) {
		let radius = (Math.random() * (2 - 0.5)) + 0.5
		let x = Math.random() * canvas.width
		let y = Math.random() * canvas.height
		if(onTop) {
			y = 4
		}
		let dot = new Dot(x, y, radius)
		dots.push(dot)
	}
}

// on window resize
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
})

//drawing dots with animate loop
function animate() {
	requestAnimationFrame(animate)
	ctx.fillStyle = "rgba(0, 0, 0, 1)"
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = color
	dots.forEach((dot, index) => {
		if(dot.y >= canvas.height) {
			dots.splice(index, 1)
			spawnDots(1, true)
		}
		dot.update()
	})
}
animate()
spawnDots(dotCount, false)


// console.log(dots)
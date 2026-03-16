const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
2000
)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById("solarSystem").appendChild(renderer.domElement)

camera.position.z = 120

const ambient = new THREE.AmbientLight(0xffffff,0.2)
scene.add(ambient)

const sunLight = new THREE.PointLight(0xffffff,2,1000)
scene.add(sunLight)

const textureLoader = new THREE.TextureLoader()

// estrelas
const starGeometry = new THREE.BufferGeometry()
const starCount = 8000
const starPositions = []

for(let i=0;i<starCount;i++){

starPositions.push(
(Math.random()-0.5)*2000,
(Math.random()-0.5)*2000,
(Math.random()-0.5)*2000
)

}

starGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(starPositions,3)
)

const starMaterial = new THREE.PointsMaterial({color:0xffffff})

const stars = new THREE.Points(starGeometry,starMaterial)
scene.add(stars)


// sol
const sun = new THREE.Mesh(

new THREE.SphereGeometry(16,64,64),

new THREE.MeshBasicMaterial({
map:textureLoader.load(
"https://threejsfundamentals.org/threejs/resources/images/sun.jpg"
)
})

)

scene.add(sun)

function createPlanet(size,texture,distance,name){

const geometry = new THREE.SphereGeometry(size,64,64)

const material = new THREE.MeshStandardMaterial({

map:textureLoader.load(texture)

})

const planet = new THREE.Mesh(geometry,material)

planet.position.x = distance
planet.name = name

scene.add(planet)

return planet

}

const mercury = createPlanet(
2,
"https://threejsfundamentals.org/threejs/resources/images/mercury.jpg",
28,
"Mercury"
)

const venus = createPlanet(
3,
"https://threejsfundamentals.org/threejs/resources/images/venus.jpg",
38,
"Venus"
)

const earth = createPlanet(
3.5,
"https://threejsfundamentals.org/threejs/resources/images/earth.jpg",
50,
"Earth"
)

const mars = createPlanet(
3,
"https://threejsfundamentals.org/threejs/resources/images/mars.jpg",
65,
"Mars"
)

const jupiter = createPlanet(
8,
"https://threejsfundamentals.org/threejs/resources/images/jupiter.jpg",
90,
"Jupiter"
)

const saturn = createPlanet(
7,
"https://threejsfundamentals.org/threejs/resources/images/saturn.jpg",
120,
"Saturn"
)

// anel saturno
const ringGeo = new THREE.RingGeometry(10,14,64)

const ringMat = new THREE.MeshBasicMaterial({

map:textureLoader.load(
"https://threejsfundamentals.org/threejs/resources/images/saturnringcolor.jpg"
),

side:THREE.DoubleSide

})

const ring = new THREE.Mesh(ringGeo,ringMat)

ring.rotation.x = Math.PI/2

saturn.add(ring)


// clique
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener("click",(event)=>{

mouse.x = (event.clientX/window.innerWidth)*2-1
mouse.y = -(event.clientY/window.innerHeight)*2+1

raycaster.setFromCamera(mouse,camera)

const intersects = raycaster.intersectObjects(scene.children)

if(intersects.length>0){

const obj = intersects[0].object

alert("Planeta: "+obj.name)

if(obj.name==="Earth"){

window.open("https://maps.google.com")

}

}

})

function animate(){

requestAnimationFrame(animate)

mercury.rotation.y +=0.01
venus.rotation.y +=0.008
earth.rotation.y +=0.02
mars.rotation.y +=0.018
jupiter.rotation.y +=0.04
saturn.rotation.y +=0.03

renderer.render(scene,camera)

}

animate()

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})

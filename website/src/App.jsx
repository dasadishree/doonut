import {  useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import './App.css'

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Smore Game Assets",
    date: "February 2026",
    description: "Making assets for my first 3D Godot game with the help of a tutorial",
    modelPaths: ["/coin.glb", "enemy.glb", "robot.glb", "worldblocks.glb"],
    link: "https://www.youtube.com/playlist?list=PLda3VoSoc_TTp8Ng3C57spnNkOw3Hm_35"
  },
  {
    id: 2,
    title: "Donut & Mug Attempt 1",
    date: "June 11-12th, 2026",
    description: "Trying to relearn how to model with Blender with the help of a tutorial",
    modelPaths: ["/mug.glb"],
    link: "https://www.youtube.com/watch?v=z-Xl9tGqH14"
  }
]

// 3d model
function Model({path}) {
  const { scene } = useGLTF(path)
  const modelRef = useRef()
  useFrame(()=>{
    if(modelRef.current) {
      modelRef.current.rotation.y+=0.008
    }
  })

  return <primitive ref={modelRef} object={scene.clone()} scale={4.5} position={[0,-1,0]}/>
}

// arrows between models
function ScrapbookItem({project}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalModels = project.modelPaths.length
  const nextModel = () => {
    setCurrentIndex((prev)=>(prev+1)%totalModels)
  }
  const prevModel = () => {
    setCurrentIndex((prev) => (prev-1+totalModels) % totalModels)
  }

  return (
    <div className="scrapbook-item">
      <div className="canvas-container">
        {totalModels > 1 && (
          <div className="carousel-controls">
            <button onClick={prevModel} className="arrow-btn left">◀</button>
            <span className="model-counter">{currentIndex+1} / {totalModels}</span>
            <button onClick={nextModel} className="arrow-btn right">▶</button>
          </div>
        )}

        <Canvas camera={{position: [0,2,5], fov:45}}>
          <ambientLight intensity={0.7}/>
          <directionalLight position={[10, 10, 5]} intensity={1.5}/>
          <directionalLight position={[-10,5,-5]} intensity={0.5}/>

          <Suspense fallback={null}>
            <Model path={project.modelPaths[currentIndex]}/>
          </Suspense>
          <OrbitControls enableZoom={true}/>
          </Canvas>
        </div>

        <div className="journal-details">
          <span className="entry-date">{project.date}</span>
          <h2 className="entry-title">{project.title}</h2>
          <p className="entry-description">{project.description}</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="entry-link">
              View Project Details ➜
            </a>
          )}
        </div>
      </div>
    )
  }
function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        
        <section className="hero">
          <img
            src="/name.gif"
            alt="adishree's 3d website"
            className="title-gif"
          />
          <p>See my progress in using Blender / CAD! Use your mouse to rotate the models and zoom in or out. During quarantine, I used to be obsessed with making 3D Roblox GFXs. I didn't even know what CAD was and I didn't really understand what I was even doing LOL but I made a bunch of Roblox GFXs using Blender but now I have made it my mission to relearn how to use Blender because I don't remember a thing but I wanna learn. Unfortunately I don't have any of my files from back then though!</p>
        </section>

        <div className="scrapbook-feed">
          {PROJECTS_DATA.map((project)=>(
            <ScrapbookItem key={project.id} project={project}/>
          ))}
      </div>
    </main>
  </div>
  )
}

export default App
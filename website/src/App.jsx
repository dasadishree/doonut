import {  useRef, Suspense} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import './App.css'

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Smore Game Assets",
    date: "February 2026",
    description: "Making assets for my first 3D Godot game with the help of a tutorial",
    modelPath: ["/coin.glb", "enemy.glb", "robot.glb", "worldblocks.glb"],
    link: "https://www.youtube.com/playlist?list=PLda3VoSoc_TTp8Ng3C57spnNkOw3Hm_35"
  },
  {
    id: 2,
    title: "Donut & Mug Attempt 1",
    date: "June 11-12th, 2026",
    description: "Trying to relearn how to model with Blender with the help of a tutorial",
    modelPath: ["/mug.glb"],
    link: "https://www.youtube.com/watch?v=z-Xl9tGqH14"
  }
]

// 3d model
function Model({ path, position }) {
  const { scene } = useGLTF(path)
  const modelRef = useRef()
  useFrame(()=>{
    if(modelRef.current) {
      modelRef.current.rotation.y+=0.008
    }
  })
  return <primitive ref={modelRef} object={scene.clone()} scale={2.5} position={position}/>
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
          <p>See my progress in using Blender / CAD! Use your mouse to rotate the models and zoom in or out. During quarantine, I used to be obsessed with making 3D Roblox GFXs. I didn't even know what CAD was and I didn't really understand what I was even doing LOL but I made a bunch of Roblox GFXs using Blender but now I have made it my mission to relearn how to use Blender because I don't remember a thing but I wanna learn</p>
        </section>

        <div className="scrapbook-feed">
          {PROJECTS_DATA.map((project)=>(
            <div className="scrapbook-item" key={project.id}>
              <div className="canvas-container">
                <Canvas camera={{position: [0,3,6], fov:45}}>
                  <ambientLight intensity={0.7}/>
                  <directionalLight position={[10,10,5]} intensity={1.5}/>
                  <directionalLight position={[-10,5,-5]} intensity={0.5}/>

                  <Suspense fallback={null}>
                    {project.modelPath.map((path,index) => {
                      const total = project.modelPath.length;
                      const spacing = 1.8;
                      let xPosition = 0;
                      let yPosition = 0;

                      if(total === 1) {
                        xPosition = 0;
                        yPosition = -0.5;
                      } else{
                        const row = Math.floor(index/2);
                        const col = index %2;
                        const xSpacing = 1.6;
                        const ySpacing = 1.4;
                        xPosition = (col-0.5)*xSpacing;
                        yPosition = (0.5-row)*ySpacing-0.5;
                      }

                      return (
                        <Model
                          key={index}
                          path={path}
                          position={[xPosition, yPosition, 0]}
                        />
                      )
                    })}
                    </Suspense>
                  <OrbitControls enableZoom={true}/>
                </Canvas>
              </div>
            
            <div className="journal-details">
              <span className="entry-date">{project.date}</span>
              <h2 className="entry-title">{project.title}</h2>
              <p className="entry-description">{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="entry-link">View Project Details ➜</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
  )
}

export default App
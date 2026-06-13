import {  useRef, Suspense} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import './App.css'

// mug
function Mug() {
  const { scene } = useGLTF('/mug.glb')
  const mugRef = useRef()
  useFrame(()=>{
    if(mugRef.current){
      mugRef.current.rotation.y += 0.008
    }
  })
  return <primitive ref={mugRef} object={scene} scale={5} position={[0, -1, 0]}/>
}

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <section className="hero">
          <h1>Adishree's 3D Progress</h1>
          <p>See my progress in using Blender / CAD!</p>
        </section>

        <section className="canvas-container">
          <Canvas camera={{position: [0,2,5], fov:45}}>
            <ambientLight intensity={0.7}/>
            <directionalLight position={[10, 10, 5]} intensity={1.5}/>
            <directionalLight position={[-10, 5, -5]} intensity={0.5}/>

            <Suspense fallback={null}>
              <Mug/>
            </Suspense>
            <OrbitControls enableZoom={false}/>
          </Canvas>
        </section>
      </main>
    </div>
  )
}

export default App
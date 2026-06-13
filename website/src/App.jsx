import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'

// temporary 3d cube
function SpinningCube() {
  const meshRef = useRef()
  useFrame(() => {
    if(meshRef.current) {
      meshRef.current.rotation.x +=0.01
      meshRef.current.rotation.y += 0.01
    }
  })
  return(
    <mesh>
      <boxGeometry args={[1,1,1]}/>
      <meshStandardMaterial color="#fff7b00"/>
    </mesh>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">Donut 3D</div>
        <nav>
          <button onClick={()=>setCount(count+1)}>Likes: {count}</button>
        </nav>
      </header>

      <main className="main=content">
        <section className="hero">
          <h1>Adishree's 3D Progress</h1>
          <p>See my progress in using Blender / CAD!</p>
        </section>

        <section className="canvas-container">
          <Canvas camera={{position: [0,0,5]}}>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[10, 10, 5]} intensity={1}/>
            <SpinningCube/>
            <OrbitControls enableZoom={false}/>
          </Canvas>
        </section>
      </main>
    </div>
  )
}

export default App
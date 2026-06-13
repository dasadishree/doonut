import { useState } from 'react'
import './App.css'

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
          <div className="placeholder-box">
            <span>[ 3D thingie ]</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
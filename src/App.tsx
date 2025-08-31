import './App.css'
import Home from "./Pages/Home";
import N5Word from "./Pages/N5Word";
import N5WordTable from "./Pages/N5WordTable";
import N4Word from "./Pages/N4Word";
import N4WordTable from "./Pages/N4WordTable";
import N3Word from "./Pages/N3Word";
import N3WordTable from "./Pages/N3WordTable";
import N3FavoriteWordTable from "./Pages/N3FavoriteWordTable";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
      <div className="App max-w-5xl mx-auto px-2">
        <Analytics /> 
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/N5Word" element={<N5Word />}></Route>
          <Route path="/N5WordTable" element={<N5WordTable />}></Route>
          <Route path="/N4Word" element={<N4Word />}></Route>
          <Route path="/N4WordTable" element={<N4WordTable />}></Route>
          <Route path="/N3Word" element={<N3Word />}></Route>
          <Route path="/N3WordTable" element={<N3WordTable />}></Route>
          <Route path="/N3FavoriteWordTable" element={<N3FavoriteWordTable />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App

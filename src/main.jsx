import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/cinzel/700.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import LoadoutRandomizer from './pages/LoadoutRandomizer.jsx'
import WeaponReference from './pages/WeaponReference.jsx'
import ArmourReference from './pages/ArmourReference.jsx'
import Checklist from './pages/Checklist.jsx'
import BuildPlanner from './pages/BuildPlanner.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/build" element={<BuildPlanner />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/weapons" element={<WeaponReference />} />
          <Route path="/armour" element={<ArmourReference />} />
          <Route path="/random" element={<LoadoutRandomizer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

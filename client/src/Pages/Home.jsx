import React from 'react'
import Hero from '../Components/Hero'
import Toprated from '../Components/Toprated'
import Recentrequests from '../Components/Recentrequests'
import Services from '../Components/Services'

function Home() {
  return (
    <div>
       <Hero />
    <Toprated />
    <Recentrequests />
    <Services />
    </div>
   
  )
}

export default Home
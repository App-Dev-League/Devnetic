import Head from 'next/head'
import Image from 'next/image'

import Signup from "./components/signup"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import Details from "./components/Details"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Signup />
        <Details />
        <Footer />
      </div>
    </>
  );
}

import Head from 'next/head'
import Image from 'next/image'

import Signup from "../components/signup"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Details from "../components/Details"
import Educators from "../components/Educators"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Signup />
        <Details />
        <Educators />
        <Footer />
      </div>
    </>
  );
}

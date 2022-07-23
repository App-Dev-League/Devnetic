import Head from 'next/head'
import Image from 'next/image'

import Signup from "../components/signup"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Details from "../components/Details"
import Educators from "../components/Educators"
import Feature from "../components/Feature"

import {SiCkeditor4} from 'react-icons/si';
import {TbListDetails} from 'react-icons/tb'
import {AiOutlineBarChart} from 'react-icons/ai'


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Signup />
        <Details />
        <Educators />
        <br/>
        <hr style={{width: "80vw", marginLeft: "auto", marginRight: "auto", display: "block"}}></hr>
        <Feature
          image="/images/feature1.png"
          name="Code Environment"
          description="Learn by doing! Some lessons are in project form, which allow students to create a project while learning new concepts. Create a project with the built in IDE, and then the finished project will then be tested with built-in test cases to make sure it meets the project requirements."
          icon={SiCkeditor4}
          inverted={true}
        />
        <Feature
          image="/images/feature2.png"
          name="Multiple Choice Questions"
          description="Strengthen and reinforce your knowledge with multiple choice questions. Dont worry, you'll still get hints if you get stuck, and each question has detailed and in-depth explanations regarding the correct answer."
          icon={TbListDetails}
          inverted={false}
        />
        <Feature
          image="/images/feature3.gif"
          name="Comprehensive Content"
          description="Content that suits every skill level, beginner or advanced. Level up your coding skills with visual diagrams, demos, and live web pages all part of the curriculum. Keep track of your progress through your progress tracker, and grow your skills!"
          icon={AiOutlineBarChart}
          inverted={true}
        />
        <Footer />
      </div>
    </>
  );
}

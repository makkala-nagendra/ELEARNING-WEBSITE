import { Inter } from 'next/font/google'
import Link from 'next/link';
import { ThemeContext } from '../components/theme/ThemeContext';
import { useContext } from 'react';
import { Footer, RightSection, LeftSection, LanguagesSection, NavBar } from '../components/home/components';
import Image from 'next/image'


const inter = Inter({ subsets: ['cyrillic'] })
const name = "Code Lab"


export default function Home() {
  
  const section1 = "Staying current with the latest programming languages and updates is essential for any developer, and our website provides you with the necessary tools and information to do so. We offer courses and tutorials for popular languages like Python, Java, JavaScript, Ruby, C++, and many more.";
  const section2 = "Our online code editor provides support for multiple programming languages, including Java, Python, C++, Ruby, and JavaScript, allowing learners to practice coding and test out ideas in their language of choice. Write, compile, and execute code directly from your browser and improve your coding skills today.";
  const section3 = "Project-based learning is an innovative approach to education that emphasizes hands-on, real-world projects. Our e-learning website offers project-based courses that provide learners with practical skills and experience. This approach helps students develop problem-solving skills, teamwork, and critical thinking abilities, preparing them for success in the workplace.";
  const section4 = "In our AI and ML section, you'll discover how to create intelligent systems that can learn from data and make predictions. Our courses cover a range of topics, from machine learning algorithms to neural networks and deep learning."

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <main
      className={` items-center w-full ${inter.className}`}>

      <div className='bg-cover bg-center top-0 left-0 h-[650px] w-full justify-center items-center'
        style={{ backgroundImage: "url('/images/background.svg')", }}>

        <div className=' w-full justify-center flex sm:pt-2 '>
          <div className='container xl:mx-24 bg-black bg-opacity-[20%] sm:rounded-[50px] text-white'>
            <NavBar />
          </div>
        </div>

        <div className=' flex w-full h-[600px] items-center 
        justify-center content-center  text-white'>



          <div className='w-full justify-center text-center items-center flex flex-col'>
            <div className='text-2xl sm:text-4xl p-4 font-bold'>Programming made easyand fun with {name}</div>

            <div className=' w-[60%] text-sm sm:text-xl  text-center justify-center'>We offer a comprehensive range of resources to help you learn and improve your skills. Our expert instructors provide courses, tutorials, and other educational materials that cater to both beginners and experienced learners.</div>

            <Link className=' font-bold text-xl m-10 bg-[var(--color-palette-1)] p-3 rounded-[10px] '
              href={"/python"}>Get Start Learning</Link>
          </div>

        </div>

      </div>


      <LanguagesSection />

      <RightSection props={{
        heading: "Learn Free Trending Languages",
        text: section1, image: '/images/Coding workshop-amico.svg',
        button: { text: 'Start learning', link: '/python' },
      }} />

      <LeftSection props={{
        heading: "Online Code Editor with Multiple Language Support",
        text: section2, image: '/images/Code typing-pana.svg',
        button: { text: 'Online Code Editor', link: '/editor' },
      }} />

      <RightSection props={{
        heading: "AI and ML: Unlock the Power of Intelligent Systems",
        text: section4, image: "/images/Artificial intelligence-pana.svg",
      }} />

      <LeftSection props={{
        heading: "Hands-On Learning: Project-Based Courses for Real-World Experience",
        text: section3, image: '/images/Code review-amico.svg',

      }} />


      <Footer />
    </main>
  )
}



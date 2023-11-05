import Link from "next/link";
import Image from 'next/image'
import ThemeChangeButton from "../theme/ThemeChangeButton";

const Website = { name: "Code Lab", logo: "/favicon.ico" }

export function RightSection({ props }: { props: any }) {
  return (
    <div className=" w-full flex justify-center items-center">
      <div className='container p-5 lg:flex sm:flex-row w-full lg:h-[500px] sm:h-fit
    lg:p-4 sm:p-4 justify-center xl:w-full mb-5 sm:mb-5 mt-2'>
        <div className='lg:w-[50%] sm:w-full justify-end md:flex md:justify-center xl:justify-center lg:ml-[5%] xl:mr-0'>
          <Image
            className='h-[500px] lg:w-[100%] xl:w-[70%] sm:w-full md:w-[90%] rounded-[20px]'
            src={props.image}
            width={400}
            height={400}
            style={{ height: '440px', width: '80%' }}
            alt=''
          ></Image>
        </div>
        <div className=' lg:h-[500px] lg:w-[50%] md:h-fit sm:max-h-max flex flex-col justify-start xl:justify-start items-start xl:h-[100%]'>
          <div className='lg:w-[100%] xl:w-[80%] sm:h-fit md:h-fit text-justify xl:flex-col  xl:p-5  md:p-5'>
            <div className=' text-3xl mb-[20px] font-bold'>{props.heading}</div>
            <div className=' text-xl '>{props.text}</div>

            {props.button ? <div className='w-full flex m-2 p-2 justify-center'>
              <Link href={props.button.link} className='p-2 rounded-xl border bg-[var(--color-palette-1)] text-white text-xl '>{props.button.text}</Link>
            </div> : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeftSection({ props }: { props: any }) {

  return (
    <div className=" w-full flex items-center justify-center bg-[var(--color-0)]">
      <div className=' container p-7 lg:flex sm:flex-row w-full lg:h-[500px] sm:h-fit
     lg:p-4 sm:p-4 justify-center xl:w-full mb-5 sm:mb-5 mt-2'>
        <div className='lg:h-fit lg:w-[50%] sm:max-h-max flex flex-col justify-start items-end xl:h-[100%] xl:mr-[10%]'>
          <div className='lg:w-[90%] xl:w-[80%] sm:h-fit md:h-fit text-justify justify-endxl:p-5  md:p-5 '>
            <div className=' text-3xl mb-[20px] font-bold'>{props.heading}</div>
            <div className=' text-xl '>{props.text}</div>

            {props.button ? <div className='w-full flex m-2 p-2 justify-center'>
              <Link href={props.button.link} className='p-2 rounded-xl border bg-[var(--color-palette-1)] text-white text-xl '>{props.button.text}</Link>
            </div> : <div />}

          </div>
        </div>

        <div className=' lg:w-[45%] sm:w-full h-[500px] justify-end md:flex md:justify-center xl:justify-start lg:ml-[5%] xl:ml-0'>
          <Image
            className='h-full w-full lg:w-[90%] xl:w-[80%] sm:w-full md:w-[90%] rounded-[20px]'
            src={props.image}
            width={400}
            height={400}
            style={{ height: '440px', width: '80%' }}
            alt=''
          ></Image>
        </div>

      </div>
    </div>
  );
}

export function LanguagesSection() {
  const languages = [{ lan: "C", img: "C Programming.png", link: "/c" },
  { lan: "C++", img: "C++.png", link: "/cpp" },
  { lan: "PYTHON", img: "Python.png", link: "/python" },
  { lan: "JAVA", img: "Java.png", link: "/java" },
  { lan: "AI", img: "Artificial Intelligence.png", link: "/ai" }]
  return (

    <div className="w-full flex justify-center bg-[var(--color-0)] bg-opacity-50">
      <div className='container text-center  p-10
       mb-10'>
        <h1 className='text-[25px] sm:text-[35px] font-bold'>Choose what to learn</h1>
        <p className='text-sm sm:text-lg pb-3'>Start learning the best programming languages.</p>
        <div className='w-full flex justify-center'>
          <div className=' h-fit xl:w-2/3 md:w-[80%] sm:w-full grid grid-cols-5 gap-2 justify-center'>
            {languages.map((value) => {
              return <div key={value.lan} className=' h-[10%] xl:h-[150px] md:h-32 sm:h-24 xl:w-[80%] sm:w-full
               justify-center grid grid-cols-1 hover:z-0 '>
                <div className='h-[100%] w-[100%] text-center border rounded-[10px] bg-white 
                  hover:bg-[var(--color-palette-3)] p-2'>
                  <Link href={value.link}>
                    <Image
                      className='h-[80%] w-[100%]'
                      src={'/images/' + value.img}
                      width={400}
                      height={400}
                      alt=''
                    ></Image>
                    <p className=' hidden text-[var(--color-palette-0)] sm:block text-[12px]'>{value.lan}</p>
                  </Link>
                </div>

              </div>
            })}
          </div></div>
      </div>
    </div>
  );
}

export function NavBar() {
  return (<nav className=' relative flex pl-2 pr-2 h-[60px]  items-center justify-between '>
    <div className=' flex text-center items-center'>
      <Image
        src={Website.logo}
        width={35}
        height={35}
        alt='logo'
        fill={false}
      />
      <div className=' text-2xl ml-2 mr-2'>{Website.name}</div>
    </div>
    <div className='flex'>
      <button className='mr-2 bg-pink-700 p-2 rounded-[10px] '
        onClick={() => { }}>Premium</button>
      <ThemeChangeButton />
    </div>
  </nav>);
}

export function Footer() {
  const tutorials = [
    { text: "Python 3", link: "./python" },
    { text: "Java", link: "./js" },
    { text: "JavaScript", link: "./javascript" },
    { text: "C", link: "./c" },
    { text: "C++", link: "./cpp" },
    { text: "DS", link: "./ds" },
    { text: "HTML", link: "./html" },
    { text: "CSS", link: "./css" },
  ];

  const company = [
    { text: "About", link: "../about" },
    { text: "Advertising", link: "../advertising" },
    { text: "Privacy Policy", link: "../privacy-policy" },
    { text: "Terms & Conditions", link: "../terms-and-conditions" },
    { text: "Contact", link: "../contact" },
    // { text: "Blog", link: "" },
    // { text: "Careers", link: "" },
    // { text: "Youtube", link: "" },
  ];

  return (
    <div>
      <div className='w-full h-fit bg-gray-400 bg-opacity-30 text-center lg:flex justify-around p-5'>
        <div>
          <div className='flex m-5 justify-center lg:justify-start'>
            <Image
              src={"/favicon.ico"}
              width={45}
              height={45}
              alt='logo' />
            <div className='pl-5 text-xl font-bold items-center flex'>{Website.name}</div>
          </div>
          <div className=' text-center lg:text-left'>Join our newsletter for the <br />latest updates.</div>
          <div className='w-full  justify-center lg:justify-start md:justify-center xl:justify-start flex'>
            <div className='flex border w-[80%] xl:w-full lg:w-full md:w-[50%] sm:w-[50%] rounded-[10px] bg-red-600 pr-4 '>
              <input className='w-[100%] rounded-l-lg h-10  lg:w-[100%]' />
              <button className='justify-center pl-2 pt-2 text-center content-center text-lg'>Send</button>
            </div>
          </div>


        </div>
        <div>
          <div className=' text-lg font-bold m-5'>Tutorials</div>

          {tutorials.map((value) => {
            return <Link href={value.link} key={value.text + '-footer'} >{value.text}<br /></Link>
          })}</div>

        <div>
          <div className=' text-lg font-bold m-5'>Company</div>
          {company.map((value) => {
            return <Link href={value.link} key={value.text + '-footer'} >{value.text}<br /></Link>
          })}</div>
      </div>

      <div className='w-full text-center md:text-left md:pl-4'>© {Website.name} Pvt. Ltd. All rights reserved.</div>
    </div>);
}
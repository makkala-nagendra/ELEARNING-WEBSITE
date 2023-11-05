import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { Languages } from "./list-of-Contents"
import ThemeChangeButton from "../theme/ThemeChangeButton";

import { LeaderboardGoogleAds, BillboardGoogleAds, LargeRectangleGoogleAds } from '../mdx-components/components'

export const components = { LeaderboardGoogleAds, BillboardGoogleAds, LargeRectangleGoogleAds }


const Website = { name: "Code Lab", logo: "/favicon.ico" }

const downIcon = <svg viewBox="0 0 100 100" y="0" x="0"
    id="icon" version="1.1" width="25px" height="25px"
    className="width:100%;height:100%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-color:initial;background-clip:initial;background-attachment:initial;animation-play-state:paused">
    <g id="ldl-scale" className="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused">
        <circle fill="#323232" r="40" cy="50" cx="50" className="fill:rgb(50, 50, 50);animation-play-state:paused"></circle>
        <path d="M77.5 42.917l-7.333-7.334L50 55.75v14.667z" fill="#999998" className="fill:rgb(153, 153, 152);animation-play-state:paused"></path>
        <path d="M50 55.75L29.833 35.583 22.5 42.917l27.5 27.5z" fill="#cccccb" className="fill:rgb(204, 204, 203);animation-play-state:paused"></path>
    </g>
</svg>

// const upIcon = <svg viewBox="0 0 100 100" y="0" x="0"
//     id="圖層_1" version="1.1" width="25px" height="25px"
//     className="width:100%;height:100%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-color:initial;background-clip:initial;background-attachment:initial;animation-play-state:paused">
//     <g id="ldl-scale" className="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused">
//         <circle fill="#323232" r="40" cy="50" cx="50" className="fill:rgb(50, 50, 50);animation-play-state:paused"></circle>
//         <path d="M22.5 57.083l7.333 7.334L50 44.25V29.583z" fill="#999998" className="fill:rgb(153, 153, 152);animation-play-state:paused"></path>
//         <path d="M50 44.25l20.167 20.167 7.333-7.334-27.5-27.5z" fill="#cccccb" className="fill:rgb(204, 204, 203);animation-play-state:paused"></path>
//     </g>
// </svg>



export function ContentsList({ list, language }: { list: { text: string; link: string; key: string; nested: { text: string; link: string; key: string; nested: never[]; }[]; }[], language: any }) {
    const router = useRouter();
    const { slug } = router.query;
    const [toggle, setToggle] = useState(true);

    return (<div className="border h-screen rounded">
        {list.map((value) => {
            const url = "." + language + value.link

            const handleClick = () => {
                const contentsList = document.getElementById(value.key);
                contentsList!.classList.toggle('hidden');
                setToggle(!toggle)
            }

            if (value.nested.length == 0 && value.link == "") {
                return <div key={value.text} className=' '>
                    <div className='pl-1 mb-2 text-2xl font-bold'>{value.text}</div>
                </div>
            } else if (value.nested.length == 0) {
                if (slug == value.link.replace("/", "")) {
                    return <div key={value.key} className=' bg-green-600 border rounded m-1'>
                        <div className='h-fit p-1'>{value.text}</div>
                    </div>
                }
                return <div key={value.key}
                    className=' border-gray-300 border '>
                    <Link key={value.key} href={url}>
                        <div className='h-fit p-1'>{value.text}</div></Link>
                </div>
            } else {
                return (<div key={value.text} className='m-1 border-gray-500 rounded border'>
                    <div onClick={handleClick} className="flex pl-1 pr-1 font-semibold justify-between items-center" >
                        <div className=' w-[95%] h-[50px] text-lg'>{value.text}</div>
                        {downIcon}
                    </div>
                    <div key={value.text} className='hidden pl-3' id={value.key} >
                        <NestedList list={value.nested} key={value.text} language={language} />
                    </div>
                </div>)
            }
        })}
    </div>

    )
}

function NestedList({ list, language }: { list: any, language: any }) {
    const router = useRouter();
    const { slug } = router.query;
    return (<div >
        {list.map((value: { nested: any[]; text: string; link: string; key: string; }) => {
            const handleClick = () => {
                const contentsList = document.getElementById(value.key);
                contentsList!.classList.toggle('hidden');
                window.alert("this page")

            }

            const url = "." + language + value.link

            if (value.nested.length == 0 && value.link == "") {
                return <div key={value.text} className=' '>
                    <div className='pl-1 mb-2 text-2xl font-bold'>{value.text}</div>
                </div>
            } else if (value.nested.length == 0) {
                if (slug == value.link.replace("/", "")) {
                    return <div key={value.key} className='bg-green-600 border rounded m-1'>
                        <div className='h-fit p-1 '>{value.text}</div>
                    </div>
                }
                return <div key={value.key}
                    className=' border m-1 rounded '>
                    <Link key={value.key} href={url}>
                        <div className='h-fit p-1 '>
                            {value.text}
                        </div>
                    </Link>
                </div>
            } else {
                return (<div key={value.text} className='block  border '>
                    <div onClick={handleClick} className="flex p-1 justify-between" >
                        <div className='  w-[95%] overflow-clip'>{value.text}</div>
                        {downIcon}
                    </div>
                    <div className='hidden ml-1' id={value.key} ><NestedList list={value.nested} key={value.text} language={language} /></div>
                </div>)
            }
        })}
    </div>)
}

type Dictionary = {
    [key: string]: any[]; // Assuming the values in the dictionary are arrays of strings
};
export function SideBarList({ list, root }: {list:Dictionary,root:any}) {
    const keys = Object.keys(list);
    return <div className='border h-screen rounded'>{keys.map((e) => {
        return <div key={e} className=" border rounded">
            
            <div className='pl-1 mb-2 text-2xl font-bold'>{e}</div>
            {list[e].map((k)=>{
                return <NestedSideBarList key={k} value={k} root={root}/>
            })}
        </div>
    })}</div>
}

function NestedSideBarList({value, root}:any){
    return <div className="pl-2">
        <Link key={value.key} 
        
        href={`./${root}/${value.subTopic.replaceAll(" ",'-')}`}>
    <div className='h-fit p-1 '>
        {value.subTopic}
    </div>
</Link></div>
}


function MainMenu() {
    function showMenu() {
        const contentsList = document.getElementById('menu-bar');
        contentsList!.classList.toggle('hidden');
    }
    return (<div className="flex">
        <button className="block lg:hidden p-3 rounded hover:bg-blue-400"
            aria-controls="contents"
            onClick={showMenu}>
            <svg className=" w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
        <div className=" hidden lg:flex justify-between items-center text-lg font-semibold"
        >
            <div className="m-5"><Link href={"../"}>Home</Link></div>
            <div className="m-5"><Link href={"/tutorials"}>Tutorials</Link></div>
            <div className="m-5"><Link href={"/contact"}>Contact</Link></div>
            <div className="m-5"><Link href={"/about"}>About</Link></div>
        </div>

    </div>)
}

export function NavBar({ list }: { list: any }) {

    function showMenu() {
        const contentsList = document.getElementById('sidebar');
        contentsList!.classList.toggle('hidden');
    }

    return (
        <div className="w-full z-0 bg-[rgb(48,197,110)] 
     h-fit text-center justify-between ">

            <div className="flex justify-between  items-center">
                <div className="flex pl-2">
                    {list != undefined ?
                        <button className="block lg:hidden p-3  rounded hover:bg-blue-400"
                            aria-controls="contents"
                            onClick={showMenu}>
                            <Image
                                src={'/icons/menu-dots-vertical.png'}
                                width={30}
                                height={30}
                                style={{ 'height': "20px", "width": "20px" }}
                                alt='logo'
                                fill={false}
                            />
                        </button> : ''}


                    <div className='pl-5 flex text-center items-center'>
                        <Image
                            src={Website.logo}// /icons/menu-dots-vertical.png
                            width={30}
                            height={30}
                            style={{ 'height': "30px", "width": "30px" }}
                            alt='logo'
                            fill={false}
                        />
                        <div className=' text-xl ml-2 mr-2 font-bold'>{Website.name}</div>
                    </div>
                </div>
                <div className="flex">
                    <MainMenu />
                    <ThemeChangeButton />
                </div>

            </div>


            <div className=" hidden lg:hidden justify-between items-center text-lg font-semibold"
                id="menu-bar">
                <div className="m-5"><Link href={"../"}>Home</Link></div>
                <div className="m-5"><Link href={"/tutorials"}>Tutorials</Link></div>
                <div className="m-5"><Link href={"/contact"}>Contact</Link></div>
                <div className="m-5"><Link href={"/about"}>About</Link></div>
            </div>

            <div className="flex h-[45px]">


                <div className="flex flex-row items-center overflow-hidden pr-5">
                    {Languages.map((value) => {
                        return <div className="flex pl-2 pr-2 bg-[var(--color-background)] bg-opacity-50
                    rounded mr-2 ml-2 text-lg font-semibold border "
                            key={value.Language}><Link href={'/tutorials/[slug]'} as={value.link}>
                                {value.Language}
                                </Link></div>
                    })}
                </div>
            </div>

        </div>)
}

export function Footer() {
    const tutorials = [
        { text: "Python 3", link: "./tutorials/python" },
        { text: "Java", link: "./tutorials/js" },
        { text: "JavaScript", link: "./tutorials/javascript" },
        { text: "C", link: "./tutorials/c" },
        { text: "C++", link: "./tutorials/c++" },
        { text: "DS", link: "./tutorials/ds" },
        { text: "HTML", link: "./tutorials/html" },
        { text: "CSS", link: "./tutorials/css" },
    ];

    const company = [
        { text: "About", link: "../about" },
        { text: "Advertising", link: "../advertising" },
        { text: "Privacy Policy", link: "../privacy-policy" },
        { text: "Terms & Conditions", link: "../terms-and-Conditions" },
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



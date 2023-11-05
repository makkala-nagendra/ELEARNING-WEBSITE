import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { Languages } from "./list-of-Contents"
import ThemeChangeButton from "../theme/ThemeChangeButton";
import { LeaderboardGoogleAds, BillboardGoogleAds, LargeRectangleGoogleAds } from '../mdx-components/components'



const Website = { name: "Code Lab", logo: "/favicon.ico" }
// const upIcon = <svg viewBox="0 0 100 100" y="0" x="0"
//     id="圖層_1" version="1.1" width="25px" height="25px"
//     className="width:100%;height:100%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-color:initial;background-clip:initial;background-attachment:initial;animation-play-state:paused">
//     <g id="ldl-scale" className="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused">
//         <circle fill="#323232" r="40" cy="50" cx="50" className="fill:rgb(50, 50, 50);animation-play-state:paused"></circle>
//         <path d="M22.5 57.083l7.333 7.334L50 44.25V29.583z" fill="#999998" className="fill:rgb(153, 153, 152);animation-play-state:paused"></path>
//         <path d="M50 44.25l20.167 20.167 7.333-7.334-27.5-27.5z" fill="#cccccb" className="fill:rgb(204, 204, 203);animation-play-state:paused"></path>
//     </g>
// </svg>
// const downIcon = <svg viewBox="0 0 100 100" y="0" x="0"
//     id="icon" version="1.1" width="25px" height="25px"
//     className="width:100%;height:100%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-color:initial;background-clip:initial;background-attachment:initial;animation-play-state:paused">
//     <g id="ldl-scale" className="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused">
//         <circle fill="#323232" r="40" cy="50" cx="50" className="fill:rgb(50, 50, 50);animation-play-state:paused"></circle>
//         <path d="M77.5 42.917l-7.333-7.334L50 55.75v14.667z" fill="#999998" className="fill:rgb(153, 153, 152);animation-play-state:paused"></path>
//         <path d="M50 55.75L29.833 35.583 22.5 42.917l27.5 27.5z" fill="#cccccb" className="fill:rgb(204, 204, 203);animation-play-state:paused"></path>
//     </g>
// </svg>




// mainMenu

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
                {/* <div className="m-5"><Link href={"/tutorials"}>Tutorials</Link></div> */}
                <div className="m-5"><Link href={"/contact"}>Contact</Link></div>
                <div className="m-5"><Link href={"/about"}>About</Link></div>
            </div>

            <div className="flex h-[45px]">


                <div className="flex flex-row items-center overflow-hidden pr-5">
                    {Languages.map((value) => {
                        return <div className="flex pl-2 pr-2 bg-[var(--color-background)] bg-opacity-50
                    rounded mr-2 ml-2 text-lg font-semibold border "
                            key={value.Language}><Link href={'/[slug]'} as={value.link}>
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
                {/* Tutorials */}
                <div>
                    <div className=' text-lg font-bold m-5'>Tutorials</div>

                    {tutorials.map((value) => {
                        return <Link href={value.link} key={value.text + '-footer'} >{value.text}<br /></Link>
                    })}
                </div>

                {/* Company  */}

                <div>
                    <div className=' text-lg font-bold m-5'>Company</div>
                    {company.map((value) => {
                        return <Link href={value.link} key={value.text + '-footer'} >{value.text}<br /></Link>
                    })}
                </div>
            </div>

            <div className='w-full text-center md:text-left md:pl-4'>© {Website.name} Pvt. Ltd. All rights reserved.</div>
        </div>);
}


// MDX Data Not Found
export function NotFound() {
    return (<div>
        <h1>404 Error: Page Not Found</h1>
        <p>Oops! It seems like the page you are looking for could not be found. The 404 Error occurs when the requested webpage does not exist or is inaccessible. Here are a few possible reasons for encountering a 404 Error:</p>
        <ol>
            <li>
                <p>Incorrect URL: Double-check the URL for any typos or errors in the address you entered. Make sure it matches the correct format and spelling.</p>
            </li>
            <li>
                <p>Removed or Moved Page: The page you are trying to access might have been removed or relocated to a different location on the website. Verify if the page has been moved or check for any updated links.</p>
            </li>
            <li>
                <p>Broken Link: If you clicked on a link from another website or within the same website, the link might be broken or outdated. Broken links can occur due to changes in website structure or content.</p>
            </li>
            <li>
                <p>Temporary Unavailability: Sometimes, webpages might experience temporary downtime due to server issues, maintenance, or other technical difficulties. Try accessing the page again later.</p>
            </li>
        </ol>
        <p>Here are a few suggestions to help you find what you are looking for:</p>
        <ul>
            <li>Go back to the homepage and navigate through the website using the menu or search bar.</li>
            <li>{"Use the website's search functionality to look for keywords related to the content you were trying to access."}</li>
            <li>Contact the website administrator or support team for assistance in locating the desired page.</li>
            <li>Double-check external links or bookmarks to ensure they are pointing to the correct URL.</li>
        </ul>
        <p>{"We apologize for the inconvenience caused. If you believe this is an error or have any further questions, please don't hesitate to reach out to our support team for assistance."}</p>
    </div>)
}
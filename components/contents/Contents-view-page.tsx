import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import * as components from '../mdx-components/components'
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypePrism from 'rehype-prism';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import * as runtime from 'react/jsx-runtime'
import { evaluateSync } from '@mdx-js/mdx'
import { createElement } from 'react'
import { MDXProvider } from '@mdx-js/react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { NotFound, NavBar, Footer } from './components';
// const mdxComponents = components


type PageProps = {
    path: any;
};
type Dictionary = {
    [key: string]: any[]; // Assuming the values in the dictionary are arrays of strings
};

export const ContentViewPage: NextPage<PageProps> = ({ path }: {
    path: any,
}) => {
    const router = useRouter();
    const { slug } = router.query;
    const [value, setValue] = React.useState<any>();
    const [status, setStatus] = React.useState('');
    // const { theme } = useContext(ThemeContext);
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mdxLoading, setMDXLoading] = useState(true);
    const [sidebarPaddingTop, setSidebarPaddingTop] = useState(0);
    const [sidebarList, setSidebarList] = useState<Dictionary>();
    const [sidebarItem, setSidebarItem] = useState<any>();
    const [scrollData, setScrollData] = useState({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 });

    // generate MDX to HTML code
    function generate({ body }: { body: any }) {
        const mdx = evaluateSync(body, {
            ...runtime as any,
            remarkPlugins: [remarkGfm, remarkMath,],
            useDynamicImport: true,
            useMDXComponents: () => (components),
            rehypePlugins: [rehypeKatex, rehypeHighlight, rehypePrism],
        }
        ).default

        setValue(createElement(mdx))

    }

    // get MDX Data from DB
    async function getData({ content_id }: { content_id: any }) {

        setMDXLoading(true)
        const response = await fetch('/api/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contentID: content_id == undefined ? false : content_id,
                language: path[0],
                course: 'tutorials',
                list: sidebarList == undefined ? true : false,
            }),
        });

        const responseData = await response.json();

        console.log(responseData)

        if (responseData.status != 'error') {
            if (responseData.contents) {

                const dictionary: Dictionary = {};
                await responseData.contents.map((values: any) => {
                    if (dictionary[values.topic]) {
                        dictionary[values.topic].push(values);
                    } else {
                        dictionary[values.topic] = [values];
                    }
                })
                setSidebarList(dictionary)
            }
            if (responseData.file.content) {
                generate({ body: responseData.file.content })
            }

        }

        setStatus(responseData.status)
        setMDXLoading(false)
        setLoading(false)
    }

    useEffect(() => {

        // get MDX data 
        if (!initialized) {
            setInitialized(true)
            getData({ content_id: undefined })
        }

        // scroll handler
        function handleScroll() {
            setScrollData({
                scrollTop: window.pageYOffset || document.documentElement.scrollTop,
                scrollHeight: document.documentElement.scrollHeight,
                clientHeight: document.documentElement.clientHeight,
            });

            const top = 120 - (window.pageYOffset || document.documentElement.scrollTop);
            // const bottom = (document.documentElement.scrollHeight - ((window.pageYOffset || document.documentElement.scrollTop) + document.documentElement.clientHeight));
            setSidebarPaddingTop(top < 0 ? 0 : top)
            // setNavPaddigBottom((bottom < fotterHeight && (window.pageYOffset || document.documentElement.scrollTop) > 0) ? fotterHeight - bottom : 0)
        }

        // adding scroll eventListener
        window.addEventListener('scroll', handleScroll);

        // Initial scroll data
        handleScroll();

        // Clean up event listener on component unmount
        return () => {
            // window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);

        };

    }, []);

    if (loading) {
        // Loading
        return <Loading />
    }

    function Loading() {
        return (<div className='h-screen w-full flex text-center justify-center items-center'>
            <svg className="margin: auto; background: none; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="0" fill="none" stroke="#2c4cdb" strokeWidth="2" className="animation-play-state: running; animation-delay: 0s;">
                    <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s" className="animation-play-state: running; animation-delay: 0s;"></animate>
                    <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s" className="animation-play-state: running; animation-delay: 0s;"></animate>
                </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#2c9bdb" strokeWidth="2" className="animation-play-state: running; animation-delay: 0s;">
                    <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s" className="animation-play-state: running; animation-delay: 0s;"></animate>
                    <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s" className="animation-play-state: running; animation-delay: 0s;"></animate>
                </circle>
            </svg>
        </div>);
    }

    function RightSideSection() {
        return (<div>
            <components.HalfPageGoogleAds />
        </div>)
    }

    // MDX Content View
    function MDXContentView() {
        return <div className='lg:flex'>

            <div className={sidebarList != undefined?
            `lg:w-[80%] sm:p-2 md:p-5 lg:p-6 xl:p-7 p-1`:
            `lg:ml-[20%] lg:w-[80%] sm:p-2 md:p-5 lg:p-6 xl:p-7 p-1`}>
                <div className='prose prose-gray'><MDXProvider>
                    {(value && !mdxLoading) ? (value == undefined || status == 'Not Found') ? <NotFound /> : value : (value == undefined && status == 'error') ? <NotFound /> : <Loading />}
                </MDXProvider></div>
            </div>
            <div className=' lg:w-[20%] right-0'> <RightSideSection /> </div>
        </div>;

    }

    return (
        <main className={`h-[${scrollData.scrollHeight}px]` + ' w-full'}>
            <div className={`top-[${sidebarPaddingTop}] ` + ' h-screen w-full '}>
                <div key={"nav-bar"} className='z-0 h-fit'>
                    {/* NavBar */}
                    <NavBar list={sidebarList}></NavBar>
                </div>
                <div key={"page"} className={'flex  w-full'}>
                    {/* SideBar Section */}
                    {sidebarList != undefined ?
                        <div className='pb-5 z-0 w-[300px] bg-[var(--color-background)]
                         bg-opacity-100 lg:bg-opacity-20 hidden fixed lg:block overflow-auto '
                            style={{ maxHeight: `100vh`, top: `${sidebarPaddingTop}px` }}
                            id='sidebar'>

                            <SideBarList list={sidebarList} ></SideBarList>
                        </div> :
                        ""}
                    {/* MDX Content View */}
                    <div key={'content-view'} id='content-view'
                        className={`${sidebarList != undefined ?
                            'lg:pl-[300px]' :
                            ""}` +
                            ' w-full h-full'}>
                        {/* MDX View */}
                        <MDXContentView />
                        {/* Defalt Footer */}
                        <Footer />
                    </div>
                </div>
            </div>
        </main>

    );


    function SideBarList({ list }: { list: Dictionary, }) {
        const keys = Object.keys(list);
        const root = path[0]
        const flag = slug![slug!.length - 1]

        return <div className='p-1 border h-screen rounded'>
            {/* status : {status} */}
            {keys.map((e) => {
                const handleClick = () => {
                    const contentsList = document.getElementById(e);
                    contentsList!.classList.toggle('hidden');
                    if (sidebarItem == e) {
                        setSidebarItem('')
                    } else {
                        setSidebarItem(e)
                    }

                    console.log(e)
                }
                return <div key={e} className=" border m-1 rounded">

                    <div className='pl-1 mb-1 font-bold overflow-clip flex justify-between items-center'
                        onClick={handleClick}>{e}{e == sidebarItem ? upIcon : downIcon}</div>
                    <div className={sidebarItem == e ? '' : 'hidden'} id={e} >
                        {list[e].map((k) => {
                            return <div key={k.content_id} ><NestedSideBarList value={k} flag={flag} root={root} /></div>
                        })}</div>
                </div>
            })}</div>
    }

    function NestedSideBarList({ value, flag, root }: any) {


        return <div className={`ml-1 m-1 border rounded-lg ${flag == value.subTopic.replaceAll(" ", '-') ? "bg-green-400" : ""}`}>
            <Link
                onClick={() => { getData({ content_id: value.content_id }); }}
                href={`./${root}/${value.subTopic.replaceAll(" ", '-')}`}>
                <div className='h-fit p-1 font-semibold '>
                    {value.subTopic}
                </div>
            </Link>
        </div>
    }
}


const downIcon = <svg viewBox="0 0 100 100" y="0" x="0"
    id="icon" version="1.1" width="25px" height="25px"
    className="width:100%;height:100%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-color:initial;background-clip:initial;background-attachment:initial;animation-play-state:paused">
    <g id="ldl-scale" className="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused">
        <circle fill="#323232" r="40" cy="50" cx="50" className="fill:rgb(50, 50, 50);animation-play-state:paused"></circle>
        <path d="M77.5 42.917l-7.333-7.334L50 55.75v14.667z" fill="#999998" className="fill:rgb(153, 153, 152);animation-play-state:paused"></path>
        <path d="M50 55.75L29.833 35.583 22.5 42.917l27.5 27.5z" fill="#cccccb" className="fill:rgb(204, 204, 203);animation-play-state:paused"></path>
    </g>
</svg>

const upIcon = <svg viewBox="0 0 100 100" y="0" x="0"
    version="1.1" width="25px" height="25px"
    className="width:100%;height:100%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-color:initial;background-clip:initial;background-attachment:initial;animation-play-state:paused">
    <g id="ldl-scale" className="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused">
        <circle fill="#323232" r="40" cy="50" cx="50" className="fill:rgb(50, 50, 50);animation-play-state:paused"></circle>
        <path d="M22.5 57.083l7.333 7.334L50 44.25V29.583z" fill="#999998" className="fill:rgb(153, 153, 152);animation-play-state:paused"></path>
        <path d="M50 44.25l20.167 20.167 7.333-7.334-27.5-27.5z" fill="#cccccb" className="fill:rgb(204, 204, 203);animation-play-state:paused"></path>
    </g>
</svg>
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import { NextPage, NextPageContext } from 'next';
import { ContentsList, NavBar, components, Footer } from './defalt-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { LeaderboardGoogleAds, BillboardGoogleAds, LargeRectangleGoogleAds } from '../mdx-components/components'
// import { MDXProvider } from '@mdx-js/react';
import parse from 'html-react-parser';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypePrism from 'rehype-prism';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import * as runtime from 'react/jsx-runtime'
import { evaluateSync } from '@mdx-js/mdx'
import { useMDXComponents } from '@mdx-js/react';
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react';

type PageProps = {
    source: any;
    rootPath: string;
    sideNavList: any;
};


export const ContentViewPage: NextPage<PageProps> = ({ source, rootPath, sideNavList }: {
    source: any,
    rootPath: string,
    sideNavList: any
}) => {
    const [value, setValue] = React.useState<any>();
    const [status, setStatus] = React.useState('');
    const { theme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(true);
    const [sideBar_top, setNavPaddigTop] = useState(0);
    const [scrollData, setScrollData] = useState({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 });
    
    const mdxComponents = useMDXComponents();

     function generate ({body}:{body:any}) {
        // console.log('body : ',body)
        const mdx = evaluateSync(body, {
          ...runtime as any,
          remarkPlugins: [remarkGfm, remarkMath,],
          useDynamicImport:true,
          useMDXComponents:()=>({LeaderboardGoogleAds: LeaderboardGoogleAds}),
          rehypePlugins: [rehypeKatex, rehypeHighlight, rehypePrism],
        }
        ).default

       const  result = createElement(mdx)
        // console.log(result)
        setValue(result)
        return result
      }

    async function getData() {
        const response = await fetch('/api/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Introduction to Python',
                language: 'python',
                database: 'tutorials',
            }),
        });

        // if (!response.ok) {
        //   throw new Error('Failed to create or update file');
        // }

        const data = await response.json();
        // console.log(data.file)
        if (data.status != 'error') {

            // console.log(data.file.content)
            // setValue(data.file.html)
            generate({body: data.file.mdx})
        }

        setStatus(data.status)
        setLoading(false)
    }

    useEffect(() => {



        function handleScroll() {
            setScrollData({
                scrollTop: window.pageYOffset || document.documentElement.scrollTop,
                scrollHeight: document.documentElement.scrollHeight,
                clientHeight: document.documentElement.clientHeight,
            });

            const top = 120 - (window.pageYOffset || document.documentElement.scrollTop);
            // const bottom = (document.documentElement.scrollHeight - ((window.pageYOffset || document.documentElement.scrollTop) + document.documentElement.clientHeight));
            setNavPaddigTop(top < 0 ? 0 : top)
            // setNavPaddigBottom((bottom < fotterHeight && (window.pageYOffset || document.documentElement.scrollTop) > 0) ? fotterHeight - bottom : 0)
        }

        getData()

        // setTimeout(() => {
        //     setLoading(false);
        // }, 1000);

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
        return <LoadingIcon />
    }

    function LoadingIcon() {
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
    

    function PageView() {
        return <div className='prose lg:w-[80%] lg:pl-[10%] m-1 sm:m-2 md:m-5 lg:m-6 xl:m-7 prose-gray'>
            {/* <button onClick={getData}>getDATA:{status}</button> */}
            <MDXProvider components={components}>
                {value ? value : status == 'error' ? <NotFound /> : <LoadingIcon />}
                {/* {value ? <MDXRemote {...value} components={components} /> : status == 'error' ? <NotFound /> : <LoadingIcon />} */}
                
            </MDXProvider>
        </div>;
    }

    return (
        <main className={`h-[${scrollData.scrollHeight}px]` + ' w-full'}>
            <div className={`top-[${sideBar_top}] ` + ' h-screen w-full '}>
                <div key={"nav-bar"} className='z-0 h-fit'>
                    <NavBar list={sideNavList}></NavBar>
                </div>
                <div key={"page"} className={'flex  w-full'}>

                    {sideNavList != undefined ?
                        <div className='pb-5 z-0 w-[300px] bg-[var(--color-background)]
                         bg-opacity-100 lg:bg-opacity-20 hidden fixed lg:block overflow-auto '
                            style={{ maxHeight: `100vh`, top: `${sideBar_top}px` }}
                            id='sidebar'>

                            <ContentsList list={sideNavList} language={rootPath} ></ContentsList>
                        </div> :
                        ""}
                    <div key={'content-view'} id='content-view'
                        className={`${sideNavList != undefined ?
                            'lg:pl-[300px]' :
                            ""}` +
                            ' w-full h-full'}>

                        <PageView />
                        <Footer />
                    </div>
                </div>
            </div>
        </main>

    );
}

function ADS(){
    return <div>Google ADS</div>
}

function NotFound() {
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
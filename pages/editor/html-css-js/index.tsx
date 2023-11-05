
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ThemeChangeButton from '../../../components/theme/ThemeChangeButton';
import { ThemeContext } from '../../../components/theme/ThemeContext';
import { cssCode, htmlCode, javascriptCode } from '../../../components/code-editor/code-examples'
import { LeaderboardGoogleAds } from '../../../components/mdx-components/components'

import dynamic from 'next/dynamic'
import { languages, themes } from '../../../components/AceEditor/constants'
const AceEditor = dynamic(() => import('../../../components/AceEditor'), { ssr: false });



const promptIcon = <svg viewBox="0 0 100 100" y="0" x="0"
    id="prompt" version="1.1" width="50px" height="50px"
    className="width:100%;height:100%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-color:initial;background-clip:initial;background-attachment:initial;animation-play-state:paused">
    <g id="ldl-scale" className="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused">
        <path fill="#e0e0e0" d="M70.5 63.7H45c-1.3 0-2.4 1.1-2.4 2.4 0 1.3 1.1 2.4 2.4 2.4h25.6c1.3 0 2.4-1.1 2.4-2.4-.1-1.3-1.1-2.4-2.5-2.4z"
            className="fill:rgb(224, 224, 224);animation-play-state:paused"></path>
        <path fill="#e0e0e0" d="M43.3 48l-12-15.6c-.8-1-2.3-1.2-3.3-.4-1 .8-1.2 2.3-.4 3.3l10.8 14.1-10.8 13.8c-.8 1-.6 2.5.4 3.3.4.3.9.5 1.5.5.7 0 1.4-.3 1.9-.9l12-15.2c.5-.8.5-2-.1-2.9z"
            className="fill:rgb(224, 224, 224);animation-play-state:paused"></path>
        <path fill="#333" d="M81.2 18.3H18.8c-4.8 0-8.8 3.9-8.8 8.8v45.8c0 4.8 3.9 8.8 8.8 8.8h62.5c4.8 0 8.8-3.9 8.8-8.8V27.1c-.1-4.8-4-8.8-8.9-8.8zM29.5 67.1c-.5 0-1-.2-1.5-.5-1-.8-1.2-2.3-.4-3.3l10.8-13.8-10.8-14.2c-.8-1-.6-2.5.4-3.3 1-.8 2.5-.6 3.3.4l12 15.6c.7.9.7 2.1 0 2.9l-12 15.2c-.4.7-1.1 1-1.8 1zm41 1.4H45c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4h25.6c1.3 0 2.4 1.1 2.4 2.4-.1 1.3-1.1 2.4-2.5 2.4z"
            className="fill:rgb(51, 51, 51);animation-play-state:paused"></path>
    </g>
</svg>;

const codeIcon = <svg viewBox="0 0 100 100" y="0" x="0"
    id="prompt" version="1.1" width="50px" height="50px"
    className="width:100%;height:100%;background-size:initial;background-repeat-y:initial;background-repeat-x:initial;background-position-y:initial;background-position-x:initial;background-origin:initial;background-color:initial;background-clip:initial;background-attachment:initial;animation-play-state:paused">
    <g id="ldl-scale" className="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);animation-play-state:paused">
        <circle fill="#333" r="40" cy="50" cx="50" className="fill:rgb(51, 51, 51);animation-play-state:paused"></circle>
        <path fill="#fff" d="M67.582 30.535H32.418A4.423 4.423 0 0 0 28 34.953v20.779a4.423 4.423 0 0 0 4.418 4.418h14.585v6.77H43.21a5.1 5.1 0 0 0-4.924 3.775l-.274 1.02h23.975l-.274-1.02a5.1 5.1 0 0 0-4.924-3.775h-3.793v-6.77h14.585a4.423 4.423 0 0 0 4.418-4.418V34.953a4.422 4.422 0 0 0-4.417-4.418zm1.176 25.197c0 .649-.527 1.176-1.176 1.176H32.418a1.177 1.177 0 0 1-1.176-1.176V34.953c0-.649.527-1.176 1.176-1.176h35.164c.649 0 1.176.527 1.176 1.176v20.779z" className="fill:rgb(255, 255, 255);animation-play-state:paused"></path>
        <g className="animation-play-state:paused">
            <path fill="#fff" d="M41.614 43.808v-3.479c0-.284.339-.626.761-.626h1.5c.502 0 .84-.321.84-.798 0-.478-.345-.812-.84-.812h-1.399c-1.628 0-2.81.981-2.81 2.332v3.206c0 .163 0 .66-.908.863l-.508.093V46.1l.499.09c.917.205.917.702.917.866v3.205c0 1.352 1.182 2.333 2.81 2.333h1.399c.495 0 .84-.333.84-.812 0-.478-.337-.798-.84-.798h-1.5c-.422 0-.761-.343-.761-.626v-3.479c0-.456-.189-.872-.58-1.273a2.464 2.464 0 0 0-.308-.261 2.67 2.67 0 0 0 .311-.264c.388-.401.577-.816.577-1.273z"
                className="fill:rgb(255, 255, 255);animation-play-state:paused"></path>
            <path fill="#fff" d="M53.864 43.455c0-.503-.54-1.177-1.092-1.177a.684.684 0 0 0-.447.159l-1.532 1.559.204-2.153a.514.514 0 0 0-.125-.421c-.209-.246-.64-.356-.879-.356-.225 0-.655.114-.864.359a.502.502 0 0 0-.127.401l.191 2.155-1.543-1.568a.686.686 0 0 0-.421-.135c-.552 0-1.092.674-1.092 1.177 0 .273.097.453.242.508l1.967 1.38-1.948 1.367c-.262.149-.262.428-.262.52 0 .514.53 1.177 1.092 1.177.102 0 .292 0 .449-.159l1.516-1.542-.189 2.137c-.023.15.02.294.125.418.209.245.64.359.864.359.239 0 .669-.11.879-.356a.504.504 0 0 0 .127-.406l-.206-2.168 1.532 1.558c.157.159.345.159.447.159.562 0 1.092-.663 1.092-1.177 0-.09 0-.363-.249-.514l-1.961-1.374 1.923-1.354c.19-.08.287-.26.287-.533z" className="fill:rgb(255, 255, 255);animation-play-state:paused"></path>
            <path fill="#fff" d="M61.254 44.496c-.917-.21-.917-.704-.917-.866v-3.206c0-1.351-1.183-2.332-2.812-2.332h-1.398c-.495 0-.84.333-.84.812 0 .477.337.798.84.798h1.5c.422 0 .761.343.761.626v3.479c0 .456.188.871.579 1.274.095.094.197.18.309.261a2.638 2.638 0 0 0-.312.264c-.387.4-.575.815-.575 1.27v3.479c0 .284-.339.626-.761.626h-1.5c-.502 0-.84.321-.84.798 0 .478.345.812.84.812h1.398c1.629 0 2.812-.981 2.812-2.333v-3.205c0-.162 0-.656.906-.864l.509-.092v-1.513l-.499-.088z" className="fill:rgb(255, 255, 255);animation-play-state:paused"></path>
        </g>
    </g>
</svg>;

export default function EditorPage() {
    const [activeTab, setActiveTab] = useState(1);
    const [visibility, setVisibility] = useState(false);
    const [css, setCSSCode] = useState(cssCode);
    const [js, setJSCode] = useState(javascriptCode);
    const [html, setHTMLCode] = useState(htmlCode);

    const newSrcDoc = `<html>
    <head>
        <style>${css}</style>
    </head>
    <body>
        ${html}
        <script>${js}</script>
    </body>
</html>`;

    const [srcDoc, setSrcDoc] = useState(newSrcDoc);



    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark';





    function TabView() {
        const handleTabClick = (tabIndex: number) => {
            setActiveTab(tabIndex);
        };

        return (
            <div className="flex justify-center">
                <button
                    className={`px-4 py-2 mr-2 rounded ${activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    onClick={() => handleTabClick(1)}
                >
                    HTML
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded ${activeTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    onClick={() => handleTabClick(2)}
                >
                    CSS
                </button>

                <button
                    className={`px-4 py-2 mr-2 rounded ${activeTab === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    onClick={() => handleTabClick(3)}
                >
                    JS
                </button>
            </div>
        );
    }



    // Update srcDoc when code changes
    useEffect(() => {
        const souce2 = `<html><head><style>${css}</style></head>
        <body>${html}<script>${js}</script></body></html> `

        const souce1 = `<main><style>${css}</style>${html}<script>${js}</script></main>`
        setSrcDoc(souce2);
    }, [html, css, js]);

    function showPrompt() {
        setVisibility(!visibility)
    }

    return (<main className='items-center flex flex-col'>
        {/* AD */}
        <LeaderboardGoogleAds />


        {/* languages selection dropdown-menu */}
        <div className='h-[45px] flex justify-center w-full '>
            <div className='flex container justify-between'>
                <div className='flex'>
                    <Link href='./' className='p-2 w-[35px] '>
                        Home
                    </Link>
                    <div className='pl-6'><ThemeChangeButton /></div>
                </div>
                <div>
                    <TabView />
                </div>
            </div>
        </div>


        {/* top-[190px] */}
        <div className='fixed top-[135px] bottom-0 left-0 right-0 flex'>
            <div className={(visibility ? `hidden` : `block`) + ` lg:block border h-full w-full`}>
                <AceEditor
                    key={`tab-${activeTab}`}
                    mode={activeTab == 1 ? 'html' : activeTab == 2 ? 'css' : 'js'}
                    theme={isDarkMode ? 'monokai' : 'tomorrow'}
                    value={activeTab == 1 ? html : activeTab == 2 ? css : js}
                    onChange={(e) => {
                        if (activeTab == 1) {
                            setHTMLCode(e)
                        } else if (activeTab == 2) {
                            setCSSCode(e)
                        } else {
                            setJSCode(e)
                        }
                    }}
                    height="100%"
                    width="100%"
                    fontSize={15}
                    wrapEnabled
                    enableLiveAutocompletion
                    enableBasicAutocompletion
                    className='border'
                />
            </div>


            <button onClick={showPrompt}
                className=' absolute flex justify-center 
          items-center bottom-10 right-10 opacity-80 z-0'>
                {promptIcon}
            </button>

            <div
                className={(!visibility ? `hidden` : `block`) + ' absolute w-[100%] lg:block lg:w-[50%] right-0 h-full z-0'}>
                <div className='border top-5 h-full w-full bottom-0'>

                    <iframe srcDoc={srcDoc}
                        className='z-[2] h-full w-full bg-white'>

                    </iframe>

                    {/* <div className=" prose  h-full overflow-scroll bg-[var(--color-background)]">
                        <div dangerouslySetInnerHTML={{ __html: srcDoc }} />
                    </div> */}

                </div>
                <button onClick={showPrompt}
                    className=' lg:hidden absolute flex justify-center 
                    items-center bottom-10 right-10 opacity-80 z-0'>
                    {codeIcon}
                </button>
            </div>
        </div>

    </main>)
}



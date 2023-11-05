import path from 'path';
import fs from 'fs';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypePrism from 'rehype-prism';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote';
import { Footer, NavBar } from "@/components/contents/components";

const sourceFilePath = 'components\\static-pages\\mdx-files\\';
const startingPage = 'advertising.mdx'
const pageNotFound = 'components\\static-pages\\mdx-files\\error.mdx';


export default function Page({ source }: any) {
    return (<main className="w-full flex-col flex content-center">
        <NavBar list={{}}></NavBar>
        <div className="my-5 lg:px-[20%]">
            <div className=" prose">
                <MDXRemote {...source}>
                </MDXRemote></div>
        </div>
        <Footer />
    </main>)
}

export async function getServerSideProps({ query }: { query: any }) {
    const fileName = sourceFilePath + startingPage
    var source = `# 404 Error\n\n# Page Not Found `

    async function getErrorPage() {
        const fileName = pageNotFound;
        const filePath = path.join(process.cwd(), fileName);
        try {
            const fileData = await fs.promises.readFile(filePath, 'utf-8');
            const fileContent = fileData.toString();
            return fileContent;
        } catch (err) {
            return source;
        }
    }

    async function getLocalData() {

        const filePath = path.join(process.cwd(), fileName);
        try {
            const fileData = await fs.promises.readFile(filePath, 'utf-8');
            const fileContent = fileData.toString();
            return fileContent;
        } catch (err) {
            return getErrorPage();
        }
    }

    source = await getLocalData()


    const mdxSource = await serialize(source, {
        mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypeKatex, rehypeHighlight, rehypePrism]
        }
    })

    return { props: { source: mdxSource } }

}
import path from 'path';
import fs from 'fs';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypePrism from 'rehype-prism';
import { serialize } from 'next-mdx-remote/serialize'
import { renderToString } from 'react-dom/server';
import { MDXRemote } from 'next-mdx-remote';

import { LeaderboardGoogleAds, LargeRectangleGoogleAds, BillboardGoogleAds } from './mdx-components/components'

const pageNotFound = 'pages\\mdx-files\\error.mdx';

export async function getPageData({ fileName }: { fileName: string }) {
    var source = ''
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
            remarkPlugins: [remarkGfm, remarkMath,],
            rehypePlugins: [rehypeKatex, rehypeHighlight, rehypePrism]
        }
    })

    const htmlSource = renderToString(
        <MDXRemote {...mdxSource} components={{ LeaderboardGoogleAds, LargeRectangleGoogleAds, BillboardGoogleAds }} />)

    return htmlSource;
}
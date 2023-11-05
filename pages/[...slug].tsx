import  {ContentViewPage}  from '../components/contents/Contents-view-page'


const sourceFilePath = 'pages\\mdx-files\\tutorials\\';

export default function JS({ source }: { source: any }) {
    return (<ContentViewPage path={source}></ContentViewPage>)
}

export async function getServerSideProps({ query }: { query: any }) {
    const { slug } = query;

    // var tmp = ''
    // if (slug?.length == 1) {
    //     tmp = 'introduction'
    // }
    // if (tmp != '') {
    //     tmp = `\\${tmp}`
    // }

    return { props: { source: slug } }
}
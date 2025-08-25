import Head from 'next/head';
const Seo = ({ title }) => {
    let i = `KABUM - ${title}`;
    return (
        <Head>
            <title>{i}</title>
            <link href="/favicon.ico" rel="icon"></link>
            <meta
                name="description"
                content="KABUM - Admin Dashboard"
            />
            <meta
                name="author"
                content="KABUM"
            />
            <meta
                name="keywords"
                content="kabum admin dashboard
admin panel kabum
ecommerce dashboard
produto dashboard
categoria dashboard
usuario dashboard
financeiro dashboard"
            ></meta>
        </Head>
    );
};

export default Seo;

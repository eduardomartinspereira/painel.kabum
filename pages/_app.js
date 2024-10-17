import { SessionProvider } from 'next-auth/react';
import Authenticationlayout from '../shared/layout-components/layout/authentication-layout';
import Contentlayout from '../shared/layout-components/layout/contentlayout';
import '../styles/globals.scss';
const layouts = {
    Contentlayout: Contentlayout,
    Authenticationlayout: Authenticationlayout,
};
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const Layout =
        layouts[Component.layout] ||
        ((pageProps) => <Component>{pageProps}</Component>);
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}

export default MyApp;

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
        <Layout>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </Layout>
    );
}

export default MyApp;

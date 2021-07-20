import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import { Header } from '../components/header/header.component';
import { CombinedProviders } from '../context/CombinedContext';
import { useRouter } from 'next/dist/client/router';
import { UserMenu } from '../components/user-menu/user-menu.component';


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  function renderHeader() {
    const pathsList = ['/estoque', '/login']
    if (!pathsList.includes(router.pathname)) {
      return <Header />
    }
  }

  return (
        <CombinedProviders>
          <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
          {renderHeader()}
          <Component {...pageProps} />
          <UserMenu />
        </CombinedProviders>
      )
}

export default MyApp;

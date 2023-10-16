import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CacheBuster } from 'react-cache-buster/dist/CacheBuster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import packageJson from '../package.json';
import { Routing } from '@/routes';
import { useSetupAxios } from '@/services';
import { ENVIRONMENT } from '@/utils/constant';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  useSetupAxios();

  const isCacheBusterEnable = [ENVIRONMENT.STAGE, ENVIRONMENT.PRODUCTION].includes(
    import.meta.env.VITE_APP_ENV
  );

  const queryClient = new QueryClient();
  const CLIENT_ID = `${import.meta.env.VITE_APP_CLIENT_ID}`;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <CacheBuster
          currentVersion={packageJson.version}
          isEnabled={isCacheBusterEnable}
          isVerboseMode={false}
          // TODO: Need to add loader here
        >
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <BrowserRouter basename='/app'>
              <Routing />
            </BrowserRouter>
          </GoogleOAuthProvider>
        </CacheBuster>
      </QueryClientProvider>
    </>
  );
};

export default App;

import { useState } from "react";

import "../styles/globals.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import { AuthUserProvider } from "../context/AuthUserContext";
import { QueryClientProvider, QueryClient } from "react-query";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

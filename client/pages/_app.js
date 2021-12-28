import React,{useEffect} from 'react';
import { Provider } from "../context";
import NProgress from "nprogress";
import Router from "next/router";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import TopNav from "../components/nav/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../public/css/styles.css";
import "nprogress/nprogress.css";
import Footer from "../components/nav/Footer";
import ScrollToTop from "react-scroll-up";
import { UpCircleOutlined } from "@ant-design/icons";
import 'tailwindcss/tailwind.css'
import "../public/css/slick.css";
import "../public/css/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider>
        
           <TopNav />         
        
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
      {
            router.pathname =='/login' || router.pathname =='/register'  
            || router.pathname =='/forgot-password' || router.pathname =='/user/reset/[slug]'|| router.pathname =='/user'
            || router.pathname =='/user/support'|| router.pathname =='/author'|| router.pathname =='/user/qa'
            
            
            ? '': <Footer />          
        }
      <ScrollToTop showUnder={160}>
        <UpCircleOutlined className="h2" />
      </ScrollToTop>
    </Provider>
  );
}

export default MyApp;

import React from 'react';
import './App.css'
import Header from './component/layout/header/Header.js'
import { BrowserRouter} from 'react-router-dom';
import webfont from 'webfontloader'
import Footer from './component/layout/footer/Footer';

function App() {
  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid sans","Chilanka"]
      }
    })
  },[])

  return (
    <BrowserRouter>
     <Header />
     <Footer />
    </BrowserRouter>
   
  );
}

export default App;

/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ThemeProvider from './Dashboard/ThemeContext'; // ✅ Correct import path
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // for dropdown toggle


import Nav from './Dashboard/Nav';
import Dashboard from './Dashboard/Dashboard';
import GoverningBody from './School/GoverningBody'; // Importing GoverningBody component
import LeadershipTeam from './School/LeadershipTeam'; // Importing LeadershipTeam component
import ContactUs from './School/ContactUs'; // Importing ContactUs component

import History from './About/History'; // Importing History component
import DirectorsMessage from './About/DirectorsMessage'; // Importing DirectorsMessage component
import PrincipalDesk from './About/PrincipalDesk'; // Importing PrincipalDesk component
import VisionMission from './About/VisionMission'; // Importing VisionMission component

import SchoolFees from './Admission/SchoolFees'; // Importing SchoolFees component
import RegisterOnlineAdmission from './Admission/RegisterOnlineAdmission'; // Importing RegisterOnlineAdmission component

import Registration from './Register/Registration'; // Importing Register component

import Gallery from './Gallery/Gallery'; // Importing Gallery component

import Academic from './Academic/Academic'; // Importing Academic component
import CoCurricular from './Academic/CoCurricular'; // Importing CoCurricular component
import Timetable from './Academic/Timetable'; // Importing Timetable component
import News from './Academic/News'; // Importing News component

import AdmissionFormDashboard from './AdmissionForm/AdmissionFormDashboard';
import NewApplication from './AdmissionForm/NewApplication';
import AdminLogin from './Admin/AdminLogin';
import AdminDash from './Admin/AdminDash';

import ViewUsers from './Admin/ViewUsers'; // Importing ViewUsers component
 import ApplicationView from './Admin/ApplicationView'; // Importing ApplicationView component
import FullAdminDash from './Admin/FullAdminDash'; // Importing FullAdminDash component
import Chart from './Admin/Chart'; // Importing Chart component

import { GoogleOAuthProvider } from '@react-oauth/google';
 

// import Home from './Component/Home'; // Importing Home component
// import School from './Component/School'; // Importing School component 
// import Aboutus from './Component/Aboutus';
// import Contact from './Component/Contact';
// import Portfolio from './Component/Portfolio';
// import Login from './Component/Login';
// import ErrorPage from './Component/ErrorPage'; // Import the ErrorPage component
// import ProductDetail from './Component/ProductDetail'; // Import the ProductDetail component
// import ThemeProvider from './Context/ThemeContext'; // ✅ Correct
// import Home1 from './Component/Home1'; // Importing Home1 component

// const Contact = React.lazy(() => import('./Component/Contact'));


const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Login />, // Set the default route to the Login component
        
    // },
    {
        path: "/",
        element: <Nav />,
       
        children: [
            {
                index: '/Dashboard', // This will render the Home component when navigating to /nav
                element: <Dashboard />
            },
            
            {
                path: "/Dashboard", // nav bar name No leading slash
                element: <Dashboard />  // this is file name
            },
            // school
            {
                path: "/governingbody", // nav bar name No leading slash
                element: <GoverningBody />  // this is file name
            },
            {
                path: "/leadershipteam", // nav bar name No leading slash
                element: <LeadershipTeam />  // this is file name
            },
            {
                path: "/contactus", // nav bar name No leading slash
                element: <ContactUs />  // this is file name
            },
            //about us
             {
                path: "/history", // nav bar name No leading slash
                element: <History />  // this is file name
            },
             {
                path: "/directorsmessage", // nav bar name No leading slash
                element: <DirectorsMessage />  // this is file name
            },
             {
                path: "/principaldesk", // nav bar name No leading slash
                element: <PrincipalDesk />  // this is file name
            },
             {
                path: "/visionmission", // nav bar name No leading slash
                element: <VisionMission />  // this is file name
            },
              // Admission
              {
                path: "/schoolfees", // nav bar name No leading slash
                element: <SchoolFees />  // this is file name
            },
            {
                path: "/registeronlineadmission", // nav bar name No leading slash
                element: <RegisterOnlineAdmission />  // this is file name
            },
            {
                
                path: "/registration", // nav bar name No leading slash
                element: <Registration />  // this is file name
            },
            //gallery
            {
                path: "/gallery", // nav bar name No leading slash
                element: <Gallery />  // this is file name
            },
            //Academic
            {
                path: "/academic", // nav bar name No leading slash
                element: <Academic />  // this is file name
            },
            {
                path: "/coCurricular", // nav bar name No leading slash
                element: <CoCurricular />  // this is file name
            },
            {
                path: "/timetable", // nav bar name No leading slash
                element: <Timetable />  // this is file name
            },
            {
                path: "/news", // nav bar name No leading slash
                element: <News />  // this is file name
            },
             //AdmissionForm
             {
                path: "/AdmissionFormDashboard", // nav bar name No leading slash
                element: <AdmissionFormDashboard />  // this is file name
            },
            //NewApplication
            {
                
                path: "/NewApplication", // nav bar name No leading slash
                element: <NewApplication />  // this is file name
                  
            },

            //adminlogin
            {
                
                path: "/adminlogin", // nav bar name No leading slash
                element: <AdminLogin />  // this is file name
                  
            },

            {
                
                path: "/adminDash", // nav bar name No leading slash
                element: <AdminDash />  // this is file name
                  
            },
            
            {
                
                path: "/viewUsers", // nav bar name No leading slash
                element: <ViewUsers />  // this is file name
                  
            },
            {
                
                path: "/application/:id", // nav bar name No leading slash
                element: <ApplicationView />  // this is file name
                  
            },
              {
                
                path: "/fulladminDash", // nav bar name No leading slash
                element: <FullAdminDash />  // this is file name
                  
            },
  {
                
                path: "/chart", // nav bar name No leading slash
                element: <Chart />  // this is file name
                  
            },
           

        ]
    }
]);

//const client_id="453870711626-8i3upm52r8m94u2jdu0896arsrmuji8r.apps.googleusercontent.com"
const client_id="383911937159-sdbrmmc800rkt5eotpv072r39lqonttk.apps.googleusercontent.com"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <GoogleOAuthProvider clientId={client_id}>
     <ThemeProvider>                                                                             
            
            <RouterProvider router={router} >
           
            </RouterProvider>

     </ThemeProvider> 
     </GoogleOAuthProvider>
);

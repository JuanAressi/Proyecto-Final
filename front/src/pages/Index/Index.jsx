import { React } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import AboutUs from '../../components/AboutUs/AboutUs';
import Contacto from '../../components/Contacto/Contacto';
import Footer from '../../components/Footer/Footer';

function Index() {
    return (
        <div>
            <Navbar />

            <Banner />

            <AboutUs />

            <Contacto />

            <Footer />
        </div>
    )
}

export default Index
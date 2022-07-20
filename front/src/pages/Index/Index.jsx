import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import AboutUs from '../../components/AboutUs/AboutUs';
import Waves from '../../components/Waves/Waves';

function Index() {
	// const [users, setUsers] = useState([]);

	// useEffect(() => {
	// 	$.ajax({
	// 		type: 'GET',
	// 		url: 'http://local.misturnos/api/users',
	// 		dataType: 'json',
	// 		success: function (response) {
	// 			console.log('response: ', response);
	// 		},
	// 		error: function (error) {
	// 			console.log(error);
	// 		}
	// 	});
    // }, []);

	return (
		<div>
            <Navbar />
			
            <Banner />

            <AboutUs />
		</div>
	)
}

export default Index
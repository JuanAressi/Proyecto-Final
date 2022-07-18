import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
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

			{/* <Waves /> */}

			<div id='solicitaTurno' className='bg-secondary text-white text-center p-5' style={{ zIndex: '2' }}>
				<h2 className='mb-4'>Solicitá un turno online al instante</h2>

				<button className='btn border border-light text-light text-uppercase px-3 mt-2'>Reservar Turno</button>
			</div>
		</div>
	)
}

export default Index
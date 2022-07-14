import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import Navbar from '../../components/Navbar/Navbar';
import Waves from '../../components/Waves/Waves';

function Index() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		$.ajax({
			type: 'GET',
			url: 'http://local.misturnos/api/users',
			dataType: 'json',
			success: function (response) {
				console.log('response: ', response);
			},
			error: function (error) {
				console.log(error);
			}
		});
    }, []);

	return (
		<div>
			<Navbar />

			<div id='banner' style={{ marginTop: '102px' }}
			>
				<div className='row row1'>
					<div className='col-7 img img1'>
						<div className="gray-overlay"></div>
					</div>

					<div className='col-5 img img2'>
						<div className="gray-overlay"></div>
					</div>
				</div>

				<div className='row row2'>
					<div className='col-4 img img3'>
						<div className="gray-overlay"></div>
					</div>

					<div className='col-4 img img4'>
						<div className="gray-overlay"></div>
					</div>

					<div className='col-4 img img5'>
						<div className="gray-overlay"></div>
					</div>
				</div>
			</div>

			<Waves />

			<div id='solicitaTurno' className='bg-secondary text-white text-center p-5' style={{ zIndex: '2' }}>
				<h2 className='mb-4'>Solicitá un turno online al instante</h2>

				<button className='btn border border-light text-light text-uppercase px-3 mt-2'>Reservar Turno</button>
			</div>
		</div>
	)
}

export default Index
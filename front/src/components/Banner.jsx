import React from 'react';
import img1 from './assets/img/Banner/img1.avif';
import img2 from './assets/img/Banner/img2.avif';
import img3 from './assets/img/Banner/img3.avif';
import img4 from './assets/img/Banner/img4.avif';
import img5 from './assets/img/Banner/img5.avif';
import img6 from './assets/img/Banner/img6.avif';
import img7 from './assets/img/Banner/img7.avif';
import img8 from './assets/img/Banner/img8.webp';
import img9 from './assets/img/Banner/img9.jpg';
import img10 from './assets/img/Banner/img10.webp';

function Banner() {
	const rowHeight = {
		height: 'calc(( 100vh - 102px ) / 2)',
	}

	return (
		<div
			id='banner'
			style={{
				marginTop: '102px',
			}}
		>
			<div className='row row1'>
				<div className='col-7 gray-overlay'>
					<div className="img1"></div>
				</div>

				<div className='col-5 gray-overlay'>
					<div className="img2"></div>
				</div>
			</div>

			<div className='row row2'>
				<div className='col-4 gray-overlay'>
					<div className="img3"></div>
				</div>

				<div className='col-4 gray-overlay'>
					<div className="img4"></div>
				</div>

				<div className='col-4 gray-overlay'>
					<div className="img5"></div>
				</div>
			</div>
		</div>
	)
}

export default Banner
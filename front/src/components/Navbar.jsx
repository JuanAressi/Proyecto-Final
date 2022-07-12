import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<div
			id="navbar"
			className='navbar fixed-top bg-light-gray box-shadow-dark'
			style={{
				borderBottom: '2px solid #056799',
				fontSize: '1.2rem',
			}}
		>
			<div className="container">
				<div className="d-flex justify-content-between w-100">
					<Logo style='secondary' />

					<div className="d-flex justify-content-end align-items-center text-uppercase">
						<Link
							to='/#inicio'
							className='p-4 mb-0 text-dark'
						>
							Inicio
						</Link>

						<Link
							to='/#sobre-nosotros'
							className='p-4 mb-0 text-dark'
						>
							Sobre nosotros
						</Link>

						<Link
							to='/#turnos'
							className='p-4 mb-0 text-dark'
						>
							Turnos
						</Link>

						<Link
							to='/#contacto'
							className='p-4 mb-0 text-dark'
						>
							Contacto
						</Link>

						<Link
							to='/login'
							className='p-4 mb-0 ms-5 text-dark'
						>
							Inicia Sesion
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
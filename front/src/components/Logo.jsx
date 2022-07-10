import React from 'react';

function Logo({ style }) {
    let color = '';

    if (style === 'colorfull') {
        color = 'url(#gradient)';
    } else {
        color = '#fff';        
    }
    
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <svg height='100px' width='100px'>
                <g>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="90%" y2="50%">
                        <stop offset="0%" stopColor='#023e8a' stopOpacity='100%'/>
                        <stop offset="35%" stopColor='#023e8a' stopOpacity='100%'/>
                        <stop offset="100%" stopColor='#ade8f4' stopOpacity='100%'/>
                    </linearGradient>

                    <path fillRule='evenodd' clipRule="evenodd" fill={color} d="M57.8,35.5c0.2-0.4-1.6-1.3-1.7-1C55.9,34.9,57.6,35.9,57.8,35.5z   M58.9,34.4c0.3-0.3-0.9-1.8-1.2-1.6C57.3,33,58.6,34.6,58.9,34.4z M83.8,56.8l-11.4-6.6l11.5-6.5c1.1-0.6,1.5-2,0.8-3.2l-9-15.7  c-0.6-1.1-2.1-1.5-3.2-0.8l-11.4,6.5l0.1-13.2c0-1.3-1-2.3-2.3-2.4l-18.2-0.1c-1.3,0-2.4,1.1-2.4,2.4l-0.1,13.1l-11.4-6.6  c-1.1-0.7-2.6-0.3-3.2,0.8L14.5,40c-0.7,1.1-0.3,2.6,0.8,3.2l11.4,6.7l-11.5,6.5c-1.1,0.6-1.5,2.1-0.8,3.2l9,15.7  c0.6,1.2,2.1,1.5,3.2,0.9L38,69.7l-0.1,13.2c0,1.3,1,2.4,2.3,2.4l18.2,0.1c1.3,0,2.4-1,2.4-2.3l0.1-13.2l11.4,6.6  c1.1,0.7,2.6,0.3,3.2-0.8L84.6,60C85.3,58.9,84.9,57.5,83.8,56.8z M59,35.5c-0.7,0.8-2.5,0.5-4.1-0.8c-1.6-1.3-2.4-3-1.7-3.8  c0.7-0.8,2.5-0.5,4.1,0.8C58.9,32.9,59.7,34.6,59,35.5z M48.8,80l-0.1-9.9c0.4,0.2,0.9,0.4,1.3,0.8c0.1,0.2-0.2,7.6-0.2,9.2L48.8,80  z M50.3,47.5l0.3,0.1l-0.4,15.2c-0.1,0-1.2-0.6-1.6-0.8c0-0.1-0.2-12.8-0.2-15.4C49,47,49.7,47.2,50.3,47.5z M54.4,69.2  c1.1,2.7,0.2,5.9-2.4,7.3l0-1.9c0-0.2,0.4-0.6,0.5-0.8c0.1-0.3,0.2-0.6,0.2-0.9c0-0.4,0-0.7,0-1c-0.4-3-3.4-3.8-5.8-5  c-1.3-0.6-2.6-1.3-3.5-2.4c-0.9-1.1-1.4-2.5-1.5-3.9c-0.2-3,1.6-5.4,4.3-6.7l0,3l0,0.5c0,0.1-0.7,0.6-0.7,0.8  c-0.6,0.9-0.7,2.1-0.5,3c0.4,2.1,2.8,2.9,4.5,3.8C51.5,66,53.6,67.2,54.4,69.2z M48.3,38.1l-0.1-11c-1.3-0.6-2.3-1.9-2.2-3.4  c0-2,1.7-3.7,3.7-3.7c2.1,0,3.8,1.7,3.8,3.8c0,1.5-1,2.8-2.3,3.4l-0.3,12.2C49.9,39,49,38.7,48.3,38.1z M56,52  c-0.8,1.3-2,2.2-3.4,2.8l0-2c0-0.5-0.2-1.6,0.2-1.9c0.9-1,1.2-2.8,0.3-3.9c-0.9-1.3-2.9-1.9-4.3-2.4c-2.9-1.2-5.8-2.7-6.6-6  c-0.7-3.2,0.7-6.6,3.7-8l0.1,3.6c0,0.2-0.2,0.4-0.4,0.6c-0.1,0.3-0.3,0.6-0.3,0.9c-0.1,0.5-0.1,0.9-0.1,1.4c0.1,1.5,1,2.5,2.2,3.3  c2.3,1.4,5.1,1.8,7.3,3.6C57.1,45.8,57.6,49.3,56,52z M47,76.7l0,1c-0.5,0-1.1-0.1-1.7-0.1c-0.4,0-0.3-0.1-0.3-0.6  c0-0.3,0.5-0.2,0.7-0.2C46.2,76.8,46.6,76.8,47,76.7z"></path>
                </g>
            </svg>

            <svg height='50px' width='163px'>
                <g>
                    <path fillRule='evenodd' clipRule="evenodd" fill={color} d="M17.8 14.719999999999999 c0.04 -1.32 0 -2.4 0 -3.68 c0 -1.48 -2.68 -1.32 -3.64 -1.28 c-4.28 0.28 -8.36 3 -10.32 6.72 c-0.56 1.08 -0.96 2.2 -1.24 3.36 c-0.68 2.72 -0.72 5.6 -0.4 8.36 c0.28 2.6 0.96 5.2 2.56 7.28 c2.76 3.64 7.84 4.92 12.2 4.24 c0.2 -0.04 0.4 -0.08 0.56 -0.2 c0.12 -0.08 0.24 -0.24 0.24 -0.4 l0.12 -2.28 c0.04 -0.72 0 -0.68 0 -1.4 c0 -0.96 -2 -0.24 -3.24 -0.24 c-1.2 0 -2.48 -0.04 -3.56 -0.6 c-1.92 -1.08 -3 -3.24 -3.6 -5.28 c-0.68 -2.2 -0.84 -4.56 -0.44 -6.8 c0.48 -2.92 1.88 -6.28 4.96 -7.28 c1.76 -0.6 3.64 -0.4 5.4 -0.2 c0.24 0.04 0.4 -0.12 0.4 -0.32 z M21.88 16.56 c0 4.04 0.04 8.12 0.12 12.12 c0.04 2.44 0 5.2 1.16 7.44 c1.48 2.88 4.76 4.16 7.92 3.96 c2.16 -0.16 4.16 -0.72 5.72 -2.32 c2.64 -2.84 2.12 -7.28 2.16 -10.92 c0.08 -5.24 0.2 -10.12 0.2 -15.4 c0 -0.88 -0.28 -1.36 -1.16 -1.4 c-1.08 -0.04 -2.16 0 -3.24 0.08 c-0.44 0 -0.8 0.4 -0.8 0.88 c0.04 3.84 0.12 7.72 0.08 11.6 c-0.04 3.32 0.4 7 -0.84 10.16 c-0.48 1.16 -1.56 2.04 -2.84 2.04 c-3.2 -0.08 -3.08 -3.88 -3.2 -6.12 c-0.24 -4.88 0.12 -9.88 0.24 -14.76 c0 -0.92 0 -1.84 0.04 -2.76 c0.04 -0.48 0.12 -1.08 -0.52 -1.12 l-0.72 0 c-1 0.08 -2 -0.04 -3 0 c-0.96 0.08 -1.28 0.36 -1.28 1.32 c0 1.72 -0.04 3.48 -0.04 5.2 z M48.67999999999999 29.68 c-0.12 -4.56 -0.08 -9.4 -0.04 -13.92 c0 -1.4 -0.08 -2.92 -0.08 -4.32 c0 -1.52 -0.6 -1.44 -1.4 -1.48 c-1.16 -0.04 -1.68 -0.04 -2.84 -0.04 c-0.76 -0.04 -1.08 0.16 -1.08 0.92 c0 3.92 -0.12 15 -0.08 16.6 s0.2 8.88 0.12 10.48 c-0.04 0.56 0 1.12 0.04 1.68 c0.04 0.2 0.16 0.4 0.48 0.4 c1.32 -0.08 2.56 -0.08 3.88 -0.12 c0.48 -0.04 0.88 -0.16 1.08 -0.68 c0.04 -0.28 -0.08 -7.6 -0.08 -9.52 z M69.6 32.64 c0.24 -0.52 0.44 -1.04 0.64 -1.56 c0.44 -1.28 0.52 -2.6 0.64 -3.92 c0.24 -2.8 0.16 -5.64 -0.56 -8.36 c-0.88 -3.48 -3.12 -6.68 -6.48 -8.16 c-1.52 -0.68 -3.24 -0.76 -4.88 -0.72 c-1.72 0 -3.48 -0.08 -5.2 0.08 c-0.48 0.04 -0.72 0.28 -0.8 0.72 c-0.08 0.48 -0.16 0.96 -0.16 1.4 c0.08 2.44 0 9.68 0.08 10.88 c0.04 1.08 -0.08 2.4 -0.08 3.48 c0.04 2.68 0 5.4 0 8.08 c0 1.12 -0.04 2.2 -0.04 3.32 c0 1.2 -0.44 1.72 2.84 1.72 c2.92 0 5.96 -0.24 8.72 -1.28 c2.56 -0.92 4.16 -3.28 5.28 -5.68 z M57.96 28.48 l0 -4.8 c0 -3.04 0.08 -5 -0.04 -7.56 l0 -0.48 c0.04 -0.84 0.16 -0.88 1.04 -0.88 c1.16 -0.04 2 0.24 3 0.64 s1.56 1.28 2.08 2.12 c1 1.64 1.4 3.44 1.48 5.32 c0.04 1.08 0.08 2.16 0.08 3.24 c0 5.12 -3 8.68 -5.64 8.68 c-1.76 0 -2.04 0.12 -2.04 -1.04 c0 -1.2 0.08 -2.4 0.08 -3.6 c-0.04 -0.52 -0.04 -1.08 -0.04 -1.64 z M75.04 31.8 l-0.04 0 c0 1 -0.04 2.04 0 3.08 c0.04 1.28 0.12 2.56 0.2 3.84 c0 0.44 0.12 0.56 0.52 0.64 c0.84 0.2 1.64 0.24 2.48 0.24 c2.16 -0.08 4.32 0.08 6.48 0 c0.88 -0.04 1.28 0.04 2.16 -0.12 c0.8 -0.16 1.08 -0.6 1.08 -1.8 c-0.08 -0.76 -0.04 -1.08 -0.04 -2 c0 -1.32 -0.92 -1.76 -1.72 -1.72 c-0.56 0.04 -3.24 -0.04 -4.32 -0.04 c-1.8 0.04 -1.52 0.28 -1.52 -1.6 c0 -1.52 0.04 -3.48 0.04 -5.04 c0 -0.84 0.08 -1.12 0.88 -1.12 l5 0 c0.8 0.12 1.36 -0.44 1.36 -1.28 s0.08 -0.88 0.08 -1.72 l-0.12 -1.2 c-0.08 -0.68 -0.32 -0.92 -1 -0.92 c-0.44 0 -0.88 0.04 -1.32 0.08 c-1.72 0.12 -2.52 -0.12 -4.2 0 c-0.56 0 -0.64 -0.08 -0.68 -0.6 c-0.16 -1.56 0 -3.28 0.16 -4.84 c0.04 -0.64 0.2 -0.76 0.8 -0.8 l5.64 -0.04 c0.76 -0.08 1 -0.04 0.96 -0.8 c-0.08 -1.16 0.04 -2.36 -0.08 -3.52 c-0.08 -0.64 -0.28 -0.76 -1 -0.76 c-1.2 0.04 -1.48 0.04 -2.68 0.12 c-1.2 0.04 -6 0.04 -7.16 0.04 c-1.68 0 -1.8 -0.12 -1.84 1.92 c-0.08 1.6 -0.04 3.24 -0.04 4.88 c0 2.8 -0.16 12.84 -0.08 15.08 z M97.72 10.04 c-0.4 0 -0.8 0.04 -1.2 0.04 c-0.6 0 -1.32 -0.12 -1.44 0.68 c-0.4 3.4 -0.76 7.16 -1.16 10.56 c-0.68 5.6 -1.32 11.36 -1.96 16.96 c-0.08 0.76 -0.16 1.48 0.68 1.64 c1.28 0.08 2.24 0.08 3.32 0.04 c0.4 0.04 0.84 0.08 0.96 -0.4 c0.08 -0.2 0.08 -0.4 0.08 -0.6 c0.08 -0.92 1.28 -12.44 1.76 -12.44 c0.76 0 2.76 9.36 3.72 12.8 c0.12 0.48 0.36 0.68 0.84 0.64 c1 -0.08 1.96 0 2.96 0 s0.8 -0.64 1 -1.48 c0.24 -0.92 2.56 -12 3.12 -12 c0.64 0 1.96 12.84 2.08 13.12 c0.24 0.56 0.92 0.32 1.4 0.32 c0.72 0 1.4 0.08 2.32 0 c0.68 -0.08 1.36 0.16 1.4 -0.72 c0 -0.2 -0.08 -0.4 -0.12 -0.6 c-0.16 -1 -0.36 -2.2 -0.56 -3.2 c-0.28 -2.08 -0.68 -4.12 -0.96 -6.2 c-0.4 -3.28 -0.8 -6.56 -1.16 -9.84 c-0.28 -2.8 -0.68 -5.96 -0.92 -8.76 c-0.08 -0.92 -1.12 -0.6 -1.76 -0.6 l-2.76 0 c-0.44 0 -0.64 0.84 -0.72 1.28 c-0.24 1.12 -3 15.56 -3.92 15.56 s-3.88 -13.2 -4.4 -16.08 c-0.12 -0.64 -0.56 -0.84 -1.16 -0.84 z M142.68 17.36 c0.84 2.48 1.04 5.16 1.04 7.8 c0 2.2 -0.4 4.32 -0.96 6.44 c-0.72 2.52 -1.92 4.8 -4.08 6.28 c-1.6 1.16 -3.28 1.92 -5.24 2.12 c-0.28 0 -0.52 0.04 -0.8 0.04 c-0.24 0 -0.48 -0.04 -0.76 -0.04 c-1.96 -0.2 -3.64 -0.96 -5.28 -2.12 c-2.12 -1.48 -3.36 -3.76 -4.04 -6.28 c-0.6 -2.12 -0.96 -4.24 -0.96 -6.44 c0 -2.64 0.2 -5.32 1.04 -7.8 c1.48 -4.28 5.56 -7.32 10 -7.4 c4.44 0.08 8.52 3.12 10.04 7.4 z M138.79999999999998 28.08 c0.4 -2.44 0.24 -4.92 -0.24 -7.36 c-0.48 -2.2 -1.44 -4.36 -3.28 -5.68 c-0.32 -0.24 -0.68 -0.44 -1.04 -0.56 c-0.52 -0.24 -1.08 -0.32 -1.6 -0.32 s-1.04 0.08 -1.56 0.32 c-0.4 0.12 -0.72 0.32 -1.04 0.56 c-1.88 1.32 -2.84 3.48 -3.28 5.68 c-0.48 2.44 -0.64 4.92 -0.24 7.36 c0.4 2.2 1.2 5.16 3.28 6.28 c0.88 0.48 1.84 0.8 2.84 0.84 c1 -0.04 2 -0.36 2.88 -0.84 c2.08 -1.12 2.88 -4.08 3.28 -6.28 z M155.88 9.8 c-0.76 0.04 -1.52 0.16 -2.28 0.4 c-1.64 0.56 -3.12 1.68 -4.12 3.12 c-0.88 1.32 -1.24 2.88 -1.36 4.44 c-0.08 1.2 0.04 2.44 0.6 3.52 c0.6 1.16 1.64 2.16 2.52 3.12 c0.8 0.84 1.6 1.68 2.48 2.44 c0.8 0.76 1.72 1.36 2.52 2.16 c1.16 1.16 1.6 3.8 0.76 5.24 c-1 1.6 -3.36 1.84 -4.92 1.32 c-0.8 -0.28 -1.52 -0.88 -2.2 -1.36 c-0.4 -0.28 -0.88 -0.4 -1.16 0.08 c-0.16 0.24 -0.24 0.52 -0.32 0.76 c-0.28 1 -0.64 1.92 -0.68 3 c-0.04 1.24 2.32 1.6 3.2 1.8 c3.92 0.92 8.64 0.2 10.68 -3.68 c0.4 -0.8 0.68 -1.64 0.84 -2.52 c0.04 -0.32 0.08 -0.6 0.08 -0.92 c0.16 -2.56 -0.88 -4.72 -2.44 -6.64 c-1.68 -2.08 -3.8 -3.52 -5.76 -5.32 c-1.2 -1.12 -1.64 -2.88 -1.28 -4.48 c0.36 -1.72 2.32 -2.16 3.8 -1.72 c0.44 0.12 0.8 0.32 1.2 0.56 c0.24 0.12 0.48 0.28 0.8 0.28 c0.56 0.04 0.64 -0.4 0.76 -0.84 c0.28 -1 0.76 -1.8 0.96 -2.76 c0.2 -1.08 -0.68 -1.28 -1.56 -1.56 c-1.04 -0.28 -2.04 -0.48 -3.12 -0.44 z"></path>
                </g>
            </svg>
        </div>
    )
}

export default Logo
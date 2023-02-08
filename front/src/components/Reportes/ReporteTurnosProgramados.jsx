// Utilities.
import { React, useEffect, useState } from 'react';
import { Page, Text, View, Document, Svg, Path } from '@react-pdf/renderer';

function ReporteTurnosProgramados({ data }) {
    const [subData, setSubData] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [solicitante, setSolicitante] = useState(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        // Get the user from LocalStorage.
        const user = JSON.parse(localStorage.getItem('user'));

        // Change 'solicitante' state.
        setSolicitante(user);
    }, []);


    useEffect(() => {
        let subData = [];
        let count   = 0;

        if (data !== null && data.turnos_por_medico !== undefined) {
            if (Object.keys(data.turnos_por_medico).length > 17) {
                subData.push(data.turnos_por_medico.slice(0, 17));
            
                for (let i = 17; i < Object.keys(data.turnos_por_medico).length; i++) {
                    if (count % 22 === 0) {
                        subData.push([]);
                    }
                    
                    subData[subData.length - 1].push(data.turnos_por_medico[i]);
                    count++;
                }
            } else {
                subData.push(data.turnos_por_medico);
            }

            // Change the data states.
            setSubData(subData);
            setFechaInicio(data.fecha_inicio);
            setFechaFin(data.fecha_fin);
        }

        // Change 'finished' state.
        setFinished(true);
    }, [data]);


    // Render the 'ReporteTurnosProgramados' component.
    return (
        finished && subData !== null
        ? (
            <Document title='Reporte de Turnos Programados' author='MisTurnos.com' subject='Reporte de Turnos Programados'>
                {
                    subData.map((data, index) => (
                        <Page size='A4' key={index}>
                            <View style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4' }}>
                                <View style={{ minHeight: '94.8vh' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#056799', color: '#fff', padding: '10', width: '100vw' }}>
                                        <Svg height='60px' width='60px'>
                                            <Path
                                                fill='#ffffff'
                                                d='MM 34.68 21.3 c 0.12 -0.24 -0.96 -0.78 -1.02 -0.6 C 33.54 20.94 34.56 21.54 34.68 21.3 z M 35.34 20.64 c 0.18 -0.18 -0.54 -1.08 -0.72 -0.96 C 34.38 19.8 35.16 20.76 35.34 20.64 z M 50.28 34.08 l -6.84 -3.96 l 6.9 -3.9 c 0.66 -0.36 0.9 -1.2 0.48 -1.92 l -5.4 -9.42 c -0.36 -0.66 -1.26 -0.9 -1.92 -0.48 l -6.84 3.9 l 0.06 -7.92 c 0 -0.78 -0.6 -1.38 -1.38 -1.44 l -10.92 -0.06 c -0.78 0 -1.44 0.66 -1.44 1.44 l -0.06 7.86 l -6.84 -3.96 c -0.66 -0.42 -1.56 -0.18 -1.92 0.48 L 8.7 24 c -0.42 0.66 -0.18 1.56 0.48 1.92 l 6.84 4.02 l -6.9 3.9 c -0.66 0.36 -0.9 1.26 -0.48 1.92 l 5.4 9.42 c 0.36 0.72 1.26 0.9 1.92 0.54 L 22.8 41.82 l -0.06 7.92 c 0 0.78 0.6 1.44 1.38 1.44 l 10.92 0.06 c 0.78 0 1.44 -0.6 1.44 -1.38 l 0.06 -7.92 l 6.84 3.96 c 0.66 0.42 1.56 0.18 1.92 -0.48 L 50.76 36 C 51.18 35.34 50.94 34.5 50.28 34.08 z M 35.4 21.3 c -0.42 0.48 -1.5 0.3 -2.46 -0.48 c -0.96 -0.78 -1.44 -1.8 -1.02 -2.28 c 0.42 -0.48 1.5 -0.3 2.46 0.48 C 35.34 19.74 35.82 20.76 35.4 21.3 z M 29.28 48 l -0.06 -5.94 c 0.24 0.12 0.54 0.24 0.78 0.48 c 0.06 0.12 -0.12 4.56 -0.12 5.52 L 29.28 48 z M 30.18 28.5 l 0.18 0.06 l -0.24 9.12 c -0.06 0 -0.72 -0.36 -0.96 -0.48 c 0 -0.06 -0.12 -7.68 -0.12 -9.24 C 29.4 28.2 29.82 28.32 30.18 28.5 z M 32.64 41.52 c 0.66 1.62 0.12 3.54 -1.44 4.38 l 0 -1.14 c 0 -0.12 0.24 -0.36 0.3 -0.48 c 0.06 -0.18 0.12 -0.36 0.12 -0.54 c 0 -0.24 0 -0.42 0 -0.6 c -0.24 -1.8 -2.04 -2.28 -3.48 -3 c -0.78 -0.36 -1.56 -0.78 -2.1 -1.44 c -0.54 -0.66 -0.84 -1.5 -0.9 -2.34 c -0.12 -1.8 0.96 -3.24 2.58 -4.02 l 0 1.8 l 0 0.3 c 0 0.06 -0.42 0.36 -0.42 0.48 c -0.36 0.54 -0.42 1.26 -0.3 1.8 c 0.24 1.26 1.68 1.74 2.7 2.28 C 30.9 39.6 32.16 40.32 32.64 41.52 z M 28.98 22.86 l -0.06 -6.6 c -0.78 -0.36 -1.38 -1.14 -1.32 -2.04 c 0 -1.2 1.02 -2.22 2.22 -2.22 c 1.26 0 2.28 1.02 2.28 2.28 c 0 0.9 -0.6 1.68 -1.38 2.04 l -0.18 7.32 C 29.94 23.4 29.4 23.22 28.98 22.86 z M 33.6 31.2 c -0.48 0.78 -1.2 1.32 -2.04 1.68 l 0 -1.2 c 0 -0.3 -0.12 -0.96 0.12 -1.14 c 0.54 -0.6 0.72 -1.68 0.18 -2.34 c -0.54 -0.78 -1.74 -1.14 -2.58 -1.44 c -1.74 -0.72 -3.48 -1.62 -3.96 -3.6 c -0.42 -1.92 0.42 -3.96 2.22 -4.8 l 0.06 2.16 c 0 0.12 -0.12 0.24 -0.24 0.36 c -0.06 0.18 -0.18 0.36 -0.18 0.54 c -0.06 0.3 -0.06 0.54 -0.06 0.84 c 0.06 0.9 0.6 1.5 1.32 1.98 c 1.38 0.84 3.06 1.08 4.38 2.16 C 34.26 27.48 34.56 29.58 33.6 31.2 z M 28.2 46.02 l 0 0.6 c -0.3 0 -0.66 -0.06 -1.02 -0.06 c -0.24 0 -0.18 -0.06 -0.18 -0.36 c 0 -0.18 0.3 -0.12 0.42 -0.12 C 27.72 46.08 27.96 46.08 28.2 46.02 z'
                                            />
                                        </Svg>
        
                                        <Text style={{ fontSize: '25px', marginLeft: '14px' }}>MisTurnos.com</Text>
                                    </View>
        
                                    {
                                        index === 0 && (
                                            <Text style={{ fontSize: '26px', color: '#000', textAlign: 'center', marginTop: '20px' }}>Reporte de Turnos Programados</Text>
                                        )
                                    }
                                    
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
                                        {/* Información sobre quién genera y cuando */}
                                        {
                                            index === 0 && (
                                                <View style={{ marginBottom: '16px', width: '88vw' }}>
                                                    <Text style={{ fontSize: '14px', color: '#151515', marginTop: '6px' }}>
                                                        <Text style={{ color: '#000' }}>Fecha de solicitud: </Text>{new Date().toLocaleDateString()}
                                                    </Text>
                
                                                    <Text style={{ fontSize: '14px', color: '#151515', marginTop: '6px' }}>
                                                        <Text style={{ color: '#000' }}>Profesional solicitante: </Text>{solicitante.apellido}, {solicitante.nombre}
                                                    </Text>

                                                    <Text style={{ fontSize: '14px', color: '#151515', marginTop: '6px' }}>
                                                        <Text style={{ color: '#000' }}>Inicio del periodo: </Text>{fechaInicio}
                                                    </Text>

                                                    <Text style={{ fontSize: '14px', color: '#151515', marginTop: '6px' }}>
                                                        <Text style={{ color: '#000' }}>Fin del periodo: </Text>{fechaFin}
                                                    </Text>
                                                </View>
                                            )
                                        }

        
                                        {/* Información propia del reporte */}
                                        <View style={{ width: '80vw' }}>
                                            {/* Turnos por día
                                            <View>
                                                <Text style={{ fontSize: '20px', color: '#000', textAlign: 'center', marginTop: '10px' }}>Turnos por día</Text>
        
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', fontSize: '12px', marginTop: '6px' }}>
                                                    <Text style={{ color: '#000', minWidth: '10%' }}>Día</Text>
                                                    <Text style={{ color: '#000', maxWidth: '16%' }}>Reservados</Text>
                                                    <Text style={{ color: '#000', maxWidth: '16%' }}>Confirmados</Text>
                                                    <Text style={{ color: '#000', maxWidth: '16%' }}>Concretados</Text>
                                                    <Text style={{ color: '#000', maxWidth: '16%' }}>Cancelados</Text>
                                                    <Text style={{ color: '#000', minWidth: '16%' }}>Total de turnos</Text>
                                                </View>
        
                                                {
                                                    turnosPorDía.map((turno, index) => (
                                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '10px', marginTop: '10px'}} key={index}>
                                                            <Text style={{ width: '6%' }}>{turno.dia}</Text>
                                                            <Text style={{ width: '16%', textAlign: 'center', marginLeft: '24px'}}>{turno.reservados}</Text>
                                                            <Text style={{ width: '16%', textAlign: 'center'}}>{turno.confirmados}</Text>
                                                            <Text style={{ width: '16%', textAlign: 'center'}}>{turno.concretados}</Text>
                                                            <Text style={{ width: '16%', textAlign: 'center'}}>{turno.cancelados}</Text>
                                                            <Text style={{ width: '16%', textAlign: 'center'}}>{parseInt(turno.reservados) + parseInt(turno.confirmados) + parseInt(turno.concretados) + parseInt(turno.cancelados)}</Text>
                                                        </View>
                                                    ))
                                                }
                                            </View> */}
        
                                            
                                            {/* Turnos por profesional */}
                                            <View>
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', fontSize: '12px', marginTop: '12px' }}>
                                                    <Text style={{ color: '#000', minWidth: '10%' }}>Profesional</Text>
                                                    <Text style={{ color: '#000', maxWidth: '16%' }}>Reservados</Text>
                                                    <Text style={{ color: '#000', maxWidth: '16%' }}>Confirmados</Text>
                                                    <Text style={{ color: '#000', maxWidth: '16%' }}>Concretados</Text>
                                                    <Text style={{ color: '#000', maxWidth: '16%' }}>Cancelados</Text>
                                                    <Text style={{ color: '#000', minWidth: '16%' }}>Total de turnos</Text>
                                                </View>
        
                                                {
                                                    data && data.map((turno, index) => (
                                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '10px', marginTop: '6px' }} key={index}>
                                                                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '16%', textAlign: 'left' }}>
                                                                    <Text>{turno.apellido},</Text>
                                                                    <Text>{turno.nombre}</Text>
                                                                </View>
            
                                                                <Text style={{ width: '20%', textAlign: 'center' }}>{turno.reservados ? turno.reservados : '0'}</Text>
                                                                <Text style={{ width: '20%', textAlign: 'center' }}>{turno.confirmados ? turno.confirmados : '0'}</Text>
                                                                <Text style={{ width: '20%', textAlign: 'center' }}>{turno.concretados ? turno.concretados : '0'}</Text>
                                                                <Text style={{ width: '20%', textAlign: 'center' }}>{turno.cancelados ? turno.cancelados : '0'}</Text>
                                                                <Text style={{ width: '20%', textAlign: 'center' }}>{turno.total}</Text>
                                                            </View>
                                                        )
                                                    )
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
        
                                <Text style={{ textAlign: 'right', fontSize: '10px', padding: '16px' }}>Página {index + 1}/{subData.length}</Text>
                            </View>
                        </Page>
                    ))
                }
            </Document>
        )
        : null
    )
}

export default ReporteTurnosProgramados
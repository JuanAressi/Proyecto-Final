// Utilities.
import { React } from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, G, Path } from '@react-pdf/renderer';

// Components.
import Logo from './Utilities/Logo';

// Create styles
const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#056799',
        color: '#fff',
        padding: '10',
        width: '100vw',
    },
});

const data = [
    {
        'fecha': '2021-01-01',
        'profesional': 'Dr. Juan Pérez',
        'motivo_consulta': 'Dolor de cabeza',
        'diagnostico': 'Migraña',
    },
    {
        'fecha': '2021-01-02',
        'profesional': 'Dr. Juan Pérez',
        'motivo_consulta': 'Dolor de cabeza',
        'diagnostico': 'Estrés',
    },
    {
        'fecha': '2021-01-03',
        'profesional': 'Dr. Sergio González',
        'motivo_consulta': 'Dolor de garganta',
        'diagnostico': 'Dolor de cabeza',
    },
    {
        'fecha': '2021-01-04',
        'profesional': 'Dr. Sergio González',
        'motivo_consulta': 'Problemas de sueño',
        'diagnostico': 'Insomnio',
    },
]


// Create Document Component
const ReporteHistoriaClinica = () => (
    <Document>
        <Page size='A4' style={styles.page}>
            <View style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f4f4f4' }}>
                <View style={{ minHeight: '94.7vh' }}>
                    <View style={styles.header}>
                        <Logo />

                        <Text style={{ fontSize: '25px', marginLeft: '14px' }}>MisTurnos.com</Text>
                    </View>

                    <Text style={{ fontSize: '26px', color: '#222222', textAlign: 'center', marginTop: '20px' }}>Reporte de Historia Clínica</Text>

                    <View style={{ padding: '32px' }}>
                        <Text style={{ fontSize: '14px', color: '#222222', marginTop: '6px' }}>Fecha de solicitud: 01/01/2021</Text>
                        <Text style={{ fontSize: '14px', color: '#222222', marginTop: '6px' }}>Profesional solicitante: Dr. Juan Pérez</Text>
                        <Text style={{ fontSize: '14px', color: '#222222', marginTop: '6px' }}>Paciente: Juan Pérez</Text>
                        <Text style={{ fontSize: '14px', color: '#222222', marginTop: '6px' }}>Antecedentes: Hipertensión</Text>
                        <Text style={{ fontSize: '14px', color: '#222222', marginTop: '6px' }}>Alergias: Ninguna</Text>

                        <View style={{ padding: '12px' }}>
                            {data.map((item, index) => (
                                <View key={index} style={{ paddingTop: '8px', marginTop: '16px', borderTop: '1px solid #555555' }}>
                                    <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Fecha: {item.fecha}</Text>
                                    <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginTop: '3px' }}>Profesional: {item.profesional}</Text>
                                    <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginTop: '3px' }}>Motivo de consulta: {item.motivo_consulta}</Text>
                                    <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginTop: '3px' }}>Diagnóstico: {item.diagnostico}</Text>
                                </View>
                            ))}

                            <View style={{ paddingTop: '8px', marginTop: '16px', borderTop: '1px solid #555555' }}></View>
                        </View>
                    </View>
                </View>

                <Text style={{ textAlign: 'right', fontSize: '10px', padding: '16px' }}>Página 1/1</Text>
            </View>
        </Page>
    </Document>
);

export default ReporteHistoriaClinica;
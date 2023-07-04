import apiCLient from '@/apiClient';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import db from  'database/models';
import Head from 'next/head';
import { useState } from 'react';
import { Op } from 'sequelize';

const RecoverPassword = (props) => {
    const { token } = props;
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState(props.message);
    const [ manifest, setManifest ] = useState(props.token ? 'from' : 'result');

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const handleRecovery = (e) => {
        e.preventDefault();

        apiCLient.post('/api/password/change', { password, token })
        .then((response) => {
            console.log(response.data);
            setManifest('result');
            setMessage(response.data.message);
        })
        .catch((error) => {
            console.log(error);
            setManifest('result')
            setMessage(error.message || 'Error al intentar guardar la nueva contrasena');
        }); 
    };

    const renderContent = () => {
        if( manifest === 'from' ) {
            return (
                <form onSubmit={handleRecovery} noValidate>
                    <TextField
                        margin='normal'
                        variant='outlined'
                        required
                        fullWidth
                        name='Password'
                        label='Ingresa nueva contrasena'
                        type='passwors'
                        id='password'
                        value={password}
                        onChange={handleChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Restablecer Contrasena
                    </Button>
                </form>
            );
        }

        return (
            <Typography variant='h4'>{message}</Typography>
        )
    }

    return (
        <Container>
            <Head>
                <title>Recuperar contrasena</title>
            </Head>
            <Paper>
                <Typography variant='h6'>Recuperar contrasena</Typography>
                {renderContent()}
            </Paper>
        </Container>
    );
};



    export async function getServerSideProps ({ req, res, params }) {
        //leer token
        const { token } = params;
        console.log(token);

        //buscar el usuario con este token de recuperacion
        const user = await db.Usuario.findOne(
            {
                where: {
                    paswordResetToken: token,
                    passwordResetExpire: {[ Op.gt ]: new Date()},
                }
            }
        );

        if( !user ) {
            return {
                props: {
                    token: null,
                    message: 'El link de recuperacion ha expirado'
                },
            }
        }

        return {
            props: {
                token,
                message: 'Ingresar la nueva contrasena',
            },
        }
    }

export default RecoverPassword;
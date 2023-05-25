import React, { useState, useContext } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom'

import { AuthContext } from "../../Auth";
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, password)
            .then(async () => {
                console.log(isAdmin)
                if (isAdmin) {
                    navigate('/admin-orders')
                }

                navigate("/")
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        setErrors({ email: 'Correo inválido' })
                        break;
                    case 'auth/missing-password':
                        setErrors({ password: 'La contraseña es requerida' })
                        break;
                    case 'auth/wrong-password':
                    case 'auth/user-not-found':
                        setErrors({ password: 'Correo o contraseña inválida' })
                }
            });
    }

    const { currentUser, isAdmin } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <div style={{ backgroundColor: '#b3e8ff', height: '100vh' }}>
            <Grid container justifyContent="center">
                <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
                    <Box border={1} padding={2} borderRadius={3} borderColor={"grey.500"} mx={"auto"} my={3} sx={{ backgroundColor: '#ffffff' }}>
                        <Typography variant="body1" mb={2}>
                            <NavLink to="/" >
                                &lt; Regresar
                            </NavLink>
                        </Typography>
                        <Typography variant="h5" gutterBottom>Inicia sesión</Typography>
                        <Box display={"flex"} flexDirection={"column"}>
                            <Box display={"block"} sx={{ my: 1 }}>
                                <TextField
                                    error={errors.email !== undefined}
                                    label="Correo electrónico"
                                    placeholder="Correo electrónico"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') onLogin(e)
                                    }}
                                    required
                                    fullWidth
                                    helperText={errors.email}
                                />
                            </Box>
                            <Box display={"block"} sx={{ my: 1 }} >
                                <TextField
                                    error={errors.password !== undefined}
                                    label="Contraseña"
                                    placeholder="Contraseña"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') onLogin(e)
                                    }}
                                    required
                                    fullWidth
                                    helperText={errors.password}
                                />
                            </Box>

                            <Box alignSelf={"end"}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    onClick={onLogin}
                                    sx={{ my: 2 }}
                                >
                                    Acceder
                                </Button>
                            </Box>
                        </Box>
                        <Divider variant="middle" />
                        <Typography variant="body1" my={2}>
                            No tienes una cuenta?{' '}
                            <NavLink to="/signup" >
                                Crear cuenta
                            </NavLink>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login
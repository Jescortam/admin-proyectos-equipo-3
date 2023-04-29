import React, { useState, useContext } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from "../Auth";
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    email,
                    shoppingCart: []
                })
                navigate("/")
            })
            .catch((error) => {
                updateErrors(error.code)
            });
    }

    const updateErrors = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                setErrors({ email: 'Correo inválido' })
                break;
            case 'auth/missing-password':
                setErrors({ password: 'La contraseña es requerida' })
                break;
            case 'auth/email-already-in-use':
                setErrors({ email: 'El correo ya se encuentra en uso' })
                break;
            case 'auth/weak-password':
                setErrors({ password: 'La contraseña debe tener un mínimo de 6 carácteres' })
        }
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <main >
            <Grid container justifyContent="center">
                <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
                    <Box border={1} padding={2} borderRadius={3} borderColor={"grey.500"} mx={"auto"} my={3}>
                        <Typography variant="body1" mb={2}>
                            <NavLink to="/" >
                                &lt; Regresar
                            </NavLink>
                        </Typography>
                        <Typography variant="h5" gutterBottom>Crea tu cuenta</Typography>
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
                                        if (e.key === 'Enter') onSubmit(e)
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
                                        if (e.key === 'Enter') onSubmit(e)
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
                                    onClick={onSubmit}
                                    sx={{ my: 2 }}
                                >
                                    Crear
                                </Button>
                            </Box>
                        </Box>
                        <Divider variant="middle" />
                        <Typography variant="body1" my={2}>
                            Ya tienes una cuenta?{' '}
                            <NavLink to="/login" >
                                Iniciar sesión
                            </NavLink>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </main>
    )
}

export default Signup
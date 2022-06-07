// auth/Login.tsx
import Auth from '../../interfaces/auth';
import { useState } from 'react';
import authModel from '../../models/auth.ts';
import AuthFields from './AuthFields.tsx';
import { showMessage } from "react-native-flash-message";

export default function Register({ navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function registerUser() {
        if (auth.email && auth.password) {
            if(!authModel.validatePassword(auth.password)) {
                showMessage({
                    message: "Icke giltigt lösenord",
                    description: "Lösenoret måste innehålla minst 4 tecken, små och stora bokstäver, siffror och specialtecken",
                    type: "warning"
                })
                return;
            } else if (!authModel.validateEmail(auth.email)) {
                showMessage({
                    message: "Icke giltig epost",
                    description: "Epostadressen du har skrivit in är inte giltig",
                    type: "warning"
                })
                return;
            }
            const result = await authModel.register(auth.email, auth.password);
            navigation.navigate("Login", { reload: true });
            showMessage({
                message: "Registrerad",
                description: "Ny användare har registrerats",
                type: "success",
            });
        }
        else {
            showMessage({
                message: "Fält Saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={registerUser}
            title="Registrera Användare"
            navigation={navigation}
        />
    );
};
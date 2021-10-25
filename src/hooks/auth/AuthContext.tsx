import { User } from 'firebase';
import React, { useEffect, useState, createContext, ReactNode } from 'react';
import Notification from '../../components/Notification';
import { firebase } from '../../services/config';
import { History, LocationState } from "history";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    user: User | null;
    createUser: ({ email, name, password, history }: CreateUser) => void;
    login: ({ email,password, history }: LoginUser ) => void;
    loading: boolean;
}

interface CreateUser {
    email: string;
    name: string;
    password: string;
    history: History<LocationState>;
}

export interface LoginUser {
    email: string;
    password: string;
    history: History<LocationState>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })
    }, []);

    function login({ email, password, history }: LoginUser) {
        setLoading(true);
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/');
                setLoading(false);
            })
            .catch(() => {
                Notification({
                    title: 'Não foi possível se autenticar', 
                    message: 'E-mail ou senha não existe!', 
                    type: 'warning',
                    container: 'top-right'
                });

                setLoading(false);
            })
    }
 
    function createUser({ email, name, password, history }: CreateUser) {
        setLoading(true);

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                const idUser = response.user?.uid;

                const users = firebase.firestore().collection('users');

                users.doc(idUser).set({
                    email: email,
                    name: name,
                    password: password
                });

                history.push('/login');
                setLoading(false);
            })
            .catch(error => {
                if(error.code === 'auth/email-already-in-use') {
                    Notification({
                        title: 'Aviso', 
                        message: 'Esse e-mail já esta em uso', 
                        type: 'warning',
                        container: 'top-right'
                    });
                }

                setLoading(false);
            })
    }

    return (
        <AuthContext.Provider value={{ 
            user,
            createUser,
            login,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
}


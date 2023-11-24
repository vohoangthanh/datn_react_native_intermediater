import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, createContext } from 'react'
import { login } from './UserService';


export const UserContext = createContext();

export const UserProvider = (props) => {
    const { children } = props;
    const [user, setuser] = useState(null);
    const onLogin = async (email, password) => {
        try {
            const result = await login(email, password);
            console.log('login result:', result);
            if (result.statusCode == 200) {
                setuser(result.data.user);
                await AsyncStorage.setItem('token', result.data.token);
                return true;
            }
        } catch (error) {
            console.log('login error', error)
        }
        return false;
    }
    return (
        <UserContext.Provider value={{ user, setuser, onLogin }}>
            {children}
        </UserContext.Provider>
    )
}


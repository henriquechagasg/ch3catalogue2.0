import qs from 'qs';
import styles from '../styles/Login.module.scss';
import getConfig from 'next/config'

import { useEffect, useState } from 'react';
import { api } from '../utils/apiService';
import { UseUser } from '../context/userContext';
import { useRouter } from "next/dist/client/router";
import { toast } from 'react-toastify';




const Login = () => {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const {currentUser, setCurrentUser} = UseUser()

    const router = useRouter()

    const { publicRuntimeConfig } = getConfig()
    const { backendUrl } = publicRuntimeConfig

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (window && user) {
            window.location.href = "/"
        }
    }, [])

    const data = {
        user: user,
        password: password
    }


    const createLogin = (user: String) => {
        setUser("")
        setPassword("")
        setCurrentUser(`${user}`)
        toast.success("Login efetuado com sucesso")
        router.push('/')
    }

    const loginUser = () => {
        api({
            method: 'post',
            url: `${backendUrl}/login`,
            data: qs.stringify(data),
            headers: {
               'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
           }})
           .then(response => {
                if (response.data) {
                    createLogin(user)
                    return
                }
                toast.warn("Senha Incorreta")
                console.log("False")
           })
           .catch(error => {
                toast.warn("Não foi possível comunicar com o servidor.")
                console.log(error)
           })
    }



    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <p>Fazer Login</p>
                <input 
                className={styles.input} 
                type="text" 
                placeholder="Usuário" 
                required
                onChange={(e) => setUser(e.target.value)}
                />
                <input className={styles.input} 
                type="password" 
                placeholder="Senha" 
                required
                onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.sendButton}>
                    <button onClick={loginUser}>Entrar</button>
                </div>
            </div>
        </div>
    )
}

export default Login
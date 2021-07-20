import { 
    createContext, 
    useEffect, 
    useState, 
    ReactNode, 
    useContext, 
    Dispatch, SetStateAction } from "react";

type ContextProviderData = {
    currentUser: String,
    setCurrentUser: Dispatch<SetStateAction<string>>
}


export const UserContext = createContext({} as ContextProviderData);

type ContextProviderProps = {
    children: ReactNode
}

export function UserContextProvider({children}: ContextProviderProps) {
    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            setCurrentUser(user)
        }
    },[])

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", currentUser)
        }
    }, [currentUser])


    return (
        <UserContext.Provider
        value={{
            currentUser,
            setCurrentUser
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const UseUser = () => {
    return useContext(UserContext)
}
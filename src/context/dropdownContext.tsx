import {createContext, ReactNode, useContext, useState } from 'react';

type DropdownContextData = {
    showDropdown: boolean,
    toggleShowDropdown: () => void,
    setShowDropdown: any,
    categorySelected: string,
    setCategorySelected: any,
}

export const DropdownContext = createContext({} as DropdownContextData);

type DropdownContextProviderProps = {
    children: ReactNode
}

export function DropdownContextProvider({ children }: DropdownContextProviderProps){
    
    const [categorySelected, setCategorySelected] = useState("Todas");
    const [showDropdown, setShowDropdown] = useState(false);

    function toggleShowDropdown(){
        setShowDropdown(!showDropdown)
    };

    

    return (
        <DropdownContext.Provider
        value={{
            showDropdown,
            toggleShowDropdown,
            setShowDropdown,
            categorySelected,
            setCategorySelected
        }}
        >
            { children }
        </DropdownContext.Provider>
    )
}

export const UseDropdown = () => {
    return useContext(DropdownContext)
};
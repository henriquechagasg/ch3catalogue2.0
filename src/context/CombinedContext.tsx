import { CartContextProvider } from './cartContext';
import { DropdownContextProvider } from './dropdownContext';
import { UserContextProvider } from './userContext'

export function CombinedProviders({children}) {

    return (
        <UserContextProvider>
            <DropdownContextProvider>
                <CartContextProvider>
                    {children}
                </CartContextProvider>
            </DropdownContextProvider>
        </UserContextProvider>
    )
}
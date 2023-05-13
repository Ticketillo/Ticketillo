import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export type IAuthState = {
    isLoggedIn: boolean;
    address?: string;
};

export const authState = createStore<IAuthState>(() => ({
    isLoggedIn: false,
}));

export const useAuthState = () => useStore(authState);

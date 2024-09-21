import { useEffect, useState } from "react";

const localCache = {};

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });


    useEffect(() => {
        getFetch();
    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true, 
            hasError: false,
            error: null
        })
    }

    const getFetch = async() => {
        if(localCache[url]) {
            console.log('Usando caché');
            console.log(localCache)
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            })
            return; 
        }
        //-seteamos loading a true cuando entra por si viene nueva info desde la url asi vuelve a hacer loading
        setLoadingState(); 
        const resp = await fetch(url);
        //sleep
        await new Promise(resolve => setTimeout(resolve, 1500));
        //Si la resp tiene un error
        if(!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            })
            return;
        }  
        const data = await resp.json(); //-Toda la data que nos llega de la url
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        })
        //guardamos la info en localCache[url] . Manejo de la caché
        localCache[url] = data
    } 

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}



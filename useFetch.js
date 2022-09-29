import { useEffect, useRef, useState } from "react"

export const useFetch = ( url ) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null});

    useEffect(()=>{
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(()=>{
        fetch(url)
        .then( resp => resp.json())
        .then( data => {

            if( isMounted.current ){
                console.log("Se cambió el state.")
                setState({
                    loading: false,
                    error: null,
                    data
                })
            }else{
                console.log("No se cambió el state.")
            }

        })
    }, [url])

    return state;
}
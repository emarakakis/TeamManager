"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import qs from "qs";
import { stat } from "fs";

type ObjectType = {
    [key: string] : any
}

export function useQueryBatch<T extends ObjectType>(params: string[]){

    const router = useRouter()
    const searchParams = useSearchParams()

    const getState = useCallback(() => {
        const state: ObjectType = {}
        const par = searchParams.toString()
        const p = qs.parse(par)
        for (const [key,value] of Object.entries(p)){
            if (value){
                state[key] = value
            }
        }
        return state
    }, [searchParams, params])

    const setState = useCallback((values: T) => {
        const newParams = new URLSearchParams(searchParams.toString())
        for(const [key, value] of Object.entries(values)){
            
            const query = qs.stringify({[key] : value}, {encode:false})
            const v = query.split('=')[1]
            if (!!v)
                newParams.set(key, value)
            else
                newParams.delete(key)
        }
        router.push(`?${newParams}`);
    }, [router, searchParams, params])

    return [getState(), setState] as const
}

export function useQueryState(param: string){
    const router = useRouter()
    const searchParams = useSearchParams()
    const path = usePathname()

    const getState = useCallback(() => {
        const state = searchParams.get(param)
        return state
    }, [param, searchParams])

    const setState = useCallback((val: string) => {
        const newParams = new URLSearchParams(searchParams.toString())
        const str = searchParams.get(param)
        const prevObject = str ? {...qs.parse(str)} : {}
        let wtf = qs.parse(val)
        const newObject = {...prevObject, ...wtf}

        newParams.set(param, qs.stringify(newObject))
        
        router.push(`?${newParams.toString()}`)
    }, [router, searchParams, param])

    return [getState(), setState] as const
}
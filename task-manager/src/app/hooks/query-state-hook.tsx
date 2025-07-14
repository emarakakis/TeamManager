"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import qs from "qs";

type ObjectType = {
    [key: string] : any
}

export function useQueryBatch<T extends ObjectType>(params: string[]){

    const router = useRouter()
    const searchParams = useSearchParams()

    const getState = useCallback(() => {
        const state: ObjectType = {}
        for (const p of params){
            const value = searchParams.get(p)
            if (value)
                state[p] = qs.parse(value ?? "")
        }
        return state
    }, [searchParams, params])

    const setState = useCallback((values: T) => {
        const newParams = new URLSearchParams(searchParams.toString())
        for(const [key, value] of Object.entries(values)){
            const query = qs.stringify({[key] : value}, {encode:false})
            const v = query.split('=')[1]
            console.log(v)
            if (!!v)
                newParams.set(key, value)
            else
                newParams.delete(key)
        }
        // const query = qs.stringify(values, { encode: false });
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

    const setState = useCallback((val: any) => {
        const newParams = new URLSearchParams(searchParams.toString())
        if (!val){
            newParams.delete(param)
        } else {
            newParams.set(param, val)
        }
        
        router.push(`?${newParams.toString()}`)
    }, [router, searchParams, param])

    return [getState(), setState] as const
}
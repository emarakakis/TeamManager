"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

type BatchState = {
    [key: string] : any
}

export function useQueryBatch(params: string[]){
    const router = useRouter()
    const searchParams = useSearchParams()

    const getState = useCallback(() => {
        const state: BatchState = {}
        for (const param of params){
            state[param] = searchParams.get(param)
        }
        return state
    }, [searchParams, params])

    const setState = useCallback((values: Array<{key: any, value: any}>) => {
        const newParams = new URLSearchParams(searchParams.toString())
            for(const v of values){
                if (!!v.value)
                    newParams.set(v.key, v.value)
                else
                    newParams.delete(v.key)
            }

            router.push(`?${newParams.toString()}`)
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
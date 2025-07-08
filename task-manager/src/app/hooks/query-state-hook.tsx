"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

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
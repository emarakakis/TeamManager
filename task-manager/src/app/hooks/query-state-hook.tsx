"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import qs from "qs";

export type ObjectType = {
  [key: string]: any;
};

export function useQueryBatch<T extends ObjectType>(params: string[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getState = useCallback(() => {
    const state: ObjectType = {};
    for (const param of params) {
      const query = searchParams.get(param);
      state[param] = qs.parse(query ?? "") as ObjectType;
    }
    return clearBatchObject(state);
  }, [searchParams, params]);

  const setState = useCallback(
    (values: T) => {
      const newParams = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(values)) {
        const query = qs.stringify({ [key]: value }, { encode: false });
        const v = query.split("=")[1];
        if (!!v) newParams.set(key, value);
        else newParams.delete(key);
      }
      router.push(`?${newParams}`);
    },
    [router, searchParams, params]
  );

  return [getState(), setState] as const;
}

export function useQueryState(param: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  const getState = useCallback(() => {
    const state = searchParams.get(param);
    const res = qs.parse(state ?? "") as ObjectType;
    return res;
  }, [param, searchParams]);

  const setState = useCallback(
    (val: string | null) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (!val) {
        newParams.delete(param);
      } else {
        const str = searchParams.get(param);
        const prevObject = str ? { ...qs.parse(str) } : {};
        let valueObject = qs.parse(val);
        const newObject = Object.fromEntries(
          Object.entries({ ...prevObject, ...valueObject }).filter(
            ([_, value]) => value !== null && value !== null && value !== ""
          )
        );
        if (Object.entries(newObject).length > 0) {
          newParams.set(param, qs.stringify(newObject));
        } else {
          newParams.delete(param);
        }
      }
      router.push(`?${newParams.toString()}`);
    },
    [router, searchParams, param]
  );

  return [getState(), setState] as const;
}

function clearBatchObject(obj: ObjectType): ObjectType {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== null &&
        value !== undefined &&
        Object.entries(value).length > 0
    )
  );
}

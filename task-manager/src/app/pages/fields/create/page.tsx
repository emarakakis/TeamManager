"use client";

import { FieldData } from "@/types/FieldData";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FieldForm from "@/modules/FieldForm/FieldForm";
import postField from "@/serverFunctions/postField";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
export default function Page() {
  const methods = useForm<FieldData>();

  const queryClient = useQueryClient();
  const { handleSubmit } = methods;
  const router = useRouter();
  const [disabled, setDisabled] = useFormButtonState("field");

  const { mutate } = useMutation({
    mutationKey: ["fields"],
    mutationFn: postField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fields"] });
      router.push("/");
    },
  });

  function onSubmit(data: FieldData) {
    mutate(data);
    setDisabled(true);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldForm />
      </form>
    </FormProvider>
  );
}

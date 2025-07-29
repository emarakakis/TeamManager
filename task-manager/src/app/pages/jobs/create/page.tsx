"use client";

import JobForm from "@/modules/JobForm/JobForm";
import { JobCreate } from "@/types/Job";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import postJob from "@/serverFunctions/postJob";
import { useRouter } from "next/navigation";
import { useFormButtonState } from "@/app/hooks/form-button-hook";

export default function Page() {
  const router = useRouter();
  const [disabled, setDisabled] = useFormButtonState("job");
  const { mutate } = useMutation({
    mutationKey: ["job", ["create"]],
    mutationFn: postJob,
    onSuccess: () => {
      router.push("/");
    },
  });

  const methods = useForm<JobCreate>();
  const { handleSubmit } = methods;

  function onSubmit(data: JobCreate) {
    mutate(data);
    setDisabled(true);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <JobForm />
      </form>
    </FormProvider>
  );
}

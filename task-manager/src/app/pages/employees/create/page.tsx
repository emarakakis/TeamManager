"use client";

import { Container, Button, Typography, Box } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { EmployeeCreate, employeeDefault } from "@/types/employee";
import EmployeeInfo from "@/modules/EmployeeForm/EmployeeForm";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import postEmployee from "@/serverFunctions/postEmployee";
import { useRouter } from "next/navigation";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const [disabled, setDisabled] = useFormButtonState("employee");
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["add-employee"],
    mutationFn: postEmployee,
    onSuccess: async () => {
      router.push("/");
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
  useEffect(() => {
    setDisabled(false);
  }, [router]);

  const methods = useForm<EmployeeCreate>({ defaultValues: employeeDefault });
  const { handleSubmit } = methods;

  function onSubmit(data: EmployeeCreate) {
    mutate(data);
    setDisabled(true);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh",
          }}
        >
          <EmployeeInfo />
        </Box>
      </form>
    </FormProvider>
  );
}

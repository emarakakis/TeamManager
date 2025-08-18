import { useQueryState } from "@/app/hooks/query-state-hook";
import getEmployeeChars from "@/serverFunctions/getEmployeeChars";
import { CharacteristicsReturn } from "@/types/Characteristics";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import CharRow from "./CharRow";
import { FormProvider, useForm } from "react-hook-form";
import putEmployeeChars from "@/serverFunctions/putEmployeeChars";
import FormButton from "../FormButton/FormButton";
import { useFormButtonState } from "@/app/hooks/form-button-hook";
import { characteristics } from "../../../dataset";

export default function AddCharModal({
  anchorEl,
  setAnchorElement,
}: {
  anchorEl: HTMLElement | null;
  setAnchorElement: Dispatch<SetStateAction<HTMLElement | null>>;
}) {
  const [employeeChar] = useQueryState("employeeChar");
  const { id } = employeeChar;
  const { data: chars } = useQuery<CharacteristicsReturn[]>({
    queryKey: ["employee", "characteristics", "add", id],
    queryFn: () => getEmployeeChars(id, "add"),
  });

  const methods = useForm<{ values: number[] }>({
    defaultValues: {
      values: new Array<number>(),
    },
  });

  const { reset, handleSubmit } = methods;
  const [disable, setDisable] = useFormButtonState("addChar");

  function onSubmit(input: { values: number[] }) {
    const { values } = input;
    mutate({ characteristics: values, employeeId: id });
    reset({ values: [] });
    setDisable(true);
  }

  const queryClient = useQueryClient();
  const hasValues = chars && chars.length > 0;

  console.log(hasValues);

  const { mutate } = useMutation({
    mutationKey: ["add", "characteristic", id],
    mutationFn: putEmployeeChars,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee", "characteristics", "view", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["employee", "characteristics", "add", id],
      });
      setAnchorElement(null);
      setTimeout(() => setDisable(false), 100);
    },
  });

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={() => setAnchorElement(null)}
      slotProps={{
        paper: { sx: { width: "400px", height: "300px", padding: 2 } },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            Add following Characteristics to Employee
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "grid",
                  backgroundColor: "lightslategray",
                  borderRadius: "16px",
                  gap: "5px",
                  padding: 2,
                  maxHeight: "150px",
                  overflow: "auto",
                }}
              >
                {hasValues &&
                  chars?.map((item, index) => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                      key={index}
                    >
                      <CharRow data={item} index={index} type={"add"} />
                    </Box>
                  ))}
                {!hasValues && (
                  <Box
                    sx={{
                      width: "100%",
                      height: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No Characteristics to Add
                  </Box>
                )}
              </Box>
              <FormButton sx={{ mt: 2 }} state="addChar">
                Submit
              </FormButton>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Popover>
  );
}

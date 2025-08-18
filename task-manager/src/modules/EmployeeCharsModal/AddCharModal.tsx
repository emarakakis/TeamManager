import { useQueryState } from "@/app/hooks/query-state-hook";
import getEmployeeChars from "@/serverFunctions/getEmployeeChars";
import { CharacteristicsReturn } from "@/types/Characteristics";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import CharRow from "./CharRow";
import { FormProvider, useForm } from "react-hook-form";
import putEmployeeChars from "@/serverFunctions/putEmployeeChars";

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

  function onSubmit(input: { values: number[] }) {
    const { values } = input;
    mutate({ characteristics: values, employeeId: id });
    reset({ values: [] });
  }

  const queryClient = useQueryClient();

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
                {chars?.map((item, index) => (
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
              </Box>
              <Button type="submit">Submit</Button>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Popover>
  );
}

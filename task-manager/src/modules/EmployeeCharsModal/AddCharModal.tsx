import { useQueryState } from "@/app/hooks/query-state-hook";
import getEmployeeChars from "@/serverFunctions/getEmployeeChars";
import {
  CharacteristicsCreate,
  CharacteristicsReturn,
} from "@/types/Characteristics";
import {
  Box,
  Button,
  FormControlLabel,
  Popover,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import CharRow from "./CharRow";
import { FormProvider, useForm } from "react-hook-form";
import putEmployeeChars from "@/serverFunctions/putEmployeeChars";
import FormButton from "../FormButton/FormButton";
import { useFormButtonState } from "@/app/hooks/form-button-hook";

export default function AddCharModal({
  anchorEl,
  setAnchorElement,
}: {
  anchorEl: HTMLElement | null;
  setAnchorElement: Dispatch<SetStateAction<HTMLElement | null>>;
}) {
  const [employeeChar] = useQueryState("employeeChar");
  const [toggle, setToggle] = useState<boolean>(true);
  const { id } = employeeChar;
  const { data: chars } = useQuery<CharacteristicsReturn[]>({
    queryKey: ["employee", "characteristics", "add", id],
    queryFn: () => getEmployeeChars(id, "add"),
  });

  const methods = useForm<{ values: number[] } | CharacteristicsCreate>();

  const { reset, register } = methods;
  const [disable, setDisable] = useFormButtonState("addChar");

  function onSubmit(input: { values: number[] } | CharacteristicsCreate) {
    if (!toggle && "name" in input) {
      const { category, name } = input;
      console.log(category, name);
    } else if (toggle && "values" in input) {
      const { values } = input;
      mutate({ characteristics: values, employeeId: id });
      reset({ values: [] });
      setDisable(true);
    }
  }

  const queryClient = useQueryClient();
  const hasValues = chars && chars.length > 0;

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
                  height: "150px",
                  maxHeight: "150px",
                  overflow: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <Box />
                  <Typography
                    sx={{ justifyContent: "center", display: "flex" }}
                  >
                    {toggle ? "Characteristic Table" : "Add New Characteristic"}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={toggle}
                        value={toggle}
                        onClick={() => setToggle(!toggle)}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: "16px",
                          justifyContent: "flex-end",
                          display: "end",
                        }}
                      >
                        Mode
                      </Typography>
                    }
                    labelPlacement="start"
                  />
                </Box>
                {toggle &&
                  hasValues &&
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
                {toggle && !hasValues && (
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
                {!toggle && (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    <TextField
                      {...register("category")}
                      label="Category"
                    ></TextField>
                    <TextField {...register("name")} label="Name"></TextField>
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

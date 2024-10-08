import { useFieldArray } from "react-hook-form";
import TextField from "../input";
import { Box } from "@mui/material";

const FieldArray = ({
  name,
  control,
}: any) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: control,
      name: name,
    }
  );
  return (
    <Box>
      {fields?.map((field, index) => (
        <TextField
          key={field.id}
          type="text" //
          name={`${name}.${index}.mail`}
          error={false} //
          placeholder="Total Children"
          control={control}
        />
      ))}
    </Box>
  );
};

export default FieldArray;

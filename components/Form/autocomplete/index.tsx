import {
  FormControl,
  Autocomplete as MuiAutocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const Autocomplete: React.FC<CustomAutocompleteProps> = ({
  name,
  options,
  control,
  error,
  placeholder,
}) => {
  return (
    <FormControl>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <MuiAutocomplete
              noOptionsText={
                <Typography fontSize={14}>{"No options"}</Typography>
              }
              disablePortal
              options={options}
              renderOption={(props, option, state) =>
                [props, option, state.index] as React.ReactNode
              }
              value={!value ? null : value}
              onBlur={onBlur}
              isOptionEqualToValue={(option, value) => {
                console.log('option: ', option);
                if (typeof value === "string") {
                  return value === option;
                } else {
                  console.log("values for the option - ", option)
                  return value?.id === option?.id;
                }
              }}
              onChange={(_, value) => {
                console.log('value: ', value);
                return onChange(value);
              }}
              
              renderInput={(params) => {
                console.log('params: ', params.inputProps);
                return(
                <TextField
                  className="text-secondary"
                  label={placeholder}
                  inputRef={ref}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                  
                />)
              }}
            />
          );
        }}
      />
    </FormControl>
  );
};

export default Autocomplete;
import { Skeleton } from "@mui/material";
import MuiAutocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ArrowDropDown } from "@mui/icons-material";
import clsx from "clsx";
import { ListboxComponent } from "./scroller";
import { Controller } from "react-hook-form";


const Autocomplete = ({
  name,
  options,
  control,
  placeholder,
  disabled,
  onClear,
  labelField,
  identifier,
  loading,
}: any) => {

  return loading ? (
    <Skeleton variant="rounded" width="100%" height={48} />
  ) : (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        return (
          <MuiAutocomplete
            disableClearable={true}
            fullWidth
            disabled={disabled}
            noOptionsText={
              <Typography
                data-test-id={`text-${identifier}-no-options`}
              >
                {"No-options"}
              </Typography>
            }
            getOptionKey={(option)=> { // pass which attribute you wish to make the key
              return option?.iso2
            }}
            getOptionLabel={(option: any) => { // pass the fn through props
              if (typeof option === "string") {
                return option;
              } else if (labelField) {
                return (
                  option[labelField] ??
                  option?.translations[labelField] ??
                  option?.name
                );
              }
              
              return option?.name;
            }}
            disablePortal
            options={options}
            renderOption={(props, option, state) =>
              [props, option, state.index] as React.ReactNode
            }
            popupIcon={
              <ArrowDropDown
                sx={{
                  height:"20px",
                  width:"20px"
                }}
              />
            }
            value={!value ? null : value}
            onBlur={onBlur}
            ListboxComponent={ListboxComponent}
            filterOptions={(options, { inputValue }) => { // prop to be added to search the autocomplete options for
              const lowerInputValue = inputValue.toLowerCase();
              return options.filter((option) => 
                option?.name?.toLowerCase()?.includes(lowerInputValue) || 
                option?.iso2?.toLowerCase()?.includes(lowerInputValue)
              );
            }}
            isOptionEqualToValue={(option, value) => { // prop to be added in case of object, so optional
              if (typeof value === "string") {
                return value === option;
              } else {
                return value?.id === option?.id;
              }
            }}
            onChange={(_, value) => {
              onChange(value);
            }}
            clearText={"Clear"}
            onClose={(event, reason) => {
              if (reason === "selectOption" || reason === "removeOption") {
                onClear && onClear();
              }
            }}
            onInputChange={() => {
              onClear && onClear();
            }}
            slotProps={{
              popper:{
                style:{
                  width:"335px",            // popperProps to be passed in slotProps
                },
                placement:"bottom-start"
              }
            }}
            renderInput={(params) => (
              <TextField
                className="text-secondary"
                sx={{
                  width: '74px',
                  '& fieldset': { // find a way to target the fieldset 
                    // borderLeft: 'none', borderTop: 'none', borderBottom:'none',
                    borderRadius:"4px 0px 0px 4px" },
                }}
                error={disabled ? false : !!error?.type}
                label={placeholder}
                helperText={error ? error?.message : ""} // another prop to show the helperText here 
                inputRef={ref}
                {...params}
                inputProps={{
                  ...params.inputProps,
                  "data-test-id": `autocomplete-input-${identifier}`,
                }}
                InputLabelProps={{
                  classes: {
                    root: "label",
                    shrink: "shrinkedLabel",
                  },
                }}
              />
            )}
            componentsProps={{
              clearIndicator: {
                ...({
                  "data-test-id": `btn-autocomplete-clear-${identifier}`,
                } as any),
              },
              popupIndicator: {
                ...({
                  "data-test-id": `btn-autocomplete-arrow-${identifier}`,
                } as any),
              },
            }}
            data-test-id={`autocomplete-${identifier}`}
          />
        );
      }}
    />
  );
};

export default Autocomplete;

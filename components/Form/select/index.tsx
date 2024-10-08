import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { Controller } from "react-hook-form";
import { ArrowDropDown } from "@mui/icons-material";


const Select: React.FC<CustomSelectProps> = ({
  placeholder,
  name,
  error,
  options,
  control,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={name}>{placeholder}</InputLabel>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          const IconComponent = () => (
            <ArrowDropDown
            sx={{
              right:"8px",
              position:"absolute",
              color: "green",
              width:"20px",
              height:"20px"
            }}
            />
          )
          return(
          <MuiSelect
            onChange={onChange}
            value={value}
            ref={ref}
            label={placeholder}
            labelId={name}
            error={error}
            onBlur={onBlur}
            IconComponent={IconComponent}
            
            sx={{
              border: 'none',
              borderRadius: '4px 0px 0px 4px',
              width: '74px',
              '& fieldset': { borderLeft: 'none', borderTop: 'none', borderBottom:'none' },
            }}
            inputProps={{
              sx:{
                padding: "14px 12px"
              }
            }}
          >
            {options && options.length> 0 ? options?.map((option) => {
              return <MenuItem value={option} key={option.id}>{option.name}</MenuItem>;
            }): <MenuItem value={""}>No options</MenuItem>}
          </MuiSelect>)
        }}
      />
    </FormControl>
  );
};

export default Select;

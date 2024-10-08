import { FormControl, FormControlLabel, RadioGroup, Radio as MuiRadio} from "@mui/material";
import { Controller } from "react-hook-form";

const Radio: React.FC<CustomRadioProps> = ({
  isBoolean,
  name,
  options,
  control,
  setValue
}) => {
  return (
    <FormControl>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref }}) => (
                <RadioGroup row name={name} value={value} onChange={isBoolean ? (_,value)=>setValue(name, value==='true'? true: false): onChange} ref={ref}>
            {(options && options.length > 0) &&
              options?.map((option) => {
                return (
                  <FormControlLabel
                    key={option.label}
                    onBlur={onBlur}
                    value={option.value}
                    control={<MuiRadio/>}
                    label={option.label}
                  />
                );
              })}
          </RadioGroup>
          )}/>
          </FormControl>
  );
};

export default Radio;

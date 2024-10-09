import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  Tooltip,
} from "@mui/material";
import { Controller } from "react-hook-form";
import './input-field.styles.scss'

const TextField: React.FC<CustomTextFieldProps> = ({
  type,
  placeholder,
  name,
  error,
  control,
  endAdornment,
  startAdornment,
  toolTipText,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <MuiTextField
            error={error}
            placeholder={placeholder}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            ref={ref}
            InputProps={{
              sx: { pr: "2px" },
              classes: {
                adornedStart: 'start-adornment'
              },
              ...(startAdornment || endAdornment
                ? {
                    startAdornment: startAdornment ? startAdornment: null,
                    endAdornment: endAdornment && (
                      <InputAdornment position="end">
                        <Tooltip
                          disableInteractive
                          title={toolTipText}
                          slotProps={{
                            popper: {
                              modifiers: [
                                {
                                  name: "offset",
                                  options: {
                                    offset: [0, -14],
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <IconButton
                            disableTouchRipple
                          >
                            {endAdornment}
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }
                : {}),
            }}
          />
        )}
      />
    </>
  );
};

export default TextField;

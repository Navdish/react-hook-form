import {
  InputBase,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  control,
}) => {
  switch (type) {
    case "text":
      return (
        <>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1 }}>
            {placeholder}
          </Typography>

          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <InputBase
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                ref={ref}
                sx={{
                  border: "1px solid #e5e7eb",
                  bgcolor: "#faf9fb",
                  width: "90%",
                  borderRadius: "10px",
                  p: "5px 10px",
                  mb: 3,
                }}
              />
            )}
          />
         
        </>
      );
    case "password":
      return (
        <>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1 }}>
            {placeholder}
          </Typography>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <InputBase
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                ref={ref}
                sx={{
                  border: "1px solid #e5e7eb",
                  bgcolor: "#faf9fb",
                  width: "90%",
                  borderRadius: "10px",
                  p: "5px 10px",
                  mb: 3,
                }}
              />
            )}
          />
        </>
      );

    case "number":
      return (
        <>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1 }}>
            {placeholder}
          </Typography>
          <InputBase
            placeholder={placeholder}
            type={type}
            {...register(name, { valueAsNumber })}
            sx={{
              border: "1px solid #e5e7eb",
              bgcolor: "#faf9fb",
              width: "90%",
              borderRadius: "10px",
              p: "5px 10px",
              mb: 3,
            }}
          />
          {error && (
            <span style={{ marginTop: "-24px", color: "red" }}>
              {error.message}
            </span>
          )}
        </>
      );
  }
};
export default FormField;

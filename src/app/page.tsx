"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, IconButton, InputAdornment, Paper, Stack, Tooltip } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema } from "../../schema/form";
import Select from "../../components/Form/select";
import Radio from "../../components/Form/radio";
import TextField from "../../components/Form/input";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Autocomplete from "../../components/Form/autocomplete";
import FieldArray from "../../components/Form/fieldArray";
import PhoneInput from "react-phone-number-input/input";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { GetterLocations } from "locations-js";

export default function Home() {
  //   const [open, setOpen] = useState<boolean>(false);

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  const defaultObject = {
    email: "",
    password: "",
    role: "",
    children: false,
    countChildren: 0,
    movie: null,
    mobile: [{
      "mail": ""
    }]
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<loginProps>({
    defaultValues: defaultObject,
    resolver: zodResolver(LoginSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: loginProps) => {
    console.log("SUCCESS", data);
    reset(defaultObject);
  };
  const movie = watch('movie');
  let countries = GetterLocations.getAllCountries();
  // console.log('countries: ', countries);
  let country = GetterLocations.findCountryByIsoTwoCodeWithStates('IN')
  // console.log('country: ', country);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9fafb",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            width: "55vw",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            p: 3,
          }}
        >
          <Stack
            width={"100%"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            spacing={'10px'}
          >
            {/* <TextField
              type="text"
              placeholder="Email"
              name="email"
              error={errors.email}
              control={control}
            />

            <TextField
              type="password"
              placeholder="Password"
              name="password"
              error={errors.password}
              control={control}
              endAdornment={<HelpOutlineOutlinedIcon />}
              toolTipText={"Helper text"}
            /> */}

            {/* <Select
              name="role"
              error={errors.role}
              placeholder="Role"
              options={[
                { label: "High", value: "100" },
                { label: "low", value: "20" },
              ]}
              control={control}
            />

            <Radio
              name="children"
              error={errors.children}
              placeholder="children"
              control={control}
              options={[
                { label: "YES", value: true },
                { label: "NO", value: false },
              ]}
              setValue={setValue}
              isBoolean={true}
            /> */}

            {/* {watch("children") && (
              <TextField
                type="number"
                name="countChildren"
                error={errors.countChildren}
                placeholder="Total Children"
                control={control}
              />
            )}
            <Autocomplete
              name="movie"
              error={errors.movie}
              placeholder="Movie"
              control={control}
              options={[
                { label: "Pehli", value: "First" },
                { label: "Dusri", value: "Second" },
              ]}
            />
            <FieldArray
              name= "mobile"
              control={control}
            /> */}
            
            <TextField
              type="text"
              placeholder="Whatsapp"
              name="email"
              error={errors.email}
              control={control}
              startAdornment={
              <InputAdornment position="start" classes={{positionStart: 'start-ad'}}>
                <FormControl fullWidth>
                  <Select
                    name="role"
                    error={errors.role}
                    options={countries ? countries: []}
                    control={control}
                  />
                </FormControl>
                <IconButton
                  disableTouchRipple
                >
                  <WhatsAppIcon />
                </IconButton>
                </InputAdornment>
              }
            />
            {/* <Controller
             name="number"
             control={control}
             render={({ field: { onChange, onBlur, value, ref } }) => (
              <PhoneInputWithCountrySelect
                placeholder="Enter phone number"
                value={value}
                onChange={onChange}
                international
                />
              )}
            /> */}
            
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontSize: "16px",
                width: "90%",
                fontWeight: "500",
                boxShadow: "none",
                mb: 4,
              }}
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      </form>
    </Box>
  );
}

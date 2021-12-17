import * as Yup from "yup";
import { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { APIConfig } from "src/store/Api-Config";

// ----------------------------------------------------------------------

export default function BuyerRegisterForm() {
  const APIs = useContext(APIConfig);
  const userAPI = APIs.buyerAPI;

  console.log(userAPI);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    streetAddress: Yup.string().required("Shipping Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",

      //For Billing Address
      streetAddress: "",
      address2: "",
      city: "",
      zipcode: "",
      state: "",

      // For Shipping Address
      streetAddressShipping: "",
      address2Shipping: "",
      cityShipping: "",
      zipcodeShipping: "",
      stateShipping: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const headers = {
        "Access-Control-Allow-Origin": "*",
      };

      console.log("inside user registration-POST request");

      console.log(userAPI);

      const data = {
        user: {
          username: formik.values.email,
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          email: formik.values.email,
          password: formik.values.password,
        },
        billingAddress: {
          streetAddress1: formik.values.streetAddress,
          streetAddress2: formik.values.address2,
          city: formik.values.city,
          zipCode: formik.values.zipcode,
          state: formik.values.state,
        },
        shippingAddress: {
          streetAddress1: formik.values.streetAddressShipping,
          streetAddress2: formik.values.address2Shipping,
          city: formik.values.cityShipping,
          zipCode: formik.values.zipcodeShipping,
          state: formik.values.stateShipping,
        },
        enabled: true,
      };

      axios
        .post(userAPI, data, { headers })
        .then((res) => {
          const response = res.data;
          if (response == null || response == "") {
            alert("error happened during registration. try again ");

            navigate("/buyer-register", { replace: true });
          } else {
            alert("User registration is successful. redirecting to Login");
            navigate("/login", { replace: true });

            return response;
          }
        })
        .catch((error) => {
          console.log(data);
          console.log(error.message);
          alert("error happened during registration. Check your data first");
        });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <label>Billing Address</label>
          <TextField
            fullWidth
            label="Street Address 1"
            {...getFieldProps("streetAddress")}
            error={Boolean(touched.streetAddress && errors.streetAddress)}
            helperText={touched.streetAddress && errors.streetAddress}
          />
          <TextField
            fullWidth
            label="Street Address 2"
            {...getFieldProps("address2")}
            error={Boolean(touched.address2 && errors.address2)}
            helperText={touched.address2 && errors.address2}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="City"
              {...getFieldProps("city")}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />
            <TextField
              fullWidth
              label="Zip Code"
              {...getFieldProps("zipcode")}
              error={Boolean(touched.zipcode && errors.zipcode)}
              helperText={touched.zipcode && errors.zipcode}
            />
          </Stack>
          <TextField
            fullWidth
            label="State"
            {...getFieldProps("state")}
            error={Boolean(touched.state && errors.state)}
            helperText={touched.state && errors.state}
          />

          <label>Shipping Address</label>
          <TextField
            fullWidth
            label="Street Address 1"
            {...getFieldProps("streetAddressShipping")}
            error={Boolean(
              touched.streetAddressShipping && errors.streetAddressShipping
            )}
            helperText={
              touched.streetAddressShipping && errors.streetAddressShipping
            }
          />
          <TextField
            fullWidth
            label="Street Address 2"
            {...getFieldProps("address2Shipping")}
            error={Boolean(touched.address2Shipping && errors.address2Shipping)}
            helperText={touched.address2Shipping && errors.address2Shipping}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="City"
              {...getFieldProps("cityShipping")}
              error={Boolean(touched.cityShipping && errors.cityShipping)}
              helperText={touched.cityShipping && errors.cityShipping}
            />
            <TextField
              fullWidth
              label="Zip Code"
              {...getFieldProps("zipcodeShipping")}
              error={Boolean(touched.zipcodeShipping && errors.zipcodeShipping)}
              helperText={touched.zipcodeShipping && errors.zipcodeShipping}
            />
          </Stack>
          <TextField
            fullWidth
            label="State"
            {...getFieldProps("stateShipping")}
            error={Boolean(touched.stateShipping && errors.stateShipping)}
            helperText={touched.stateShipping && errors.stateShipping}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

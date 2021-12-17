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

export default function SellerRegisterForm() {
  const APIs = useContext(APIConfig);
  const userAPI = APIs.sellerAPI;

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
    company: Yup.string().required("Company Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      company: "",
      website: "",
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
        company: formik.values.company,
        website: formik.values.website,
        isActive: true,
        isEnabled: true,
        isApproved: false,
      };

      axios
        .post(userAPI, data, { headers })
        .then((res) => {
          const response = res.data;
          if (response == null || response == "") {
            console.log(data);
            console.log(response);
            alert("error happened during registration. try again ");

            navigate("/seller-register", { replace: true });
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

          <TextField
            fullWidth
            label="Company Name"
            {...getFieldProps("company")}
            error={Boolean(touched.company && errors.company)}
            helperText={touched.company && errors.company}
          />

          <TextField
            fullWidth
            label="Website"
            {...getFieldProps("website")}
            error={Boolean(touched.website && errors.website)}
            helperText={touched.website && errors.website}
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

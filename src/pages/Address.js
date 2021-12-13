import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// layouts
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import AddressForm from "src/layouts/AddressForm";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Address() {
  return (
    <RootStyle title="Register | Minimal-UI">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Please Enter Your Address
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
                Required fields are marked by (*) 
            </Typography>
          </Box>
          <AddressForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <Link underline="always" sx={{ color: "text.primary" }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: "text.primary" }}>
              Privacy Policy
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

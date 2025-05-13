import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import BlankPfpPng from "@assets/images/blank-pfp.png";
import { CloudUpload } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { editPfp } from "@features/settings/api/edit-pfp";
import * as Yup from "yup";

const MAX_FILE_SIZE = 1_000_000; // 1MB
const validFileExtensions = { image: ["jpg", "gif", "png", "jpeg"] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1;
}

const ValidationSchema = Yup.object().shape({
  newPhoto: Yup.mixed()
    .required("Photo must not be empty!")
    .test(
      "is-valid-type", "Must be a photo!",
      value => value === null || isValidFileType(value && value.name.toLowerCase(), "image")
    )
    .test(
      "is-valid-size", "Photo cannot be larger than 1MB!",
      value => value === null || (value && value.size <= MAX_FILE_SIZE)
    )
});

function EditPfpForm({
  user,
  setShowEditPfpPanel,
}) {
  const [src, setSrc] = useState(user.pfp?.url || BlankPfpPng);
  const dispatch = useDispatch();
  const dashedColor = "var(--primary)";
  const dashedBorderBackground = `
    repeating-linear-gradient(90deg, ${dashedColor}, ${dashedColor} 12px, transparent 12px, transparent 20px), repeating-linear-gradient(180deg, ${dashedColor}, ${dashedColor} 12px, transparent 12px, transparent 20px), repeating-linear-gradient(90deg, ${dashedColor}, ${dashedColor} 12px, transparent 12px, transparent 20px), repeating-linear-gradient(180deg, ${dashedColor}, ${dashedColor} 12px, transparent 12px, transparent 20px)
  `;

  const hideEditPfpPanel = () => {
    setShowEditPfpPanel(false);
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    await dispatch(
      editPfp({
        userId: user._id,
        newPhoto: values.newPhoto,
      })
    );
    setSubmitting(false);
  };

  const handleFileInputChange = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => setSrc(fr.result);
    setFieldValue("newPhoto", file);
  }

  return (
    <Formik
      initialValues={{ newPhoto: null }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        setFieldValue,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                alt="profile photo"
                src={src}
                sx={{
                  aspectRatio: "1 / 1",
                  width: "100%",
                }}
              />
              <Box
                sx={{
                  aspectRatio: "1 / 1",
                  position: "absolute",
                  inset: "0 0 0 0",
                  backgroundImage: dashedBorderBackground,
                  backgroundPosition: "left top, right top, left bottom, left top;",
                  backgroundRepeat: "repeat-x, repeat-y, repeat-x, repeat-y;",
                  backgroundSize:  "100% 4px, 4px 100%, 100% 4px, 4px 100%;",
                  display: "grid",
                  placeItems: "center",
                  opacity: 0,
                  transition: "opacity 100ms ease-in-out",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  disabled={isSubmitting}
                >
                  Upload Photo
                  <Box
                    component="input"
                    type="file"
                    name="newPhoto"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={e => handleFileInputChange(e, setFieldValue)}
                    sx={{
                      clip: "rect(0 0 0 0)",
                      clipPath: "inset(50%)",
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      whiteSpace: "nowrap",
                    }}
                  />
                </Button>
              </Box>
            </Box>
            {
              touched.newPhoto && errors.newPhoto &&
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 1 }}
              >
                {errors.newPhoto}
              </Typography>
            }
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                color="disabled"
                type="button"
                disabled={isSubmitting}
                onClick={hideEditPfpPanel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Box>
          </Form>
      )}
    </Formik>
  );
}

export default EditPfpForm;

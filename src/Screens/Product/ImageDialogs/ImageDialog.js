import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import apiHelper from "../../../Common/ApiHelper";

export default function ImageDialog(props) {
  const [open, setOpen] = React.useState(false); // eslint-disable-next-line
  const [fullWidth, setFullWidth] = React.useState(true); // eslint-disable-next-line
  const [maxWidth, setMaxWidth] = React.useState("md");
  const { FetchMediaHandler, Media, setFituerImage, FituerImage } = props;
  const [TempSelect, setTempSelect] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const UploadMediaHandler = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await apiHelper.UploadMedia(formData);

      if (result?.status === 200) {
        FetchMediaHandler();
      } else {
        console.log("Unexpected response status:", result.status);
      }
    } catch (error) {
      console.error("Error uploading media:", error.message || error);
    }
  };

  const handleClose = () => {
    setTempSelect({});
    setOpen(false);
  };

  React.useEffect(() => {
    FetchMediaHandler(); // eslint-disable-next-line
    setTempSelect(FituerImage);
  }, [FituerImage]);

  return (
    <>
      <React.Fragment>
        <button className=" Addmaster w-100 mt-2" onClick={handleClickOpen}>
          ADD FEATURE IMAGE
        </button>

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          sx={{ zIndex: "10000" }}
        >
          <DialogTitle className="fw-bold">Upload New Image</DialogTitle>
          <DialogContent className="row justify-content-center m-0">
            <label
              htmlFor="file"
              className="col-12 mb-3 col-sm-6 overflow-hidden  col-md-6   d-flex align-items-center justify-content-center"
              style={{
                height: "14rem",
                border: "2px dashed #1976d2",
              }}
            >
              <AddAPhotoIcon className="fs-1" color="success" />

              <input
                onChange={(e) => {
                  UploadMediaHandler(e.target.files[0]);
                }}
                type="file"
                id="file"
                hidden
                multiple
              />
            </label>

            {Media &&
              Media?.map((media, index) => {
                const { _id, mimetype, url } = media;

                if (!url) {
                  console.error(
                    `Media URL is missing for item with index ${index} and ID ${_id}`
                  );
                  return null;
                }

                return (
                  <div
                    className="col-12 mb-3 col-sm-6 overflow-hidden col-md-6"
                    key={_id}
                  >
                    {mimetype === "image" ? (
                      <img
                        src={url}
                        alt={`Image ${index}`}
                        onClick={() => {
                          if (
                            TempSelect?._id !== _id ||
                            FituerImage?._id !== _id
                          ) {
                            setTempSelect(media);
                            setFituerImage(media);
                          } else {
                            setTempSelect({});
                            setFituerImage({});
                          }
                        }}
                        style={{
                          width: "100%",
                          height: "18rem",
                          objectFit: "fill",
                          border:
                            TempSelect?._id === _id ? "2px solid blue" : "",
                        }}
                        onError={(e) =>
                          console.error(`Failed to load image: ${url}`, e)
                        }
                      />
                    ) : (
                      <video
                        src={url}
                        muted
                        style={{
                          width: "100%",
                          height: "15rem",
                          objectFit: "fill",
                        }}
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                        onError={(e) =>
                          console.error(`Failed to load video: ${url}`, e)
                        }
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                );
              })}
          </DialogContent>

          <DialogActions>
            <button className="Deletemaster" onClick={handleClose}>
              Close
            </button>

            <button
              className="Addmaster"
              onClick={() => {
                setFituerImage(TempSelect);
                setOpen(false);
                if (!TempSelect?._id) {
                  return alert("Please Select Image ");
                }
              }}
            >
              Save
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

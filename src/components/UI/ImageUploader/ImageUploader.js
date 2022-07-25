//Importing helper functions
import * as utils from "react";
import classNames from "classnames";
import { notification } from "Theme";
import { generateFileName } from "utils/modules";
import { Store } from "react-notifications-component";
import { Storage } from "aws-amplify";
import { storageUrl } from "utils/modules";
import { update } from "utils/modules";

//Importing core components
import LinearLoader from "../LinearLoader/LinearLoader";

//Importing styles
import styles from "./styles.module.css";
import Confirm from "../Confirm/Confirm";

const ImageUploader = ({
  title,
  image,
  oldImg,
  edit,
  disabled,
  setOldImage,
  updateFormField,
  md,
  small,
  field,
}) => {
  const [progress, setProgress] = utils.useState(null);
  const [confirm, setConfirm] = utils.useState(false);
  const uploader = utils.useRef(null);

  const handleChange = () => {
    if (!disabled && !progress) {
      if (image && oldImg) {
        setConfirm(true);
      } else if (!edit && !oldImg && image) {
        setConfirm(true);
      } else {
        uploader.current.click();
      }
    }
  };

  const saveFile = async (file) => {
    const filename = generateFileName(file.name);
    try {
      setProgress(2);
      const { key } = await Storage.put(filename, file, {
        progressCallback: ({ loaded, total }) => {
          const value = ((loaded / total) * 100).toFixed(2);
          setProgress(value);
        },
      });
      const url = `${storageUrl}/public/${key}`;
      setOldImage(image ? image : null);
      update(field ? field : "image", url, updateFormField);
      setProgress(null);
      Store.addNotification({
        ...notification,
        title: "Done",
        type: "Success",
        message: `Image ${key} Attached Successfully`,
      });
    } catch (error) {
      setProgress(null);
      Store.addNotification({
        ...notification,
        title: "Error",
        type: "danger",
        message: error.message,
      });
    }
  };

  const removeFile = async (value) => {
    if (value) {
      setOldImage(false);
      update(field ? field : "image", oldImg ? oldImg : null, updateFormField);
    }
  };

  return (
    <div
      className={classNames(styles.ImageUploader, small ? styles.small : "")}
    >
      <label>{title} *</label>
      <input
        type="file"
        accept=".jpg,.png,.jpeg,.webp"
        style={{ display: "none" }}
        ref={(el) => (uploader.current = el)}
        onChange={(e) => saveFile(e.target.files[0])}
        disabled={disabled}
      />
      <Confirm
        title={"Confirm Removal?"}
        message={
          "This action is irreversible and the file won't be available anymore."
        }
        open={confirm}
        setOpen={setConfirm}
        onChange={(value) => removeFile(value)}
      />
      <div className={md ? styles.boxMd : styles.box}>
        {progress && (
          <div className={styles.loader}>
            <p>Attaching your file, please wait...</p>
            <LinearLoader progress={progress} />
          </div>
        )}
        <div
          className={styles.image}
          style={{
            backgroundImage: `url("${image}")`,
          }}
        >
          {!image ? (
            <>
              <i
                onClick={() => handleChange()}
                className={classNames("icofont-photobucket", styles.icon)}
              ></i>
              <p>Attach Photo Here...</p>
            </>
          ) : (
            <div className={styles.close} onClick={() => handleChange()}>
              <i
                className={
                  !oldImg && edit ? "icofont-refresh" : "icofont-close-circled"
                }
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

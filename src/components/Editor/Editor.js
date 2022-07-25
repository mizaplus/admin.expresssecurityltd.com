//Importing helper functions
import { Storage } from "aws-amplify";
import { storageUrl } from "utils/modules";
import { notification } from "Theme";
import { useCallback, useMemo, useRef } from "react";

//Importing core components
import { Store } from "react-notifications-component";
import { Grid } from "@mui/material";
import ReactQuill from "react-quill";

//Importing styles
import styles from "./styles.module.css";
import "react-quill/dist/quill.snow.css";

const Editor = ({
  minimal,
  content,
  title,
  name,
  onChange,
  setLoading,
  readOnly,
  noImage,
}) => {
  const handleChange = (value) => {
    if (!readOnly) {
      onChange(value);
    }
  };

  console.log();

  const quill = useRef();

  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        setLoading(true);
        try {
          const res = await Storage.put(
            `${(Math.random() * 100000).toFixed(0)}${file.name}`,
            file
          );
          let image = `${storageUrl}/public/${res.key}`;
          let editor = quill.current.getEditor();
          const range = quill.current.getEditorSelection("focus", "true");
          editor.insertEmbed(range.index, "image", image);
          setLoading(false);
          Store.addNotification({
            ...notification,
            title: "Done",
            type: "success",
            message: "Image Attached Successfully",
          });
        } catch (e) {
          setLoading(false);
          Store.addNotification({
            ...notification,
            title: "Error",
            type: "danger",
            message: e.message,
          });
        }
      }
    };
  }, [setLoading]);

  const modules = useMemo(
    () =>
      minimal
        ? {
            toolbar: {
              container: [
                [{ header: [4, false] }],
                ["bold", "italic", "underline"],
                [{ color: [] }],
                ["link", !noImage ? "image" : ""],
              ],
              handlers: {
                image: !noImage ? () => imageHandler() : () => {},
              },
            },
            clipboard: {
              matchVisual: true,
            },
          }
        : {
            toolbar: {
              container: [
                [{ header: [2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote"],
                [{ color: [] }, { background: [] }],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", !noImage ? "image" : ""],
                ["clean"],
              ],
              handlers: {
                image: !noImage ? () => imageHandler() : () => {},
              },
            },
            clipboard: {
              matchVisual: true,
            },
          },
    [imageHandler, minimal, noImage]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "code",
    `clean`,
  ];

  return (
    <Grid container>
      <Grid item sm={12} md={12}>
        <label className={styles.label}>{title}</label>
        <ReactQuill
          readOnly={readOnly}
          ref={quill}
          theme="snow"
          name={name}
          placeholder={"Start from here.."}
          value={content}
          onChange={(value) => handleChange(value)}
          formats={formats}
          modules={modules}
          className={readOnly ? styles.EditorDisabled : styles.Editor}
        />
      </Grid>
    </Grid>
  );
};

export default Editor;

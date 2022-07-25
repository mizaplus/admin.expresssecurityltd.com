//Importing core components
import Alert from "../Alert/Alert";

const Feedback = ({ ui, update, progress, setUi }) => {
  return (
    <>
      <Alert
        open={ui.success ? true : false}
        color="success"
        message={ui.success ? ui.success : ""}
        clicked={() => update("success", null, setUi)}
      />
      <Alert
        open={ui.error ? true : false}
        color="error"
        message={ui.error ? ui.error : ""}
        clicked={() => update("error", null, setUi)}
      />
      <Alert
        open={ui.loading ? true : false}
        loading={ui.loading}
        progress={progress}
        color="info"
        message={ui.loading}
        clicked={() => update("loading", null, setUi)}
      />
    </>
  );
};

export default Feedback;

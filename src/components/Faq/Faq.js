//Importing styles
import styles from "./styles.module.css";

//Importing core components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@mui/material";
import ControlBtns from "components/ControlBtns/ControlBtns";

const Faq = ({ item, adminView, editItem, deleteItem }) => {
  return (
    <>
      {adminView ? (
        <Card className={styles.card}>
          <div className={styles.question2}>
            <h3>{item.question}</h3>
          </div>
          <ControlBtns
            onEdit={() => editItem(item)}
            onDelete={() => deleteItem(item)}
          />
        </Card>
      ) : (
        <Accordion key={Math.random()} style={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<i className="icofont-simple-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className={styles.question}>
              <h3>{item.question}</h3>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={styles.details}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default Faq;

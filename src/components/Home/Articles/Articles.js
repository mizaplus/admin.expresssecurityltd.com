//Importing core components
import { Grid, Container } from "@mui/material";
import BlogCard from "../../BlogCard/BlogCard";

//Importing styles
import styles from "./styles.module.css";

const Articles = ({data}) => {
  return (
    <div className={styles.Articles}>
      <Container maxWidth="lg">
        <div className={styles.header}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <h4>From the Blog.</h4>
              <h2>News &amp; Articles</h2>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>
                Explore through our archive of articles featured on our blog. We
                do alot of activities that help us keep our dream and vision
                alive.
              </p>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={3}>
          {data.map(item => <Grid item xs={12} sm={6} md={6} lg={4} key={Math.random()}>
            <BlogCard item={item}/>
          </Grid>)}
        </Grid>
      </Container>
    </div>
  );
};

export default Articles;

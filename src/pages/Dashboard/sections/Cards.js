import React from "react";
import { Grid } from "@mui/material";
import DataCard from "components/DataCard/DataCard";

const Cards = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <DataCard
          title={data.metrics["tableSize"].title}
          measure={data.metrics["tableSize"].amount}
          units={"KB"}
          date={data.date}
          index={1}
          icon={"icofont-database"}
          tagline={"Scanned At"}
          tagicon={"icofont-refresh"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <DataCard
          title={data.metrics["services"].title}
          measure={data.metrics["services"].amount}
          units={"Published"}
          date={data.date}
          index={2}
          icon={"icofont-tools-alt-2"}
          tagline={"Checked On"}
          tagicon={"icofont-pen-alt-1"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <DataCard
          title={data.metrics["works"].title}
          measure={data.metrics["works"].amount}
          units={"Published"}
          date={data.date}
          index={3}
          icon={"icofont-holding-hands"}
          tagline={"Checked On"}
          tagicon={"icofont-arrow-up"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <DataCard
          title={"Website Status"}
          measure={"100"}
          units={"% Active"}
          date={data.date}
          index={4}
          icon={"icofont-web"}
          tagline={"Latest Scan"}
          tagicon={"icofont-check-circled"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <DataCard
          title={data.metrics["authentication"].title}
          measure={data.metrics["authentication"].amount}
          units={"Successful"}
          date={data.date}
          index={5}
          icon={"icofont-ssl-security"}
          tagline={"Last Checked"}
          tagicon={"icofont-check-circled"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <DataCard
          title={data.metrics["mediaSize"].title}
          measure={data.metrics["mediaSize"].amount}
          units={"MB"}
          date={data.date}
          index={6}
          icon={"icofont-multimedia"}
          tagline={"Latest Scan"}
          tagicon={"icofont-check-circled"}
        />
      </Grid>
    </Grid>
  );
};

export default Cards;

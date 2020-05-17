import React from "react"
import PropTypes from "prop-types";
import {Card} from "react-native-paper";
import {margin} from "app/theme";

const HallwayListItem = ({hallway}) => {
  return (
    <Card style={{margin: margin.single}}>
      <Card.Title title={hallway.title} subtitle={hallway.description} />
    </Card>
)
}

HallwayListItem.propTypes = {
    hallway: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired
}

export default HallwayListItem;
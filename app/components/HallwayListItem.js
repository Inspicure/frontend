import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-native-paper';
import { margin } from 'app/theme';

const HallwayListItem = ({ hallway, onPress }) => {
  return (
    <Card style={{ margin: margin.single }} onPress={onPress}>
      <Card.Title
        title={hallway.title}
        subtitle={hallway.description}
      />
    </Card>
  );
};

HallwayListItem.propTypes = {
  hallway: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default HallwayListItem;

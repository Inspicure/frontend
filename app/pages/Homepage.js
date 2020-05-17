import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, FAB, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { margin } from 'app/theme';

import HallwayListItem from "app/components/HallwayListItem"

import { signOutAndClearToken } from 'app/redux/ducks/user';

import {getHallways} from "app/api";

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: margin.double,
    right: 0,
    bottom: 0,
  },
});

const Homepage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hallways, setHallways] = React.useState([])
  const loadHallways = React.useCallback(async () => {
    const retrievedHallways = await getHallways();
      if (retrievedHallways) {
        setHallways(retrievedHallways)
      }
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadHallways();
    })
    return unsubscribe;
  },[loadHallways, navigation])
  return (
    <View style={{margin: margin.single, flex: 1}}>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate("CreateNewHallway");
        }}
      />
      <Title>Open hallways</Title>
      {hallways.map((hallway) => {
        return <HallwayListItem hallway={hallway} key={`${hallway.title}`} />
      })}
      <Button
        onPress={() => dispatch(signOutAndClearToken())}
        mode="contained"
        compact
      >
        Sign Out
      </Button>
    </View>
  );
};

Homepage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired
  }).isRequired, // eslint killin me
};

export default Homepage;

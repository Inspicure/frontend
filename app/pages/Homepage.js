import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, Button, FAB, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { margin } from 'app/theme';

import HallwayListItem from 'app/components/HallwayListItem';

import { signOutAndClearToken } from 'app/redux/ducks/auth';

import { getHallways } from 'app/api';

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
  const [hallways, setHallways] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const hallwaysRetrieved = await getHallways();
      if (hallwaysRetrieved) {
        setHallways(hallwaysRetrieved);
      }
    });
    return unsubscribe;
  }, [dispatch, navigation]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
        <Appbar.Content
          title="Hallways"
          subtitle="Share your expertise"
        />
      </Appbar.Header>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate('CreateNewHallway');
        }}
      />
      <View style={{ margin: margin.single }}>
        <Title>Open hallways</Title>
        {hallways.length > 0 &&
          hallways.map((hallway) => {
            return (
              <HallwayListItem
                hallway={hallway}
                key={`${hallway.title}`}
              />
            );
          })}
        <Button
          onPress={() => dispatch(signOutAndClearToken())}
          mode="contained"
          compact
        >
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  );
};

Homepage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired, // eslint killin me
};

export default Homepage;

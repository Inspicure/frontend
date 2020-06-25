import PropTypes from 'prop-types';
import React from 'react';
import { Appbar, Button, Text, Title } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import { margin } from 'app/theme';
import { useDispatch, useSelector } from 'react-redux';
import { joinHallwayAndUpdateMemberships } from 'app/redux/ducks/hallways';

const HallwayPreview = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const hallwaySubscriptions = useSelector((state) => {
    return state.hallways.hallwayMemberships;
  });

  const inHallwayMemberships = React.useMemo(() => {
    for (const membership of hallwaySubscriptions) {
      if (
        route.params &&
        membership._id === route.params.hallway._id
      ) {
        return true;
      }
    }
    return false;
  }, [hallwaySubscriptions, route.params]);

  React.useEffect(() => {
    if (inHallwayMemberships) {
      navigation.navigate(route.params.hallway.title);
    }
  }, [inHallwayMemberships, navigation, route.params]);

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={route ? route.params.hallway.title : 'loading'}
        />
      </Appbar.Header>
      <ScrollView style={{ margin: margin.single, maxHeight: '85%' }}>
        <Title>Description</Title>
        <Text>
          {route ? route.params.hallway.description : 'loading'}
        </Text>
      </ScrollView>
      <Button
        onPress={async () => {
          await dispatch(
            joinHallwayAndUpdateMemberships(route.params.hallway._id),
          );
        }}
        mode="contained"
        style={{ margin: margin.single }}
      >
        Join hallway
      </Button>
    </SafeAreaView>
  );
};

HallwayPreview.propTypes = {
  route: PropTypes.shape({ params: PropTypes.object.isRequired })
    .isRequired,
  navigation: PropTypes.shape({ goBack: PropTypes.func.isRequired })
    .isRequired,
};

export default HallwayPreview;

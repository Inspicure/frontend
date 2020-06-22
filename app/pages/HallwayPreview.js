import PropTypes from 'prop-types';
import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native';

const HallwayPreview = ({ route, navigation }) => {
  console.log('in component');
  console.log(route);
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={route ? route.params.hallway.title : 'loading'}
          subtitle={
            route ? route.params.hallway.description : 'loading'
          }
        />
      </Appbar.Header>
      <Text>{route ? route.params.user.first_name : 'loading'}</Text>
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

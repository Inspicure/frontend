import React from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import {createHallway} from "app/api"
import {Button, Chip, Searchbar, List, Text, TextInput} from "react-native-paper";
import {KeyboardAvoidingView, Platform} from "react-native";
import { retrieveAndSaveHallwayMemberships } from 'app/redux/ducks/hallways';

const CreateNewHallway = ({navigation}) => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tags, setTags] = React.useState(["hello"]);

    const token = useSelector((state) => {
        return state.auth.userToken;
      });
      const creatorId = useSelector((state) => {
        return state.auth.id;
      });

    const addToTags = (tagToAdd) => {
        if (!tags.includes(tagToAdd)) {
            setTags([...tags, tagToAdd])
        }
    }

    const removeFromTags = (tagToRemove) => {
        if (tags.includes(tagToRemove)) {
            setTags([...tags].filter((tag) => {return tag !== tagToRemove}))
        }
    }
    const dispatch = useDispatch();
    return (
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            label="Title"
            onChangeText={setTitle}
            style={{ width: 300 }}
            autoCapitalize="none"
            value={title}
          />
          <TextInput
            label="Description"
            onChangeText={setDescription}
            style={{ width: 300 }}
            value={description}
            multiline
          />
        </KeyboardAvoidingView>
        <Text>Question tags</Text>
        {tags.map((tag) => {
          return <Chip icon="information" onClose={() => {removeFromTags(tag)}} key={tag}>{tag}</Chip>
        })}
        <Searchbar placeholder="Add tags" />
        <List.Item title="Radiology" onPress={() => {addToTags("Radiology")}} />
        <Button onPress={async () => {
            await createHallway(title, description, creatorId, tags, token);
            dispatch(retrieveAndSaveHallwayMemberships());
            navigation.goBack();
        }}
        >
          Submit
        </Button>
      </>
    )
}

CreateNewHallway.propTypes = {
    navigation: PropTypes.shape({goBack: PropTypes.func.isRequired}).isRequired
}

export default CreateNewHallway;
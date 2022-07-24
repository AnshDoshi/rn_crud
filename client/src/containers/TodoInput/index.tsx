import {View, TextInput, Button} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {useTheme} from '../../../theme/colors';

type Props = {
  title?: string;
  setTitle?: Dispatch<SetStateAction<string | undefined>>;
  onSubmit?: () => void;
  error: boolean;
};

const TodoInput = ({title, setTitle, onSubmit, error}: Props) => {
  const colors = useTheme();
  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
        value={title}
        style={{
          borderColor: error ? colors.delete : colors.completed,
          borderWidth: 2,
          marginHorizontal: 5,
          padding: 10,
          borderRadius: 8,
          marginVertical: 8,
          flex: 1,
          color: colors.text,
        }}
        onChangeText={setTitle}
      />
      <Button title={'Submit'} onPress={onSubmit} />
    </View>
  );
};

export default TodoInput;

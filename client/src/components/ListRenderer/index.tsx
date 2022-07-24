import {View, Text} from 'react-native';
import React from 'react';
import {List} from '../../../types/list';
import {useTheme} from '../../../theme/colors';
import ThemeButton from '../ThemeButtons';

type Props = {
  x: List;
  index: number;
  onDone: (x: List, index: number) => void;
  onDeleteUser: (x: List) => void;
};

const ListRenderer = ({x, index, onDone, onDeleteUser}: Props) => {
  const colors = useTheme();
  return (
    <View key={x?._id} style={{display: 'flex', flexDirection: 'row'}}>
      <View
        style={{
          borderColor: '#555',
          borderWidth: 2,
          flex: 1,
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          marginHorizontal: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: x?.isDone ? 0.5 : 1,
        }}>
        {/* <Text>Hello</Text> */}
        <View>
          <Text
            style={{
              textDecorationLine: x?.isDone ? 'line-through' : 'none',
              color: colors.text,
            }}>
            {x.name}
          </Text>
          <Text
            style={{
              textDecorationLine: x?.isDone ? 'line-through' : 'none',
              color: colors.text,
            }}>
            {x.title ?? 'Dummy title'}
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ThemeButton
            title={x.isDone ? 'Undo' : 'Done'}
            onPress={() => onDone(x, index)}
            variant="sideBtn"
            textColor={colors.text}
            bdColor={x?.isDone ? colors.completed : colors.incomplete}
          />
          <ThemeButton
            title="Delete"
            onPress={() => onDeleteUser(x)}
            variant="sideBtn"
            textColor={colors.text}
            bdColor={colors.delete}
          />
        </View>
      </View>
    </View>
  );
};

export default ListRenderer;

import {View, Text, ScrollView} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {List} from '../../../types/list';
import {useTheme} from '../../../theme/colors';
import ThemeButton from '../../components/ThemeButtons';
import instance from '../../../helper/axiosInstance';
import ListRenderer from '../../components/ListRenderer';

type Props = {
  list?: List[];
  setList?: Dispatch<SetStateAction<List[] | undefined>>;
};

const TodoList = (props: Props) => {
  const colors = useTheme();
  const onDeleteUser = async (user: List) => {
    const response = await instance.delete(`/list/${user._id}`);
    if (response.data.status) {
      props.setList(props.list?.filter(x => user._id !== x?._id));
    } else {
      console.error('error deleting:', user.name);
    }
  };

  const onDone = async (user: List, index: number) => {
    const response = await instance.put(`/list/${user._id}`);
    console.log(response);
    if (response.data.status) {
      let newList: List[] = [...props?.list];
      newList[index].isDone = !newList[index].isDone;
      props?.setList(newList);
    }
  };
  return (
    <ScrollView>
      {props.list?.map((x, i) => (
        <ListRenderer
          x={x}
          index={i}
          onDeleteUser={onDeleteUser}
          onDone={onDone}
        />
      ))}
    </ScrollView>
  );
};

export default TodoList;

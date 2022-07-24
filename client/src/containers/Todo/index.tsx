import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../../theme/colors';
import instance from '../../../helper/axiosInstance';
import {List} from '../../../types/list';
import TodoList from '../TodoList';
import FilterButtons from '../FilterButtons';
import TodoInput from '../TodoInput';

// type Props = {};

const Todo = () => {
  const [list, setList] = useState<List[] | undefined>();
  const [title, setTitle] = useState<string>();
  const [error, setError] = useState(false);
  const [status, setStatus] = useState<
    'All' | 'Completed' | 'Incomplete' | undefined
  >('All');

  const colors = useTheme();

  const getList = async () => {
    const response = await instance.get('/list');
    setList(response.data);
  };
  useEffect(() => {
    getList();
    return () => {};
  }, []);

  const onSubmit = async () => {
    if (!title?.trim()) {
      setError(true);
      return;
    } else {
      // setStatus('All');
      console.log({title});
      const newItem: List = {
        name: title,
        body: 'Body text',
        title: 'Title block',
        isDone: false,
      };
      setTitle('');
      setError(false);
      const response = await instance.post('/list', newItem);
      setList(arr => [response.data, ...arr]);
      console.log(response.data, 'successpost');
    }
  };

  return (
    <SafeAreaView
      style={{display: 'flex', flex: 1, backgroundColor: colors.background}}>
      <Text style={{paddingHorizontal: 10, color: colors.text}}>TODO</Text>
      <TodoInput
        error={error}
        onSubmit={onSubmit}
        setTitle={setTitle}
        title={title}
      />
      <FilterButtons setList={setList} setStatus={setStatus} status={status} />
      <TodoList setList={setList} list={list} />
    </SafeAreaView>
  );
};

export default Todo;

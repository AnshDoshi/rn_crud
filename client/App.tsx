/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import instance from './helper/axiosInstance';
import {List} from './types/list';

const App = () => {
  const [list, setList] = useState<List[]>();
  const [title, setTitle] = useState<string>();
  const [error, setError] = useState(false);

  const getList = async () => {
    const response = await instance.get('/list');
    setList(
      response.data.reduce(
        (p: [], c: any, i: number) => [
          ...p,
          {...c, heading: `This is header ${i + 1}`},
        ],
        [],
      ),
    );
  };
  useEffect(() => {
    getList();
    return () => {};
  }, []);

  const filterList = list?.filter(x => x);
  const onSubmit = async () => {
    if (!title?.trim()) {
      setError(true);
      return;
    } else {
      console.log({list});
      const newItem: List = {
        name: title,
        body: 'Body text',
        title: 'Title block',
        isDone: false,
      };
      setTitle('');
      setError(false);
      const response = await instance.post('/list', newItem);
      console.log(response.data, 'successpost');
      setList(arr => [response.data, ...arr]);
    }
  };
  const onDeleteUser = async user => {
    const response = await instance.delete(`/lists/${user._id}`);
    if (response.data.status) {
      setList(list?.filter(x => user._id !== x?._id));
    } else {
      console.error('error deleting:', user.name);
    }
    // setList(response.data);
  };
  const onDone = async (user: List, index: number) => {
    const response = await instance.put(`/lists/${user._id}`);
    console.log(response);
    if (response.data.status) {
      setList([
        ...list?.slice(0, index),
        {...user, isDone: !user.isDone},
        ...list?.slice(index + 1),
      ]);
    }
  };

  return (
    <SafeAreaView style={{display: 'flex', flex: 1}}>
      <Text style={{paddingHorizontal: 10}}>TODO</Text>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          value={title}
          style={{
            borderColor: error ? '#911' : '#999',
            borderWidth: 2,
            marginHorizontal: 5,
            padding: 10,
            borderRadius: 8,
            marginVertical: 8,
            flex: 1,
          }}
          onChangeText={setTitle}
        />
        <Button title={'Submit'} onPress={onSubmit} />
      </View>
      <View
        style={{display: 'flex', flexDirection: 'row', marginHorizontal: 5}}>
        <TouchableHighlight
          style={{
            borderColor: '#119',
            borderWidth: 2,
            padding: 10,
            borderRadius: 9,
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={{color: '#222'}}>All</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            borderColor: '#191',
            borderWidth: 2,
            padding: 10,
            borderRadius: 9,
            flex: 1,
            marginHorizontal: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: '#222'}}>Completed</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            borderColor: 'orange',
            borderWidth: 2,
            padding: 10,
            borderRadius: 9,
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={{color: '#222'}}>Incomplete</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={{display: 'flex'}}>
        {filterList?.map((x, i) => (
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
                  }}>
                  {x.name}
                </Text>
                <Text
                  style={{
                    textDecorationLine: x?.isDone ? 'line-through' : 'none',
                  }}>
                  {x.title ?? 'Dummy title'}
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <TouchableHighlight
                  onPress={() => onDone(x, i)}
                  style={{
                    backgroundColor: 'orange',
                    padding: 10,
                    borderRadius: 9,
                  }}>
                  <Text style={{color: '#fff'}}>
                    {x.isDone ? 'Undo' : 'Done'}
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => onDeleteUser(x)}
                  style={{
                    backgroundColor: '#922',
                    padding: 10,
                    borderRadius: 9,
                    marginLeft: 10,
                  }}>
                  <Text style={{color: '#fff'}}>Delete</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});

export default App;

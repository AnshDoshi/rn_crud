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
  console.log({list});
  useEffect(() => {
    getList();
    return () => {};
  }, []);

  const filterList = list?.filter(x => x);
  const onSubmit = () => {
    if (!title?.trim()) {
      setError(true);
      return;
    } else {
      const newItem: List = {
        id: list?.length + 1,
        userId: list?.length + 1,
        heading: title,
        body: 'Body text',
        title: 'Title block',
      };
      setList(arr => [newItem, ...arr]);
      setTitle('');
      setError(false);
    }
  };

  return (
    <SafeAreaView style={{display: 'flex'}}>
      <Text>Hello world</Text>
      <TextInput
        value={title}
        style={{
          borderColor: error ? '#911' : '#999',
          borderWidth: 2,
          marginHorizontal: 5,
          padding: 10,
          borderRadius: 8,
          marginVertical: 8,
        }}
        onChangeText={setTitle}
      />
      <Button title={'Submit'} onPress={onSubmit} />
      <ScrollView>
        {filterList?.map((x, i) => (
          <View key={i} style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#aba',
                flex: 1,
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                marginHorizontal: 5,
              }}>
              {/* <Text>Hello</Text> */}
              <Text>{x.heading}</Text>
              <Text>{x.title ?? 'Dummy title'}</Text>
            </View>
            {/* <View>
              <Text>{x?.id}</Text>
              <Text>{x?.userId}</Text>
            </View>
            <Text>{x?.title}</Text>
            <Text>{x?.body}</Text> */}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});

export default App;

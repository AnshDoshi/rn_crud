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
  const [list, setList] = useState<List[] | undefined>();
  const [title, setTitle] = useState<string>();
  const [error, setError] = useState(false);
  const [status, setStatus] = useState<'All' | 'Completed' | 'Incomplete'>(
    'All',
  );

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
  const onDeleteUser = async (user: List) => {
    const response = await instance.delete(`/list/${user._id}`);
    if (response.data.status) {
      setList(list?.filter(x => user._id !== x?._id));
    } else {
      console.error('error deleting:', user.name);
    }
  };

  const onDone = async (user: List, index: number) => {
    const response = await instance.put(`/list/${user._id}`);
    console.log(response);
    if (response.data.status) {
      let newList: List[] = [...list];
      newList[index].isDone = !newList[index].isDone;
      setList(newList);
    }
  };

  const onFilterClick = async (currentStatus: any) => {
    console.log(currentStatus);
    setStatus(currentStatus);
    let response = await instance.get('/list');
    let array: List[] = response.data;
    switch (currentStatus) {
      case 'All':
        setList(array);
        break;
      case 'Completed':
        setList(array.filter(x => x.isDone));
        break;
      case 'Incomplete':
        setList(array.filter(x => !x.isDone));
        break;

      default:
        break;
    }
  };

  const isAll = status === 'All';
  const isCompleted = status === 'Completed';
  const isIncomplete = status === 'Incomplete';

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
          onPress={() => onFilterClick('All')}
          style={[
            {
              borderColor: '#119',
              borderWidth: 2,
              padding: 10,
              borderRadius: 9,
              flex: 1,
              alignItems: 'center',
            },
            isAll && {backgroundColor: '#119'},
          ]}>
          <Text style={{color: isAll ? '#fff' : '#222'}}>All</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => onFilterClick('Completed')}
          style={[
            {
              borderColor: '#191',
              borderWidth: 2,
              padding: 10,
              borderRadius: 9,
              flex: 1,
              marginHorizontal: 5,
              alignItems: 'center',
            },
            isCompleted && {backgroundColor: '#191'},
          ]}>
          <Text style={{color: isCompleted ? '#fff' : '#222'}}>Completed</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => onFilterClick('Incomplete')}
          style={[
            {
              borderColor: 'orange',
              borderWidth: 2,
              padding: 10,
              borderRadius: 9,
              flex: 1,
              alignItems: 'center',
            },
            isIncomplete && {backgroundColor: 'orange'},
          ]}>
          <Text style={{color: isIncomplete ? '#fff' : '#222'}}>
            Incomplete
          </Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={{display: 'flex'}}>
        {list?.map((x, i) => (
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
                    backgroundColor: x?.isDone ? 'green' : 'orange',
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

export default App;

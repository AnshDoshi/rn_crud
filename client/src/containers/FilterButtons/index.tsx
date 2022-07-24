import {View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import instance from '../../../helper/axiosInstance';
import {List} from '../../../types/list';
import ThemeButton from '../../components/ThemeButtons';
import {useTheme} from '../../../theme/colors';

type Props = {
  status: string | undefined;
  setStatus: Dispatch<
    SetStateAction<'All' | 'Completed' | 'Incomplete' | undefined>
  >;
  setList: Dispatch<SetStateAction<List[] | undefined>>;
};

const FilterButtons = ({status, setStatus, setList}: Props) => {
  const colors = useTheme();
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
    <View style={{display: 'flex', flexDirection: 'row', marginHorizontal: 5}}>
      <ThemeButton
        title="All"
        onPress={() => onFilterClick('All')}
        variant="filterBtn"
        textColor={isAll ? colors.activeColor : colors.text}
        bdColor={colors.primary}
        style={{backgroundColor: isAll ? colors.primary : 'transparent'}}
      />
      <ThemeButton
        title="Completed"
        onPress={() => onFilterClick('Completed')}
        variant="filterBtn"
        textColor={isCompleted ? colors.activeColor : colors.text}
        bdColor={colors.completed}
        style={{
          backgroundColor: isCompleted ? colors.completed : 'transparent',
          marginHorizontal: 5,
        }}
      />
      <ThemeButton
        title="Incomplete"
        onPress={() => onFilterClick('Incomplete')}
        variant="filterBtn"
        textColor={isIncomplete ? colors.activeColor : colors.text}
        bdColor={colors.incomplete}
        style={{
          backgroundColor: isIncomplete ? colors.incomplete : 'transparent',
        }}
      />
    </View>
  );
};

export default FilterButtons;

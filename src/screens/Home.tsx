import { FlatList, HStack, Heading, Text, VStack } from 'native-base';
import { useState } from 'react';

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Home() {
  const [groups, setGroups] = useState([
    'costas',
    'ombros',
    'biceps',
    'triceps',
  ]);
  const [exercises, setExercises] = useState(['1', '2', '3', '4']);
  const [groupSelected, setGroupSelected] = useState('costas');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        minH={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercicios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
        />
      </VStack>
    </VStack>
  );
}

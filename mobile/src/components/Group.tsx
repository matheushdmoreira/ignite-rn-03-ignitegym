import { IPressableProps, Pressable, Text } from 'native-base';

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
};

export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      borderWidth={1}
      borderColor="gray.600"
      isPressed={isActive}
      _pressed={{
        borderColor: 'green.500',
      }}
      {...rest}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase"
        fontSize="xs"
        fontFamily="heading"
      >
        {name}
      </Text>
    </Pressable>
  );
}

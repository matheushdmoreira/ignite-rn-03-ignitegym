import { yupResolver } from '@hookform/resolvers/yup';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import * as yup from 'yup';

import { AppError } from '@utils/AppError';

import { useAuth } from '@hooks/useAuth';

import userPhotoDefault from '@assets/userPhotoDefault.png';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirm: string;
};

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  old_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null)),
  password: yup.string().when('old_password', {
    is: (val: string) => !!val,
    then: (schema) =>
      schema
        .required('Informe a nova senha.')
        .min(6, 'A senha deve ter no mínimo de 6 digitos.'),
    otherwise: (schema) =>
      schema.nullable().transform((value) => (!!value ? value : null)),
  }),
  password_confirm: yup.string().when('old_password', {
    is: (val: string) => !!val,
    then: (schema) =>
      schema
        .required('Informe a confirmação de senha.')
        .oneOf([yup.ref('password')], 'A confirmação da senha não confere.'),
    otherwise: (schema) =>
      schema.nullable().transform((value) => (!!value ? value : null)),
  }),
});

export function Profile() {
  const [isLoading, setIsloading] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('');

  const toast = useToast();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande, escolha uma imagem de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          });
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleUpdateProfile(data: FormDataProps) {
    try {
      setIsloading(true);

      console.log(data);

      // await api.put('users', { name, old_password, password });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível cria a conta, tente novamente mais tarde.';

      setIsloading(false);

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsloading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : userPhoto ? (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          ) : (
            <UserPhoto
              source={userPhotoDefault}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontFamily="heading"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Email"
                isDisabled
                autoCapitalize="none"
                value={value}
              />
            )}
          />

          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
            mt={10}
            mb={2}
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(handleUpdateProfile)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleUpdateProfile)}
            isLoading={isLoading}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}

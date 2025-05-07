import React, { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker'; // Para galeria
import * as Permissions from 'expo-permissions'; // Para permissões

export const UserView = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      openCamera();
    } else {
      console.log('Permissão de câmera negada');
    }
  };

  const requestGalleryPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === 'granted') {
      openGallery();
    } else {
      console.log('Permissão de galeria negada');
    }
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('Usuário cancelou a captura da foto');
        } else if (response.errorCode) {
          console.log('Erro ao tirar foto: ', response.errorMessage);
        } else if (response.assets && response.assets[0]) {
          const source = response.assets[0].uri;
          setPhotoUri(source ?? null);
        }
      }
    );
  };

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPhotoUri(result.uri);
    } else {
      console.log('Usuário cancelou a seleção da imagem');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Abrir Câmera" onPress={requestCameraPermission} />
      <Button title="Selecionar da Galeria" onPress={requestGalleryPermission} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

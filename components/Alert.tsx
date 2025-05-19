import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface AlertProps {
  viewMode: boolean;
  type: string;
  text1: string;
  text2: string;
}

const Alert = (values: AlertProps) => {
  const showToast = () => {
    Toast.show({
      type: values.type,
      text1: values.text1,
      text2: values.text2,
      position: 'top',
    });
  };
  useEffect(() => {
    if (values.viewMode) {
      showToast();
    }
  }, [values.viewMode]);

  return (
    <View style={styles.container}>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, // Distância do topo
    left: 0,
    right: 0,
    zIndex: 1000, // Assegura
  },
});

export default Alert;

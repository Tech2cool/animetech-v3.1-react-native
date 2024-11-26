import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface ErrorScreenProps {
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({onRetry}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unable to Connect</Text>
      <Text style={styles.message}>
        Oops! We couldn't reach the server. Please check your internet
        connection or try again later.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4500', // Dark orange background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    color: '#FFDAB9',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  retryText: {
    color: '#FF4500',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorScreen;

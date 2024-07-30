import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ToggleLocationButtonProps {
  isTracking: boolean;
  onToggle: () => void;
}

const ToggleLocationButton: React.FC<ToggleLocationButtonProps> = ({ isTracking, onToggle }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onToggle}
    >
      <Text style={styles.buttonText}>
        {isTracking ? 'Stop Tracking' : 'Start Tracking'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ToggleLocationButton;

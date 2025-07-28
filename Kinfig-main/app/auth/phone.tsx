import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal
} from 'react-native';
import { router } from 'expo-router';

export default function PhoneScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const screenHeight = Dimensions.get('window').height;

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');

    if (text !== numericText) {
      setErrorMessage('Please enter only numbers');
    } else {
      setErrorMessage('');
    }

    setPhoneNumber(numericText);
  };

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10 && !errorMessage) {
      setModalVisible(true);
    }
  };

  const handleContinue = () => {
    setModalVisible(false);
    router.push({ pathname: '/auth/otp', params: { phone: phoneNumber } });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ImageBackground
        source={require('@/assets/images/correctbg.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', padding: 24 }}>
          {/* Title and subtitle at the top */}
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={styles.title}>
              Welcome to your world{'\n'}of <Text style={styles.familyText}>Family</Text>
            </Text>
            <Text style={styles.subtitle}>Login with your phone number</Text>
          </View>

          {/* Phone Input and Button at the bottom */}
          <View >
            <View style={[styles.phoneInputContainer, errorMessage && styles.phoneInputError]}>
              <View style={styles.countryCodeContainer}>
                <View style={styles.flagCircle}>
                  <Image
                    source={require('@/assets/icons/indiaflag.png')}
                    style={styles.flagImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.countryCode}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="number-pad"
                maxLength={10}
                placeholderTextColor="#999"
                returnKeyType="done"
                autoFocus={false}
              />
            </View>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
           <View style={styles.bottomContainer}>
             <TouchableOpacity
                style={[
                  styles.sendButton,
                  (phoneNumber.length < 10 || errorMessage) && styles.sendButtonDisabled
                ]}
                onPress={handleSendOTP}
                disabled={phoneNumber.length < 10 || !!errorMessage}
              >
                <Text style={styles.sendButtonText}>Send OTP</Text>
              </TouchableOpacity>
           </View>
          </View>
        </View>

        {/* Modal Popup for OTP Confirmation */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Verify your Number</Text>
              <Text style={styles.modalSubtitle}>We will send an OTP to this number</Text>
              <Text style={styles.modalPhoneNumber}>+91 <Text style={{ color: '#459F56' }}>{phoneNumber}</Text></Text>
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalEdit}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleContinue}>
                  <Text style={styles.modalContinue}>CONTINUE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 8,
    color: '#1a1a1a',
    lineHeight: 32,
  },
  familyText: {
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginBottom: 32,
  },
  bottomContainer: {
    width: 'SCREEN_WIDTH',
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    paddingHorizontal: 0,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: '100%',
    marginBottom: 8,
  },
  phoneInputError: {
    borderColor: '#ff4444',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  flagCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 16,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#cccccc',
    elevation: 0,
    shadowOpacity: 0,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 24,
    width: '85%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222',
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#747474',
    marginBottom: 4,
  },
  modalPhoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#219653',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalEdit: {
    color: '#747474',
    fontWeight: '700',
    fontSize: 14,
  },
  modalContinue: {
    color: '#219653',
    fontWeight: '700',
    fontSize: 14,
  },
  flagImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
});
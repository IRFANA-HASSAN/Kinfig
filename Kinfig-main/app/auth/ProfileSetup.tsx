import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';

function formatDate(date: Date | null) {
  if (!date) return '';
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options).replace(/ /g, ', ');
}

export default function ProfileSetup() {
  const { login } = useAuth();
  const { phone } = useLocalSearchParams();
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!username || !gender || !dob) {
      setError('Please fill all required fields.');
      return;
    }
    setError('');
    
    // Create user data with profile information
    const userData = {
      id: '1',
      name: username,
      phone: typeof phone === 'string' ? phone : Array.isArray(phone) ? phone[0] : '',
      avatar: image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      family: 'Thalirath Family, Kattappana, Idukki',
      gender: gender,
      dob: dob?.toISOString(),
    };
    
    // Login with the profile data
    login(userData);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }]} keyboardShouldPersistTaps="handled">
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={handlePickImage} activeOpacity={0.8}>
            <View style={styles.avatarBorder}>
              <Image
                source={image ? { uri: image } : require('../../assets/icons/Logo.svg')}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.cameraIconWrapper}>
                <Ionicons name="camera" size={22} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* Phone Number Display */}
        {phone && (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.phoneDisplay}>
              <Text style={styles.phoneText}>+91 {typeof phone === 'string' ? phone : Array.isArray(phone) ? phone[0] : ''}</Text>
            </View>
          </View>
        )}
        
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Enter name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={username}
            onChangeText={val => { setUsername(val); setError(''); }}
          />
        </View>
        {/* Gender Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Select Gender</Text>
          <View style={styles.genderRow}>
            {['Male', 'Female', 'Other'].map((option, idx, arr) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderRadio,
                  gender === option && styles.genderRadioActive,
                  idx === 1 && styles.genderRadioMiddle,
                  idx === 0 && styles.genderRadioFirst,
                  idx === arr.length - 1 && styles.genderRadioLast
                ]}
                onPress={() => { setGender(option); setError(''); }}
                activeOpacity={0.8}
              >
                <View style={[styles.radioCircle, gender === option && styles.radioCircleActive]}>
                  {gender === option && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.genderRadioText, gender === option && styles.genderRadioTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* DOB Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Enter birth date</Text>
          {Platform.OS === 'web' ? (
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={dob ? formatDate(dob) : ''}
              onFocus={e => {
                (e.target as any).type = 'date';
              }}
              onBlur={e => {
                (e.target as any).type = 'text';
              }}
              onChangeText={val => {
                // val is in yyyy-mm-dd format
                if (val) {
                  const [year, month, day] = val.split('-').map(Number);
                  const date = new Date(year, month - 1, day);
                  setDob(date);
                  setError('');
                }
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.input}
              onPress={() => { setShowDatePicker(true); setError(''); }}
              activeOpacity={0.8}
            >
              <View style={styles.dobRow}>
                <Text style={[styles.dobText, dob && { color: '#222' }]}> {dob ? formatDate(dob) : 'Date of Birth'} </Text>
                <Ionicons name="calendar-outline" size={20} color="#888" />
              </View>
            </TouchableOpacity>
          )}
          {showDatePicker && Platform.OS !== 'web' && (
            <DateTimePicker
              value={dob || new Date(2000, 0, 1)}
              mode="date"
              display="default"
              onChange={(_: any, date?: Date) => {
                setShowDatePicker(false);
                if (date) { setDob(date); setError(''); }
              }}
              maximumDate={new Date()}
            />
          )}
        </View>
        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, (!username || !gender || !dob) && { opacity: 0.5 }]}
          onPress={handleSubmit}
          disabled={!username || !gender || !dob}
        >
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBorder: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 60,
    padding: 3,
    backgroundColor: '#fff',
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#459F56',
    borderRadius: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    marginLeft: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 24,
  },
  genderRadio: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  genderRadioFirst: {
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  genderRadioLast: {
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  genderRadioMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  genderRadioActive: {
    borderColor: '#4CAF50',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  radioCircleActive: {
    borderColor: '#4CAF50',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  genderRadioText: {
    color: '#888',
    fontSize: 16,
  },
  genderRadioTextActive: {
    color: '#4CAF50',
    fontWeight: '700',
  },
  dobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dobText: {
    fontSize: 16,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: '#ff5252',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  phoneDisplay: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  phoneText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginLeft: 16,
  },
}); 
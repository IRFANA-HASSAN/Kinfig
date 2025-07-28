import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { X, Camera } from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';

// Calendar SVG content
const calendarSvg = `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.3314 0.728004C13.2862 0.387469 13.001 0.125 12.6559 0.125C12.2794 0.125 11.9742 0.437359 11.9742 0.822674V1.59402H5.99495V0.822674L5.98873 0.728004C5.94359 0.387469 5.65837 0.125 5.31324 0.125C4.93675 0.125 4.63153 0.437359 4.63153 0.822674V1.61134C1.83798 1.80673 0.118164 3.64492 0.118164 6.61079V15.0291C0.118164 18.2122 2.04653 20.125 5.13641 20.125H12.8243C15.9179 20.125 17.8426 18.2443 17.8426 15.0994V6.61079C17.8515 3.64386 16.1372 1.80619 13.3376 1.61126V0.822674L13.3314 0.728004ZM11.9742 2.98937V3.88387L11.9804 3.97854C12.0255 4.31907 12.3108 4.58154 12.6559 4.58154C13.0324 4.58154 13.3376 4.26918 13.3376 3.88387V3.00999C15.3745 3.18209 16.4857 4.42774 16.4792 6.60865V7.01268H1.48158V6.61079C1.48158 4.43126 2.59886 3.18298 4.63153 3.01013V3.88387L4.63776 3.97854C4.6829 4.31907 4.96812 4.58154 5.31324 4.58154C5.68974 4.58154 5.99495 4.26918 5.99495 3.88387V2.98937H11.9742ZM1.48158 8.40803V15.0291C1.48158 17.4317 2.79015 18.7297 5.13641 18.7297H12.8243C15.1786 18.7297 16.4792 17.4588 16.4792 15.0994L16.4792 8.40803H1.48158ZM13.7081 11.3433C13.7081 10.958 13.4029 10.6456 13.0264 10.6456L12.9255 10.652C12.5927 10.6982 12.3363 10.9901 12.3363 11.3433C12.3363 11.7286 12.6415 12.041 13.0264 12.041L13.1189 12.0346C13.4516 11.9884 13.7081 11.6965 13.7081 11.3433ZM8.99299 10.6456C9.36948 10.6456 9.6747 10.958 9.6747 11.3433C9.6747 11.6965 9.41823 11.9884 9.08549 12.0346L8.99299 12.041C8.60807 12.041 8.30286 11.7286 8.30286 11.3433C8.30286 10.9901 8.55932 10.6982 8.89206 10.652L8.99299 10.6456ZM5.63287 11.3433C5.63287 10.958 5.32766 10.6456 4.95116 10.6456L4.85024 10.652C4.5175 10.6982 4.26103 10.9901 4.26103 11.3433C4.26103 11.7286 4.56624 12.041 4.94274 12.041L5.04367 12.0346C5.37641 11.9884 5.63287 11.6965 5.63287 11.3433ZM13.0264 14.261C13.4029 14.261 13.7081 14.5734 13.7081 14.9587C13.7081 15.3119 13.4516 15.6038 13.1189 15.65L13.0264 15.6564C12.6415 15.6564 12.3363 15.344 12.3363 14.9587C12.3363 14.6055 12.5927 14.3136 12.9255 14.2674L13.0264 14.261ZM9.6747 14.9587C9.6747 14.5734 9.36948 14.261 8.99299 14.261L8.89206 14.2674C8.55932 14.3136 8.30286 14.6055 8.30286 14.9587C8.30286 15.344 8.60807 15.6564 8.99299 15.6564L9.08549 15.65C9.41823 15.6038 9.6747 15.3119 9.6747 14.9587ZM4.95116 14.261C5.32766 14.261 5.63287 14.5734 5.63287 14.9587C5.63287 15.3119 5.37641 15.6038 5.04367 15.65L4.94274 15.6564C4.56624 15.6564 4.26103 15.344 4.26103 14.9587C4.26103 14.6055 4.5175 14.3136 4.85024 14.2674L4.95116 14.261Z" fill="#747474"/>
</svg>`;

export default function EditProfileScreen() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || 'David Joh');
  const [gender, setGender] = useState('Male');
  const [birthDate, setBirthDate] = useState('09 Nov, 1998');

  const handleSave = () => {
    updateUser({ name, gender, birthDate });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleCancel}>
          <X size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Gender</Text>
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
                  onPress={() => setGender(option)}
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
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter birth date</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="Enter birth date"
              />
              <TouchableOpacity style={styles.calendarButton}>
                <SvgXml xml={calendarSvg} width={18} height={21} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#283B88',
    borderRadius: 20,
    padding: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  changePhotoText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  formSection: {
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
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
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  dateInput: {
    flex: 1,
    paddingRight: 10,
    fontSize: 16,
    color: '#333',
  },
  calendarButton: {
    padding: 10,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#E53E3E',
    fontSize: 16,
    fontWeight: '600',
  },
});
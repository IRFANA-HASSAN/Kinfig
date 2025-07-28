import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const BG_IMG = require('../../assets/images/correctbg.png');
const OTP_LIST = ['1234', '5678', '9012'];

export default function OTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { phone } = useLocalSearchParams();
  const [timer, setTimer] = useState(16);
  const screenHeight = Dimensions.get('window').height;
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otpIndex, setOtpIndex] = useState(0);
  const [resendConfirmVisible, setResendConfirmVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setOtpModalVisible(true);
    const timeout = setTimeout(() => setOtpModalVisible(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setActiveIndex(index);
    setError(''); // Clear error on input
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      if (!OTP_LIST.includes(otpString)) {
        setError('The OTP you entered is wrong');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const userData = {
          id: '1',
          name: 'Sophia Jacob',
          phone: typeof phone === 'string' ? phone : Array.isArray(phone) ? phone[0] : '',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
          family: 'Thalireeth Family, Kottappana, Idukki'
        };
        // Don't login yet, just navigate to profile setup with phone number
        router.replace({
          pathname: '/auth/ProfileSetup',
          params: { phone: typeof phone === 'string' ? phone : Array.isArray(phone) ? phone[0] : '' }
        });
      }, 1500);
    } else {
      setError('Please enter complete OTP');
    }
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
    setTimer(16);
    setOtpIndex(prev => (prev + 1) % OTP_LIST.length);
    setResendConfirmVisible(true);
  };

  const handleResendConfirmOk = () => {
    setResendConfirmVisible(false);
    setOtpModalVisible(true);
    setTimeout(() => setOtpModalVisible(false), 5000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ImageBackground
        source={BG_IMG}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, { minHeight: screenHeight }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Verify</Text>
            <Text style={styles.subtitle}>
              Please enter the 4 digit verification code that is sent to you at{' '}
              <Text style={styles.phoneGreen}>+91 {typeof phone === 'string' ? phone : Array.isArray(phone) ? phone[0] : '__________'}</Text>
            </Text>
            <View style={styles.otpInputContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref: TextInput | null) => { inputRefs.current[index] = ref; }}
                  style={[
                    styles.otpInput,
                    digit && styles.otpInputFilled,
                    activeIndex === index && styles.otpInputActive,
                    error && styles.otpInputError
                  ]}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  returnKeyType="done"
                  placeholder={digit ? '' : '0'}
                />
              ))}
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
              <View style={styles.otpFooterRow}>
                {!!error && (
                  <Text style={styles.errorText}>{error}</Text>
                )}
                {error ? (
                  <TouchableOpacity onPress={handleResendOTP}>
                    <Text style={styles.otpResend}>Resend OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <View style={{display:'flex', alignItems:'center', justifyContent:'space-between', flexDirection:'row', width:'100%'}}> 
                     <View></View>
                     <View style={{display:'flex', flexDirection: 'row'}}>
                        <Text style={styles.otpFooterText}>Don't receive code?</Text>
                        {timer > 0 ? (
                          <Text style={styles.otpTimer}>{timer < 10 ? `0${timer}` : timer} Sec</Text>
                        ) : (
                          <TouchableOpacity onPress={handleResendOTP}>
                            <Text style={styles.otpResend}>Resend</Text>
                          </TouchableOpacity>
                        )}
                     </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        {/* Fixed Bottom Button with White Background */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.verifyButton,
              otp.join('').length < 4 && styles.verifyButtonDisabled
            ]}
            onPress={handleVerifyOTP}
            disabled={otp.join('').length < 4 || isLoading}
          >
            <Text style={styles.verifyButtonText}>{isLoading ? 'Verifying...' : 'Verify'}</Text>
          </TouchableOpacity>
          
          <Text style={styles.whatsappHelp}>
            If you are facing any issues to get the OTP, kindly Whatsapp to{' '}
            <Text style={styles.whatsappNumber}>+91 7403 115 357</Text>
          </Text>
        </View>
        {/* OTP Modal Popup */}
        <Modal
          visible={otpModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setOtpModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Your OTP</Text>
              <Text style={styles.modalValue}>{OTP_LIST[otpIndex]}</Text>
              <TouchableOpacity onPress={() => setOtpModalVisible(false)}>
                <Text style={styles.modalClose}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Resend Confirmation Modal */}
        <Modal
          visible={resendConfirmVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setResendConfirmVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>New OTP</Text>
              <Text style={styles.modalSubtitle}>A new OTP has been sent to your phone</Text>
              <TouchableOpacity onPress={handleResendConfirmOk}>
                <Text style={styles.modalClose}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 120, // Space for fixed bottom button
  },
  contentContainer: {
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 8,
    color: '#272727',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#747474',
    textAlign: 'left',
    marginBottom: 32,
  },
  otpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 32,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: '#D4D4D4',
  },
  otpInputFilled: {
    borderColor: '#4CAF50',
    color: '#333',
  },
  otpInputActive: {
    borderColor: '#4CAF50',
    borderWidth: 2.5,
  },
  otpFooterRow: {
    display:'flex',
    justifyContent:'space-between',
    width:'100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 38,
  },
  otpFooterText: {
    fontSize: 14,
    color: '#888',
    marginRight: 6,
  },
  otpTimer: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
    textAlign:'right',
  },
  otpResend: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  verifyButton: {
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
  verifyButtonDisabled: {
    backgroundColor: '#cccccc',
    elevation: 0,
    shadowOpacity: 0,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  whatsappHelp: {
    fontSize: 12,
    fontWeight: '700',
    color: '#747474',
    textAlign: 'center',
    marginTop: 16,
  },
  whatsappNumber: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  phoneGreen: {
    color: '#4CAF50',
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
    borderRadius: 16,
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
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#222',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  modalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#219653',
    marginBottom: 16,
  },
  modalClose: {
    color: '#219653',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
  },
  otpInputError: {
    borderColor: '#ff5252',
  },
  errorText: {
    color: '#FA3E3E',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 12,
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';

export default function OnboardScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1 && acceptedPrivacy) {
      router.replace('/auth/phone');
    }
  };

  if (currentStep === 0) {
    return (
      <ImageBackground 
        source={require('@/assets/images/onboardbg.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Connect with</Text>
            <Text style={styles.title}>The <Text style={[styles.title, styles.familyText]}>Family</Text></Text>
            <Text style={styles.subtitle}>Join to the number one family app</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Let's start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.privacyContainerheader}>
          <Text style={styles.titlehead}>Privacy & Policy</Text>
          <Text style={styles.subtitlehead}>{`Kindly Please follow our privacy and \n policies`}</Text>
        </View>
        
        <View style={styles.privacyContent}>
          <Text style={styles.privacyText}>
            This privacy policy has been compiled to better serve those who are concerned with how their Personally Identifiable Information (PII) is being used online. PII, as used in Indian privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
          </Text>
          
          <Text style={styles.privacyText}>
            We may use the information we collect from you to personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested. To improve our website in order to better serve you. To allow us to better service you in responding to your customer service requests. To administer a contest, promotion, survey or other site feature.
          </Text>
          
          <Text style={styles.privacyText}>
            To send periodic emails regarding your order or other products and services. <Text style={styles.learnMore}>Learn More</Text>
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => setAcceptedPrivacy(!acceptedPrivacy)}
        >
          <View style={[styles.checkbox, acceptedPrivacy && styles.checkboxChecked]}>
            {acceptedPrivacy && <Check size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxText}>Accept privacy and policy</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <TouchableOpacity 
        style={[styles.button, !acceptedPrivacy && styles.buttonDisabled]} 
        onPress={handleNext}
        disabled={!acceptedPrivacy}
      >
        <Text style={[styles.buttonText, !acceptedPrivacy && styles.buttonTextDisabled]}>
          I Agree
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    textAlign:'left',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  titlehead:{
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  familyText: {
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#747474',
    textAlign: 'left',
  },
  subtitlehead:{
    fontSize: 16,
    fontWeight: '700',
    color: '#747474',
    textAlign: 'center',
  },
  familyCircle: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyMember: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
  },
  privacyContainerheader: {
    alignItems: 'center',
  },
  privacyContent: {
    marginTop: 40,
    marginBottom: 30,
  },
  privacyText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: '#000',
    marginBottom: 16,
    textAlign: 'left',
  },
  learnMore: {
    color: '#1B6E53',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#999',
  },
  onboardBg: {
    width: '100%',
    height: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    padding: 24,
    paddingBottom: 36,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
});
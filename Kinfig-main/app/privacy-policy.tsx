import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function PrivacyPolicyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Privacy & Policy</Text>
        <Text style={styles.subtitle}>Kindly Please follow our privacy and policies</Text>
        
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
          
          <Text style={styles.privacyText}>
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
          </Text>
          
          <Text style={styles.privacyText}>
            We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential.
          </Text>
          
          <Text style={styles.privacyText}>
            After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be stored on our servers.
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#747474',
    textAlign: 'center',
    marginBottom: 30,
  },
  privacyContent: {
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
}); 
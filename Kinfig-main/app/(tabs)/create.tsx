import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Camera, Image as ImageIcon, Video, Smile, Send } from 'lucide-react-native';

export default function CreateScreen() {
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleAddImage = () => {
    // Mock image selection
    const mockImages = [
      'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    ];
    setSelectedImages(mockImages);
  };

  const handlePost = () => {
    // Handle post creation
    console.log('Creating post with content:', content);
    setContent('');
    setSelectedImages([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Moment</Text>
        <TouchableOpacity 
          style={[styles.postButton, !content.trim() && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={!content.trim()}
        >
          <Send size={20} color={content.trim() ? '#fff' : '#999'} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }}
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Sophia Jacob</Text>
            <Text style={styles.userFamily}>Thalireeth Family</Text>
          </View>
        </View>
        
        {/* Content Input */}
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.contentInput}
            placeholder="Share what's happening with your family..."
          value={content}
          onChangeText={setContent}
          multiline
            numberOfLines={6}
          textAlignVertical="top"
            placeholderTextColor="#999"
        />
        </View>
        
        {/* Image Preview */}
        {selectedImages.length > 0 && (
          <View style={styles.imagePreviewContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedImages.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.previewImage} />
            ))}
          </ScrollView>
          </View>
        )}
        
        {/* Media Options */}
        <View style={styles.mediaOptions}>
          <TouchableOpacity style={styles.mediaOption} onPress={handleAddImage}>
            <View style={[styles.mediaIcon, { backgroundColor: '#E8F5E8' }]}>
              <ImageIcon size={20} color="#4CAF50" />
            </View>
            <Text style={styles.mediaOptionText}>Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaOption}>
            <View style={[styles.mediaIcon, { backgroundColor: '#E3F2FD' }]}>
              <Video size={20} color="#2196F3" />
            </View>
            <Text style={styles.mediaOptionText}>Video</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaOption}>
            <View style={[styles.mediaIcon, { backgroundColor: '#FFF3E0' }]}>
              <Camera size={20} color="#FF9800" />
            </View>
            <Text style={styles.mediaOptionText}>Camera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaOption}>
            <View style={[styles.mediaIcon, { backgroundColor: '#FCE4EC' }]}>
              <Smile size={20} color="#E91E63" />
            </View>
            <Text style={styles.mediaOptionText}>Feeling</Text>
          </TouchableOpacity>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  postButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  userFamily: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    minHeight: 120,
    padding: 0,
  },
  imagePreviewContainer: {
    marginBottom: 20,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  mediaOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  mediaOption: {
    alignItems: 'center',
    padding: 8,
  },
  mediaIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mediaOptionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});
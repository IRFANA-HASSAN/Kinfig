import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, Modal, TextInput, Alert, Platform, Dimensions, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import { useAuth } from '@/contexts/AuthContext';
// Removed unused import to fix warning
import { Menu, Edit, Settings, LogOut, X, Play, ArrowLeft, MoreVertical, Heart, MessageCircle, Menu as HamburgerMenu } from 'lucide-react-native';
import { router } from 'expo-router';
import { SvgXml } from 'react-native-svg';

const accountManagementSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 9.99984C12.3012 9.99984 14.1667 8.13436 14.1667 5.83317C14.1667 3.53198 12.3012 1.6665 10 1.6665C7.69882 1.6665 5.83334 3.53198 5.83334 5.83317C5.83334 8.13436 7.69882 9.99984 10 9.99984Z" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.0083 13.1167L13.0583 16.0667C12.9416 16.1834 12.8333 16.4 12.8083 16.5584L12.65 17.6833C12.5916 18.0917 12.875 18.375 13.2833 18.3167L14.4083 18.1583C14.5666 18.1333 14.7917 18.025 14.9 17.9084L17.85 14.9584C18.3583 14.45 18.6 13.8583 17.85 13.1083C17.1083 12.3667 16.5167 12.6083 16.0083 13.1167Z" stroke="#0A0A0A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.5833 13.5415C15.8333 14.4415 16.5333 15.1415 17.4333 15.3915" stroke="#0A0A0A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.84164 18.3333C2.84164 15.1083 6.05 12.5 10 12.5C10.8667 12.5 11.7 12.625 12.475 12.8583" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const archiveTickSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0167 1.6665H5.98333C4.20833 1.6665 2.76666 3.1165 2.76666 4.88317V16.6248C2.76666 18.1248 3.84166 18.7582 5.15833 18.0332L9.225 15.7748C9.65833 15.5332 10.3583 15.5332 10.7833 15.7748L14.85 18.0332C16.1667 18.7665 17.2417 18.1332 17.2417 16.6248V4.88317C17.2333 3.1165 15.7917 1.6665 14.0167 1.6665Z" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99167 9.16683L9.24167 10.4168L12.575 7.0835" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const logoutSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.41667 6.3002C7.67501 3.3002 9.21667 2.0752 12.5917 2.0752H12.7C16.425 2.0752 17.9167 3.56686 17.9167 7.29186V12.7252C17.9167 16.4502 16.425 17.9419 12.7 17.9419H12.5917C9.24167 17.9419 7.70001 16.7335 7.42501 13.7835" stroke="#E02B1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5 10H3.01666" stroke="#E02B1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.87499 7.2085L2.08333 10.0002L4.87499 12.7918" stroke="#E02B1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const editSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.16666 1.6665H7.49999C3.33332 1.6665 1.66666 3.33317 1.66666 7.49984V12.4998C1.66666 16.6665 3.33332 18.3332 7.49999 18.3332H12.5C16.6667 18.3332 18.3333 16.6665 18.3333 12.4998V10.8332" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.3667 2.51688L6.79999 9.08354C6.54999 9.33354 6.29999 9.82521 6.24999 10.1835L5.89166 12.6919C5.75832 13.6002 6.39999 14.2335 7.30832 14.1085L9.81666 13.7502C10.1667 13.7002 10.6583 13.4502 10.9167 13.2002L17.4833 6.63354C18.6167 5.50021 19.15 4.18354 17.4833 2.51688C15.8167 0.850211 14.5 1.38354 13.3667 2.51688Z" stroke="#0A0A0A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.425 3.4585C12.9833 5.45016 14.5417 7.0085 16.5417 7.57516" stroke="#0A0A0A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Custom SVG Icons
const playButtonSvg = `<svg width="136" height="140" viewBox="0 0 136 140" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_302_1352)"><path d="M80.4266 61.4181C83.8578 63.4551 83.8578 68.5478 80.4266 70.5848L60.7201 82.2845C57.2889 84.3216 53 81.7753 53 77.7011L53 54.3018C53 50.2277 57.2889 47.6814 60.7201 49.7184L80.4266 61.4181Z" fill="white"/></g><defs><filter id="filter0_d_302_1352" x="0" y="0.00146484" width="136" height="140" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="26.5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_302_1352"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_302_1352" result="shape"/></filter></defs></svg>`;

const toggleButtonSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.9999 3.48011C21.9999 2.66358 21.3244 1.99988 20.4933 1.99988H3.49996C2.66775 1.99988 1.99219 2.66358 1.99219 3.48011C1.99219 4.29774 2.66775 4.96144 3.49996 4.96144H20.4933C21.3244 4.96144 21.9999 4.29774 21.9999 3.48011ZM10.0832 18.9999H3.50773C2.67551 18.9999 1.99996 19.6636 1.99996 20.4812C1.99996 21.2977 2.67551 21.9625 3.50773 21.9625H10.0832C10.9155 21.9625 11.591 21.2977 11.591 20.4812C11.591 19.6636 10.9155 18.9999 10.0832 18.9999ZM20.4933 9.99988C21.3244 9.99988 21.9999 10.6636 21.9999 11.4801C21.9999 12.2977 21.3244 12.9614 20.4933 12.9614H3.49996C2.66774 12.9614 1.99219 12.2977 1.99219 11.4801C1.99219 10.6636 2.66774 9.99988 3.49996 9.99988H20.4933Z" fill="#333335"/></svg>`;

const arrowLeftSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2541 4.24106C16.5522 4.53326 16.5793 4.99051 16.3354 5.31272L16.2541 5.40503L9.52658 12L16.2541 18.595C16.5522 18.8872 16.5793 19.3444 16.3354 19.6666L16.2541 19.7589C15.956 20.0511 15.4896 20.0777 15.161 19.8386L15.0668 19.7589L7.7459 12.582C7.44784 12.2898 7.42074 11.8325 7.66461 11.5103L7.7459 11.418L15.0668 4.24106C15.3947 3.91965 15.9262 3.91965 16.2541 4.24106Z" fill="#333335"/>
</svg>`;

const iconlySvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.9391 3.39039C15.6523 2.54628 14.9075 2 14.0639 2H9.93592L9.779 2.00633C8.9492 2.07349 8.24111 2.66897 8.02304 3.50533L7.77543 4.76813L7.74642 4.87929C7.62785 5.23928 7.29636 5.48913 6.91772 5.48913H3.73139L3.63214 5.49598C3.27515 5.54564 3 5.85945 3 6.23916C3 6.65338 3.32745 6.98918 3.73139 6.98918L6.91772 6.98918H17.0821L20.2686 6.98918L20.3679 6.98234C20.7248 6.93267 21 6.61887 21 6.23916C21 5.82493 20.6725 5.48913 20.2686 5.48913H17.0821L16.9701 5.48177C16.6025 5.4332 16.2987 5.14872 16.2243 4.76783L15.9874 3.55209L15.9391 3.39039ZM14.9143 5.48913C14.881 5.40445 14.8522 5.31721 14.8282 5.22768L14.79 5.06208L14.5636 3.8928C14.5107 3.68991 14.3473 3.54138 14.1502 3.50742L14.0639 3.50006H9.93592C9.73071 3.50006 9.54829 3.62322 9.47252 3.77803L9.44682 3.84604L9.20979 5.06238C9.18087 5.21048 9.13899 5.35311 9.08551 5.48913H14.9143ZM18.9784 8.72017C19.3475 8.75069 19.6304 9.05716 19.65 9.42605L19.6405 9.63174L19.326 13.483L18.9961 17.2414C18.9263 17.9917 18.8638 18.6245 18.8099 19.1227C18.6225 20.8588 17.4955 21.9323 15.7966 21.9641C13.1494 22.013 10.6048 22.0125 8.13373 21.9591C6.48398 21.9244 5.37366 20.8393 5.18955 19.1297L5.0623 17.8702L4.83994 15.427L4.61216 12.7461L4.35172 9.52788C4.31935 9.11498 4.61951 8.75335 5.02215 8.72016C5.39123 8.68973 5.7183 8.94584 5.79519 9.30677L5.82511 9.60173L6.06966 12.6187L6.33669 15.7459C6.45646 17.0996 6.56034 18.1952 6.64346 18.9648C6.74838 19.939 7.26138 20.4404 8.16411 20.4593C10.6158 20.5124 13.1415 20.5129 15.7701 20.4643C16.7277 20.4464 17.2488 19.9499 17.356 18.9574L17.4827 17.7046C17.5198 17.3185 17.5594 16.8923 17.6013 16.4293L17.8686 13.3538L18.1906 9.4075C18.2204 9.02902 18.5192 8.7389 18.8789 8.71882L18.9784 8.72017Z" fill="#E02B1D"/></svg>`;

const sendSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.7046 2.59154C20.0162 1.18588 18.709 -0.0825198 17.2937 0.327077L1.63713 4.88281L1.48604 4.93304C0.0164524 5.48611 -0.20903 7.53286 1.16744 8.38023L7.64297 12.3661L11.5387 18.8202L11.6263 18.9534C12.5395 20.2329 14.5618 19.923 15.0228 18.372L19.668 2.73251L19.7046 2.59154ZM17.7846 1.75323C18.0734 1.72222 18.3202 2.00312 18.2303 2.30473L13.585 17.9448L13.5545 18.0214C13.4093 18.3069 12.9985 18.336 12.823 18.0451L9.13497 11.9361L14.3875 6.64975L14.4598 6.56539C14.6767 6.27106 14.6511 5.85447 14.3839 5.5891L14.2996 5.51676C14.0052 5.29988 13.5887 5.32548 13.3233 5.59263L8.07797 10.8721L1.95374 7.10284L1.88762 7.05318C1.64978 6.83652 1.72984 6.41781 2.05573 6.32322L17.7117 1.76765L17.7846 1.75323Z" fill="#333335"/></svg>`;

// Helper function to get custom icons
const getCustomIcon = (iconName: string) => {
  const icons = {
    play: playButtonSvg,
    toggle: toggleButtonSvg,
    arrowLeft: arrowLeftSvg,
    edit: editSvg,
    iconly: iconlySvg,
    send: sendSvg,
  };
  return icons[iconName as keyof typeof icons];
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProfileScreen() {
  const { user, logout, updateUser } = useAuth();
  
  // Create dynamic family members with current user's profile photo
  const familyMembers = [
    { id: 1, name: user?.name || 'Sophia Jacob', relation: 'Self', image: user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
    { id: 2, name: 'John Jacob', relation: 'Father', image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
    { id: 3, name: 'Mary Jacob', relation: 'Mother', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  ];
  const [showMenu, setShowMenu] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [postMedia, setPostMedia] = useState<any>(null);
  const [postDescription, setPostDescription] = useState('');
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<any[]>([]);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedPostForAction, setSelectedPostForAction] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedPostForComment, setSelectedPostForComment] = useState<any>(null);
  const [comments, setComments] = useState<{[postId: string]: Array<{id: string, text: string, user: string, timestamp: number}>}>({});
  const [showAccountManagement, setShowAccountManagement] = useState(false);
  
  // Use actual user data from profile setup
  const userName = user?.name || 'Sophia Jacob';
  const userAvatar = user?.avatar || familyMembers[0].image;
  const userFamily = user?.family || 'Thalirath Family, Kattappana, Idukki';
  const userId = user?.id || '1';

  const handleEditProfile = () => {
    setShowMenu(false);
    try {
      router.push('/profile/edit');
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Could not navigate to edit profile');
    }
  };

  const handleLogout = () => {
    setShowMenu(false);
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => logout() }
      ]
    );
  };

  const handleAccountManagement = () => {
    setShowSettings(false);
    setShowAccountManagement(true);
  };

  const handleDeactiveAccount = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Deactivate', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert(
              'Account Deactivated',
              'Your account has been successfully deactivated.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert(
              'Account Deleted',
              'Your account has been successfully deleted.',
              [
                { 
                  text: 'OK', 
                  onPress: () => {
                    setShowAccountManagement(false);
                    router.replace('/auth/onboard');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    setShowSettings(false);
    router.push('/privacy-policy');
  };

  const handlePickMedia = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        allowsMultipleSelection: true,
        selectionLimit: 10,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedMedia(prev => [...prev, ...result.assets]);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick media');
    }
  };

  const handleChangeProfilePhoto = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to change profile photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Update the user's avatar in the context
        const newAvatar = result.assets[0].uri;
        updateUser({ avatar: newAvatar });
        Alert.alert('Success', 'Profile photo updated successfully!');
      }
    } catch (error) {
      console.error('Profile photo picker error:', error);
      Alert.alert('Error', 'Failed to change profile photo');
    }
  };

  const handlePost = () => {
    if (selectedMedia.length === 0 && !postDescription.trim()) {
      Alert.alert('Error', 'Please add an image/video or description');
      return;
    }

    // Create new post
    const newPost = {
      id: Date.now().toString(),
      userId: userId,
      media: selectedMedia,
      description: postDescription,
      timestamp: Date.now(),
      type: selectedMedia.length > 0 ? (selectedMedia.some(m => m.type === 'video') ? 'mixed' : 'image') : 'text',
      likes: 0,
      comments: 0,
      isLiked: false
    };

    // Add to user posts
    setUserPosts(prev => [newPost, ...prev]);
    
    // Reset modal state
    setShowPostModal(false);
    setSelectedMedia([]);
    setPostDescription('');
    
    Alert.alert('Success', 'Post uploaded successfully!');
  };

  const handlePostPress = (post: any) => {
    setShowPostDetail(true);
  };

  const handleLike = (postId: string) => {
    setUserPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    Alert.alert('Comment', 'Comment feature coming soon!');
  };

  const handleReport = (postId: string) => {
    Alert.alert(
      'Report Post',
      'Are you sure you want to report this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', style: 'destructive', onPress: () => {
          Alert.alert('Reported', 'Post has been reported successfully.');
        }}
      ]
    );
  };

  const handleRemoveMedia = (index: number) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handlePostAction = (post: any) => {
    setSelectedPostForAction(post);
    setShowActionSheet(true);
  };

  const handleEditPost = () => {
    if (selectedPostForAction) {
      setEditDescription(selectedPostForAction.description || '');
      setShowEditModal(true);
    }
    setShowActionSheet(false);
  };

  const handleSaveEdit = () => {
    if (selectedPostForAction) {
      setUserPosts(prev => prev.map(post => {
        if (post.id === selectedPostForAction.id) {
          return {
            ...post,
            description: editDescription
          };
        }
        return post;
      }));
      Alert.alert('Success', 'Post updated successfully!');
    }
    setShowEditModal(false);
    setEditDescription('');
  };

  const handleCommentPress = (post: any) => {
    setSelectedPostForComment(post);
    setShowCommentModal(true);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      if (selectedPostForComment) {
        const newComment = {
          id: Date.now().toString(),
          text: commentText,
          user: userName,
          timestamp: Date.now(),
        };
        setComments(prev => ({
          ...prev,
          [selectedPostForComment.id]: [...(prev[selectedPostForComment.id] || []), newComment]
        }));
        setUserPosts(prev => prev.map(post => {
          if (post.id === selectedPostForComment.id) {
            return {
              ...post,
              comments: (post.comments || 0) + 1
            };
          }
          return post;
        }));
        Alert.alert('Success', 'Comment added successfully!');
      }
      setShowCommentModal(false);
      setCommentText('');
    } else {
      Alert.alert('Error', 'Please enter a comment');
    }
  };

  const handleSharePost = () => {
    Alert.alert('Share Post', 'Share post feature coming soon!');
    setShowActionSheet(false);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeletePost = () => {
    setShowActionSheet(false);
    setShowDeleteModal(true);
  };

  const confirmDeletePost = () => {
    if (selectedPostForAction) {
      setUserPosts(prev => prev.filter(post => post.id !== selectedPostForAction.id));
      Alert.alert('Success', 'Post deleted successfully!');
    }
    setShowDeleteModal(false);
  };



  // Loading state
  if (!user && !userName) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Background image with zIndex 1 */}
      <Image
        source={require('@/assets/images/profilesbg.png')}
        style={styles.profileBg}
        resizeMode="cover"
      />
      {/* All content with zIndex 100 */}
      <View style={{ flex: 1, zIndex: 100 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{userName}</Text>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <SvgXml xml={toggleButtonSvg} width={24} height={24} style={{ transform: [{ scaleX: -1 }] }} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: userAvatar }} 
                style={styles.avatar}
                onError={() => console.log('Failed to load avatar')}
              />
              <TouchableOpacity style={styles.cameraButton} onPress={handleChangeProfilePhoto}>
                <Text style={styles.plusIcon}>+</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.family}>
              <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>Thalirath Family</Text>, Kattappana, Idukki
            </Text>
            

            
            <TouchableOpacity style={styles.familyMembers} onPress={() => setShowMembers(true)}>
              {familyMembers.slice(0, 3).map((member) => (
                <View key={member.id} style={styles.memberContainer}>
                  <Image source={{ uri: member.image }} style={styles.memberAvatar} />
                </View>
              ))}
              <Text style={styles.houseLabel}>{`House\nMembers`}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
          {userPosts.length === 0 ? (
            <View style={styles.emptyState}>
              <Image 
                source={require('@/assets/images/nopost.png')} 
                style={styles.emptyStateImage}
                resizeMode="contain"
              />
              <Text style={styles.emptyTitle}>There is no Post</Text>
              <Text style={styles.emptySubtitle}>
                Maybe bigfoot has broken this page.{"\n"}Come back to the homepage
              </Text>
              <TouchableOpacity style={styles.postNowButton} onPress={() => setShowPostModal(true)}>
                <Text style={styles.postNowText}>Post Now</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.postsSection}>
              <View style={styles.postsGrid}>
                {userPosts.map((post, index) => (
                  <TouchableOpacity 
                    key={post.id} 
                    style={styles.gridItem} 
                    onPress={() => handlePostPress(post)}
                  >
                    <View style={styles.thumbnailContainer}>
                      <Image 
                        source={{ uri: post.media?.[0]?.uri || post.images?.[0] || 'https://via.placeholder.com/150' }} 
                        style={styles.gridImage}
                        onError={() => console.log('Failed to load image:', post.media?.[0]?.uri)}
                      />
                      {(post.type === 'video' || post.type === 'mixed') && (
                        <View style={styles.playButtonOverlay}>
                          <SvgXml xml={playButtonSvg} width={100} height={100} />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.newPostButton} onPress={() => setShowPostModal(true)}>
                <Text style={styles.newPostButtonText}>New Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Post Detail Modal */}
        <Modal visible={showPostDetail} animationType="slide" transparent>
          <View style={styles.postDetailModal}>
            <View style={styles.postDetailHeader}>
                              <TouchableOpacity onPress={() => setShowPostDetail(false)}>
                  <SvgXml xml={arrowLeftSvg} width={24} height={24} />
                </TouchableOpacity>
              <Text style={styles.postDetailTitle}>Posts</Text>
              <TouchableOpacity>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.postDetailScrollView} showsVerticalScrollIndicator={false}>
              {userPosts.map((post, index) => (
                <View key={post.id} style={styles.postFeedItem}>
                  {/* Post Header */}
                  <View style={styles.postFeedHeader}>
                    <Image source={{ uri: userAvatar }} style={styles.postFeedAvatar} />
                    <View style={styles.postFeedUserInfo}>
                      <Text style={styles.postFeedUserName}>{userName}</Text>
                      <Text style={styles.postFeedUserFamily}>{userFamily}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handlePostAction(post)}>
                      <MoreVertical size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  
                  {/* Post Media */}
                  <View style={styles.postFeedMedia}>
                    {post.type === 'video' ? (
                      <View style={styles.videoContainer}>
                        <Video
                          source={{ uri: post.media[0].uri }}
                          style={styles.postFeedVideo}
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                          shouldPlay={false}
                          isLooping={false}
                        />
                        <View style={styles.playButtonOverlay}>
                          <SvgXml xml={playButtonSvg} width={100} height={100} />
                        </View>
                      </View>
                    ) : post.type === 'mixed' ? (
                      <View style={styles.mixedMediaContainer}>
                        <FlatList
                          data={post.media}
                          renderItem={({ item, index }) => (
                            <View style={styles.mixedMediaItem}>
                              {item.type === 'video' ? (
                                <View style={styles.videoContainer}>
                                  <Video
                                    source={{ uri: item.uri }}
                                    style={styles.postFeedVideo}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    shouldPlay={false}
                                    isLooping={false}
                                  />
                                  <View style={styles.playButtonOverlay}>
                                    <SvgXml xml={playButtonSvg} width={100} height={100} />
                                  </View>
                                </View>
                              ) : (
                                <Image 
                                  source={{ uri: item.uri }} 
                                  style={styles.postFeedImage}
                                  resizeMode="cover"
                                />
                              )}
                            </View>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          pagingEnabled
                        />
                      </View>
                    ) : (
                      <Image 
                        source={{ uri: post.media[0]?.uri || post.images?.[0] }} 
                        style={styles.postFeedImage}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  
                  {/* Post Engagement */}
                  <View style={styles.postFeedEngagement}>
                    <View style={styles.engagementLeft}>
                      <TouchableOpacity 
                        style={styles.engagementItem}
                        onPress={() => handleLike(post.id)}
                      >
                        <Heart size={20} color={post.isLiked ? '#E53E3E' : '#666'} />
                        <Text style={styles.engagementText}>{post.likes || 0}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.engagementItem}
                        onPress={() => handleCommentPress(post)}
                      >
                        <MessageCircle size={20} color="#666" />
                        <Text style={styles.engagementText}>{post.comments || 0}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* Post Caption */}
                  <View style={styles.postFeedCaption}>
                    <Text style={styles.captionText}>
                      {post.description}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>

        {/* Menu Overlay */}
        {showMenu && (
          <TouchableOpacity 
            style={styles.menuOverlay} 
            activeOpacity={1}
            onPress={() => setShowMenu(false)}
          >
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
                <Edit size={20} color="#333" />
                <Text style={styles.menuText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => { 
                  setShowSettings(true); 
                  setShowMenu(false); 
                }}
              >
                <Settings size={20} color="#333" />
                <Text style={styles.menuText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <LogOut size={20} color="#E53E3E" />
                <Text style={[styles.menuText, { color: '#E53E3E' }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        {/* House Members Modal */}
        <Modal visible={showMembers} animationType="slide" transparent>
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowMembers(false)}
          >
            <View style={styles.membersModal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>House Members</Text>
                <TouchableOpacity onPress={() => setShowMembers(false)}>
                  <X size={24} color="#333" />
                </TouchableOpacity>
              </View>
              {familyMembers.map((member) => (
                <View key={member.id} style={styles.memberRow}>
                  <Image source={{ uri: member.image }} style={styles.memberAvatarLarge} />
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberNameLarge}>{member.name}</Text>
                    <Text style={styles.memberRelation}>{member.relation}</Text>
                  </View>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Settings Modal */}
        <Modal visible={showSettings} animationType="slide" transparent>
          <View style={styles.settingsModal}>
            <View style={styles.settingsHeader}>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <SvgXml xml={arrowLeftSvg} width={24} height={24} />
              </TouchableOpacity>
              <Text style={styles.settingsTitle}>Settings</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <View style={styles.settingsContent}>
              <TouchableOpacity style={styles.settingsItem} onPress={handleEditProfile}>
                <View style={styles.settingsItemLeft}>
                  <SvgXml xml={editSvg} width={20} height={20} />
                  <Text style={styles.settingsItemText}>Edit Profile</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingsItem} onPress={handleAccountManagement}>
                <View style={styles.settingsItemLeft}>
                  <SvgXml xml={accountManagementSvg} width={20} height={20} />
                  <Text style={styles.settingsItemText}>Account Management</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingsItem} onPress={handlePrivacyPolicy}>
                <View style={styles.settingsItemLeft}>
                  <SvgXml xml={archiveTickSvg} width={20} height={20} />
                  <Text style={styles.settingsItemText}>Privacy Policy</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingsFooter}>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <SvgXml xml={logoutSvg} width={20} height={20} />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Account Management Modal */}
        <Modal visible={showAccountManagement} animationType="slide" transparent>
          <View style={styles.accountManagementModal}>
            <View style={styles.accountManagementHeader}>
              <TouchableOpacity onPress={() => setShowAccountManagement(false)}>
                <SvgXml xml={arrowLeftSvg} width={24} height={24} />
              </TouchableOpacity>
              <Text style={styles.accountManagementTitle}>Account Management</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <View style={styles.accountManagementContent}>
              <Text style={styles.accountManagementDescription}>
                Make changes to phone number and account type. This information is private and won't show up in your public profile.
              </Text>
              
              <TouchableOpacity style={styles.accountManagementItem} onPress={handleDeactiveAccount}>
                <Text style={styles.accountManagementItemText}>Deactive Account</Text>
                <SvgXml xml={arrowLeftSvg} width={20} height={20} style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.accountManagementItem} onPress={handleDeleteAccount}>
                <Text style={styles.accountManagementItemText}>Delete Account</Text>
                <SvgXml xml={arrowLeftSvg} width={20} height={20} style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Post Modal */}
        <Modal visible={showPostModal} animationType="slide" transparent>
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowPostModal(false)}
          >
            <View style={styles.postModal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Create Post</Text>
                <TouchableOpacity onPress={() => setShowPostModal(false)}>
                  <X size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.mediaPicker} onPress={handlePickMedia}>
                <Text style={styles.mediaPickerText}>Pick Multiple Images/Videos</Text>
              </TouchableOpacity>
              
              {selectedMedia.length > 0 && (
                <View style={styles.selectedMediaContainer}>
                  <Text style={styles.selectedMediaTitle}>Selected Media ({selectedMedia.length})</Text>
                  <FlatList
                    data={selectedMedia}
                    renderItem={({ item, index }) => (
                      <View style={styles.mediaItemContainer}>
                        <Image source={{ uri: item.uri }} style={styles.previewMedia} />
                        <TouchableOpacity 
                          style={styles.removeMediaButton}
                          onPress={() => handleRemoveMedia(index)}
                        >
                          <X size={16} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.previewMediaContainer}
                  />
                </View>
              )}
              
              <TextInput
                style={styles.input}
                placeholder="Write a description..."
                value={postDescription}
                onChangeText={setPostDescription}
                multiline
                textAlignVertical="top"
              />
              
              <TouchableOpacity style={styles.postNowButton} onPress={handlePost}>
                <Text style={styles.postNowText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Action Sheet Modal */}
        <Modal visible={showActionSheet} animationType="slide" transparent>
          <TouchableOpacity 
            style={styles.actionSheetOverlay}
            activeOpacity={1}
            onPress={() => setShowActionSheet(false)}
          >
            <View style={{backgroundColor: '#fff', borderRadius: 16, padding: 16, width: '100%', maxWidth: '100%'}}>
              <View style={{backgroundColor: '#F6F6F6', borderRadius: 16, padding: 16, width: '90%', maxWidth: '90%', alignSelf: 'center'}}>
                <View style={styles.actionSheet}>
                  <View style={styles.actionSheetHandle} />
                    <TouchableOpacity style={styles.actionSheetItem} onPress={handleEditPost}>
                      <View style={styles.actionSheetItemContent}>
                        <SvgXml xml={editSvg} width={18} height={18} style={{marginRight: 10}}/>
                        <Text style={styles.actionSheetText}>Edit Post</Text>
                      </View>
                    </TouchableOpacity>


                  <View style={styles.actionSheetDivider} />
                    <TouchableOpacity style={styles.actionSheetItem} onPress={handleSharePost}>
                      <View style={styles.actionSheetItemContent}>
                      <SvgXml xml={sendSvg} width={18} height={18} />
                      <Text style={styles.actionSheetText}>Share Post</Text>
                      </View>
                    </TouchableOpacity>


                  <View style={styles.actionSheetDivider} />
                    <TouchableOpacity style={styles.actionSheetItem} onPress={handleDeletePost}>
                      <View style={styles.actionSheetItemContent}>
                        <SvgXml xml={iconlySvg} width={18} height={18} />
                        <Text style={[styles.actionSheetText, styles.deleteText]}>Delete Post</Text>
                      </View>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Edit Post Modal */}
        <Modal visible={showEditModal} animationType="slide" transparent>
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowEditModal(false)}
          >
            <View style={styles.editModal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Post</Text>
                <TouchableOpacity onPress={() => setShowEditModal(false)}>
                  <X size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <TextInput
                style={styles.editInput}
                placeholder="Edit your post description..."
                value={editDescription}
                onChangeText={setEditDescription}
                multiline
                textAlignVertical="top"
              />
              
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Comment Modal */}
        <Modal visible={showCommentModal} animationType="slide" transparent>
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowCommentModal(false)}
          >
            <View style={styles.commentModal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Comments</Text>
                <TouchableOpacity onPress={() => setShowCommentModal(false)}>
                  <X size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
                {selectedPostForComment && comments[selectedPostForComment.id] && comments[selectedPostForComment.id].length > 0 ? (
                  comments[selectedPostForComment.id].map((comment) => (
                    <View key={comment.id} style={styles.commentItem}>
                      <Text style={styles.commentUser}>{comment.user}</Text>
                      <Text style={styles.commentText}>{comment.text}</Text>
                      <Text style={styles.commentTimestamp}>
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.noComments}>
                    <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
                  </View>
                )}
              </ScrollView>

              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                  textAlignVertical="top"
                />
                
                <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
                  <Text style={styles.commentButtonText}>Add Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Delete Post Modal */}
        <Modal visible={showDeleteModal} animationType="fade" transparent>
          <TouchableOpacity 
            style={styles.deleteModalOverlay}
            activeOpacity={1}
            onPress={() => setShowDeleteModal(false)}
          >
            <View style={styles.deleteModal}>
              <Text style={styles.deleteModalTitle}>Are you sure to delete your post?</Text>
              
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={confirmDeletePost}
              >
                <Text style={styles.deleteButtonText}>Delete now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  family: {
    fontSize: 14,
    fontWeight: '700',
    color: '#979797',
    marginBottom: 20,
    textAlign: 'center',
  },
  familyMembers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  memberContainer: {
    alignItems: 'center',
    marginHorizontal: -3,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 4,
  },
  houseLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#747474',
    textAlign: 'center',
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  emptyStateImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  postNowButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 25,
  },
  postNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postsSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (SCREEN_WIDTH - 48) / 3 - 4,
    aspectRatio: 1,
    marginBottom: 4,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  newPostButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  newPostButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postDetailModal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  postDetailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  postDetailScrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  postFeedItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  postFeedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postFeedAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  postFeedUserInfo: {
    flex: 1,
    marginRight: 10,
  },
  postFeedUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  postFeedUserFamily: {
    fontSize: 12,
    color: '#666',
  },
  postFeedMedia: {
    width: '100%',
    aspectRatio: 4/3,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  postFeedVideo: {
    width: '100%',
    height: '100%',
  },
  postFeedImage: {
    width: '100%',
    height: '100%',
  },
  postFeedEngagement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  engagementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  engagementText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  postFeedCaption: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  captionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  captionBold: {
    fontWeight: '600',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    paddingRight: 24,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  membersModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    maxWidth: '90%',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  memberAvatarLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  memberInfo: {
    marginLeft: 12,
  },
  memberNameLarge: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  memberRelation: {
    color: '#4CAF50',
    fontSize: 14,
  },
  settingsModal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#272727',
  },
  settingsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    gap: 10,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    gap: 10,
  },
  settingsItemText: {
    fontSize: 16,
    color: '#272727',
    fontWeight: 700,
  },
  settingsFooter: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E02B1D',
    marginLeft: 10,
  },
  accountManagementModal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accountManagementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  accountManagementTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#272727',
  },
  accountManagementContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  accountManagementDescription: {
    fontSize: 14,
    fontWeight: 700,
    color: '#747474',
    lineHeight: 20,
    marginBottom: 30,
  },
  accountManagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  accountManagementItemText: {
    fontSize: 16,
    color: '#272727',
    fontWeight: '700',
  },
  postModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    maxWidth: '90%',
  },
  mediaPicker: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  mediaPickerText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  previewMedia: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginRight: 10,
  },
  previewMediaContainer: {
    paddingHorizontal: 10,
  },
  selectedMediaContainer: {
    marginBottom: 16,
  },
  selectedMediaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 10,
  },
  mediaItemContainer: {
    position: 'relative',
  },
  removeMediaButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mixedMediaContainer: {
    width: '100%',
    aspectRatio: 4/3,
  },
  mixedMediaItem: {
    width: SCREEN_WIDTH - 32, // Full width minus padding
    aspectRatio: 4/3,
  },
  actionSheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  actionSheet: {
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  actionSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  actionSheetItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'flex-start ',
  },
  actionSheetItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
  },
  actionSheetText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  deleteText: {
    color: '#E53E3E',
  },
  actionSheetDivider: {
    height: 2,
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
  editModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    maxWidth: '90%',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    minHeight: 100,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  commentModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    maxWidth: '90%',
  },
  commentsList: {
    maxHeight: 200, // Limit height for comments list
    marginBottom: 16,
  },
  commentItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  noComments: {
    padding: 20,
    alignItems: 'center',
  },
  noCommentsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  commentInputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    minHeight: 80,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  commentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    minHeight: 60,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  plusIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  deleteModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 280,
    maxWidth: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  deleteModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  deleteButton: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#E53E3E',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F6F6F6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
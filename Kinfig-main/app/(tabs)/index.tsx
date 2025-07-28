{/*index.tsx*/}

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { moments as momentsRaw, posts, users } from '@/data/mockData';
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Plus,
  Trash2,
  Download,
  PlusCircle,
  Send,
  Search
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';

// Custom SVG Icons
const commentSvg = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 15.0188C2.5 8.4339 7.7625 2.5 15.025 2.5C22.125 2.5 27.5 8.32123 27.5 14.9812C27.5 22.7053 21.2 27.5 15 27.5C12.95 27.5 10.675 26.9492 8.85 25.8726C8.2125 25.4845 7.675 25.1965 6.9875 25.4219L4.4625 26.173C3.825 26.3733 3.25 25.8726 3.4375 25.1965L4.275 22.3923C4.4125 22.0043 4.3875 21.5911 4.1875 21.2656C3.1125 19.2877 2.5 17.1219 2.5 15.0188ZM13.375 15.0188C13.375 15.9076 14.0875 16.6212 14.975 16.6337C15.8625 16.6337 16.575 15.9076 16.575 15.0313C16.575 14.1425 15.8625 13.4289 14.975 13.4289C14.1 13.4164 13.375 14.1425 13.375 15.0188ZM19.1375 15.0313C19.1375 15.9076 19.85 16.6337 20.7375 16.6337C21.625 16.6337 22.3375 15.9076 22.3375 15.0313C22.3375 14.1425 21.625 13.4289 20.7375 13.4289C19.85 13.4289 19.1375 14.1425 19.1375 15.0313ZM9.2125 16.6337C8.3375 16.6337 7.6125 15.9076 7.6125 15.0313C7.6125 14.1425 8.325 13.4289 9.2125 13.4289C10.1 13.4289 10.8125 14.1425 10.8125 15.0313C10.8125 15.9076 10.1 16.6212 9.2125 16.6337Z" fill="#ADADAD"/>
</svg>`;

const likeSvg = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.8123 3.12587C20.601 3.12587 21.3885 3.23712 22.1373 3.48837C26.751 4.98837 28.4135 10.0509 27.0248 14.4759C26.2373 16.7371 24.9498 18.8009 23.2635 20.4871C20.8498 22.8246 18.201 24.8996 15.3498 26.6871L15.0373 26.8759L14.7123 26.6746C11.851 24.8996 9.18728 22.8246 6.75103 20.4746C5.07603 18.7884 3.78728 16.7371 2.98728 14.4759C1.57478 10.0509 3.23728 4.98837 7.90103 3.46212C8.26353 3.33712 8.63728 3.24962 9.01228 3.20087H9.16228C9.51353 3.14962 9.86228 3.12587 10.2123 3.12587H10.3498C11.1373 3.14962 11.8998 3.28712 12.6385 3.53837H12.7123C12.7623 3.56212 12.7998 3.58837 12.8248 3.61212C13.101 3.70087 13.3623 3.80087 13.6123 3.93837L14.0873 4.15087C14.2021 4.21209 14.3309 4.30562 14.4422 4.38646C14.5128 4.43768 14.5763 4.4838 14.6248 4.51337C14.6452 4.52541 14.6659 4.53751 14.6868 4.54971C14.794 4.61227 14.9056 4.67745 14.9998 4.74962C16.3885 3.68837 18.0748 3.11337 19.8123 3.12587ZM23.1373 12.1259C23.6498 12.1121 24.0873 11.7009 24.1248 11.1746V11.0259C24.1623 9.27462 23.101 7.68837 21.4873 7.07587C20.9748 6.89962 20.4123 7.17587 20.2248 7.70087C20.0498 8.22587 20.3248 8.80087 20.8498 8.98712C21.651 9.28712 22.1873 10.0759 22.1873 10.9496V10.9884C22.1635 11.2746 22.2498 11.5509 22.4248 11.7634C22.5998 11.9759 22.8623 12.0996 23.1373 12.1259Z" fill="#ADADAD"/>
</svg>`;

const likeColorSvg = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.8123 3.12587C20.601 3.12587 21.3885 3.23712 22.1373 3.48837C26.751 4.98837 28.4135 10.0509 27.0248 14.4759C26.2373 16.7371 24.9498 18.8009 23.2635 20.4871C20.8498 22.8246 18.201 24.8996 15.3498 26.6871L15.0373 26.8759L14.7123 26.6746C11.851 24.8996 9.18728 22.8246 6.75103 20.4746C5.07603 18.7884 3.78728 16.7371 2.98728 14.4759C1.57478 10.0509 3.23728 4.98837 7.90103 3.46212C8.26353 3.33712 8.63728 3.24962 9.01228 3.20087H9.16228C9.51353 3.14962 9.86228 3.12587 10.2123 3.12587H10.3498C11.1373 3.14962 11.8998 3.28712 12.6385 3.53837H12.7123C12.7623 3.56212 12.7998 3.58837 12.8248 3.61212C13.101 3.70087 13.3623 3.80087 13.6123 3.93837L14.0873 4.15087C14.2021 4.21209 14.3309 4.30562 14.4422 4.38646C14.5128 4.43768 14.5763 4.4838 14.6248 4.51337C14.6452 4.52541 14.6659 4.53751 14.6868 4.54971C14.794 4.61227 14.9056 4.67745 14.9998 4.74962C16.3885 3.68837 18.0748 3.11337 19.8123 3.12587ZM23.1373 12.1259C23.6498 12.1121 24.0873 11.7009 24.1248 11.1746V11.0259C24.1623 9.27462 23.101 7.68837 21.4873 7.07587C20.9748 6.89962 20.4123 7.17587 20.2248 7.70087C20.0498 8.22587 20.3248 8.80087 20.8498 8.98712C21.651 9.28712 22.1873 10.0759 22.1873 10.9496V10.9884C22.1635 11.2746 22.2498 11.5509 22.4248 11.7634C22.5998 11.9759 22.8623 12.0996 23.1373 12.1259Z" fill="#f5182b"/>
</svg>`;

const rightArrowSvg = `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.13217 3.1808C5.89621 3.39995 5.87476 3.74288 6.06782 3.98454L6.13217 4.05377L11.4581 9L6.13217 13.9462C5.89621 14.1654 5.87475 14.5083 6.06782 14.75L6.13217 14.8192C6.36813 15.0384 6.73738 15.0583 6.99758 14.879L7.07212 14.8192L12.8678 9.43649C13.1038 9.21734 13.1252 8.8744 12.9322 8.63275L12.8678 8.56352L7.07212 3.1808C6.81256 2.93973 6.39173 2.93973 6.13217 3.1808Z" fill="#272727"/>
</svg>`;

const DEFAULT_AVATAR = require('@/assets/images/onbard1.jpg');
const DUMMY_STORY_IMG = require('@/assets/images/onbard1.jpg');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STORY_DURATION = 5000; // 5 seconds per story
const PROGRESS_INTERVAL = 50;

interface Story {
  id: string;
  image: string;
  time: string;
  timestamp: number;
}

interface Comment {
  id: string;
  userId: string;
  text: string;
  time: string;
  replies?: Comment[]; // Added for replies
}

interface User {
  id: string;
  name: string;
  avatar: string;
  family?: string;
}

interface StoryUser extends User {
  stories: Story[];
  isSelf: boolean;
}

export default function HomeScreen() {
  const { user } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  // Fix useEffect syntax
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && user === null) {
      router.replace('/auth/splash');
    }
  }, [user, hasMounted]);

  if (user === null) {
    return null;
  }
  
  // State management
  const [viewedMoments, setViewedMoments] = useState<string[]>(['1', '4']);
  const [yourStories, setYourStories] = useState<Story[]>([]);
  const [likedStories, setLikedStories] = useState<{ [key: string]: boolean }>({});
  const [storyComments, setStoryComments] = useState<{ [key: string]: Comment[] }>({});
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [postComments, setPostComments] = useState<{ [key: string]: any[] }>(() => {
    // Initialize from posts' comments (must be array)
    const map: { [key: string]: any[] } = {};
    posts.forEach(post => {
      map[post.id] = Array.isArray(post.comments) ? post.comments : [];
    });
    return map;
  });
  
  // Modal states
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  // Story navigation states
  const [currentStoryUser, setCurrentStoryUser] = useState<StoryUser | null>(null);
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);
  const [storyUserIndex, setStoryUserIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const storyTimeout = useRef<NodeJS.Timeout | null>(null);
  const commentInputRef = useRef<TextInput>(null);

  // Add at the top, after other useState hooks in HomeScreen
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [reportModal, setReportModal] = useState<{ visible: boolean, user?: any }>({ visible: false, user: null });
  const [imageIndexes, setImageIndexes] = useState<{ [key: string]: number }>({});
  const [expandedPosts, setExpandedPosts] = useState<{ [key: string]: boolean }>({});
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [viewingRepliesFor, setViewingRepliesFor] = useState<string | null>(null);

  // Helper to get type property safely
  function getMomentType(moment: any) {
    return typeof moment.type === 'string' ? moment.type : undefined;
  }
  // Build moments data with "Your moment" as first item, then unviewed, then viewed
  const sortedMoments = momentsRaw
    .map(moment => ({
      ...moment,
      stories: Array.isArray((moment as any).stories)
        ? (moment as any).stories.sort((a: Story, b: Story) => b.timestamp - a.timestamp)
        : [],
      type: getMomentType(moment)
    }))
    .sort((a, b) => {
      const aViewed = viewedMoments.includes(a.id);
      const bViewed = viewedMoments.includes(b.id);
      if (aViewed === bViewed) return 0;
      return aViewed ? 1 : -1; // unviewed first
    });
  const momentsWithAdd = [
    { id: 'add', type: 'add', stories: yourStories.sort((a, b) => b.timestamp - a.timestamp) },
    ...sortedMoments
  ];

  // Clear timers utility
  const clearTimers = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    if (storyTimeout.current) {
      clearTimeout(storyTimeout.current);
      storyTimeout.current = null;
    }
  };

  // Story auto-advance logic
  useEffect(() => {
    if (!storyModalVisible || !currentStoryUser || isPaused || showComments) {
      clearTimers();
      return;
    }

    setProgress(0);
    let localProgress = 0;
    const progressStep = PROGRESS_INTERVAL / STORY_DURATION;

    progressInterval.current = setInterval(() => {
      localProgress += progressStep;
      setProgress(Math.min(localProgress, 1));

      if (localProgress >= 1) {
        clearTimers();
        storyTimeout.current = setTimeout(() => {
          goToNextStory();
        }, 100) as unknown as NodeJS.Timeout;
      }
    }, PROGRESS_INTERVAL) as unknown as NodeJS.Timeout;

    return clearTimers;
  }, [storyModalVisible, currentStoryIdx, currentStoryUser, isPaused, showComments]);

  // Handle moment press
  const handleMomentPress = (momentId: string, moment?: any) => {
    if (momentId === 'add') {
      if (yourStories.length > 0) {
        openStoryModal(
          { ...user, stories: yourStories.sort((a, b) => b.timestamp - a.timestamp), isSelf: true },
          0,
          0
        );
      } else {
        setUploadModalVisible(true);
      }
      return;
    }

    const momentUser = users.find(u => u.id === moment.userId);
    if (momentUser) {
      const userIndex = momentsWithAdd.findIndex(m => m.id === momentId);
      const sortedStories = moment.stories.sort((a: Story, b: Story) => b.timestamp - a.timestamp);
      openStoryModal(
        { ...momentUser, stories: sortedStories, isSelf: false },
        0,
        userIndex
      );
      
      if (!viewedMoments.includes(momentId)) {
        setViewedMoments(prev => [...prev, momentId]);
      }
    }
  };

  // Open story modal
  const openStoryModal = (storyUser: StoryUser, storyIdx: number, userIdx: number) => {
    setCurrentStoryUser(storyUser);
    setCurrentStoryIdx(storyIdx);
    setStoryUserIndex(userIdx);
    setProgress(0);
    setStoryModalVisible(true);
    setShowComments(false);
  };

  // Close story modal
  const closeStoryModal = () => {
    clearTimers();
    setStoryModalVisible(false);
    setCurrentStoryUser(null);
    setCurrentStoryIdx(0);
    setProgress(0);
    setShowComments(false);
    setCommentText('');
  };

  // Navigation helpers
  const getNextUserWithStories = (currentIndex: number) => {
    for (let i = currentIndex + 1; i < momentsWithAdd.length; i++) {
      const user = momentsWithAdd[i];
      if ('stories' in user && Array.isArray(user.stories) && user.stories.length > 0) {
        return i;
      }
    }
    return -1;
  };

  const getPrevUserWithStories = (currentIndex: number) => {
    for (let i = currentIndex - 1; i >= 0; i--) {
      const user = momentsWithAdd[i];
      if ('stories' in user && Array.isArray(user.stories) && user.stories.length > 0) {
        return i;
      }
    }
    return -1;
  };

  // Story navigation
  const goToNextStory = () => {
    if (!currentStoryUser || !Array.isArray(currentStoryUser.stories)) return;
    
    if (currentStoryIdx < currentStoryUser.stories.length - 1) {
      setCurrentStoryIdx(prev => prev + 1);
      setProgress(0);
    } else {
      const nextUserIdx = getNextUserWithStories(storyUserIndex);
      if (nextUserIdx !== -1) {
        const nextUser = momentsWithAdd[nextUserIdx];
        const momentUser = 'userId' in nextUser && nextUser.userId
          ? users.find(u => u.id === nextUser.userId)
          : user;
        if (momentUser && 'stories' in nextUser && Array.isArray(nextUser.stories)) {
          const sortedStories = nextUser.stories.sort((a: Story, b: Story) => b.timestamp - a.timestamp);
          openStoryModal(
            {
              ...momentUser,
              stories: sortedStories,
              isSelf: (nextUser as any).type === 'add'
            },
            0,
            nextUserIdx
          );
        }
      } else {
        closeStoryModal();
      }
    }
  };

  const goToPrevStory = () => {
    if (!currentStoryUser || !Array.isArray(currentStoryUser.stories)) return;
    
    if (currentStoryIdx > 0) {
      setCurrentStoryIdx(prev => prev - 1);
      setProgress(0);
    } else {
      const prevUserIdx = getPrevUserWithStories(storyUserIndex);
      if (prevUserIdx !== -1) {
        const prevUser = momentsWithAdd[prevUserIdx];
        const momentUser = 'userId' in prevUser && prevUser.userId
          ? users.find(u => u.id === prevUser.userId)
          : user;
        if (momentUser && 'stories' in prevUser && Array.isArray(prevUser.stories)) {
          const sortedStories = prevUser.stories.sort((a: Story, b: Story) => b.timestamp - a.timestamp);
          openStoryModal(
            {
              ...momentUser,
              stories: sortedStories,
              isSelf: (prevUser as any).type === 'add'
            },
            sortedStories.length - 1,
            prevUserIdx
          );
        }
      }
    }
  };

  // Story actions
  const handleLikeStory = () => {
    if (!currentStoryUser) return;
    const key = `${currentStoryUser.id || 'self'}-${currentStoryIdx}`;
    setLikedStories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteStory = () => {
    Alert.alert(
      'Delete Story',
      'Are you sure you want to delete this story?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (yourStories.length === 1) {
              setYourStories([]);
              closeStoryModal();
            } else {
              const newStories = yourStories.filter((_, idx) => idx !== currentStoryIdx);
              setYourStories(newStories);
              
              if (currentStoryIdx >= newStories.length) {
                setCurrentStoryIdx(newStories.length - 1);
              }
              
              if (currentStoryUser) {
                setCurrentStoryUser({
                  ...currentStoryUser,
                  stories: newStories.sort((a, b) => b.timestamp - a.timestamp)
                });
              }
            }
          }
        }
      ]
    );
  };

  // Comment functions
  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      setIsPaused(true);
      setTimeout(() => commentInputRef.current?.focus(), 100);
    } else {
      setIsPaused(false);
    }
  };

  const handleSendComment = () => {
    if (!commentText.trim() || !currentStoryUser) return;
    
    const storyKey = `${currentStoryUser.id || 'self'}-${currentStoryIdx}`;
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      text: commentText.trim(),
      time: 'Just now',
    };
    
    setStoryComments(prev => ({
      ...prev,
      [storyKey]: [...(prev[storyKey] || []), newComment]
    }));
    
    setCommentText('');
  };

  const getCurrentStoryComments = () => {
    if (!currentStoryUser) return [];
    const storyKey = `${currentStoryUser.id || 'self'}-${currentStoryIdx}`;
    return storyComments[storyKey] || [];
  };

  // Image upload
  const handleUploadStory = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera roll permissions are needed to upload stories.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      setUploadPreview(result.assets[0].uri);
    }
  };

  const handleUploadConfirm = () => {
    if (uploadPreview) {
      const newStory: Story = {
        id: Date.now().toString(),
        image: uploadPreview,
        time: 'Just now',
        timestamp: Date.now()
      };
      setYourStories(prev => [newStory, ...prev]);
      setUploadModalVisible(false);
      setUploadPreview(null);
    }
  };

  const openMenu = (postId: string) => setMenuVisible(postId);
  const closeMenu = () => setMenuVisible(null);
  const handleReport = (user: any) => {
    setReportModal({ visible: true, user });
    closeMenu();
  };

  // Render components
  const renderProgressBar = () => {
    if (!currentStoryUser || !Array.isArray(currentStoryUser.stories) || currentStoryUser.stories.length === 0) return null;
    
    return (
      <View style={styles.progressBarContainer}>
        {currentStoryUser.stories.map((_, idx) => (
          <View key={idx} style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: idx < currentStoryIdx
                    ? '100%'
                    : idx === currentStoryIdx
                      ? `${progress * 100}%`
                      : '0%'
                }
              ]}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderStoryTopBar = () => {
    if (!currentStoryUser) return null;
    const displayName = currentStoryUser.isSelf ? 'Your story' : currentStoryUser.name;
    return (
      <View style={styles.storyTopBar}>
        <View style={styles.storyUserInfo}>
          <Image
            source={currentStoryUser.avatar ? { uri: currentStoryUser.avatar } : DEFAULT_AVATAR}
            style={styles.storyAvatar}
          />
          <View style={styles.storyUserDetails}>
            <Text style={styles.storyUserName}>{displayName}</Text>
            <Text style={styles.storyTime}>
              {currentStoryUser?.stories?.[currentStoryIdx]?.time || 'Unknown'}
            </Text>
          </View>
        </View>
        {currentStoryUser.isSelf && (
          <View style={styles.storyActions}>
            <TouchableOpacity onPress={handleDeleteStory} style={styles.storyActionBtn}>
              <Trash2 size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                closeStoryModal();
                setUploadModalVisible(true);
              }}
              style={styles.storyActionBtn}
            >
              <PlusCircle size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.storyActionBtn}>
              <Download size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderComments = () => {
    const comments = getCurrentStoryComments();
    
    return (
      <View style={styles.commentsContainer}>
        <View style={styles.commentsHeader}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <TouchableOpacity onPress={toggleComments}>
            <Text style={styles.commentsClose}>×</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
          {comments.length === 0 ? (
            <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
          ) : (
            comments.map((comment) => {
              const commentUser = users.find(u => u.id === comment.userId) || user;
              return (
                <View key={comment.id} style={styles.commentItem}>
                  <Image
                    source={commentUser.avatar ? { uri: commentUser.avatar } : DEFAULT_AVATAR}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUserName}>{commentUser.name} <Text style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 'normal' }}>{commentUser.family}</Text></Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
        
        <View style={styles.commentInputContainer}>
          <TextInput
            ref={commentInputRef}
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={200}
          />
          <TouchableOpacity 
            onPress={handleSendComment}
            style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
            disabled={!commentText.trim()}
          >
            <Send size={20} color={commentText.trim() ? "#4CAF50" : "rgba(255,255,255,0.3)"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMoment = ({ item }: { item: any }) => {
    if (item.type === 'add') {
      const hasStory = yourStories.length > 0;
      return (
        <TouchableOpacity style={styles.momentContainer} onPress={() => handleMomentPress('add')}>
          <View style={[styles.storyCard, styles.addMomentCard]}>
            <View style={styles.addMomentCircle}>
              <Plus size={32} color="#bbb" />
            </View>
          </View>
          <Text style={styles.momentName}>{hasStory ? 'Your story' : 'Your moment'}</Text>
        </TouchableOpacity>
      );
    }

    const momentUser = users.find(u => u.id === item.userId);
    const isViewed = viewedMoments.includes(item.id);
    const borderStyle = isViewed ? styles.viewedBorder : styles.unviewedBorder;

    return (
      <TouchableOpacity 
        style={styles.momentContainer}
        onPress={() => handleMomentPress(item.id, item)}
      >
        <View style={[styles.storyCard, borderStyle]}>
          <Image 
            source={item.stories?.[0]?.image 
              ? { uri: item.stories[0].image } 
              : DUMMY_STORY_IMG
            } 
            style={styles.storyImageRect} 
            resizeMode="cover"
          />
          {/* Avatar overlay */}
          <View style={styles.avatarOverlay}>
            <Image 
              source={momentUser?.avatar ? { uri: momentUser.avatar } : DEFAULT_AVATAR}
              style={styles.avatarSmall}
            />
          </View>
        </View>
        <Text style={styles.momentName} numberOfLines={1} ellipsizeMode="tail">
          {momentUser?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPost = ({ item }: { item: any }) => {
    const postUser = users.find(u => u.id === item.userId);

    // Extract bold part if using simple markup
    const match = item.content.match(/<b>(.*?)<\/b>(.*)/i);
    let boldText = '';
    let restText = item.content;
    if (match) {
      boldText = match[1];
      restText = match[2];
    }

    const isLiked = likedPosts[item.id] || false;
    const comments = postComments[item.id] || [];
    const commentInput = commentInputs[item.id] || '';
    const currentImageIndex = imageIndexes[item.id] || 0;
    const isExpanded = expandedPosts[item.id] || false;
    const handleLike = () => {
      setLikedPosts(prev => ({ ...prev, [item.id]: !isLiked }));
    };
    const handleCommentInput = (text: string) => {
      setCommentInputs(prev => ({ ...prev, [item.id]: text }));
    };
    const handleAddComment = () => {
      if (!commentInput.trim()) return;
      const newComment = {
        id: Date.now().toString(),
        userId: user.id,
        text: commentInput.trim(),
        time: 'Just now',
      };
      setPostComments(prev => ({
        ...prev,
        [item.id]: [...(prev[item.id] || []), newComment],
      }));
      setCommentInputs(prev => ({ ...prev, [item.id]: '' }));
    };
    const handleImageScroll = (event: any) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      setImageIndexes(prev => ({ ...prev, [item.id]: index }));
    };
    const handleViewMore = () => {
      setExpandedPosts(prev => ({ ...prev, [item.id]: true }));
    };
    // Description logic
    const words = restText.trim().split(/\s+/);
    const showViewMore = words.length > 30 && !isExpanded;
    const displayText = showViewMore ? words.slice(0, 30).join(' ') + '...' : restText;
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <LinearGradient
            colors={['rgba(239, 118, 122, 0.63)', '#EADE79', 'rgba(234, 205, 57, 0.76)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.avatarGradientBorder}
          >
            <View style={styles.avatarInnerContainer}>
              <Image
                source={postUser?.avatar ? { uri: postUser.avatar } : DEFAULT_AVATAR}
                style={styles.userAvatar}
              />
            </View>
          </LinearGradient>
          <View style={styles.postUserInfo}>
            <Text style={styles.postUserName}>{postUser?.name}</Text>
            <Text style={styles.postUserFamily}>{postUser?.family}</Text>
          </View>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={() => openMenu(item.id)}>
              <MoreHorizontal size={20} color="#666" style={{ transform: [{ rotate: '90deg' }] }} />
            </TouchableOpacity>
            {menuVisible === item.id && (
              <View style={{ position: 'absolute', top: 28, right: 0, backgroundColor: '#fff', borderRadius: 8, elevation: 4, zIndex: 100 }}>
                <TouchableOpacity onPress={() => handleReport(postUser)}>
                  <Text style={{ padding: 12, color: '#ff3040', fontWeight: 'bold' }}>Report</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {item.images?.length > 0 && (
          <View>
            <View>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.postImages}
                onScroll={handleImageScroll}
                scrollEventThrottle={16}
                snapToInterval={SCREEN_WIDTH}
                decelerationRate="fast"
              >
                {item.images.map((image: string, index: number) => (
                  <Image key={index} source={{ uri: image }} style={[styles.postImage, { width: SCREEN_WIDTH, height: 250, margin: 0 }]} />
                ))}
              </ScrollView>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.postActions}>
                  <View style={styles.postStats}>
                    <TouchableOpacity onPress={handleLike} style={styles.statItem}>
                      <SvgXml 
                        xml={isLiked ? likeColorSvg : likeSvg} 
                        width={22} 
                        height={22} 
                      />
                      <Text style={styles.statText}>{item.likes + (isLiked ? 1 : 0)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setActiveCommentPostId(item.id); setCommentModalVisible(true); }} style={styles.statItem}>
                      <SvgXml xml={commentSvg} width={22} height={22} />
                      <Text style={styles.statText}>{comments.length}</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Share icon removed */}
                </View>
                {item.images.length > 1 && (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8,marginRight: 14}}>
                    {item.images.map((_: any, idx: number) => (
                      <View
                        key={idx}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: currentImageIndex === idx ? '#4CAF50' : '#ccc',
                          marginHorizontal: 3,
                        }}
                      />
                    ))}
                  </View>
                )}
                
              </View>
              
            </View>
          </View>
        )}
       
        <Text style={styles.postContent}>
          {boldText ? <Text style={{ fontWeight: 'bold' }}>{boldText}</Text> : null}
          {displayText}
        </Text>
        {showViewMore && (
          <TouchableOpacity onPress={handleViewMore} style={{ marginLeft: 16, marginTop: 4 }}>
            <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>View more</Text>
          </TouchableOpacity>
        )}
        {/* Comments Section: restore to old style, just show comment text */}
        {/* (No user avatar, name, family inline) */}
        {/* Comments are shown in the modal when comment icon is clicked */}
      </View>
    );
  };

  const isStoryLiked = () => {
    if (!currentStoryUser) return false;
    const key = `${currentStoryUser.id || 'self'}-${currentStoryIdx}`;
    return likedStories[key] || false;
  };

  // Helper to load SVG XML as string
  const [logoXml, setLogoXml] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const asset = Asset.fromModule(require('@/assets/icons/FullLogo.svg'));
      await asset.downloadAsync();
      const svgString = await FileSystem.readAsStringAsync(asset.localUri || asset.uri);
      setLogoXml(svgString);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* New Header */}
      <View style={styles.newHeader}>
        {logoXml ? (
          <SvgXml xml={logoXml} width={120} height={32} />
        ) : null}
        <TouchableOpacity onPress={() => router.push('../search')} style={styles.searchBtn}>
          <Search size={28} color="#222" />
        </TouchableOpacity>
      </View>
      {/*story*/}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.momentsSection}>
          <FlatList
            data={momentsWithAdd}
            renderItem={renderMoment}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.momentsList}
          />
        </View>
        
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={styles.postsList}
        />
      </ScrollView>

      {/* Story Modal */}
      <Modal
        visible={storyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeStoryModal}
      >
        <KeyboardAvoidingView 
          style={styles.storyModalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback
            onPressIn={() => !showComments && setIsPaused(true)}
            onPressOut={() => !showComments && setIsPaused(false)}
          >
            <View style={styles.storyModalContent}>
              {/* Navigation overlays */}
              <Pressable style={styles.storyNavLeft} onPress={goToPrevStory} />
              <Pressable style={styles.storyNavRight} onPress={goToNextStory} />

              {/* Progress bar and top bar */}
              {renderProgressBar()}
              {renderStoryTopBar()}
              
              <Image
                source={currentStoryUser?.stories?.[currentStoryIdx]?.image 
                  ? { uri: currentStoryUser.stories[currentStoryIdx].image }
                  : DUMMY_STORY_IMG
                }
                style={styles.storyImage}
                resizeMode="cover"
              />
              
              {/* Story interaction buttons */}
              <View style={styles.storyBottomUI}>
                <View style={styles.storyInteractions}>
                  <TouchableOpacity 
                    style={styles.storyInteractionBtn} 
                    onPress={handleLikeStory}
                  >
                    <SvgXml 
                      xml={isStoryLiked() ? likeColorSvg : likeSvg} 
                      width={24} 
                      height={24} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.storyInteractionBtn}
                    onPress={toggleComments}
                  >
                    <SvgXml xml={commentSvg} width={24} height={24} />
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Comments Panel */}
              {showComments && renderComments()}
              
              <TouchableOpacity style={styles.storyCloseButton} onPress={closeStoryModal}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      {/* Upload Modal */}
      <Modal
        visible={uploadModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setUploadModalVisible(false);
          setUploadPreview(null);
        }}
      >
        <View style={styles.storyModalOverlay}>
          <View style={styles.storyModalContent}>
            {uploadPreview ? (
              <>
                <Image source={{ uri: uploadPreview }} style={styles.storyImage} resizeMode="cover" />
                <TouchableOpacity style={styles.uploadButton} onPress={handleUploadConfirm}>
                  <Text style={styles.uploadButtonText}>Upload Story</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.uploadPicker} onPress={handleUploadStory}>
                <Plus size={40} color="#4CAF50" />
                <Text style={styles.uploadPickerText}>Pick an image</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.storyCloseButton} 
              onPress={() => {
                setUploadModalVisible(false);
                setUploadPreview(null);
              }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Comment Modal */}
      <Modal
        visible={commentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={[styles.commentsContainer, { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: SCREEN_HEIGHT * 0.8 }]}> 
          {/* Handle/Divider at the top */}
          <View style={{ alignItems: 'center', paddingTop: 8 }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#eee', marginBottom: 8 }} />
          </View>

          {/* Header: Comments + count */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222' }}>Comments</Text>
            <Text style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: 16 }}>{activeCommentPostId && postComments[activeCommentPostId]?.length || 0}</Text>
          </View>

          {/* Post info at top */}
          {activeCommentPostId && (() => {
            const post = posts.find(p => p.id === activeCommentPostId);
            const postUser = post ? users.find(u => u.id === post.userId) : null;
            return post && postUser ? (
              <View style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <LinearGradient
                    colors={['rgba(239, 118, 122, 0.63)', '#EADE79', 'rgba(234, 205, 57, 0.76)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{ width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
                  >
                    <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff', overflow: 'hidden' }}>
                      <Image
                        source={postUser.avatar ? { uri: postUser.avatar } : DEFAULT_AVATAR}
                        style={{ width: 32, height: 32, borderRadius: 16 }}
                      />
                    </View>
                  </LinearGradient>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 14 }}>{postUser.name}</Text>
                    <Text style={{ color: '#888', fontWeight: 'normal' }}>{postUser.family}</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                 
                  <Text style={{ color: '#747474', marginTop: 2, fontSize: 14,fontWeight: '700' }}>{post.content.replace(/<[^>]+>/g, '')}</Text>
                </View>
              </View>
            ) : null;
          })()}
          {/* Back to all comments button if viewing replies */}
          {viewingRepliesFor && (
            <TouchableOpacity onPress={() => setViewingRepliesFor(null)} style={{ alignSelf: 'flex-start', marginLeft: 16, marginBottom: 8, paddingVertical: 8 }}>
              <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>{'< Back to all comments'}</Text>
            </TouchableOpacity>
          )}
          <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
            {(activeCommentPostId && postComments[activeCommentPostId]?.length === 0) ? (
              <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
            ) : (
              (activeCommentPostId ? postComments[activeCommentPostId] : []).map((comment: any) => {
                const commentUser = users.find(u => u.id === comment.userId);
                if (!commentUser) return null; // Skip comments with invalid user IDs
                const replies = comment.replies || [];
                
                // If viewing replies for this specific comment, show only this comment with its replies
                if (viewingRepliesFor === comment.id) {
                  return (
                    <View key={comment.id || Math.random()} style={{ marginBottom: 18 }}>
                      {/* Main comment */}
                      <View style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                          <LinearGradient
                            colors={['rgba(239, 118, 122, 0.63)', '#EADE79', 'rgba(234, 205, 57, 0.76)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
                          >
                            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff', overflow: 'hidden' }}>
                              <Image
                                source={commentUser.avatar ? { uri: commentUser.avatar } : DEFAULT_AVATAR}
                                style={{ width: 28, height: 28, borderRadius: 14 }}
                              />
                            </View>
                          </LinearGradient>
                          <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 14 }}>{commentUser.name}</Text>
                                <Text style={{ color: '#888', fontWeight: 'normal', fontSize: 12 }}>{commentUser.family}</Text>
                              </View>
                              <Text style={{ color: '#aaa', fontSize: 12 }}>{comment.time}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ marginLeft: 42, marginTop: 8 }}>
                          <Text style={{ color: '#272727', fontSize: 14, lineHeight: 18,fontWeight: '700' }}>{comment.text}</Text>
                          {/* Reply button */}
                          <TouchableOpacity onPress={() => setReplyingTo(comment.id)} style={{ marginTop: 8 }}>
                            <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>Reply</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      
                      {/* Reply input */}
                      {replyingTo === comment.id && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, paddingHorizontal: 16 }}>
                          <TextInput
                            value={replyInputs[comment.id] || ''}
                            onChangeText={text => setReplyInputs(prev => ({ ...prev, [comment.id]: text }))}
                            placeholder="Write a reply..."
                            style={[styles.commentInput, { flex: 1, backgroundColor: '#f7f7f7', color: '#222' }]}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              const replyText = replyInputs[comment.id]?.trim();
                              if (!replyText) return;
                              const newReply = {
                                id: Date.now().toString(),
                                userId: user.id,
                                text: replyText,
                                time: 'Just now',
                              };
                              if (!activeCommentPostId) return;
                              setPostComments(prev => {
                                const updated = { ...prev };
                                updated[activeCommentPostId] = updated[activeCommentPostId].map((c: any) =>
                                  c.id === comment.id
                                    ? { ...c, replies: [...(c.replies || []), newReply] }
                                    : c
                                );
                                return updated;
                              });
                              setReplyInputs(prev => ({ ...prev, [comment.id]: '' }));
                              setReplyingTo(null);
                            }}
                            style={{ marginLeft: 8 }}
                          >
                            <Send size={20} color={replyInputs[comment.id]?.trim() ? '#4CAF50' : '#bbb'} />
                          </TouchableOpacity>
                        </View>
                      )}
                      
                      {/* Replies */}
                      {replies.length > 0 && (
                        <View style={{ marginLeft: 56, marginTop: 8 }}>
                          {replies.map((reply: any) => {
                            const replyUser = users.find(u => u.id === reply.userId);
                            if (!replyUser) return null;
                            return (
                              <View key={reply.id || Math.random()} style={{ marginBottom: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                  <LinearGradient
                                    colors={['rgba(239, 118, 122, 0.63)', '#EADE79', 'rgba(234, 205, 57, 0.76)']}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                    style={{ width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 8 }}
                                  >
                                    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff', overflow: 'hidden' }}>
                                      <Image
                                        source={replyUser.avatar ? { uri: replyUser.avatar } : DEFAULT_AVATAR}
                                        style={{ width: 24, height: 24, borderRadius: 12 }}
                                      />
                                    </View>
                                  </LinearGradient>
                                  <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                      <View>
                                        <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 13 }}>{replyUser.name}</Text>
                                        <Text style={{ color: '#888', fontWeight: 'normal', fontSize: 11 }}>{replyUser.family}</Text>
                                      </View>
                                      <Text style={{ color: '#aaa', fontSize: 11 }}>{reply.time}</Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={{ marginLeft: 36, marginTop: 6 }}>
                                  <Text style={{ color: '#272727', fontSize: 14, lineHeight: 16,fontWeight: '700' }}>{reply.text}</Text>
                                </View>
                              </View>
                            );
                          })}
                          
                          {/* Reply button at bottom of replies */}
                          <TouchableOpacity onPress={() => setReplyingTo(comment.id)} style={{ marginTop: 8 }}>
                            <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>Reply</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                }
                
                // If not viewing replies, show only main comments with "View replies" button
                if (!viewingRepliesFor) {
                  return (
                    <View key={comment.id || Math.random()} style={{ marginBottom: 18,marginTop: 18 }}>
                      <View style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                          <LinearGradient
                            colors={['rgba(239, 118, 122, 0.63)', '#EADE79', 'rgba(234, 205, 57, 0.76)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={{ width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
                          >
                            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff', overflow: 'hidden' }}>
                              <Image
                                source={commentUser.avatar ? { uri: commentUser.avatar } : DEFAULT_AVATAR}
                                style={{ width: 28, height: 28, borderRadius: 14 }}
                              />
                            </View>
                          </LinearGradient>
                          <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 14 }}>{commentUser.name}</Text>
                                <Text style={{ color: '#888', fontWeight: 'normal', fontSize: 12 }}>{commentUser.family}</Text>
                              </View>
                              <Text style={{ color: '#aaa', fontSize: 12 }}>{comment.time}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ marginLeft: 42, marginTop: 8 }}>
                          <Text style={{ color: '#272727', fontSize: 14, lineHeight: 18,fontWeight: '700' }}>{comment.text}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                            {replies.length > 0 ? (
                              <TouchableOpacity onPress={() => setViewingRepliesFor(comment.id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#272727', fontSize: 14,fontWeight: '700' }}>---View {replies.length} repl{replies.length > 1 ? 'ies' : 'y'}</Text>
                                <SvgXml xml={rightArrowSvg} width={16} height={16} style={{ marginLeft: 4 }} />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity onPress={() => setReplyingTo(comment.id)}>
                                <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>Reply</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                      
                      {/* Reply input for main comment */}
                      {replyingTo === comment.id && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, paddingHorizontal: 16 }}>
                          <TextInput
                            value={replyInputs[comment.id] || ''}
                            onChangeText={text => setReplyInputs(prev => ({ ...prev, [comment.id]: text }))}
                            placeholder="Write a reply..."
                            style={[styles.commentInput, { flex: 1, backgroundColor: '#f7f7f7', color: '#222' }]}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              const replyText = replyInputs[comment.id]?.trim();
                              if (!replyText) return;
                              const newReply = {
                                id: Date.now().toString(),
                                userId: user.id,
                                text: replyText,
                                time: 'Just now',
                              };
                              if (!activeCommentPostId) return;
                              setPostComments(prev => {
                                const updated = { ...prev };
                                updated[activeCommentPostId] = updated[activeCommentPostId].map((c: any) =>
                                  c.id === comment.id
                                    ? { ...c, replies: [...(c.replies || []), newReply] }
                                    : c
                                );
                                return updated;
                              });
                              setReplyInputs(prev => ({ ...prev, [comment.id]: '' }));
                              setReplyingTo(null);
                            }}
                            style={{ marginLeft: 8 }}
                          >
                            <Send size={20} color={replyInputs[comment.id]?.trim() ? '#4CAF50' : '#bbb'} />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                }
                
                return null;
              })
            )}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <TextInput
              value={activeCommentPostId ? (commentInputs[activeCommentPostId] || '') : ''}
              onChangeText={text => setCommentInputs(prev => ({ ...prev, [activeCommentPostId!]: text }))}
              placeholder="Add a comment..."
              style={styles.commentInput}
            />
            <TouchableOpacity
              onPress={() => {
                if (!activeCommentPostId) return;
                const commentInput = commentInputs[activeCommentPostId] || '';
                if (!commentInput.trim()) return;
                const newComment = {
                  id: Date.now().toString(),
                  userId: user.id,
                  text: commentInput.trim(),
                  time: 'Just now',
                };
                setPostComments(prev => ({
                  ...prev,
                  [activeCommentPostId]: [...(prev[activeCommentPostId] || []), newComment],
                }));
                setCommentInputs(prev => ({ ...prev, [activeCommentPostId]: '' }));
              }}
              disabled={!activeCommentPostId || !(commentInputs[activeCommentPostId]?.trim())}
              style={[styles.sendButton, (!activeCommentPostId || !(commentInputs[activeCommentPostId]?.trim())) && styles.sendButtonDisabled]}
            >
              <Send size={20} color={activeCommentPostId && commentInputs[activeCommentPostId]?.trim() ? '#4CAF50' : '#bbb'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={reportModal.visible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginBottom: 12 }}>
              Reported {reportModal.user?.name} {reportModal.user?.family}
            </Text>
            <TouchableOpacity onPress={() => setReportModal({ visible: false, user: null })}>
              <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  newHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 48,
    backgroundColor: '#fff',
  },
  searchBtn: {
    padding: 8,
    borderRadius: 20,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  headerLogo: {
    width: 100,
    height: 100,
  },
  headerUserName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  momentsSection: {
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingBottom: 16,
    marginBottom: 8,
  },
  momentsList: {
    paddingLeft: 24,
  },
  momentContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  storyCard: {
    width: 100,
    height: 130,
    gap: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  addMomentCard: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#bbb',
  },
  viewedBorder: {
    borderWidth: 2,
    borderColor: '#ddd',
  },
  unviewedBorder: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  addMomentBorder: {
    // not used, replaced by addMomentCard
  },
  addMomentCircle: {
    width: 90,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#bbb',
  },
  storyImageRect: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  avatarOverlay: {
    position: 'absolute',
    top: 4,
    left: '24%',
    marginLeft: -16,
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FCFCFC',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 14,
  },
  momentName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 70,
  },
  postsList: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingVertical: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  avatarBorderContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarGradientBorder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarInnerContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userAvatar: {
  width: 38,
  height: 38,
  borderRadius: 19,
  },
  postUserInfo: {
    flex: 1,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#272727',
  },
  postUserFamily: {
    fontSize: 11,
    fontWeight: '700',
    color: '#747474',
    marginTop: 2,
  },
  postImages: {
    width: '100%',
    height: 250,
    marginBottom: 12,
  },
  postImage: {
    width: SCREEN_WIDTH,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
    margin: 0,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginLeft: 4,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    paddingHorizontal: 16,
  },
  // Story Modal Styles
  storyModalOverlay: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyModalContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
    position: 'relative',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    gap: 4,
  },
  progressBarTrack: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  storyTopBar: {
    position: 'absolute',
    top: 80,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storyUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  storyUserDetails: {
    marginLeft: 12,
  },
  storyUserName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  storyTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  storyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storyActionBtn: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyBottomUI: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  storyInteractions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  storyInteractionBtn: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
  },
  storyNavLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    zIndex: 5,
  },
  storyNavRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    zIndex: 5,
  },
  storyCloseButton: {
    position: 'absolute',
    top: 20,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Comments Styles
  commentsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: SCREEN_HEIGHT * 0.6,
    zIndex: 15,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  commentsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  commentsClose: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  commentsList: {
    maxHeight: SCREEN_HEIGHT * 0.3,
    paddingHorizontal: 16,
  },
  noCommentsText: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    padding: 20,
    fontSize: 14,
  },
  commentItem: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUserName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  commentText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  commentTime: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
    maxHeight: 80,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  // Upload Modal Styles
  uploadPicker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPickerText: {
    color: '#4CAF50',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    zIndex: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});




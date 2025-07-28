import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Heart, MessageCircle, UserPlus, Camera, Bell, CheckCircle } from 'lucide-react-native';

export default function NotificationScreen() {
  // Mock notifications data
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        family: 'Johnson Family'
      },
      action: 'liked your post',
      time: '2 minutes ago',
      isRead: false
    },
    {
      id: '2',
      type: 'comment',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        family: 'Chen Family'
      },
      action: 'commented on your photo',
      time: '5 minutes ago',
      isRead: false
    },
    {
      id: '3',
      type: 'follow',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        family: 'Wilson Family'
      },
      action: 'joined your family group',
      time: '1 hour ago',
      isRead: true
    },
    {
      id: '4',
      type: 'story',
      user: {
        name: 'David Richard',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        family: 'Thalakam Family'
      },
      action: 'shared a new story',
      time: '2 hours ago',
      isRead: true
    },
    {
      id: '5',
      type: 'like',
      user: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        family: 'Rodriguez Family'
      },
      action: 'liked your story',
      time: '3 hours ago',
      isRead: true
    },
    {
      id: '6',
      type: 'comment',
      user: {
        name: 'Lisa Thompson',
        avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        family: 'Thompson Family'
      },
      action: 'replied to your comment',
      time: '4 hours ago',
      isRead: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={16} color="#ff3040" />;
      case 'comment':
        return <MessageCircle size={16} color="#2196F3" />;
      case 'follow':
        return <UserPlus size={16} color="#4CAF50" />;
      case 'story':
        return <Camera size={16} color="#FF9800" />;
      default:
        return <Bell size={16} color="#666" />;
    }
  };

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.notificationCard, !item.isRead && styles.unreadCard]}>
      <View style={styles.notificationContent}>
        <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationText}>
            <Text style={styles.userName}>{item.user.name}</Text>
            {' '}{item.action}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <View style={styles.notificationIcon}>
          {getNotificationIcon(item.type)}
        </View>
      </View>
      {!item.isRead && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <CheckCircle size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>New</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>48</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        style={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  markAllButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: '#f8fffe',
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  userName: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  notificationIcon: {
    marginLeft: 12,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
});

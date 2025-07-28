import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard, ScrollView } from 'react-native';
import { users } from '@/data/mockData';
import { Search } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(true);

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.family.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setQuery(text);
    setShowRecent(false);
  };

  const handleRecentPress = (text: string) => {
    setQuery(text);
    setShowRecent(false);
  };

  const handleSubmit = () => {
    if (query.trim() && !recent.includes(query.trim())) {
      setRecent([query.trim(), ...recent.slice(0, 4)]); // max 5 recent
    }
    Keyboard.dismiss();
    setShowRecent(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or family..."
          value={query}
          onChangeText={text => {
            setQuery(text);
            if (text === '') setShowRecent(true);
            else setShowRecent(false);
          }}
          onSubmitEditing={handleSubmit}
          autoFocus
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.searchIconBtn}>
          <Search size={22} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Recent Searches: only show if query is empty and showRecent is true */}
      {query === '' && showRecent && recent.length > 0 && (
        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>Recent Searches</Text>
          <View style={styles.recentList}>
            {recent.map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => handleRecentPress(item)} style={styles.recentItem}>
                <Text style={styles.recentText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results */}
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultFamily}>{item.family}</Text>
          </View>
        )}
        ListEmptyComponent={() => (!showRecent ? <Text style={styles.noResults}>No users found.</Text> : null)}
        style={styles.resultsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  backBtn: {
    padding: 8,
    marginRight: 4,
  },
  backText: {
    fontSize: 20,
    color: '#222',
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
  },
  searchIconBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
  },
  recentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  recentTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  recentList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentItem: {
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  recentText: {
    color: '#333',
    fontSize: 14,
  },
  resultsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultName: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  resultFamily: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  noResults: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 16,
  },
}); 
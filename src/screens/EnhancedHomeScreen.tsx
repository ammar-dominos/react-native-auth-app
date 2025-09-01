import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts';
import { EnhancedButton, MessageCard, LoadingSpinner } from '../components/ui';
import { commonStyles } from '../styles/commonStyles';
import { enhancedHomeScreenStyles as styles } from './EnhancedHomeScreen.styles';

export const EnhancedHomeScreen: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.centerContainer}>
        <LoadingSpinner size="large" text="Signing you out..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={commonStyles.heading1}>Welcome Back!</Text>
          <Text style={commonStyles.subtitle}>
            You're successfully signed in
          </Text>
        </View>

        {/* User Information Cards */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          {/* Name Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.iconText}>👤</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
            </View>
          </View>

          {/* Email Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.iconText}>📧</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
            </View>
          </View>

          {/* User ID Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.iconText}>🆔</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>User ID</Text>
              <Text style={styles.infoValue}>{user?.id || 'N/A'}</Text>
            </View>
          </View>

          {/* Member Since Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.iconText}>📅</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Success Message */}
        <MessageCard
          type="success"
          title="Authentication Successful"
          message="Your session is secure and all features are available."
        />

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>⚙️</Text>
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>👤</Text>
              <Text style={styles.actionButtonText}>Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>🔔</Text>
              <Text style={styles.actionButtonText}>Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>❓</Text>
              <Text style={styles.actionButtonText}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <EnhancedButton
          title="Sign Out"
          variant="danger"
          size="large"
          onPress={handleLogout}
          loading={isLoading}
          disabled={isLoading}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};



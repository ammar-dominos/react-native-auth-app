import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button, MessageCard, LoadingSpinner, Icon } from '../../components/ui';
import { useAuth } from '../../contexts';
import { useConfirmation } from '../../hooks';
import { showErrorAlert, getMemberSinceText } from '../../utils';
import { homeScreenStyles as styles } from './HomeScreen.styles';

export const HomeScreen: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const { confirm } = useConfirmation();

  const handleLogout = async () => {
    confirm(
      {
        title: 'Sign Out',
        message: 'Are you sure you want to sign out of your account?',
      },
      async () => {
        try {
          await logout();
        } catch (error) {
          showErrorAlert(
            'Error',
            'Failed to sign out. Please try again.'
          );
        }
      }
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
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
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            You're successfully signed in
          </Text>
        </View>

        {/* User Information Cards */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          {/* Name Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon name="user" size={24} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user?.name || 'N/A'}</Text>
            </View>
          </View>

          {/* Email Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon name="email" size={24} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
            </View>
          </View>

          {/* User ID Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon name="id-card" size={24} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>User ID</Text>
              <Text style={styles.infoValue}>{user?.id || 'N/A'}</Text>
            </View>
          </View>

          {/* Member Since Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon name="calendar" size={24} color="#007AFF" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>
                {user?.createdAt ? getMemberSinceText(user.createdAt) : 'N/A'}
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
              <Icon name="settings" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="user" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="notifications" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="help" size={20} color="#666" />
              <Text style={styles.actionButtonText}>Help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <Button
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

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../contexts';
import { useConfirmation } from '../../hooks/useConfirmation';
import { showErrorAlert } from '../../utils/alerts';
import { getMemberSinceText } from '../../utils/dateUtils';
import { dashboardScreenStyles as styles } from './DashboardScreen.styles';

export const DashboardScreen: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const { confirm } = useConfirmation();

  const handleLogout = async () => {
    confirm(
      {
        title: 'Logout',
        message: 'Are you sure you want to logout?',
      },
      async () => {
        try {
          await logout();
        } catch (error) {
          showErrorAlert('Error', 'Failed to logout. Please try again.');
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.subtitle}>You are successfully logged in</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoValue}>{user?.id}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>
              {user?.createdAt ? getMemberSinceText(user.createdAt) : 'N/A'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, isLoading && styles.logoutButtonDisabled]}
          onPress={handleLogout}
          disabled={isLoading}
        >
          <Text style={styles.logoutButtonText}>
            {isLoading ? 'Logging out...' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

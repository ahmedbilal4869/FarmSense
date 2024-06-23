import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../Components/Header';
import BottomNavbar from '../Components/BottomNavbar';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({ navigation }) => {
  const dummyData = [
    { labels: ['Jan', 'Feb', 'Mar'], datasets: [{ data: [20, 45, 28] }] },
    { labels: ['Apr', 'May', 'Jun'], datasets: [{ data: [30, 25, 50] }] },
    { labels: ['Jul', 'Aug', 'Sep'], datasets: [{ data: [40, 60, 70] }] }
  ];

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      
      <View style={styles.totalCows}>
        <Image source={require('../assets/cows.jpeg')} style={styles.cowsImage} />
        <View style={styles.overlay}>
          <Text style={styles.totalCowsText}>TOTAL COWS</Text>
          <Text style={styles.totalCowsNumber}>143</Text>
        </View>
      </View>

      <ScrollView horizontal={true} style={styles.statsContainer}>
        {dummyData.map((data, index) => (
          <View key={index} style={styles.statsCard}>
            <LineChart
              data={data}
              width={screenWidth - 50} // Adjusted width for the graphs
              height={220} // Adjusted height for the graphs
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.dailyLogsButton]} onPress={() => navigation.navigate('DailyLogs')}>
          <Image source={require('../assets/dailyLogs.png')} style={styles.buttonIcon} />
          <Text>Daily Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.catalogButton]} onPress={() => navigation.navigate('Catalog')}>
          <Image source={require('../assets/catalog.png')} style={styles.buttonIcon} />
          <Text>Catalog</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.videoFeedButton]} onPress={() => navigation.navigate('VideoFeed')}>
          <Image source={require('../assets/videoFeed.png')} style={styles.buttonIcon} />
          <Text>Video Feed</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  totalCows: {
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  cowsImage: {
    width: '100%',
    height: 150,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  totalCowsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalCowsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 490,
  },
  statsCard: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 60, // Adjust for bottom navigation bar height
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '90%',
    height: 100,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  dailyLogsButton: {
    backgroundColor: '#FFDDC1',
  },
  catalogButton: {
    backgroundColor: '#C1FFC1',
  },
  videoFeedButton: {
    backgroundColor: '#C1D4FF',
  },
});

export default DashboardScreen;

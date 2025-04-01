
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';

export default function TabOneScreen() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('http://localhost:3000/entries');
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item["First Name"]} {item["Last Name"]}</Text>
      <Text style={styles.cell}>{item.Client}</Text>
      <Text style={styles.cell}>{item.Hours}</Text>
      <Text style={styles.cell}>{item.Billable === "Yes" ? item.Hours : 0}</Text>
      <Text style={styles.cell}>{item.Billable === "Yes" ? (item.Hours * item.BillableRate).toFixed(2) : 0}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timesheet Entries</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Client</Text>
        <Text style={styles.headerCell}>Hours</Text>
        <Text style={styles.headerCell}>Billable Hours</Text>
        <Text style={styles.headerCell}>Billable Amount</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#ddd', padding: 10 },
  headerCell: { flex: 1, fontWeight: 'bold', textAlign: 'center' },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10 },
  cell: { flex: 1, textAlign: 'center' },
});

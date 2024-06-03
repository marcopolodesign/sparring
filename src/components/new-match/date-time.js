import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SubHeading, ViewJustifyCenter } from '../../components/styled-components';
import { Colors, Generals } from '../../components/constants.js';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'

// Import Icons
import Calendar from '../../assets/icons/calendar.js';


const dateTime = ({ newMatchDate, newMatch, setNewMatch }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [matchDate, setMatchDate] = useState(false)
  const [textDate, setTextDate] = useState('Fecha');
  const [textTime, setTextTime] = useState('Hora');
  const { width, height } = Dimensions.get('screen');
  const [selectedTime, setSelectedTime] = useState(null);


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const updatedDate = new Date(newMatch.date);
      updatedDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

      const formattedDate = format(updatedDate, "EEEE d 'de' MMMM", { locale: es });
      const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      setTextDate(capitalizedDate);

      setNewMatch({ ...newMatch, Date: updatedDate });
      setMatchDate(updatedDate)
      setDateSelected(true); // Mark that a date has been selected
    }
  };

  const handleTimeSelect = (timeString) => {
    if (matchDate) {
      const [hours, minutes] = timeString.split(':').map(Number);
      const updatedDate = new Date(matchDate); // Clone the existing date
      updatedDate.setHours(hours, minutes, 0, 0); // Update the time

      const localISOTime = new Date(updatedDate.getTime())

      console.log(new Date(updatedDate.getTime()), 'Local ISO STRING');

      setTextTime(timeString);
      setNewMatch({ ...newMatch, Date: localISOTime });
      setSelectedTime(timeString)
    }
  };


  const generateTimeIntervals = () => {
    const intervals = [];
    for (let hour = 6;  hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        intervals.push(time);
      }
    }
    return intervals;
  };

  return (
    <View style={{marginRight: -20}}>      
      <View style={[styles.inputContainer, { position: 'relative', zIndex: 9, marginRight: 20 }]}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Calendar color={'#000'} />
          <SubHeading color={Colors.textGrey} size={'16px'}>{textDate}</SubHeading>
        </TouchableOpacity>
        {showDatePicker && (
          <View style={{ position: 'absolute', top: height / 9, left: 20, zIndex: 10, borderRadius: Generals.borderRadius, overflow: 'hidden' }}>
            <DateTimePicker
              value={new Date()}
              // minimumDate={new Date()}
              mode="date"
              display="inline"
              onChange={handleDateChange}
              style={styles.datePicker}
            />
          </View>
        )}
      </View>
      {dateSelected && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 10, marginBottom: 20}}
          >
            {generateTimeIntervals().map((time, index) => (
              <TouchableOpacity key={index} onPress={() => handleTimeSelect(time)} style={[
                styles.timePicker,
                { flexDirection: 'row', gap: 10 },
                selectedTime === time && styles.selectedTimePicker
              ]}>
                <SubHeading size={'16px'} color={Colors.textGrey} style={[styles.timeText, selectedTime === time && styles.selectedTimePickerText] }>{time}</SubHeading>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default dateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: Generals.borderRadius,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  manualInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  datePicker: {
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row', 
    gap: 10
  },
  timePicker: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: Generals.borderRadius,
    alignItems: 'center',
    marginVertical: 5,
    borderColor: Colors.primaryGreen,
    borderWidth: 1
  },
  selectedTimePicker: {
   borderColor: Colors.blue,
  },

  selectedTimePickerText: {
    color: Colors.blue,
   },

  timeText: {
    color: Colors.lightGrey,
  },
  placeholder: {
    color: '#888',
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: Generals.borderRadius,
    zIndex: -1,
  },
  coordinates: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

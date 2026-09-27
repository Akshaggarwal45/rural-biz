export interface StateGeoInfo {
  id: string;
  name: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
  capital: string;
  popularDistricts: string[];
}

export const STATE_GEO_DATA: Record<string, StateGeoInfo> = {
  up: {
    id: 'up',
    name: 'Uttar Pradesh',
    center: [26.8467, 80.9462],
    zoom: 7,
    capital: 'Lucknow',
    popularDistricts: ['Varanasi', 'Lucknow', 'Kanpur', 'Prayagraj', 'Gorakhpur', 'Agra', 'Bareilly', 'Meerut', 'Ayodhya', 'Jhansi']
  },
  bihar: {
    id: 'bihar',
    name: 'Bihar',
    center: [25.0961, 85.3131],
    zoom: 7,
    capital: 'Patna',
    popularDistricts: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Nalanda', 'Begusarai']
  },
  mp: {
    id: 'mp',
    name: 'Madhya Pradesh',
    center: [22.9734, 78.6569],
    zoom: 7,
    capital: 'Bhopal',
    popularDistricts: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Chhindwara']
  },
  rajasthan: {
    id: 'rajasthan',
    name: 'Rajasthan',
    center: [27.0238, 74.2179],
    zoom: 7,
    capital: 'Jaipur',
    popularDistricts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar', 'Bhilwara']
  },
  maharashtra: {
    id: 'maharashtra',
    name: 'Maharashtra',
    center: [19.7515, 75.7139],
    zoom: 7,
    capital: 'Mumbai',
    popularDistricts: ['Pune', 'Nagpur', 'Nashik', 'Chhatrapati Sambhajinagar', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded']
  },
  gujarat: {
    id: 'gujarat',
    name: 'Gujarat',
    center: [22.2587, 71.1924],
    zoom: 7,
    capital: 'Gandhinagar',
    popularDistricts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Anand']
  },
  karnataka: {
    id: 'karnataka',
    name: 'Karnataka',
    center: [15.3173, 75.7139],
    zoom: 7,
    capital: 'Bengaluru',
    popularDistricts: ['Bengaluru Rural', 'Mysuru', 'Hubballi-Dharwad', 'Belagavi', 'Mangaluru', 'Kalaburagi', 'Ballari', 'Shivamogga']
  },
  tamilnadu: {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    center: [11.1271, 78.6569],
    zoom: 7,
    capital: 'Chennai',
    popularDistricts: ['Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur']
  },
  telangana: {
    id: 'telangana',
    name: 'Telangana',
    center: [18.1124, 79.0193],
    zoom: 7,
    capital: 'Hyderabad',
    popularDistricts: ['Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Siddipet']
  },
  ap: {
    id: 'ap',
    name: 'Andhra Pradesh',
    center: [15.9129, 79.74],
    zoom: 7,
    capital: 'Amaravati',
    popularDistricts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Kakinada', 'Rajahmundry']
  },
  wb: {
    id: 'wb',
    name: 'West Bengal',
    center: [22.9868, 87.855],
    zoom: 7,
    capital: 'Kolkata',
    popularDistricts: ['Siliguri', 'Asansol', 'Durgapur', 'Bardhaman', 'Malda', 'Kharagpur', 'Murshidabad', 'Howrah']
  },
  odisha: {
    id: 'odisha',
    name: 'Odisha',
    center: [20.9517, 85.0985],
    zoom: 7,
    capital: 'Bhubaneswar',
    popularDistricts: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Berhampur', 'Balasore', 'Puri', 'Bhadrak']
  },
  jharkhand: {
    id: 'jharkhand',
    name: 'Jharkhand',
    center: [23.6102, 85.2799],
    zoom: 7,
    capital: 'Ranchi',
    popularDistricts: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh']
  },
  chhattisgarh: {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    center: [21.2787, 81.8661],
    zoom: 7,
    capital: 'Raipur',
    popularDistricts: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Jagdalpur', 'Ambikapur', 'Dhamtari']
  },
  haryana: {
    id: 'haryana',
    name: 'Haryana',
    center: [29.0588, 76.0856],
    zoom: 8,
    capital: 'Chandigarh',
    popularDistricts: ['Hisar', 'Karnal', 'Rohtak', 'Panipat', 'Ambala', 'Sonipat', 'Yamunanagar', 'Sirsa']
  },
  punjab: {
    id: 'punjab',
    name: 'Punjab',
    center: [31.1471, 75.3412],
    zoom: 8,
    capital: 'Chandigarh',
    popularDistricts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Hoshiarpur', 'Mohali', 'Pathankot']
  },
  kerala: {
    id: 'kerala',
    name: 'Kerala',
    center: [10.8505, 76.2711],
    zoom: 8,
    capital: 'Thiruvananthapuram',
    popularDistricts: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Kannur', 'Alappuzha']
  },
  assam: {
    id: 'assam',
    name: 'Assam',
    center: [26.2006, 92.9376],
    zoom: 7,
    capital: 'Dispur',
    popularDistricts: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon']
  },
  uttarakhand: {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    center: [30.0668, 79.0193],
    zoom: 8,
    capital: 'Dehradun',
    popularDistricts: ['Dehradun', 'Haridwar', 'Haldwani', 'Roorkee', 'Rishikesh', 'Rudrapur', 'Nainital', 'Almora']
  },
  hp: {
    id: 'hp',
    name: 'Himachal Pradesh',
    center: [31.1048, 77.1734],
    zoom: 8,
    capital: 'Shimla',
    popularDistricts: ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kullu', 'Bilaspur', 'Hamirpur', 'Una']
  },
  jk: {
    id: 'jk',
    name: 'Jammu & Kashmir',
    center: [33.7782, 76.5762],
    zoom: 7,
    capital: 'Srinagar / Jammu',
    popularDistricts: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur', 'Kathua', 'Rajouri', 'Pulwama']
  },
  other: {
    id: 'other',
    name: 'All India',
    center: [22.5937, 78.9629],
    zoom: 5,
    capital: 'New Delhi',
    popularDistricts: ['Delhi', 'Goa', 'Puducherry', 'Chandigarh', 'Tripura', 'Meghalaya', 'Manipur']
  },
  all: {
    id: 'all',
    name: 'All India',
    center: [22.5937, 78.9629],
    zoom: 5,
    capital: 'New Delhi',
    popularDistricts: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 'Hyderabad']
  }
};

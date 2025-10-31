const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Device = require('./models/Device');
const Alert = require('./models/Alert');
const Project = require('./models/Project');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iot-dashboard');
    
    await User.deleteMany();
    await Device.deleteMany();
    await Alert.deleteMany();
    await Project.deleteMany();
    
    const user = await User.create({
      name: 'Panashe Mudzimwa',
      email: 'mudzimwapanashe123@gmail.com',
      password: 'password123'
    });
    
    await Device.insertMany([
      {
        name: "HVAC Unit #12",
        type: "controller",
        location: "Floor 3, Room 305",
        status: "online",
        data: {
          temperature: "22.5°C",
          pressure: "32 PSI",
          lastUpdate: "2 min ago"
        },
        user: user._id
      },
      {
        name: "Smart Meter #45",
        type: "sensor",
        location: "Floor 2, Utility Room",
        status: "online",
        data: {
          energyUsage: "4.2 kWh",
          battery: "12%",
          lastUpdate: "5 min ago"
        },
        user: user._id
      },
      {
        name: "Water Sensor #18",
        type: "sensor",
        location: "Basement, Pump Room",
        status: "offline",
        data: {
          flowRate: "--",
          temperature: "--",
          lastUpdate: "3 hours ago"
        },
        user: user._id
      }
    ]);
    
    await Alert.insertMany([
      {
        title: "HVAC Unit #12 - High Pressure",
        description: "Pressure threshold exceeded: 32 PSI",
        type: "critical",
        device: "HVAC Unit #12",
        user: user._id
      },
      {
        title: "Sensor #45 - Low Battery",
        description: "Battery level at 12%, replace soon",
        type: "warning",
        device: "Smart Meter #45",
        user: user._id
      },
      {
        title: "Gateway Update Available",
        description: "New firmware version 2.3.1 ready",
        type: "info",
        user: user._id
      }
    ]);
    
    await Project.insertMany([
      {
        title: "Smart Lighting Rollout - Floor 3",
        description: "Install and configure smart lighting system",
        deadline: new Date('2023-10-26'),
        assignee: "you",
        progress: 75,
        user: user._id
      },
      {
        title: "Sensor Calibration - All Zones",
        description: "Calibrate all IoT sensors across the building",
        deadline: new Date('2023-11-05'),
        assignee: "team",
        progress: 30,
        user: user._id
      }
    ]);
    
    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
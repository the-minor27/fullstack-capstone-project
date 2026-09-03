require('dotenv').config();

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

const items = [
    {
        title: 'Wooden Study Table',
        description: 'A used wooden study table in good condition.',
        category: 'Furniture',
        condition: 'Good',
        location: 'Lahore',
        status: 'available'
    },
    {
        title: 'Office Chair',
        description: 'Comfortable office chair available for free.',
        category: 'Furniture',
        condition: 'Good',
        location: 'Lahore',
        status: 'available'
    },
    {
        title: 'Microwave Oven',
        description: 'Working microwave oven that is no longer needed.',
        category: 'Electronics',
        condition: 'Good',
        location: 'Lahore',
        status: 'available'
    },
    {
        title: 'Electric Kettle',
        description: 'Electric kettle in working condition.',
        category: 'Electronics',
        condition: 'Good',
        location: 'Islamabad',
        status: 'available'
    },
    {
        title: 'School Backpack',
        description: 'Clean backpack suitable for school students.',
        category: 'Accessories',
        condition: 'Good',
        location: 'Faisalabad',
        status: 'available'
    },
    {
        title: 'Children Books',
        description: 'Collection of childrens story and educational books.',
        category: 'Books',
        condition: 'Good',
        location: 'Lahore',
        status: 'available'
    },
    {
        title: 'Kitchen Utensils',
        description: 'Set of kitchen utensils available for reuse.',
        category: 'Kitchen',
        condition: 'Good',
        location: 'Multan',
        status: 'available'
    },
    {
        title: 'Floor Lamp',
        description: 'Decorative floor lamp in working condition.',
        category: 'Home Decor',
        condition: 'Good',
        location: 'Lahore',
        status: 'available'
    },
    {
        title: 'Bluetooth Speaker',
        description: 'Small Bluetooth speaker that works properly.',
        category: 'Electronics',
        condition: 'Used',
        location: 'Rawalpindi',
        status: 'available'
    },
    {
        title: 'Winter Jacket',
        description: 'Warm winter jacket available for someone who needs it.',
        category: 'Clothing',
        condition: 'Good',
        location: 'Lahore',
        status: 'available'
    },
    {
        title: 'Coffee Table',
        description: 'Small wooden coffee table.',
        category: 'Furniture',
        condition: 'Used',
        location: 'Faisalabad',
        status: 'available'
    },
    {
        title: 'Plant Pots',
        description: 'Several reusable plant pots.',
        category: 'Garden',
        condition: 'Good',
        location: 'Lahore',
        status: 'available'
    },
    {
        title: 'Calculator',
        description: 'Scientific calculator suitable for students.',
        category: 'Stationery',
        condition: 'Good',
        location: 'Islamabad',
        status: 'available'
    },
    {
        title: 'Water Bottle Set',
        description: 'Reusable water bottles in good condition.',
        category: 'Kitchen',
        condition: 'Good',
        location: 'Multan',
        status: 'available'
    },
    {
        title: 'Desk Organizer',
        description: 'Desk organizer for stationery and office supplies.',
        category: 'Stationery',
        condition: 'Good',
        location: 'Lahore',
        status: 'available'
    },
    {
        title: 'Wall Clock',
        description: 'Simple wall clock that is working properly.',
        category: 'Home Decor',
        condition: 'Good',
        location: 'Faisalabad',
        status: 'available'
    }
];

const seedDatabase = async () => {
    try {
        await client.connect();

        const db = client.db('giftlink');
        const collection = db.collection('gifts');

        await collection.deleteMany({});
        const result = await collection.insertMany(items);

        console.log('Inserted items:', result.insertedCount);
        console.log('Inserted IDs:', result.insertedIds);
    } catch (error) {
        console.error('Seed failed:', error.message);
    } finally {
        await client.close();
    }
};

seedDatabase();
require('dotenv').config();
const mongoose = require('mongoose');
const DepartmentMember = require('./models/DepartmentMember');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const membership = await DepartmentMember.findOneAndUpdate(
    {
      departmentId: '6a7c3f90b7abe2887c1d4f0a',
      userId: '64f2a1b2c3d4e5f6a7b8c9d0',
    },
    {
      role: 'hr',
      status: 'Active',
    },
    { upsert: true, new: true }
  );

  console.log('Membership created:', membership);
  await mongoose.disconnect();
}

run();
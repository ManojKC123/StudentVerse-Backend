const mongoose = require("mongoose");

await mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => console.log('Connected to MongoDB!')
);

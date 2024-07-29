import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://Todo:4321@cluster0.i7wm3rv.mongodb.net/';

export const ConnectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};



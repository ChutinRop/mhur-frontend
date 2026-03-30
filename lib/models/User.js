import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  discord_id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  global_name: {
    type: String
  },
  avatar: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  }
});

// En entornos Serverless de Vercel (HMR o múltiples instancias), Evitamos sobreescribir el modelo
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

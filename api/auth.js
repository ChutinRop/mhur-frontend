import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../lib/models/User.js';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
  } catch (err) {
    console.error('MongoDB connection error in Serverless:', err);
  }
};

export default async function handler(req, res) {
  // Configuración de CORS para la función Serverless
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder rápido a las peticiones pre-flight de CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 0. Conectar a la BDD reusando la conexión
    await connectDB();

    // Las variables en Vercel pueden estar precedidas o no de VITE_ en algunos entornos,
    // garantizamos leer cualquiera de las dos.
    const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || process.env.VITE_DISCORD_CLIENT_ID;
    const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET; // CRÍTICO
    const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || process.env.VITE_DISCORD_REDIRECT_URI;
    const JWT_SECRET = process.env.JWT_SECRET || 'mhur_super_secret_dev_key_2026';

    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Falta el código de autorización.' });
    }

    // 1. Intercambiar code por Access Token en Discord API (v10)
    const data = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: DISCORD_REDIRECT_URI
    });

    const tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      body: data.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'DiscordBot (https://mhur-frontend.vercel.app, 1.0.0)',
        'Accept': 'application/json'
      }
    });

    const tokenText = await tokenResponse.text();
    let tokenData = {};
    try {
      tokenData = JSON.parse(tokenText);
    } catch (e) {
      console.error('Discord API HTML (Token):', tokenText);
    }

    if (!tokenResponse.ok) {
      console.error('Vercel Discord Error:', tokenData);
      return res.status(400).json({ 
        error: `Error de Discord: ${tokenData.error_description || tokenData.error || 'Código Inválido'}`, 
        details: tokenData 
      });
    }

    const { access_token } = tokenData;

    // 2. Obtener el perfil del usuario logueado en Discord usando el Access Token
    const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'User-Agent': 'DiscordBot (https://mhur-frontend.vercel.app, 1.0.0)',
        'Accept': 'application/json'
      }
    });

    const userText = await userResponse.text();
    let userData = {};
    try {
      userData = JSON.parse(userText);
    } catch (e) {
      console.error('Discord API HTML (User):', userText);
    }

    if (!userResponse.ok) {
      return res.status(400).json({ error: 'No se pudo obtener el perfil de Discord desde Vercel.' });
    }

    const { id, username, global_name, avatar } = userData;

    // 3. Buscar o crear al usuario en la base de datos (MongoDB) vía Mongoose
    let user = await User.findOne({ discord_id: id });

    const avatarUrl = avatar 
      ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` 
      : 'https://cdn.discordapp.com/embed/avatars/0.png';

    if (user) {
      user.username = username;
      user.global_name = global_name || username;
      user.avatar = avatarUrl;
      user.last_login = Date.now();
      await user.save();
    } else {
      user = new User({
        discord_id: id,
        username: username,
        global_name: global_name || username,
        avatar: avatarUrl
      });
      await user.save();
    }

    // 4. Generar JWT para el usuario
    const token = jwt.sign(
      { 
        userId: user._id, 
        discord_id: user.discord_id, 
        username: user.global_name || user.username,
        avatar: user.avatar
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Enviar respuesta exitosa a la web
    return res.status(200).json({
      token,
      user: {
        id: user.discord_id,
        username: user.global_name || user.username,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Vercel Serverless Auth Error:', error);
    return res.status(500).json({ error: 'Error interno del Servidor Vercel durante la autenticación.' });
  }
}

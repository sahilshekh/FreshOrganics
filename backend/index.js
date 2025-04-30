const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://onlyfams-5fec4.firebaseio.com'
});

const db = admin.firestore();
const auth = admin.auth();

// User Authentication APIs
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });
    res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await auth.getUserByEmail(email);
    // In a real app, use Firebase Client SDK for login with token; here we just verify existence
    res.status(200).json({ uid: userCredential.uid, email: userCredential.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/logout', (req, res) => {
  // Logout is typically handled client-side; server-side can invalidate tokens if needed
  res.status(200).json({ message: 'Logout successful' });
});

// Product Management APIs
app.get('/api/products', async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  const { name, price, image, description } = req.body;
  try {
    const docRef = await db.collection('products').add({
      name,
      price,
      image,
      description,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ id: docRef.id, name, price, image, description });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cart Management APIs
app.post('/api/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cartRef = db.collection('carts').doc(userId);
    const doc = await cartRef.get();
    let cartItems = doc.exists ? doc.data().items || [] : [];

    const itemIndex = cartItems.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += quantity;
    } else {
      cartItems.push({ productId, quantity });
    }

    await cartRef.set({ items: cartItems, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    res.status(200).json({ userId, items: cartItems });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cartDoc = await db.collection('carts').doc(userId).get();
    if (!cartDoc.exists) {
      return res.status(200).json({ userId, items: [] });
    }
    res.status(200).json({ userId, items: cartDoc.data().items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/cart/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cartRef = db.collection('carts').doc(userId);
    const doc = await cartRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    let cartItems = doc.data().items || [];
    const updatedItems = cartItems.filter(item => item.productId !== productId);

    await cartRef.set({ items: updatedItems, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    res.status(200).json({ userId, items: updatedItems });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
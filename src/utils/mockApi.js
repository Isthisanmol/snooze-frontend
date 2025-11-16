const USERS = [
  { id: 'u1', email: 'manager@slooze.com', password: '123456', role: 'manager' },
  { id: 'u2', email: 'keeper@slooze.com', password: '123456', role: 'store-keeper' },
];

let PRODUCTS = [
  { id: 'p1', name: 'Rice', qty: 40, description: 'Long grain rice' },
  { id: 'p2', name: 'Wheat', qty: 25, description: 'Durum wheat' },
  { id: 'p3', name: 'Pulses', qty: 12, description: 'Mixed pulses' },
];

const wait = (ms = 200) => new Promise((res) => setTimeout(res, ms));

export async function loginUser(email, password) {
  await wait(300);
  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  // mock token
  return { token: 'fake-jwt-' + user.id, user: { id: user.id, email: user.email, role: user.role } };
}

export async function fetchProducts() {
  await wait(200);
  return PRODUCTS.slice();
}

export async function getProduct(id) {
  await wait(150);
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) throw new Error('Product not found');
  return { ...p };
}

export async function createProduct(payload) {
  await wait(200);
  const id = 'p' + (Math.random() * 100000 | 0);
  const p = { id, ...payload };
  PRODUCTS.unshift(p);
  return p;
}

export async function updateProduct(id, payload) {
  await wait(200);
  PRODUCTS = PRODUCTS.map((p) => (p.id === id ? { ...p, ...payload } : p));
  return PRODUCTS.find((p) => p.id === id);
}

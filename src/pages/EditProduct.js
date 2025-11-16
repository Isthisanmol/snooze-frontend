import  { useEffect, useState } from 'react';
import { getProduct, createProduct, updateProduct } from '../utils/mockApi';
import { useParams, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EditProduct({ isNew }) {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (!id) return;
    getProduct(id).then((p) => {
      setProduct(p);
      setName(p.name);
      setQty(p.qty);
      setDesc(p.description || '');
    }).finally(() => setLoading(false));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, { name, qty, description: desc });
      } else {
        await createProduct({ name, qty, description: desc });
      }
      navigate('/products');
    } catch (err) {
      alert(err.message || 'Error saving');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ p: 3, maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>{id ? 'Edit product' : 'Add product'}</Typography>
      <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Quantity" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} required />
        <TextField label="Description" multiline minRows={3} value={desc} onChange={(e) => setDesc(e.target.value)} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button type="submit" variant="contained">Save</Button>
          <Button variant="outlined" onClick={() => navigate('/products')}>Cancel</Button>
        </Box>
      </Box>
    </Paper>
  );
}

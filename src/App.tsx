import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import ProductDetail from './pages/ProductDetail';
import ProductCatalog from './pages/ProductCatalog';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartPage from './pages/CartPage';
import { useEffect } from 'react';
import { fetchCart } from './redux/features/cart/cartSlice';
import { useAppDispatch } from './hooks';
import CheckoutInformation from './pages/CheckoutInformation';
import CheckoutDispatch from './pages/CheckoutDispatch';
import CheckoutPayment from './pages/CheckoutPayment';


const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});


function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.toString();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  return (
    <>
      <QueryClientProvider client={client}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutInformation />} />
          <Route path='/checkout/dispatch' element={<CheckoutDispatch />} />
          <Route path='/checkout/payment' element={<CheckoutPayment />} />
          <Route path='/clothing/product/:productId' element={<ProductDetail />} />
          <Route key={key} path='/products/official-competition-uniforms' element={<ProductCatalog />} />
          <Route key={key} path='/products/clothing' element={<ProductCatalog />} />
          <Route key={key} path='/products/fan-articles' element={<ProductCatalog />} />
          <Route path='/products/new' element={<ProductCatalog />} />
          <Route path='/products/clothing/collections' element={<ProductCatalog />} />
          <Route path='/products/official-competition-uniforms/*' element={<ProductDetail />} />
          <Route path='/products/clothing/*' element={<ProductDetail />} />
          <Route path='/products/fan-articles/*' element={<ProductDetail />} />

          {/* <Route path='/new/product/:productId' element={<ProductDetail
        />} />
        <Route path='/clothing/product/:productId' element={<ProductDetail
        />} />
        <Route path='/fanArticles/product/:productId' element={<ProductDetail
        />} /> */}
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App

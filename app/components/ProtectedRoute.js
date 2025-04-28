'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');
  
    useEffect(() => {
      if (!orderId) {
        router.push('/');
      }
      // You could also verify the order ID exists in your database
    }, [orderId]);
    return orderId ? children : null;
};

export default ProtectedRoute;
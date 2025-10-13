import React from 'react';
import { Helmet } from 'react-helmet-async';

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Products - Velvet Hair Company</title>
        <meta name="description" content="Browse our complete collection of premium wigs and hair extensions." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <p>Products page coming soon...</p>
      </div>
    </>
  );
};

export default Products;
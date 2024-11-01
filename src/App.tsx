import { useEffect } from 'react'
import { Alert, CircularProgress } from '@mui/material'
import ChartComponent from './Component/chartComponent';
import SideNav from './Component/sideNav';
import React from 'react';


const App = () => {

  const [categoryData, setCategoryData] = React.useState<any>([]);
  const [productData, setProductData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);
  const [selectedProducts, setSelectedProducts] = React.useState<any>([]);
  const [chartData, setChartData] = React.useState({ categories: [], seriesData: [] });
  const [reportRun, setReportRun] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const jsonData = await response.json();
        setCategoryData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/products/category/smartphones ');
        const jsonData = await response.json();
        setProductData(jsonData.products);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, []);


  const handleProductData = (selectedProductTitles: any) => {
    const filteredProducts = productData.filter((product: any) =>
      selectedProductTitles.includes(product.title)
    );
    setSelectedProducts(filteredProducts);
    setReportRun(false);
  };

  const handleRunReport = (selectedCategory: any, selectedProducts: any[]) => {
    
    // If `selectedProducts` is empty, show all products within the selected category
    const filteredProducts = selectedProducts.length > 0 
      ? selectedProducts 
      : productData.filter((product: any) => product.category === selectedCategory);
  
    // Create categories and seriesData based on filtered products
    const categories = filteredProducts.map((product: any) => product.title);
    const seriesData = filteredProducts.map((product: any) => product.price);
  
    // Update chart data state
    setChartData({ categories, seriesData });
    setSelectedProducts(filteredProducts);
    setReportRun(true); 
  
  };
    

  useEffect(() => {
    if (categoryData.length > 0 && productData.length > 0) {
      const categories = categoryData;
      const seriesData = productData.map((product: any) => product.price);

      // If no products are selected, display pie chart data
      if (selectedProducts.length === 0) {
        setChartData({ categories, seriesData });
      }
    }
  }, [categoryData, productData, selectedProducts]);
  
  const clearChartFilters = () => {
    setSelectedProducts([]);
    setChartData({ categories: [], seriesData: [] });
    setReportRun(false);
  };

  console.log("cat", categoryData)


  return (
    <div className="container-fluid">
      {isLoading  ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress size="10rem" />
        </div>
      ) : (
        <div className="mt-5 mx-5 row vh-100">
          <div className="col-md-3 border">
            <SideNav 
              categoryList={categoryData} 
              products={productData} 
              onSelectValue={handleProductData} 
              onClearFilters={clearChartFilters} 
              onRunReport={handleRunReport} 
              reportRun={reportRun} 
            />
          </div>
          <div className="col-md-9">
            <div className="mt-5 pt-5">
              <ChartComponent
                categories={chartData.categories} 
                seriesData={chartData.seriesData} 
                reportRun={reportRun} 
              />
            </div>
          </div>
          {error && (
            <Alert severity="error" style={{ marginTop: '10px' }}>
              {error.message || "An error occurred"}
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}

export default App
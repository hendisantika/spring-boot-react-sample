import { useEffect, useState } from 'react';
import ProductService from "../api/ProductService";

export const useProductList = () => {
  const [data, setData] =  useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("")

  useEffect(() => {
    ProductService.getAllProducts().then((response) => {
      setData(response.data);
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
      setErr("There is error")
    });
  }, [])

  return {
    data,
    isLoading,
    err,
  }
} 

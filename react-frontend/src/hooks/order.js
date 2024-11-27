import { useEffect, useState } from 'react';
import OrderService from "../api/OrderService";

export const useOrderList = () => {
  const [data, setData] =  useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("")

  useEffect(() => {
    OrderService.getAllOrders().then((response) => {
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

import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopConxt';
import axios from 'axios';
import { toast } from 'react-toastify';

// Function to load Razorpay dynamically
const loadRazorpay = async () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => resolve(null);
    document.body.appendChild(script);
  });
};

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Function to initialize Razorpay payment
  const initPay = async (order) => {
    try {
      const Razorpay = await loadRazorpay();
      if (!Razorpay) {
        toast.error('Failed to load Razorpay. Please try again.');
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Order Payment',
        description: 'Order Payment',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response) => {
          try {
            const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, { headers: { token } });
            if (data.success) {
              navigate('/orders');
              setCartItems({});
              toast.success('Payment successful! Order placed.');
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            console.error(error);
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error('Payment initialization failed.');
    }
  };

  // Function to handle order submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItems = [];
      Object.keys(cartItems).forEach((itemId) => {
        Object.keys(cartItems[itemId]).forEach((size) => {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
              orderItems.push({
                ...itemInfo,
                size,
                quantity: cartItems[itemId][size],
              });
            }
          }
        });
      });

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      let response;
      if (method === 'cod') {
        response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
      } else if (method === 'razorpay') {
        response = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } });
      }

      if (response.data.success) {
        if (method === 'razorpay') {
          initPay(response.data.order);
        } else {
          setCartItems({});
          navigate('/orders');
          toast.success('Order placed successfully!');
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Order submission failed.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
      </div>

      {/* Right Side - Payment */}
      <div className="mt-8">
        <CartTotal />
        <Title text1={'Payment'} text2={'method'} />
        <div className="flex gap-3 flex-col lg:flex-row">
          <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
          </div>
          <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
            <p className="text-gray-500 text-sm font-medium mx-4">Cash On Delivery</p>
          </div>
        </div>
        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">Place Order</button>
      </div>
    </form>
  );
};

export default PlaceOrder;

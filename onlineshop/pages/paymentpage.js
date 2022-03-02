const id = "rzp_test_fvPHjqq665nlyW";
import Script from "next/script";
const secret = "JiQSwUkRqudo0NfidN7Tjd0k";
import { useEffect } from "react";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/router";
import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../hooks/useFetch";
export default function Paymentpage() {
  const Razorpay = useRazorpay();
  const router = useRouter();
  useEffect(() => {
    if (!router.query.id) return;
    const orderId = router.query.id;
    const options = {
      key: id,
      amount: "3000",
      currency: "INR",
      name: "Forty 5",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      handler: (res) => {
        console.log(res);
        const reqObj = { ...res };
        const request = requestBuilder(getAuthHeaders(), "POST", null, reqObj);
        fetch(
          "https://shopfortyfive.herokuapp.com/api/payment/payment_details",
          request
        )
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            console.log(" status ---- > " + res.status);
          })
          .catch((err) => console.log(err));
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  }, [router.query.id]);
  return <div>Loading....</div>;
}

export default [

  {
    label: "Vishnu",
    iconRight:"",
    iconLeft: "",
    type: "dropdown",
    dropdown: [
      { primaryLabel: "MyProfile", count : 0 },
      { primaryLabel: "Orders", count : 0 },
      { primaryLabel: "Wishlist", count : 7 },
      { primaryLabel: "My Chats", count : 0 },
      { primaryLabel: "Coupons", count : 3 },
      { primaryLabel: "Notifications", count : 5 },
      { primaryLabel: "Logout", count : 0 }
    ],
  },
  {
    label: "More",
    iconRight:"",
    iconLeft: "",
    type: "dropdown",
    dropdown: [
      { primaryLabel: "Notification Preference", count : 0 },
      { primaryLabel: "24x7 Customer Care", count : 0 },
      { primaryLabel: "Download App", count : 0 }
    ],
  },
  {
    label: "Cart",
    iconRight:false,
    iconLeft: true,
    type: "button",
  }
];

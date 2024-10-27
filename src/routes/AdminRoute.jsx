import React from 'react'

const AdminRoute = () =>  {
    // api call
    // redux-store ->  user login
  
    const isSignedIn = true;
    const isAdmin = true;
    return isSignedIn && isAdmin ? <Outlet /> : <SignIn />;
  };

export default AdminRoute;
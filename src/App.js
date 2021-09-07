import React, { useCallback, useEffect } from 'react';
import './App.css';
import Navigation from './pages/Navigation';
import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { authCheckState, getCourses, getCarts } from './redux/actions';


function App() {

  const status = useSelector(({ auth }) => auth.autoLogin);

  const dispatch = useDispatch();

  const setCources = useCallback(() => { dispatch(getCourses()); }, [dispatch]);

  const setCarts = useCallback(() => { dispatch(getCarts()); }, [dispatch]);


  const statusCheck = useCallback(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  useEffect(() => {
    if (!status) {
      statusCheck();
    }
    if (status) {
      setCarts();
    }
    setCources();
  }, [status, statusCheck, setCources, setCarts]);

  return (
    <>
      <div>
        <Navigation />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router />
      </div>
    </>
  );
}

export default App;

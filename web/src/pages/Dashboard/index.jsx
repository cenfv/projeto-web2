import { Footer } from '../../components/Footer';
import { DashboardNavBar } from '../../components/DashboardNavBar';
import { useEffect, useState } from 'react';
import Axios from 'axios';

export function Dashboard() {
  const [text, setText] = useState('');
  useEffect(() => {
    Axios.get('http://localhost:3001/auth', {
      headers: {
        authorization: localStorage.getItem('authorization'),
      },
    }).then((response) => {
      if (response.status === 200 || response.statusText === 'OK') {
        setText(response.data.user.firstName);
        console.log(response.data.user.firstName);
      }
    });
  }, []);

  return (
    <div>
      <DashboardNavBar text={text} />

      <div className="mb-5 fixed left-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

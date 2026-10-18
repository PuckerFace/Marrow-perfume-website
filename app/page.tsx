import Cursor from '../components/Cursor';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Story from '../components/Story';
import Discovery from '../components/Discovery';
import Purchase from '../components/Purchase';
import Checkout from '../components/Checkout';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
export default function Page() {
  return (
    <main>
      <Loader />
      <Cursor />
      <Nav />
      <Hero />
      <Story />
      <Discovery />
      <Purchase />
      <Footer />
      <Checkout />
    </main>
  );
}

import Head from 'next/head'
import Image from 'next/image'


export default function App() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: 'window.location.href = "/app/index.html"' }}></script>
    </>
  );
}

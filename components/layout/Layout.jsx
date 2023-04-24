import Head from "next/head";
const Layout = ({ children }) => {

  return (
    <>
      <Head>
        <title>Activades Generales</title>
      </Head>

      <div className="container shadow pt-1 mt-2 bg-white rounded" style={{ minHeight: '90vh' }}>

        {children}

      </div>

    </>
  );
};

export default Layout;

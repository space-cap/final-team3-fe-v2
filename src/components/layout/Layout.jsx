import Header from './Header';

const Layout = ({ children, showHeader = true }) => {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <Header />}
      <main className={showHeader ? 'container mx-auto px-6 py-6' : 'h-screen'}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
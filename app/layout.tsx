export const metadata = { title: 'GTE Mint Starter', description: 'Polygon mint demo' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily:'system-ui, Arial, sans-serif', color:'#f5f5f5', background:'#111', padding:'24px' }}>
        {children}
      </body>
    </html>
  );
}
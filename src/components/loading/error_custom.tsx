export function ErrorCustom() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        fontFamily: 'Arial, sans-serif',
        color: '#ff4d4f',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Data loading error
      </h1>
      <p>
        The system was unable to load the data. Please check your network
        connection or try again later.
      </p>
    </div>
  );
}

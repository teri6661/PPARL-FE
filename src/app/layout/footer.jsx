export default function Sidebar() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 text-sm-end">
            {year} © PPEARL.
          </div>
        </div>
      </div>
    </footer>
  );
};
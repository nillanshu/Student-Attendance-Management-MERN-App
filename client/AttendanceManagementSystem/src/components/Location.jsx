const Location = ({location}) => {

  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">{location.currentPage}</h1>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href={location.route}>Home</a></li>
        <li className="breadcrumb-item active" aria-current="page">{location.currentPage}</li>
      </ol>
    </div>
  );
}

export default Location;
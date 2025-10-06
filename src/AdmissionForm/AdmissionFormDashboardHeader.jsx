import schoollogo from '../Dashboard/Img/Universitylogo.jpeg';

function AdmissionFormDashboardHeasder(){

    return(
        <>
         {/* HEADER */}
      <div>
        {/* Logo & Name */}
       <div className="d-flex align-items-center gap-3">
  <img
    src={schoollogo}
    alt="Logo"
    style={{ width: '50px', height: '50px', borderRadius: '8px' }}
  />
  <h4 className="m-0">The Pune School</h4>
  <p className="m-0 ms-3">
    Name: {sessionStorage.getItem("name")} &nbsp;|&nbsp; Email: {sessionStorage.getItem("email")}
  </p>
</div>
</div>
        </>
    );
}

export default AdmissionFormDashboardHeasder;
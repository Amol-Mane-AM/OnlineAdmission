
function GoverningBody() {
    return (
        <div>
            <section className="container hero-section position-relative">
         {/* <div className="bg-primary" style={{height: 50}}></div> */}
  <div className="blue-header" style={{ height: '50px' , alignItems: 'center', display: 'flex', justifyContent: 'center'}}> 
    <h2>Governing Body Members</h2>
  </div>

  
  <div className="container">
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name of the Members</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Mr. Joe Flynn</td><td>The Federation CEO</td></tr>
          <tr><td>Sr. Bobina Soares</td><td>Director</td></tr>
          <tr><td>Ms. June Amanna</td><td>Principal</td></tr>
          <tr><td>Sr. Sarala Christi</td><td>Vice-Principal</td></tr>
          <tr><td>Ms. Ulfath Jahan</td><td>Secretary</td></tr>
          <tr><td>Sr. Effie Fernandes</td><td>Staff Representative</td></tr>
          <tr><td>Ms. Binu Paul</td><td>Staff Representative</td></tr>
          <tr><td>Ms. Bridget Shakesy</td><td>Parent Representative</td></tr>
          <tr><td>Ms. Alam Mansoor</td><td>Parent Representative</td></tr>
          <tr><td>Mrs. Joe Reji</td><td>Parent Representative</td></tr>
          <tr><td>Mr. Falak Naz Khan</td><td>Parent Representative</td></tr>
          <tr><td>Ms. Fathima Shakira Rizwan</td><td>Parent Representative</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  </section>
        </div>
    );
}
export default GoverningBody;
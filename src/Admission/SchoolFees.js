
function SchoolFees() {
    return (
          
    <div class="container hero-section position-relative">
    <div className="fees-header">
      <h3>School Fees</h3>
      <p><strong>ACCOUNTS – Fee Counter Timings:</strong> 8:00 a.m. to 1:00 p.m. (Monday to Thursday)<br/>
         8:30 a.m. to 11:30 a.m. (Saturday)</p>
      <p><strong>Registration FEE – 500 Rs.</strong></p>
    </div>

    
    <div className="table-container">
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Grade</th>
            <th>Term 1<br/>(Incl. of Books)</th>
            <th>Term 2 Tuition Fee </th>
            <th>Term 3 Tuition Fee </th>
            <th>Annual Fee </th>
          </tr>
        </thead>
        <tbody>
          <tr><td>FS1</td><td>3,662</td><td>2,462</td><td>2,462</td><td>8,586</td></tr>
          <tr><td>FS2</td><td>3,804</td><td>2,462</td><td>2,462</td><td>8,728</td></tr>
          <tr><td>Year 1</td><td>3,912</td><td>2,463</td><td>2,463</td><td>8,838</td></tr>
          <tr><td>Year 2</td><td>4,671</td><td>2,676</td><td>2,676</td><td>10,023</td></tr>
          <tr><td>Year 3</td><td>4,658</td><td>2,670</td><td>2,670</td><td>9,998</td></tr>
          <tr><td>Year 4</td><td>4,658</td><td>2,670</td><td>2,670</td><td>9,998</td></tr>
          <tr><td>Year 5</td><td>4,767</td><td>2,676</td><td>2,676</td><td>10,119</td></tr>
          <tr><td>Year 6</td><td>5,455</td><td>3,191</td><td>3,191</td><td>11,837</td></tr>
          <tr><td>Year 7</td><td>5,545</td><td>3,184</td><td>3,184</td><td>11,913</td></tr>
          <tr><td>Year 8</td><td>7,275</td><td>4,331</td><td>4,331</td><td>15,937</td></tr>
          <tr><td>Year 9</td><td>7,376</td><td>4,331</td><td>4,331</td><td>16,038</td></tr>
        </tbody>
      </table>
    </div>

     
    <h5 className="mt-5">Transport Fee</h5>
    <div className="table-container">
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Route</th>
            <th>Term 1 </th>
            <th>Term 2 </th>
            <th>Term 3 </th>
            <th>Annual Fee </th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Sharjah</td><td>1,520</td><td>1,140</td><td>1,140</td><td>3,800</td></tr>
          <tr><td>Ajman</td><td>1,600</td><td>1,200</td><td>1,200</td><td>4,000</td></tr>
        </tbody>
      </table>
    </div>

    
    <div className="note">
      <p><strong>Please note that the revised Tuition Fee and Transport Fee is</strong><b/>
      <strong> effective from the academic year 2024-2025,</strong>
      <strong> as per the approval of the Ministry of Education</strong></p>
      <p>All fees are inclusive of VAT.</p>
      
    </div>
  </div>

    );
}

export default SchoolFees;
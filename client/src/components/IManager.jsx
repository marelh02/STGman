import { Intern } from './Intern';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


function IForm() {

  function test() {
    //famName,name,sex,cin,school,nBadge,service,site,Mentor,intershipStartDate,duration
    let x = new Intern(document.getElementById("fname").value,
      document.getElementById("name").value,
      document.getElementById("sm").checked ? "Male" : "Female",
      document.getElementById("cin").value,
      document.getElementById("school").value,
      document.getElementById("mat").value,
      document.getElementById("iService").value,
      document.getElementById("iSite").value,
      document.getElementById("mentor").value,
      document.getElementById("intershipStartDate").value,
      document.getElementById("duration").value
    );
    console.log("The intern adding request had been sent to the server");
    axios.post('http://localhost:4000/interMan/addIntern', x).then(res => console.log(res.data));
    window.location.reload(false);
  }

  function servicesSwap(site, lis) {
    let res = [];
    for (let x of lis) {
      if (x.site === site) res.push(x);
    }
    return res;
  }

  const [siteslis, setSiteslis] = useState([]);
  const [serviceslis, setServiceslis] = useState([]);
  const [siteServices, setSS] = useState([]);

  useEffect(() => {
    async function fetchSiteData() {
      axios.get('http://localhost:4000/interMan/allSites')
        .then(response => {
          setSiteslis(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    fetchSiteData();
  }, []);

  useEffect(() => {
    async function fetchServiceData() {
      axios.get('http://localhost:4000/interMan/allServices')
        .then(response => {
          setServiceslis(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    fetchServiceData();
  }, []);

  useEffect(
    () => setSS(servicesSwap(document.getElementById("iSite").value, serviceslis)),
    [serviceslis, siteslis]
  );

  return (
    <div className="container">
      <div className="mb-3 mt-3">
        <label htmlFor="fname" className="form-label">Family name:</label>
        <input type="text" className="form-control" id="fname" placeholder="Enter family name" name="fname" />

        <label htmlFor="name" className="form-label">Personal name:</label>
        <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" />

        {/* Sex */}
        <label className="form-check-label">Sex:</label>
        <div className="form-check">
          <input type="radio" className="form-check-input" id="sm" name="sex" value="m" defaultChecked={true} />
          <label className="form-check-label" htmlFor="sm">Male</label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" id="sf" name="sex" value="f" />
          <label className="form-check-label" htmlFor="sf">Female</label>
        </div>

        <label htmlFor="cin" className="form-label">CIN:</label>
        <input type="text" className="form-control" id="cin" placeholder="Enter CIN" name="cin" />

        <label htmlFor="school" className="form-label">School:</label>
        <input type="text" className="form-control" id="school" placeholder="Enter school" name="school" />

        <label htmlFor="mat" className="form-label">Badge number:</label>
        <input type="text" className="form-control" id="mat" placeholder="Enter BN" name="mat" />

        <label htmlFor="iSite" className="form-label">Select the site:</label>
        <select className="form-select" id="iSite" name="iSite" onChange={() => setSS(servicesSwap(document.getElementById("iSite").value, serviceslis))}>
          {siteslis.map(x => <option key={x._id} value={x._id}>{x.name}</option>)}
        </select>

        <label htmlFor="iService" className="form-label">Select the service:</label>
        <select className="form-select" id="iService" name="iService">
          {siteServices.map(x => <option key={x._id} value={x._id}>{x.name}</option>)}
        </select>

        <label htmlFor="mentor" className="form-label">Select the mentor:</label>
        <input type="text" className="form-control" id="mentor" placeholder="Enter the mentor" name="mentor" />

        <label htmlFor="duration" className="form-label">Intership duration:</label>
        <input type="number" className="form-control" id="duration" placeholder="Enter the duration" name="duration" min={30} />

        <label htmlFor="intershipStartDate" className="form-label">Start date:</label>
        <input type="date" className="form-control" id="intershipStartDate" name="Enter the start date"></input>

      </div>

      <button type="submit" className="btn btn-primary" onClick={test}>Submit</button>
    </div>
  );
}

function IRow(props) {
  let x = props.intern;
  function editEvent(spec) {
    document.getElementById("fname").value = document.querySelector("tr#" + spec + " > td.Rfname").innerText;
    document.getElementById("name").value = document.querySelector("tr#" + spec + " > td.Rname").innerText;
    //sex
    if (document.querySelector("tr#" + spec + " > td.Rsex") === "Male") {
      document.getElementById("sm").checked = true;
      document.getElementById("sf").checked = false;
    } else {
      document.getElementById("sm").checked = false;
      document.getElementById("sf").checked = true;
    }
    document.getElementById("cin").value = document.querySelector("tr#" + spec + " > td.Rcin").innerText;
    document.getElementById("school").value = document.querySelector("tr#" + spec + " > td.Rschool").innerText;
    document.getElementById("mat").value = document.querySelector("tr#" + spec + " > td.R_id").innerText;
    document.getElementById("mat").readOnly = true;
    // document.getElementById("iService").value = document.querySelector("tr#"+spec+" > td.RiService").innerText;
    // document.getElementById("iSite").value = document.querySelector("tr#"+spec+" > td.RiSite").innerText;
    document.getElementById("mentor").value = document.querySelector("tr#" + spec + " > td.Rmentor").innerText;
    document.getElementById("intershipStartDate").value = document.querySelector("tr#" + spec + " > td.RintershipStartDate").innerText;
    document.getElementById("duration").value = document.querySelector("tr#" + spec + " > td.Rduration").innerText;
  }

  function delEvent(id) {
    axios.delete('http://localhost:4000/interMan/rmIntern/' + id)
      .then(response => {
        window.location.reload(false);
        console.log("Intern removed successfully");
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <tr id={x._id}>
      <td className="Rfname">{x.fname}</td>
      <td className="Rname">{x.name}</td>
      <td className="Rsex">{x.sex}</td>
      <td className="Rcin">{x.cin}</td>
      <td className="Rschool">{x.school}</td>
      <td className="R_id">{x._id}</td>
      <td className="Rservice">{x.service}</td>
      <td className="Rsite">{x.site}</td>
      <td className="Rmentor">{x.mentor}</td>
      <td className="Rduration">{x.duration}</td>
      <td className="RintershipStartDate">{x.startDate}</td>
      <td className="RintershipEndDate">{x.endDate}</td>
      <td std={x._id}>
        {/* <button type="button" className="btn btn-info btn-sm">Info</button> */}
        <button to="#infoForm" onClick={(e) => editEvent(e.target.parentNode.getAttribute("std"))} type="button" className="btn btn-warning btn-sm">edit</button>
        <button type="button" onClick={(e) => delEvent(e.target.parentNode.getAttribute("std"))} className="btn btn-danger btn-sm">delete</button>
        <Link to={"/Profil/" + x._id} className="btn btn-info btn-sm">view </Link>
      </td>
    </tr>
  );
}

function IList() {

  const [lis, setLis] = useState([]);
  useEffect(() => {
    async function fetchData() {
      axios.get('http://localhost:4000/interMan/allInterns')
        .then(response => {
          setLis(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    fetchData();
  }, [lis]);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Familyname</th>
          <th>Name</th>
          <th>Sexe</th>
          <th>CIN</th>
          <th>Ecole</th>
          <th>Badge</th>
          <th>Service</th>
          <th>Site</th>
          <th>Mentor</th>
          <th>DuréeDeStage</th>
          <th>DateDébut</th>
          <th>DateFin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {lis.map(x => <IRow intern={x} key={x._id} />)}
      </tbody>
    </table>
  );
}

function IManager() {

  return (
    <>
      <h2 id="infoForm">Information form</h2>
      <IForm />
      <br /><br />
      <h2>Interns list</h2>
      <IList />
      <br /><br />
    </>
  );
}

export default IManager;
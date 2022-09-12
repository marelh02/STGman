import { Service } from "./Service";
import { Site } from "./Site";
import axios from 'axios';
import { useState, useEffect } from "react";


///////////////////////////////////////Sites management components//////////////////////////////////////////////////////////////
function SiteForm() {
    function siteSub() {
        let x = new Site(document.getElementById("sname").value,
            document.getElementById("scode").value,
            document.getElementById("schief").value);
        console.log("The site adding request had been sent to the server");
        axios.post('http://localhost:4000/interMan/addSite', x).then(res => console.log(res.data));
        window.location.reload(false);
    }
    return (
        <div className="container">
            <div className="mb-3 mt-3">
                <label htmlFor="sname" className="form-label">Site name:</label>
                <input type="text" className="form-control" id="sname" placeholder="Enter site name" name="sname" />

                <label htmlFor="scode" className="form-label">Site code:</label>
                <input type="text" className="form-control" id="scode" placeholder="Enter site code" name="scode" />

                <label htmlFor="schief" className="form-label">Site chief:</label>
                <input type="text" className="form-control" id="schief" placeholder="Enter chief name" name="schief" />

            </div>

            <button type="submit" className="btn btn-primary" onClick={siteSub}>Submit</button>

        </div>
    );
}

function SiteList() {

    const [sitelis, setSitelis] = useState([]);
    useEffect( () => {
        async function fetchSiteData() {
            axios.get('http://localhost:4000/interMan/allSites')
                .then(response => {
                    setSitelis(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchSiteData();
    }, [sitelis]);

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Chief</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sitelis.map(x =><SiteRow site={x} key={x._id} />)}
            </tbody>
        </table>
    );
}

function SiteRow(props) {
    let x = props.site;

    function delSiteEv(id){
        axios.delete('http://localhost:4000/interMan/rmInternsBySite/' + id)
      .then(response => {
        console.log("Interns from this site removed successfully");
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.delete('http://localhost:4000/interMan/rmServicesBySite/' + id)
      .then(response => {
        console.log("Services from this site removed successfully");
      })
      .catch(function (error) {
        console.log(error);
      })

        axios.delete('http://localhost:4000/interMan/rmSite/' + id)
      .then(response => {
        window.location.reload(false);
        console.log("Site removed successfully");
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    return (
        <tr id={x._id}>
            <td className="R_id">{x._id}</td>
            <td className="Rname">{x.name}</td>
            <td className="Rchef">{x.chef}</td>
            <td st={x._id}><button type="button" onClick={(e) => delSiteEv(e.target.parentNode.getAttribute("st"))} className="btn btn-danger">Delete</button></td>
        </tr>
    );
}

function SiteManager() {

    return (
      <>
        <h2>Sites information form:</h2>
        <SiteForm/>
        <br /><br />
        <h2>Sites list:</h2>
        <SiteList/>
        <br /><br />
      </>
    );
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////Services management components//////////////////////////////////////////////////////////////
function ServiceForm() {

    const [siteslis, setSiteslis] = useState([]);
    useEffect( () => {
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
    }, [siteslis]);

    function serSub() {
        let x = new Service(document.getElementById("sername").value,
        document.getElementById("sercode").value,
        document.getElementById("sersite").value,
        document.getElementById("serchief").value);
        console.log("The service adding request had been sent to the server");
        axios.post('http://localhost:4000/interMan/addService', x).then(res => console.log(res.data));
        window.location.reload(false);
    }
    return (
        <div className="container">
            <div className="mb-3 mt-3">

                <label htmlFor="sername" className="form-label">Service name:</label>
                <input type="text" className="form-control" id="sername" placeholder="Enter service name" name="sername" />

                <label htmlFor="sercode" className="form-label">Site code:</label>
                <input type="text" className="form-control" id="sercode" placeholder="Enter service code" name="sercode" />

                <label htmlFor="sersite" className="form-label">Select the site:</label>
                <select className="form-select" id="sersite" name="sersite">
                    {siteslis.map(x=><option key={x._id} value={x._id}>{x.name}</option>)}
                </select>

                <label htmlFor="serchief" className="form-label">Site chief:</label>
                <input type="text" className="form-control" id="serchief" placeholder="Enter chief name" name="serchief" />

            </div>

            <button type="submit" className="btn btn-primary" onClick={serSub}>Submit</button>

        </div>
    );
}

function ServiceList() {

    const [serlis, setSerlis] = useState([]);
    useEffect( () => {
        async function fetchSerData() {
            axios.get('http://localhost:4000/interMan/allServices')
                .then(response => {
                    setSerlis(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchSerData();
    }, [serlis]);

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Site</th>
                    <th>Chief</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {serlis.map(x =><SerRow service={x} key={x._id} />)}
            </tbody>
        </table>
    );
}

function SerRow(props) {

    let x = props.service;

    function delSerEv(id){
        axios.delete('http://localhost:4000/interMan/rmInternsByService/' + id)
      .then(response => {
        console.log("Interns from this service removed successfully");
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.delete('http://localhost:4000/interMan/rmService/' + id)
      .then(response => {
        window.location.reload(false);
        console.log("Service removed successfully");
      })
      .catch(function (error) {
        console.log(error);
      })

    }
    return (
        <tr id={x._id}>
            <td className="Rs_id">{x._id}</td>
            <td className="Rsname">{x.name}</td>
            <td className="Rsname">{x.site}</td>
            <td className="Rschef">{x.chef}</td>
            <td st={x._id}><button type="button" onClick={(e) => delSerEv(e.target.parentNode.getAttribute("st"))} className="btn btn-danger">Delete</button></td>
        </tr>
    );
}

function ServiceManager() {

    return (
      <>
        <h2>Services information form:</h2>
        <ServiceForm/>
        <br /><br />
        <h2>Services list:</h2>
        <ServiceList/>
        <br /><br />
      </>
    );
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CompanyOrg() {

    return (
      <>
        <h1 className="text-center">Safi OCP group information manager</h1>
        <br /><br />
        <SiteManager/>
        <br/>
        <ServiceManager/>
      </>
    );
  }
  
  export default CompanyOrg;
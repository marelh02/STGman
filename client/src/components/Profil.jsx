import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import pdfunc from './PDFunc';

function Profil() {

    const params=useParams();
    let interId=params.interId;
    const [x,setx]=useState({});
    useEffect( () => {
        async function fetchData(id) {
            axios.get('http://localhost:4000/interMan/intern/'+id)
                .then(response => {
                    setx(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData(interId);
    }, [interId]);

    //(sex,fullName,school,service,site,start,end,mentor)
    let handler=()=>pdfunc(x.sex,x.fname+" "+x.name,x.school,x.service,x.site,x.startDate,x.endDate,x.mentor);

    return (
        <div className="container mt-3">
            <h1>Fiche du stagiaire:</h1><br/><br/>
            <div className="card">

                <div className="card-header">
                    <h3>Informations personnels:</h3>
                    {/* <img className="card-img-top" src="" alt="Card image" style={"width:100%"}></img> */}
                    <span className="h4">Nom:   </span><span className="h5">{x.fname}</span><br />
                    <span className="h4">Prénom:   </span><span className="h5">{x.name}</span><br />
                    <span className="h4">Sexe:   </span><span className="h5">{x.sex}</span><br />
                    <span className="h4">CIN:   </span><span className="h5">{x.cin}</span><br />
                    <span className="h4">Ecole:   </span><span className="h5">{x.school}</span><br />
                </div>

                <div className="card-body">
                    <h3>Informations professionnels:</h3>
                    <span className="h4">Numéro du badge:   </span><span className="h5">{x._id}</span><br />
                    <span className="h4">Service affecté:   </span><span className="h5">{x.service}</span><br />
                    <span className="h4">Site:   </span><span className="h5">{x.site}</span><br />
                    <span className="h4">Encadrant:   </span><span className="h5">{x.mentor}</span><br />
                </div>
                
                <div className="card-footer">
                    <h3>Chronologie du stage:</h3>
                    <span className="h4">Durée du stage:   </span><span className="h5">{x.duration}</span><br />
                    <span className="h4">Date de début:   </span><span className="h5">{x.startDate}</span><br />
                    <span className="h4">Date de fin:   </span><span className="h5">{x.endDate}</span><br />
                </div>

            </div>
            <br/>            
            <button type="button" className="btn btn-success" onClick={handler}>Imprimer fiche de stage</button>
            <br/><br/>
        </div>
    );
}

export default Profil;
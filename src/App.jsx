import { useState } from "react";

export default function App() {
	const [code, setCode] = useState("hu");
	const [country, setCountry] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	function checkResponse(res) {
		if (!res.ok) {
			throw(new Error("Hibás országkód!"));
		}
		return(res.json());
	}
	
	function loadCountry() {
		setLoading(true);
		setError("");
		setCountry(null);

		fetch("https://restcountries.com/v3.1/alpha/" + code).then(checkResponse).then(function (data) {
			setCountry(data[0]);
		})
		.catch(function (err) {
			setError(err.message);
		})
		.finally(function () {
			setLoading(false);
		});
	}
	
	function showObject(obj) {
		if (!obj) {
			return(<div>Nincs adat</div>);
		}
		
		let arr = [];
		for (var key in obj) {
			arr.push(<div key={key} className="p-2 mb-2"><b>{key}:</b> {JSON.stringify(obj[key])}</div>);
		}
		return(<div>{arr}</div>);
	}
	
	function tombMegjelenites(arr) {
		if (!arr || arr.length === 0) {
			return("Nincs adat");
		}
		let text = "";
		for (let i = 0; i < arr.length; i++) {
			text += arr[i];
			if (i < arr.length - 1) {
				text += ", ";
			}
		}
		return(text);
	}




return(
<div className="container mt-4">
<h1 className="text-center">Ország adatok API</h1>

<div className="input-group mb-3 w-50 mx-auto mt-4">
<span className="input-group-text">Kód</span>
<input className="form-control" value={code} onChange={function (e) { setCode(e.target.value); }}/>
<button className="btn btn-primary" onClick={loadCountry}>Lekérdezés</button>
</div>

{country && (
	<div>
		<div className="text-center">
			<img src={country.flags.svg} alt="zászlaj" style={{ width: "400px", border: "5px solid #ccc" }}/>
			<h2 className="mt-3">Általános név: {country.name.common}</h2>
			<p>Ország név: {country.name.official}</p>
		</div>

		<div className="card p-3 mt-4">
			<h4>Általános adatok</h4>
			<p><b>Főváros:</b> {country.capital}</p>
			<p><b>Régió:</b> {country.region}</p>
			<p><b>Alrégió:</b> {country.subregion}</p>
			<p><b>Népesség:</b> {country.population}</p>
			<p><b>Terület:</b> {country.area} km2</p>
			<p><b>Időzónák:</b> {tombMegjelenites(country.timezones)}</p>
			<p><b>Kontinens:</b> {tombMegjelenites(country.continents)}</p>
			<p><b>Határos országok:</b> {tombMegjelenites(country.borders)}</p>
		</div>

		<div className="card p-3 mt-4">
			<h4>Az ország pénzneme</h4>
			{showObject(country.currencies)}
		</div>

		<div className="card p-3 mt-4">
			<h4>Nyelvek</h4>
			{showObject(country.languages)}
		</div>

		<div className="card p-3 mt-4">
			<h4>Az ország neve más nyelven</h4>
			<div style={{ maxHeight: "300px", overflowY: "auto" }}>
				{showObject(country.translations)}
			</div>
		</div>

		<div className="card p-3 mt-4">
			<h4>További adatok amik megmaradtak a lekérdezésből</h4>
			{showObject({cca2: country.cca2, cca3: country.cca3, ccn3: country.ccn3, cioc: country.cioc, independent: country.independent, unMember: country.unMember, startOfWeek: country.startOfWeek, tld: country.tld, postalCode: country.postalCode })}
		</div>
	</div>
)}</div>);}
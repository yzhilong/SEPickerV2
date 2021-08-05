import React, { useState, useEffect } from "react"
import EssentialModulesSelector from "../components/selector_components/EssentialModuleSelector"
import OptionalModulesSelector from "../components/selector_components/OptionalModuleSelector"
import ContinentSelector from "../components/selector_components/ContinentSelector"
import SchoolSelector from "../components/selector_components/SchoolSelector"
import CountrySelector from "../components/selector_components/CountrySelector"
import Results from "../components/selector_components/Results"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';



import './Selector.css'

import { Collapse, Table, TableCell, Paper, Grid, Card, Typography, CircularProgress } from '@material-ui/core'
import { sizing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
	
function Selector(props) {
		// const [essentialModules, setEssentialModules] = useState(new Set())
		// const [optionalModules, setOptionalModules] = useState(new Set())
		// const [continents, setContinents] = useState(new Set())
		// const [countries, setCountries] = useState(new Set())
		// const [schools, setSchools] = useState(new Set())

		const [selectedEssentialModules, setSelectedEssentialModules] = useState(
			"selectedEssentialModules" in localStorage 
				? JSON.parse(localStorage.getItem("selectedEssentialModules"))
				: []
			)
		const [selectedOptionalModules, setSelectedOptionalModules] = useState(
			"selectedOptionalModules" in localStorage 
				? JSON.parse(localStorage.getItem("selectedOptionalModules"))
				: []
			)
		const [selectedContinents, setSelectedContinents] = useState(
			"selectedContinents" in localStorage 
				? JSON.parse(localStorage.getItem("selectedContinents"))
				: []
			)
		const [selectedCountries, setSelectedCountries] = useState(
			"selectedCountries" in localStorage 
				? JSON.parse(localStorage.getItem("selectedCountries"))
				: []
			)
		const [selectedSchools, setSelectedSchools] = useState(
			"selectedSchools" in localStorage 
				? JSON.parse(localStorage.getItem("selectedSchools"))
				: []
			)


		const [result, setResult] = useState({});
		const [loading, setLoading] = useState(false);
		const body = {
				essential_modules: selectedEssentialModules,
				optional_modules: selectedOptionalModules,
				schools: selectedSchools,
				countries: selectedCountries,
				continents: selectedContinents
			}

		localStorage.setItem("selectedEssentialModules", JSON.stringify(selectedEssentialModules))
		localStorage.setItem("selectedOptionalModules", JSON.stringify(selectedOptionalModules))
		localStorage.setItem("selectedContinents", JSON.stringify(selectedContinents))
		localStorage.setItem("selectedCountries", JSON.stringify(selectedCountries))
		localStorage.setItem("selectedSchools", JSON.stringify(selectedSchools))
		
		const [ moduleTooltipOpen, setModuleTooltipOpen ] = useState(false)
		const [ locationTooltipOpen, setLocationTooltipOpen ] = useState(false)





		useEffect(() => {
			setLoading(true)
			fetch('https://sepickerv2.herokuapp.com/backend', {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
			}).then(res => res.json())
				.then(data => {setLoading(false); setResult(data)})
				.catch(err => console.log(err))
		}, [selectedEssentialModules, selectedOptionalModules, selectedContinents, selectedCountries, selectedSchools])


		return (
				<div className="Selector">
						{/* <h2>Delete these arrays later</h2>
						<strong>EM:</strong>{selectedEssentialModules} <br/>
						<strong>OM:</strong>{selectedOptionalModules} <br/> 
						<strong>Countries:</strong>{selectedCountries} <br/>
						<strong>Schools:</strong>{selectedSchools} <br/>
						<strong>Continents:</strong>{selectedContinents} <br/> */}
						{/* <div class="wrap"> */}
						<Grid container item xs={12} spacing={0} justifyContent="center">
                
							<Grid container item xs={11} lg={5} justifyContent="center">

								<Grid container item component={Paper} xs={12} spacing={0} justifyContent="center" id="left-box" style={{backgroundColor: "brown", paddingTop: "2vh", margin: "0vw 1vw 2vw 1vw"}}>
									<Grid spacing={0} item xs={12}>
										<Grid container item justifyContent="center">
											<Grid container item xs={12} justifyContent="center">
												<Typography variant="h4">Preferences</Typography>
											</Grid>
											<Grid container item xs={11} component={Paper} justifyContent="center" style={{margin: "2% 0% 2% 0%", padding: "3%"}}>
												<Grid container item xs={12} alignItems="center">
													<Typography variant="h5" style={{display: "inline-block", paddingRight: "1%"}}>Modules</Typography>
													<ClickAwayListener onClickAway={() => setModuleTooltipOpen(false)}>
														<Tooltip
														open={moduleTooltipOpen}
														disableFocusListener
														onClick={() => setModuleTooltipOpen(true)}
														title='Schools found will be able to fulfill all Essential Modules and all mappable Optional Modules will be shown too'
														>
															<IconButton style={{color: "grey"}} size="small">
																<HelpOutlineIcon/>
															</IconButton>
														</Tooltip>
													</ClickAwayListener>
												</Grid>
												<EssentialModulesSelector stateSetter={setSelectedEssentialModules} state={selectedEssentialModules}/>
												<OptionalModulesSelector stateSetter={setSelectedOptionalModules}/>
											</Grid>
											<Grid container item xs={11} component={Paper} justifyContent="center" style={{margin: "2% 0% 10% 0%", padding: "3%"}}>
												<Grid container item xs={12} alignItems="center">
													<Typography variant="h4" style={{display: "inline-block", paddingRight: "1%"}}>
														Locations
													</Typography>
													<ClickAwayListener onClickAway={() => setLocationTooltipOpen(false)}>
														<Tooltip
														open={locationTooltipOpen}
														disableFocusListener
														onClick={() => setLocationTooltipOpen(true)}
														title='Any school which is in one of the following regions/has been selected will be considered in our search'
														>
															<IconButton style={{color: "grey"}} size="small">
																<HelpOutlineIcon />
															</IconButton>
														</Tooltip>
													</ClickAwayListener>
												</Grid>
												<ContinentSelector stateSetter={setSelectedContinents} state={selectedContinents}/>
												<CountrySelector stateSetter={setSelectedCountries}/>
												<SchoolSelector stateSetter={setSelectedSchools}/>
											</Grid>
										</Grid>
									</Grid> 
								</Grid>
								
							</Grid>

							<Grid container item xs={11} lg={5}>

								<Grid container item component={Paper} xs={12} spacing={0} justifyContent="center" id="right-box" style={{backgroundColor: "brown", paddingTop: "2vh", margin: "0vw 1vw 2vw 1vw"}}>
									<Grid spacing={0} item xs={12}>
										<Grid container item>


											<Grid container item xs={12} justifyContent="center"><Typography variant="h4">Results</Typography></Grid>
											<Grid container item xs={12} style={{paddingTop: "0%"}} justifyContent="center">
												{loading
													? <Typography variant="h4">Loading...</Typography>
													: selectedEssentialModules.length + selectedOptionalModules.length === 0
													? <Typography variant="h4">No Module Selected Yet</Typography>
													: Object.keys(result).length === 0 
													? <h2>No mappings found :(</h2>
													: <Grid container justifyContent="center" xs={12} style={{marginTop: "2%"}}>
															<Results result={result}/>
														</Grid>}
											</Grid>



										</Grid>
									</Grid> 
								</Grid>
								
							</Grid>

							{/* <Grid item xs={11} lg={5} style={{height:"100vh"}}>
								<Paper id="right-box">
										<Grid container justifyContent="center" xs={12}>
											<Typography variant="h3">Results</Typography>
										</Grid>
										<Grid container justifyContent="center" xs={12}>
											{loading
												? <h2>Loading...</h2>
												: selectedEssentialModules.length + selectedOptionalModules.length === 0
												? <h2>No Module Selected Yet</h2>
												: Object.keys(result).length === 0 
												? <h2>No mappings found :(</h2>
												: <p></p>}
											</Grid>
										<Grid container justifyContent="center" xs={12}>
											<Results result={result}/>
										</Grid>
								</Paper>
							</Grid> */}


						</Grid>
				</div>





			// <Grid container xs={12}>
			//   <Grid container component={Paper} item xs={6}>
			//     <Grid container xs={12}>
			//       <Grid item xs={2}></Grid>
			//       <Grid container spacing={1} item xs={8}>
			//           <Grid item xs={12}>
			//             <Paper style={{textAlign: 'center'}}>sxs=3</Paper>
			//           </Grid>
			//           <Grid item xs={12}>
			//             <Paper style={{textAlign: 'center'}}>xs=3</Paper>
			//           </Grid>
			//           <Grid item xs={12}>
			//             <Paper style={{textAlign: 'center'}}>xs=3</Paper>
			//           </Grid>
			//           <Grid item xs={3}>
			//             <Paper style={{textAlign: 'center'}}>xs=3</Paper>
			//           </Grid>
			//           <Grid item xs={8}>
			//             <Paper style={{textAlign: 'center'}}>xs=8</Paper>
			//           </Grid>
			//       </Grid>
			//     </Grid>
			//   </Grid>

			// </Grid>
		)
}

export default Selector
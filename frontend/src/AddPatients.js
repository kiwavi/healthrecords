import axios from 'axios';
import {useEffect, useState} from 'react';
import DateTimePicker from 'react-datetime-picker';
import BounceLoader from "react-spinners/BounceLoader";
import {NotificationManager} from 'react-notifications';

export default function AddPatients() {
    const [first_name, setFirstName] = useState('');
    const [second_name, setSecondName] = useState('');
    const [last_name, setLastName] = useState('');
    const [county, setCounty] = useState('');
    const [street, setStreet] = useState('');
    const [date_birth, setDateBirth] = useState(new Date());
    const [race, setRace] = useState('');
    const [sex, setSex] = useState('');
    const [hispanic, setHispanic] = useState('');
    const [facility, setFacility] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const [loading,setLoading] = useState(false);
    
    const [counties, setCounties] = useState([]);
    const [fetched_facilities,setFetchedFacilities] = useState([]);

    function fetchCounties() {
        setLoading(true);
        axios.get('api/all_counties').then(
            res => {
                setCounties(res.data);
                setLoading(false);
            }
        ).catch(
            error => {
                if (error['message'] === 'Network Error') {
                    NotificationManager.error('Internal System Error','Server Error', 2000);
                }
            }
        );
}


    function fetchFacilities() {
        setLoading(true);
        axios.get('api/facilities_read').then(
            res => {
                setFetchedFacilities(res.data);
                setLoading(false);
            }
        ).catch(
            error => {
                if (error['message'] === 'Network Error') {
                    NotificationManager.error('Internal System Error','Server Error', 2000);
                }
            }
        );;
    }

    
    function submitPatientData(e) {
        e.preventDefault();
        if (county === '') {
            NotificationManager.error('Select a county','Select County',2000);
            return;
        }

        if (race === '' || race === 'Select') {
            NotificationManager.error('Select a race','Select race',2000);
            return;
        }

        if (sex === '' || sex === 'Select') {
            NotificationManager.error('Select a sex','Select sex',2000);
            return;
        }

        if (facility === '' || facility==='Select') {
            NotificationManager.error('Select a facility','Select facility',2000);
            return;
        }
        
        if (hispanic === '' || hispanic ==='Select') {
            NotificationManager.error('Select hispanic','Select hispanic',2000);
            return;
        }

        else {
            setSubmitted(true);
	    var formatted_birth_date = date_birth.getFullYear() + "-" + ((date_birth.getMonth() + 1).length !== 2 ? "0" + (date_birth.getMonth() + 1) : (date_birth.getMonth() + 1)) + "-" + (date_birth.getDate() < 10 ? "0" + date_birth.getDate() : date_birth.getDate());
            
	    var start = 0;
	    var county_id = 0;
	    while (start < counties.length) {
	        if (counties[start]['county_name'] === county) {
		    county_id = counties[start]['id'];
	        }
	        start = start + 1;
	    }
            
	    var start2 = 0;
	    var facility_id = 0;
	    while (start2 < fetched_facilities.length) {
	        if (fetched_facilities[start2]['facility_name'] === facility) {
		    facility_id = fetched_facilities[start2]['id'];
	        }
	        start2 = start2 + 1;
	    }
	    setLoading(true);
	    axios.post('api/patients/', {
	        first_name,
	        second_name,
	        last_name,
	        county: county_id,
	        street,
	        race,
	        sex,
	        hispanic_or_latino: hispanic,
	        facility: facility_id,
	        date_of_birth: formatted_birth_date
	    }).then(
		res => {
		    setLoading(false);
		    setSubmitted(false);
		    NotificationManager.success('Record added successfully', 'Success', 2000);
                    e.target.reset();
                    setFirstName('');
                    setSecondName('');
                    setLastName('');
                    setStreet('');
                    setFacility('');
                    setRace('');
                    setCounty('');
                    setSex('');
                    setFacility('');
                    setHispanic('');
                    setDateBirth(new Date());
                    e.target.reset();
		}
	    ).catch(
		error => {
                    if (error['message'] === 'Network Error') {
                        NotificationManager.error('Internal System Error','Server Error', 2000);
                    };
		    setLoading(false);
                    setSubmitted(false);
		}
	    );
        }
        
    }
    
    
    useEffect(() => {
        fetchCounties();
        fetchFacilities();
    },[]);
    
    return (
        <div>
          { loading ?
            <div className='grid h-screen place-items-center'>
              <BounceLoader color="#36d7b7" />
            </div>
            :
            <div>
              <p className='flex justify-center text-bold text-2xl mt-12'> Welcome to the add patients page  </p>
              <div> 
                <form class="flex flex-col items-center justify-center mt-6 mb-12" onSubmit={submitPatientData}>
                  <div class="mb-6">
                    <label for="firstname" class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> First Name <span className='text-red-500'>*</span></label>
                    <input type="text" id="firstname" value={first_name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setFirstName(e.target.value)} maxLength="150" required/>
                  </div>
                  
                  <div class="mb-6">
                    <label for="" class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Middle Name <span className='text-red-500'>*</span> </label>
                    <input type="middlename" id="middlename" value={second_name}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSecondName(e.target.value)} maxLength="150" required/>
                  </div>
                  
                  <div class="mb-6">
                    <label for="lastname" value={last_name}  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Last Name <span className='text-red-500'>*</span> </label>
                    <input type="lastname" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setLastName(e.target.value)} maxLength="150" required/>
                  </div>
                  
                  
                  <div class="mb-6">
                    <label for="county" value={county}  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> County <span className='text-red-500'>*</span> </label>
                    <select class="w-80 text-black" onChange={(e) => setCounty(e.target.value)} required>
                      <option key='0' value="Select"> Select </option>
                      {counties.map((fetched) => <option key={fetched.id} value={fetched.county_name}> {fetched.county_name}</option>)}
                    </select> 
                  </div> 
                  
                  
                  <div class="mb-6">
                    <label for="street" value={street}  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Street <span className='text-red-500'>*</span> </label>
                    <input type="text" id="street" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setStreet(e.target.value)} maxLength="150" required/>
                  </div>
                  
                  
                  <div class="mb-6">
                    <label for="race" value={race}  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Race <span className='text-red-500'>*</span> </label>
                    <select class="w-80 text-black" onChange={(e) => setRace(e.target.value)} required>
                      <option key='0' value="Select"> Select </option>
                      <option key='1' value="White"> White </option>
                      <option key='2' value="Black"> Black </option>
                      <option key='3' value="Unknown"> Unknown </option>
                    </select> 
                  </div>
                  
                  
                  <div class="mb-6">
                    <label for="dob" value={date_birth}  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Date of birth <span className='text-red-500'>*</span> </label>
                    <DateTimePicker onChange={setDateBirth} value={date_birth} className="w-80 text-black" required/>
                  </div>
                  
                  
                  <div class="mb-6">
                    <label for="sex" class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Sex <span className='text-red-500'>*</span> </label>
                    <select class="w-80 text-black" value={sex}  onChange={(e) => setSex(e.target.value)} required>
                      <option key='0' value="Select"> Select </option>
                      <option key='1' value="Male"> Male </option>
                      <option key='2' value="Female"> Female </option>
                    </select> 
                  </div>
                  
                  
                  <div class="mb-6">
                    <label for="hispanic"  value={hispanic}  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Are you Hispanic <span className='text-red-500'>*</span> </label>
                    <select class="w-80 text-black" onChange={(e) => setHispanic(e.target.value)} required>
                      <option key='0' value="Select"> Select </option>
                      <option key='1' value="Yes"> Yes </option>
                      <option key='2' value="No"> No </option>
                      <option key='3' value="Unknown"> Unknown </option>
                    </select> 
                  </div>

                  
                  <div class="mb-6">
                    <label for="facility" value={facility}  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue"> Facility <span className='text-red-500'>*</span> </label>
                    <select class="w-80 text-black" onChange={(e) => setFacility(e.target.value)} required>
                  <option key='0' value="Select"> Select </option>
                      {fetched_facilities.map((fetched) => <option key={fetched.id} value={fetched.facility_name}> {fetched.facility_name}</option>)}
                    </select> 
                  </div>
                  
                  
                  { submitted ? 
	            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled> Submit </button>
	            :
	            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Submit </button>
	          }
                  
                </form>
              </div>
            </div>
          }
        </div>
    );    
}
